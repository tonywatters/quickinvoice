import { InvoiceItem, InvoiceFormData } from "../types/invoice";

export const calculateSubtotal = (items: InvoiceItem[]): number => {
  return items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
};

export const calculateTotal = (
  items: InvoiceItem[],
  taxRate: number,
): number => {
  const subtotal = calculateSubtotal(items);
  const tax = subtotal * (taxRate / 100);
  return subtotal + tax;
};

export const generateInvoiceNumber = (): string => {
  return `INV-${Date.now()}`;
};

export const getDefaultFormData = (): InvoiceFormData => {
  return {
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    items: [{ description: "", quantity: 1, rate: 0 }],
    taxRate: 0,
    notes: "Thank you for your business!",
  };
};
