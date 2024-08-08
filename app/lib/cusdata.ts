import { sql } from '@vercel/postgres';
import { CustomerField, CustomersTableType, CustomerForm, LatestCustomerRaw, Revenue } from '../lib/customerdefinitions';
import { formatCurrency } from './utils';

const ITEMS_PER_PAGE = 6;

export async function fetchRevenue() {
  try {
    console.log('Fetching revenue data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<Revenue[]>`SELECT * FROM revenue`;
    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch revenue data.');
  }
}

export async function fetchLatestCustomers() {
  try {
    const data = await sql<LatestCustomerRaw[]>`
      SELECT customers.name, customers.image_url, customers.email, customers.id
      FROM customers
      ORDER BY customers.created_at DESC
      LIMIT 5`;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch the latest customers.');
  }
}

export async function fetchCardData() {
  try {
    const customerCountPromise = sql`SELECT COUNT(*) FROM customers`;
    const data = await Promise.all([customerCountPromise]);

    const numberOfCustomers = Number(data[0].rows[0].count ?? '0');
    return { numberOfCustomers };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch card data.');
  }
}

export async function fetchFilteredCustomers(query: string, currentPage: number = 1) {
  console.log('Query:', query);
  console.log('Current Page:', currentPage);

  if (isNaN(currentPage) || currentPage < 1) {
    console.error('Invalid page number detected:', currentPage);
    throw new Error('Invalid page number');
  }

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {
    console.log('Offset:', offset);

    const customers = await sql<CustomersTableType[]>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.phone,
        COUNT(invoices.id) AS total_invoices,
        SUM(CASE WHEN invoices.status = 'pending' THEN invoices.amount ELSE 0 END) AS total_pending,
        SUM(CASE WHEN invoices.status = 'paid' THEN invoices.amount ELSE 0 END) AS total_paid
      FROM customers
      LEFT JOIN invoices ON customers.id = invoices.customer_id
      WHERE
        customers.name ILIKE ${`%${query}%`} OR
        customers.email ILIKE ${`%${query}%`}
      GROUP BY customers.id, customers.name, customers.email, customers.phone
      ORDER BY customers.name ASC
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
    `;

    return customers.rows.map((customer) => ({
      ...customer,
      total_pending: formatCurrency(customer.total_pending),
      total_paid: formatCurrency(customer.total_paid),
    }));
  } catch (error) {
    console.error('Database Error:', error.message, 'Stack:', error.stack);
    throw new Error('Failed to fetch customers.');
  }
}

export async function fetchCustomersPages(query: string) {
  try {
    const count = await sql`SELECT COUNT(*)
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE
      customers.name ILIKE ${`%${query}%`} OR
      customers.email ILIKE ${`%${query}%`} OR
      invoices.amount::text ILIKE ${`%${query}%`} OR
      invoices.date::text ILIKE ${`%${query}%`} OR
      invoices.status ILIKE ${`%${query}%`}
  `;

    if (count.rows.length === 0) {
      throw new Error('No data returned from count query.');
    }

    const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
    return totalPages;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error(`Failed to fetch total number of invoices: ${error.message}`);
  }
}

export async function fetchCustomerById(id: string) {
  try {
    const data = await sql<CustomerForm[]>`
      SELECT
        customers.id,
        customers.name,
        customers.email,
        customers.phone
      FROM customers
      WHERE customers.id = ${id};
    `;

    return data.rows[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch customer.');
  }
}

export async function fetchCustomers() {
  try {
    const data = await sql<CustomerField[]>`
      SELECT
        id,
        name
      FROM customers
      ORDER BY name ASC
    `;

    return data.rows;
  } catch (err) {
    console.error('Database Error:', err);
    throw new Error('Failed to fetch all customers.');
  }
}
