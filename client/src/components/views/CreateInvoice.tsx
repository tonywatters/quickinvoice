import React from "react";
import { FileText, Plus, Trash2 } from "lucide-react";
import { Invoice, InvoiceFormData } from "../../types/invoice";
import { calculateSubtotal, calculateTotal } from "../../utils/calculations";

interface CreateInvoiceProps {
  formData: InvoiceFormData;
  setFormData: (data: InvoiceFormData) => void;
  editingInvoice: Invoice | null;
  invoicesCount: number;
  onSave: () => void;
  onCancel: () => void;
}

export default function CreateInvoice({
  formData,
  setFormData,
  editingInvoice,
  invoicesCount,
  onSave,
  onCancel,
}: CreateInvoiceProps) {
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
    field: string,
    value: string | number,
  ) => {
    const newItems = [...formData.items];
    newItems[index][field] =
      field === "description" ? value : parseFloat(value as string) || 0;
    setFormData({ ...formData, items: newItems });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
          {/* Logo/Home Link */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <button
              onClick={onCancel}
              className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
            >
              <FileText size={24} />
              <span className="text-xl font-bold">QuickInvoice</span>
            </button>
          </div>

          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              {editingInvoice ? "Edit Invoice" : "Create New Invoice"}
            </h2>
            <button
              onClick={onCancel}
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
                    setFormData({ ...formData, businessEmail: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.businessPhone}
                  onChange={(e) =>
                    setFormData({ ...formData, businessPhone: e.target.value })
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
                    setFormData({ ...formData, clientAddress: e.target.value })
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
                    setFormData({ ...formData, invoiceNumber: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={formData.invoiceDate}
                  onChange={(e) =>
                    setFormData({ ...formData, invoiceDate: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <input
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) =>
                    setFormData({ ...formData, dueDate: e.target.value })
                  }
                  className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Template Selection */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Invoice Template
              </h3>
              <select
                value={formData.template || "classic"}
                onChange={(e) =>
                  setFormData({ ...formData, template: e.target.value })
                }
                className="w-full md:w-1/2 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
              >
                <option value="classic">
                  🎨 Classic - Clean & Professional
                </option>
                <option value="modern">🚀 Modern - Bold & Contemporary</option>
                <option value="minimal">✨ Minimal - Simple & Elegant</option>
                <option value="professional">
                  💼 Professional - Traditional Business
                </option>
                <option value="creative">
                  🌈 Creative - Colorful & Vibrant
                </option>
              </select>
            </div>

            {/* Line Items */}
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Items
              </h3>
              <div className="space-y-4">
                {formData.items.map((item, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4 bg-gray-50"
                  >
                    <input
                      type="text"
                      placeholder="Description *"
                      value={item.description}
                      onChange={(e) =>
                        handleItemChange(index, "description", e.target.value)
                      }
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent mb-3"
                    />
                    <div className="grid grid-cols-2 gap-3 mb-3">
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Quantity
                        </label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) =>
                            handleItemChange(index, "quantity", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-gray-600 mb-1">
                          Rate
                        </label>
                        <input
                          type="number"
                          value={item.rate}
                          onChange={(e) =>
                            handleItemChange(index, "rate", e.target.value)
                          }
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <span className="text-xs text-gray-600">Amount</span>
                        <div className="text-lg font-bold text-indigo-600">
                          ${(item.quantity * item.rate).toFixed(2)}
                        </div>
                      </div>
                      {formData.items.length > 1 && (
                        <button
                          onClick={() => handleRemoveItem(index)}
                          className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 size={20} />
                        </button>
                      )}
                    </div>
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
                rows={4}
                placeholder="Payment terms, thank you message, etc."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 justify-end pt-6 border-t">
              <button
                onClick={onCancel}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
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
