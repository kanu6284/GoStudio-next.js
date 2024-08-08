'use client';
import { useState } from 'react';
import { CustomerField } from '@/app/lib/definitions';
import { Button } from '@/app/ui/button';
import { UserCircleIcon, AtSymbolIcon, PhoneIcon } from '@heroicons/react/24/outline';
import { createCustomer } from '@/app/lib/customers';

interface FormProps {
  customer?: CustomerField;
  onSubmit: (event: React.FormEvent) => void;
}

export default function Form({ customer, onSubmit }: FormProps) {
  const [name, setName] = useState(customer?.name || '');
  const [email, setEmail] = useState(customer?.email || '');
  const [phone, setPhone] = useState(customer?.phone || '');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);

    try {
      // Call the server-side function directly
      await createCustomer(formData);
      console.log('Customer created successfully');
    } catch (error) {
      console.error('Failed to create customer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="name" className="mb-2 block text-sm font-medium">
            Customer Name
          </label>
          <div className="relative">
            <input
              id="name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter customer name"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <UserCircleIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Customer Email */}
        <div className="mb-4">
          <label htmlFor="email" className="mb-2 block text-sm font-medium">
            Customer Email
          </label>
          <div className="relative">
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter customer email"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <AtSymbolIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>

        {/* Customer Phone */}
        <div className="mb-4">
          <label htmlFor="phone" className="mb-2 block text-sm font-medium">
            Customer Phone
          </label>
          <div className="relative">
            <input
              id="phone"
              name="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Enter customer phone number"
              className="peer block w-full cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              required
            />
            <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500" />
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-end gap-4">
        <Button type="submit">Save Customer</Button>
      </div>
    </form>
  );
}
