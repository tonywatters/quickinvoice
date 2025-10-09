import React, { useState, useEffect } from "react";

import LandingPage from "./components/views/LandingPage";
import Dashboard from "./components/views/Dashboard";
import CreateInvoice from "./components/views/CreateInvoice";
import PreviewInvoice from "./components/views/PreviewInvoice";
import Toast from "./components/views/Toast";

import { Invoice, InvoiceFormData, InvoiceItem } from "./types/invoice";
import {
  calculateSubtotal,
  calculateTotal,
  getDefaultFormData,
} from "./utils/calculations";

const STORAGE_KEY = "invoice_app_invoices";

export default function InvoiceGenerator() {
  // Load invoices from localStorage on mount
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error("Failed to load invoices from localStorage:", error);
      return [];
    }
  });

  // Set initial view based on whether user has invoices
  const [currentView, setCurrentView] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      const savedInvoices = saved ? JSON.parse(saved) : [];
      return savedInvoices.length > 0 ? "dashboard" : "landing";
    } catch (error) {
      return "landing";
    }
  });
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [previewInvoice, setPreviewInvoice] = useState<Invoice | null>(null);
  const [formData, setFormData] =
    useState<InvoiceFormData>(getDefaultFormData());

  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    console.log("🔔 SHOWING TOAST:", message); // ← ADD THIS
    setToastMessage(message);
  };

  // Add this useEffect to monitor state changes
  useEffect(() => {
    console.log("📊 Toast state changed to:", toastMessage); // ← ADD THIS
  }, [toastMessage]);

  // Save invoices to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(invoices));
    } catch (error) {
      console.error("Failed to save invoices to localStorage:", error);
    }
  }, [invoices]);

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
      showToast("Invoice updated successfully!");
    } else {
      setInvoices([...invoices, invoice]);
      showToast("Invoice saved successfully!");
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

  const handleDuplicateInvoice = (invoice: Invoice) => {
    // Create new invoice with same data but new ID and today's date
    const duplicatedData: InvoiceFormData = {
      businessName: invoice.businessName,
      businessEmail: invoice.businessEmail,
      businessPhone: invoice.businessPhone,
      businessAddress: invoice.businessAddress,
      clientName: invoice.clientName,
      clientEmail: invoice.clientEmail,
      clientAddress: invoice.clientAddress,
      invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: invoice.dueDate,
      items: invoice.items,
      taxRate: invoice.taxRate,
      notes: invoice.notes,
    };

    setFormData(duplicatedData);
    setEditingInvoice(null);
    setCurrentView("create");
  };

  const handleDeleteInvoice = (id: number) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
    showToast("Invoice deleted successfully!");
  };

  const handlePrintInvoice = (invoice: Invoice) => {
    setPreviewInvoice(invoice);
    setCurrentView("preview");
    showToast("Ready to download PDF!");
    setTimeout(() => window.print(), 100);
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalClients = new Set(invoices.map((inv) => inv.clientName)).size;

  // Landing Page View
  if (currentView === "landing") {
    return (
      <>
        <LandingPage
          onGetStarted={() => setCurrentView("create")}
          onViewDashboard={() => setCurrentView("dashboard")}
        />
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </>
    );
  }

  // Dashboard View
  if (currentView === "dashboard") {
    return (
      <>
        <Dashboard
          invoices={invoices}
          onCreateNew={() => setCurrentView("create")}
          onEditInvoice={handleEditInvoice}
          onDuplicateInvoice={handleDuplicateInvoice}
          onDeleteInvoice={handleDeleteInvoice}
          onPrintInvoice={handlePrintInvoice}
        />
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </>
    );
  }

  // Create/Edit Invoice View
  if (currentView === "create") {
    return (
      <>
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
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </>
    );
  }

  // Preview/Print View
  if (currentView === "preview" && previewInvoice) {
    return (
      <>
        <PreviewInvoice
          invoice={previewInvoice}
          onBack={() => setCurrentView("dashboard")}
        />
        {toastMessage && (
          <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        )}
      </>
    );
  }

  return (
    <>
      {toastMessage && (
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      )}
    </>
  );
}
