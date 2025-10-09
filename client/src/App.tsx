import React, { useState } from "react";

import LandingPage from "./components/views/LandingPage";
import Dashboard from "./components/views/Dashboard";
import CreateInvoice from "./components/views/CreateInvoice";
import PreviewInvoice from "./components/views/PreviewInvoice";

import { Invoice, InvoiceFormData, InvoiceItem } from "./types/invoice";
import {
  calculateSubtotal,
  calculateTotal,
  getDefaultFormData,
} from "./utils/calculations";

export default function InvoiceGenerator() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [currentView, setCurrentView] = useState("landing");
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] =
    useState<InvoiceFormData>(getDefaultFormData());

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, rate: 0 }],
    });
  };

  const handleRemoveItem = (index: number) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemChange = (
    index: number,
    field: keyof InvoiceItem,
    value: string | number,
  ) => {
    const newItems = [...formData.items];
    if (field === "description") {
      newItems[index][field] = value as string;
    } else {
      newItems[index][field] = parseFloat(value as string) || 0;
    }
    setFormData({ ...formData, items: newItems });
  };

  const handleSaveInvoice = () => {
    const invoice: Invoice = {
      ...formData,
      id: editingInvoice?.id || Date.now(),
      createdAt: editingInvoice?.createdAt || new Date().toISOString(),
      subtotal: calculateSubtotal(formData.items),
      total: calculateTotal(formData.items, formData.taxRate),
    };

    if (editingInvoice) {
      setInvoices(
        invoices.map((inv) => (inv.id === editingInvoice.id ? invoice : inv)),
      );
    } else {
      setInvoices([...invoices, invoice]);
    }

    resetForm();
    setCurrentView("dashboard");
  };

  const resetForm = () => {
    setFormData(getDefaultFormData());
    setEditingInvoice(null);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setFormData(invoice);
    setEditingInvoice(invoice);
    setCurrentView("create");
  };

  const handleDeleteInvoice = (id: number) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    setPreviewInvoice(invoice);
    setCurrentView("preview");
    setTimeout(() => window.print(), 100);
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalClients = new Set(invoices.map((inv) => inv.clientName)).size;

  // Landing Page View
  if (currentView === "landing") {
    return (
      <LandingPage
        onGetStarted={() => setCurrentView("create")}
        onViewDashboard={() => setCurrentView("dashboard")}
      />
    );
  }

  // Dashboard View
  if (currentView === "dashboard") {
    return (
      <Dashboard
        invoices={invoices}
        onCreateNew={() => setCurrentView("create")}
        onEditInvoice={handleEditInvoice}
        onDeleteInvoice={handleDeleteInvoice}
        onPrintInvoice={handlePrintInvoice}
      />
    );
  }

  // Create/Edit Invoice View
  if (currentView === "create") {
    return (
      <CreateInvoice
        formData={formData}
        setFormData={setFormData}
        editingInvoice={editingInvoice}
        invoicesCount={invoices.length}
        onSave={handleSaveInvoice}
        onCancel={() => {
          resetForm();
          setCurrentView(invoices.length === 0 ? "landing" : "dashboard");
        }}
      />
    );
  }

  // Preview/Print View
  if (currentView === "preview" && previewInvoice) {
    return (
      <PreviewInvoice
        invoice={previewInvoice}
        onBack={() => setCurrentView("dashboard")}
      />
    );
  }

  return null;
}
