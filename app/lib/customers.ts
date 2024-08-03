'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Define the schema for customer
const CustomerFormSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(), // optional field
  address: z.string().optional(), // optional field
});

// Create a subset schema for creating customers (excluding `id`)
const CreateCustomer = CustomerFormSchema.omit({ id: true });

export async function createCustomer(formData: FormData) {
  const { name, email, phone, address } = CreateCustomer.parse({
    name: formData.get('name'),
    email: formData.get('email'),
    phone: formData.get('phone'),
    address: formData.get('address'),
  });

  await sql`
    INSERT INTO customers (name, email, phone, address)
    VALUES (${name}, ${email}, ${phone}, ${address})
  `;

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteCustomer(id: string) {
  await sql`DELETE FROM customers WHERE id = ${id}`;
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

// Create a subset schema for updating customers (including `id`)
const UpdateCustomer = CustomerFormSchema.pick({
  id: true,
  name: true,
  email: true,
  phone: true,
  address: true,
});

export async function updateCustomer(id: string, searchParams: URLSearchParams) {
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const phone = searchParams.get('phone');
  const address = searchParams.get('address');

  const parsedData = UpdateCustomer.parse({
    id,
    name,
    email,
    phone,
    address,
  });

  await sql`
    UPDATE customers
    SET name = ${parsedData.name}, email = ${parsedData.email}, phone = ${parsedData.phone}, address = ${parsedData.address}
    WHERE id = ${parsedData.id}
  `;

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

// Define and export State type for customers
export type CustomerState = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
};
