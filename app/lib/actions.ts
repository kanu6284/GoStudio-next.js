'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

// Define the schema for invoice
const InvoiceSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

// Create a subset schema for creating invoices (excluding `id` and `date`)
const CreateInvoice = InvoiceSchema.omit({ id: true, date: true });

export async function createInvoice(formData: FormData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];

  await sql`
    INSERT INTO invoices (customer_id, amount, status, date)
    VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
  `;

  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

export async function deleteInvoice(id: string) {
  await sql`DELETE FROM invoices WHERE id = ${id}`;
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

const UpdateInvoice = InvoiceSchema.pick({
  id: true,
  customerId: true,
  amount: true,
  status: true,
});

export async function updateInvoice(id: string, searchParams: URLSearchParams) {
  const customerId = searchParams.get('customerId');
  const amount = parseFloat(searchParams.get('amount') || '');
  const status = searchParams.get('status') as 'pending' | 'paid';
  const parsedData = UpdateInvoice.parse({
    id,
    customerId,
    amount,
    status,
  });

  const amountInCents = parsedData.amount * 100;

  // Perform the database update
  await sql`
    UPDATE invoices
    SET customer_id = ${parsedData.customerId}, amount = ${amountInCents}, status = ${parsedData.status}
    WHERE id = ${parsedData.id}
  `;

  // Revalidate the path and redirect
  revalidatePath('/dashboard/customers');
  redirect('/dashboard/customers');
}

// Define and export State type for invoices
export type InvoiceState = {
  id: string;
  customerId: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
};
