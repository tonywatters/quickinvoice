import React, { useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Download,
  DollarSign,
  Users,
} from "lucide-react";

import LandingPage from "./components/views/LandingPage";
import Dashboard from "./components/views/Dashboard";
import CreateInvoice from "./components/views/CreateInvoice";

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

  // Landing Page View - NOW USES SEPARATE COMPONENT!
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

  // Preview/Print View (Still inline - we'll move this later)
  if (currentView === "preview" && previewInvoice) {
    return (
      <>
        <style>
          {`
            @media print {
              body * { visibility: hidden; }
              #printable, #printable * { visibility: visible; }
              #printable { 
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
              }
              .no-print { display: none !important; }
            }
          `}
        </style>
        <div className="min-h-screen bg-gray-100 p-8">
          <div className="max-w-4xl mx-auto">
            <div className="no-print mb-6 flex justify-between items-center">
              <button
                onClick={() => setCurrentView("dashboard")}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
              >
                Back to Dashboard
              </button>
              <button
                onClick={() => window.print()}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
              >
                <Download size={20} />
                Download PDF
              </button>
            </div>

            <div id="printable" className="bg-white rounded-lg shadow-lg p-12">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    {previewInvoice.businessName}
                  </h1>
                  <p className="text-gray-600">
                    {previewInvoice.businessEmail}
                  </p>
                  <p className="text-gray-600">
                    {previewInvoice.businessPhone}
                  </p>
                  <p className="text-gray-600">
                    {previewInvoice.businessAddress}
                  </p>
                </div>
                <div className="text-right">
                  <h2 className="text-3xl font-bold text-indigo-600 mb-2">
                    INVOICE
                  </h2>
                  <p className="text-gray-600">
                    #{previewInvoice.invoiceNumber}
                  </p>
                </div>
              </div>

              <div className="flex justify-between mb-12">
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Bill To:
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {previewInvoice.clientName}
                  </p>
                  <p className="text-gray-600">{previewInvoice.clientEmail}</p>
                  <p className="text-gray-600">
                    {previewInvoice.clientAddress}
                  </p>
                </div>
                <div className="text-right">
                  <div className="mb-2">
                    <span className="text-sm font-semibold text-gray-500 uppercase">
                      Invoice Date:{" "}
                    </span>
                    <span className="text-gray-900">
                      {previewInvoice.invoiceDate}
                    </span>
                  </div>
                  {previewInvoice.dueDate && (
                    <div>
                      <span className="text-sm font-semibold text-gray-500 uppercase">
                        Due Date:{" "}
                      </span>
                      <span className="text-gray-900">
                        {previewInvoice.dueDate}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <table className="w-full mb-8">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left py-3 text-sm font-semibold text-gray-700 uppercase">
                      Description
                    </th>
                    <th className="text-right py-3 text-sm font-semibold text-gray-700 uppercase">
                      Qty
                    </th>
                    <th className="text-right py-3 text-sm font-semibold text-gray-700 uppercase">
                      Rate
                    </th>
                    <th className="text-right py-3 text-sm font-semibold text-gray-700 uppercase">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {previewInvoice.items.map((item, index) => (
                    <tr key={index} className="border-b border-gray-200">
                      <td className="py-4 text-gray-900">{item.description}</td>
                      <td className="py-4 text-right text-gray-700">
                        {item.quantity}
                      </td>
                      <td className="py-4 text-right text-gray-700">
                        ${item.rate.toFixed(2)}
                      </td>
                      <td className="py-4 text-right font-semibold text-gray-900">
                        ${(item.quantity * item.rate).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="flex justify-end mb-12">
                <div className="w-80">
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="font-semibold text-gray-900">
                      ${previewInvoice.subtotal.toFixed(2)}
                    </span>
                  </div>
                  {previewInvoice.taxRate > 0 && (
                    <div className="flex justify-between py-2">
                      <span className="text-gray-700">
                        Tax ({previewInvoice.taxRate}%):
                      </span>
                      <span className="font-semibold text-gray-900">
                        $
                        {(
                          previewInvoice.subtotal *
                          (previewInvoice.taxRate / 100)
                        ).toFixed(2)}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between py-3 border-t-2 border-gray-300">
                    <span className="text-xl font-bold text-gray-900">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-indigo-600">
                      ${previewInvoice.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {previewInvoice.notes && (
                <div className="border-t pt-8">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                    Notes:
                  </h3>
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {previewInvoice.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </>
    );
  }

  return null;
}
