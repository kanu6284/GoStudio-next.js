'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Define the schema for customer
const CustomerSchema = z.object({
  id: z.string(),
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

const UpdateCustomer = CustomerSchema.pick({
  id: true,
  name: true,
  email: true,
  phone: true,
});

export async function updateCustomer(id: string, formData: FormData) {
  const { name, email, phone } = UpdateCustomer.parse({
    id,
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
  });

  // Logging for debugging
  console.log('Updating customer with ID:', id);
  console.log('Name:', name);
  console.log('Email:', email);
  console.log('Phone:', phone);

  try {
    // Perform the database update
    await sql`
      UPDATE customers
      SET name = ${name}, email = ${email}, phone = ${phone}
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error('Error updating customer:', error);
    throw error;
  }

  // Revalidate the path and redirect
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

// Define and export State type for customers
export type CustomerState = {
  id: string;
  name: string;
  email: string;
  phone: string;
};
