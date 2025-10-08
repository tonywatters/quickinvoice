export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: number;
  createdAt: string;
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  taxRate: number;
  notes: string;
  subtotal: number;
  total: number;
}

export interface InvoiceFormData {
  businessName: string;
  businessEmail: string;
  businessPhone: string;
  businessAddress: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  items: InvoiceItem[];
  taxRate: number;
  notes: string;
}
