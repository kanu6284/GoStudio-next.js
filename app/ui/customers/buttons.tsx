"use client";

import { PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { deleteCustomer } from '@/app/lib/customers';
import { useState } from 'react';

// Component for creating a customer
export function CreateCustomer() {
  return (
    <Link
      href="/dashboard/customers/create"
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">Create Customer</span>{' '}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

// Component for updating a customer
export function UpdateCustomer({ id }: { id: string }) {
  return (
    <Link
      href={`/dashboard/customers/${id}/edit`}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export function DeleteCustomer({ id }: { id: string }) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsDeleting(true);
    try {
      await deleteCustomer(id);
      // Optionally, add UI update logic here after deletion
    } catch (error) {
      console.error('Error deleting customer:', error);
      // Optionally, show user-friendly error message
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <form onSubmit={handleDelete}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100" disabled={isDeleting}>
        <span className="sr-only">Delete</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
