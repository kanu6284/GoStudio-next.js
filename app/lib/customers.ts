'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Define the schema for customer
const CustomerSchema = z.object({
  id: z.string().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
});

// Create a subset schema for creating customers (excluding `id`)
const CreateCustomer = CustomerSchema.omit({ id: true });

export async function createCustomer(formData: FormData) {
  const { name, email, phone } = CreateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  });

  await sql`
    INSERT INTO customers (name, email, phone)
    VALUES (${name}, ${email}, ${phone})
  `;

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  await sql`DELETE FROM customers WHERE id = ${id}`;
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

// UpdateCustomer schema with required fields
const UpdateCustomer = CustomerSchema.pick({
  id: true,
  name: true,
  email: true,
  phone: true,
});

export async function updateCustomer(id: string, searchParams: URLSearchParams) {
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');

  // Parse and validate data
  const parsedData = UpdateCustomer.parse({
    id,
    name,
    email,
    phone,
  });

  // Perform the database update using parameterized query
  await sql`
    UPDATE customers
    SET name = ${parsedData.name}, email = ${parsedData.email}, phone = ${parsedData.phone}
    WHERE id = ${parsedData.id}
  `;

  // Revalidate the path and redirect
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}
