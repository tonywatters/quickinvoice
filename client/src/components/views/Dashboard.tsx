import React from "react";
import {
  FileText,
  Plus,
  Trash2,
  Edit2,
  Download,
  DollarSign,
  Users,
  Copy,
} from "lucide-react";
import { Invoice } from "../../types/invoice";

interface DashboardProps {
  invoices: Invoice[];
  onCreateNew: () => void;
  onEditInvoice: (invoice: Invoice) => void;
  onDuplicateInvoice: (invoice: Invoice) => void;
  onDeleteInvoice: (id: number) => void;
  onPrintInvoice: (invoice: Invoice) => void;
}

export default function Dashboard({
  invoices,
  onCreateNew,
  onEditInvoice,
  onDuplicateInvoice,
  onDeleteInvoice,
  onPrintInvoice,
}: DashboardProps) {
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalClients = new Set(invoices.map((inv) => inv.clientName)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
            <p className="text-gray-600">Manage all your invoices</p>
          </div>
          <button
            onClick={onCreateNew}
            className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            New Invoice
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 rounded-lg">
                <FileText className="text-indigo-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Invoices</p>
                <p className="text-2xl font-bold text-gray-900">
                  {invoices.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="text-green-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalRevenue.toFixed(2)}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="text-purple-600" size={24} />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Clients</p>
                <p className="text-2xl font-bold text-gray-900">
                  {totalClients}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Invoices
            </h2>
          </div>

          {invoices.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-600 mb-4">No invoices yet</p>
              <button
                onClick={onCreateNew}
                className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition-colors"
              >
                Create Your First Invoice
              </button>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {invoices
                .sort(
                  (a, b) =>
                    new Date(b.createdAt).getTime() -
                    new Date(a.createdAt).getTime(),
                )
                .map((invoice) => (
                  <div
                    key={invoice.id}
                    className="px-6 py-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {invoice.invoiceNumber}
                          </h3>
                          <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                            ${invoice.total.toFixed(2)}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span className="font-medium">
                            {invoice.clientName}
                          </span>
                          <span>•</span>
                          <span>{invoice.invoiceDate}</span>
                          {invoice.dueDate && (
                            <>
                              <span>•</span>
                              <span>Due: {invoice.dueDate}</span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => onDuplicateInvoice(invoice)}
                          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Duplicate Invoice"
                        >
                          <Copy size={20} />
                        </button>
                        <button
                          onClick={() => onEditInvoice(invoice)}
                          className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                          title="Edit Invoice"
                        >
                          <Edit2 size={20} />
                        </button>
                        <button
                          onClick={() => onPrintInvoice(invoice)}
                          className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Download PDF"
                        >
                          <Download size={20} />
                        </button>
                        <button
                          onClick={() => {
                            if (
                              confirm(
                                "Are you sure you want to delete this invoice?",
                              )
                            ) {
                              onDeleteInvoice(invoice.id);
                            }
                          }}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete Invoice"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
