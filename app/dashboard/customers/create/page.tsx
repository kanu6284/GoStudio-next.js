import Form from '@/app/ui/invoices/create-form'; // Ensure this is the correct path or create a specific form for customers
import Breadcrumbs from '@/app/ui/invoices/breadcrumbs'; // Ensure this is the correct path
import { fetchCustomers } from '@/app/lib/cusdata';

export default async function Page() {
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: 'Customers', href: '/dashboard/customers' },
          {
            label: 'Create Customers',
            href: '/dashboard/customers/create',
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
