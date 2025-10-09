export interface InvoiceItem {
  description: string;
  quantity: number;
  rate: number;
}

export interface Invoice {
  id: number;
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
  subtotal: number;
  total: number;
  notes: string;
  createdAt: string;
  template?: string; // Template style: 'classic', 'modern', 'minimal', 'professional', 'creative'
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
  template?: string; // Template selection
}
