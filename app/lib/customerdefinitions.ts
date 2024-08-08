// customerdefinitions.ts

// This file contains type definitions for your customer-related data.
// It describes the shape of the data, and what data type each property should accept.

export type Customer = {
  id: string;
  name: string;
  email: string;
  
};

export type CustomerField = {
  id: string;
  name: string;
  email: string;
  phone: string;
};



export interface CustomersTableType {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;  // Assuming formatCurrency returns a string
  total_paid: string;     // Assuming formatCurrency returns a string
}
export type FormattedCustomersTable = {
  id: string;
  name: string;
  email: string;
  image_url: string;
  total_invoices: number;
  total_pending: string;
  total_paid: string;
};

export type CustomerForm = {
  id: string;
  name: string;
  email: string;
  phone: string;
};




export type Revenue = {
  month: string;
  revenue: number;
};

export type LatestCustomerRaw = {
  name: string;
  image_url: string;
  email: string;
  id: string;
};
// In your `definitions.ts` or equivalent file

