import React, { useState } from "react";
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Download,
  DollarSign,
  Users,
  Calendar,
} from "lucide-react";

export default function InvoiceGenerator() {
  const [invoices, setInvoices] = useState([]);
  const [currentView, setCurrentView] = useState("dashboard");
  const [editingInvoice, setEditingInvoice] = useState(null);
  const [previewInvoice, setPreviewInvoice] = useState(null);

  const [formData, setFormData] = useState({
    businessName: "",
    businessEmail: "",
    businessPhone: "",
    businessAddress: "",
    clientName: "",
    clientEmail: "",
    clientAddress: "",
    invoiceNumber: `INV-${Date.now()}`,
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    items: [{ description: "", quantity: 1, rate: 0 }],
    taxRate: 0,
    notes: "Thank you for your business!",
  });

  const calculateSubtotal = (items) => {
    return items.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  };

  const calculateTotal = (items, taxRate) => {
    const subtotal = calculateSubtotal(items);
    const tax = subtotal * (taxRate / 100);
    return subtotal + tax;
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { description: "", quantity: 1, rate: 0 }],
    });
  };

  const handleRemoveItem = (index) => {
    const newItems = formData.items.filter((_, i) => i !== index);
    setFormData({ ...formData, items: newItems });
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...formData.items];
    newItems[index][field] =
      field === "description" ? value : parseFloat(value) || 0;
    setFormData({ ...formData, items: newItems });
  };

  const handleSaveInvoice = () => {
    const invoice = {
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
    setFormData({
      businessName: "",
      businessEmail: "",
      businessPhone: "",
      businessAddress: "",
      clientName: "",
      clientEmail: "",
      clientAddress: "",
      invoiceNumber: `INV-${Date.now()}`,
      invoiceDate: new Date().toISOString().split("T")[0],
      dueDate: "",
      items: [{ description: "", quantity: 1, rate: 0 }],
      taxRate: 0,
      notes: "Thank you for your business!",
    });
    setEditingInvoice(null);
  };

  const handleEditInvoice = (invoice) => {
    setFormData(invoice);
    setEditingInvoice(invoice);
    setCurrentView("create");
  };

  const handleDeleteInvoice = (id) => {
    setInvoices(invoices.filter((inv) => inv.id !== id));
  };

  const handlePrintInvoice = (invoice) => {
    setPreviewInvoice(invoice);
    setCurrentView("preview");
    setTimeout(() => window.print(), 100);
  };

  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalClients = new Set(invoices.map((inv) => inv.clientName)).size;

  // Dashboard View
  if (currentView === "dashboard") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  Quick Invoice Generator
                </h1>
                <p className="text-gray-600">
                  Create professional invoices in seconds. Free invoice
                  generator for freelancers and small businesses.
                </p>
              </div>
              <button
                onClick={() => setCurrentView("create")}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md"
              >
                <Plus size={20} />
                New Invoice
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Invoices</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {invoices.length}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Revenue</p>
                  <p className="text-3xl font-bold text-gray-900">
                    ${totalRevenue.toFixed(2)}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <DollarSign className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Clients</p>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalClients}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Users className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* Invoices List */}
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Recent Invoices
            </h2>

            {invoices.length === 0 ? (
              <div className="text-center py-16">
                <FileText className="mx-auto text-gray-300 mb-4" size={64} />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No invoices yet
                </h3>
                <p className="text-gray-500 mb-6">
                  Create your first invoice to get started
                </p>
                <button
                  onClick={() => setCurrentView("create")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                >
                  Create Invoice
                </button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Invoice #
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {invoices.map((invoice) => (
                      <tr key={invoice.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                          {invoice.invoiceNumber}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-700">
                          {invoice.clientName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-600">
                          {invoice.invoiceDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">
                          ${invoice.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handlePrintInvoice(invoice)}
                              className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                              title="Download PDF"
                            >
                              <Download size={18} />
                            </button>
                            <button
                              onClick={() => handleEditInvoice(invoice)}
                              className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded transition-colors"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() => handleDeleteInvoice(invoice.id)}
                              className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Create/Edit Invoice View
  if (currentView === "create") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900">
                {editingInvoice ? "Edit Invoice" : "Create New Invoice"}
              </h2>
              <button
                onClick={() => {
                  resetForm();
                  setCurrentView("dashboard");
                }}
                className="text-gray-600 hover:text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
            </div>

            <div className="space-y-8">
              {/* Business Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Your Business Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Business Name *"
                    value={formData.businessName}
                    onChange={(e) =>
                      setFormData({ ...formData, businessName: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Business Email *"
                    value={formData.businessEmail}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessEmail: e.target.value,
                      })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    value={formData.businessPhone}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessPhone: e.target.value,
                      })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Business Address"
                    value={formData.businessAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        businessAddress: e.target.value,
                      })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Client Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Client Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Client Name *"
                    value={formData.clientName}
                    onChange={(e) =>
                      setFormData({ ...formData, clientName: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="email"
                    placeholder="Client Email"
                    value={formData.clientEmail}
                    onChange={(e) =>
                      setFormData({ ...formData, clientEmail: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    placeholder="Client Address"
                    value={formData.clientAddress}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        clientAddress: e.target.value,
                      })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent md:col-span-2"
                  />
                </div>
              </div>

              {/* Invoice Details */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Invoice Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Invoice Number *"
                    value={formData.invoiceNumber}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        invoiceNumber: e.target.value,
                      })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="Invoice Date *"
                    value={formData.invoiceDate}
                    onChange={(e) =>
                      setFormData({ ...formData, invoiceDate: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                  <input
                    type="date"
                    placeholder="Due Date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData({ ...formData, dueDate: e.target.value })
                    }
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Line Items */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Items
                </h3>
                <div className="space-y-3">
                  {formData.items.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                      <input
                        type="text"
                        placeholder="Description *"
                        value={item.description}
                        onChange={(e) =>
                          handleItemChange(index, "description", e.target.value)
                        }
                        className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Qty"
                        value={item.quantity}
                        onChange={(e) =>
                          handleItemChange(index, "quantity", e.target.value)
                        }
                        className="w-20 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <input
                        type="number"
                        placeholder="Rate"
                        value={item.rate}
                        onChange={(e) =>
                          handleItemChange(index, "rate", e.target.value)
                        }
                        className="w-32 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                      <div className="w-32 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-gray-700 font-medium">
                        ${(item.quantity * item.rate).toFixed(2)}
                      </div>
                      {formData.items.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
                <button
                  onClick={handleAddItem}
                  className="mt-4 flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-medium"
                >
                  <Plus size={20} />
                  Add Item
                </button>
              </div>

              {/* Tax and Total */}
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="max-w-md ml-auto space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Subtotal:</span>
                    <span className="text-xl font-semibold text-gray-900">
                      ${calculateSubtotal(formData.items).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center gap-4">
                    <span className="text-gray-700">Tax Rate (%):</span>
                    <input
                      type="number"
                      value={formData.taxRate}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          taxRate: parseFloat(e.target.value) || 0,
                        })
                      }
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="flex justify-between items-center pt-3 border-t-2 border-gray-300">
                    <span className="text-xl font-bold text-gray-900">
                      Total:
                    </span>
                    <span className="text-2xl font-bold text-indigo-600">
                      $
                      {calculateTotal(formData.items, formData.taxRate).toFixed(
                        2,
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">
                  Notes
                </h3>
                <textarea
                  value={formData.notes}
                  onChange={(e) =>
                    setFormData({ ...formData, notes: e.target.value })
                  }
                  rows="4"
                  placeholder="Payment terms, thank you message, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 justify-end pt-6 border-t">
                <button
                  onClick={() => {
                    resetForm();
                    setCurrentView("dashboard");
                  }}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveInvoice}
                  className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors shadow-md"
                >
                  {editingInvoice ? "Update Invoice" : "Save Invoice"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Preview/Print View
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
              {/* Header */}
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

              {/* Client and Date Info */}
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

              {/* Items Table */}
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

              {/* Totals */}
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

              {/* Notes */}
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
