import Form from '@/app/ui/customers/edit-form';
import Breadcrumbs from '@/app/ui/customers/breadcrumbs';
import { fetchCustomers, fetchInvoiceById } from '@/app/lib/data';
import { notFound } from 'next/navigation';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const [invoice, customers] = await Promise.all([
      fetchInvoiceById(id),
      fetchCustomers(),
    ]);
    if (!invoice) {
      notFound();
    }

    return (
      <main>
        <Breadcrumbs
          breadcrumbs={[
            { label: 'Customers', href: '/dashboard/customers' },
            {
              label: 'Edit Customer',
              href: `/dashboard/customers/${id}/edit`,
              active: true,
            },
          ]}
        />
              <Form invoice={invoice} customers={customers} />

      </main>
    );
 
}
