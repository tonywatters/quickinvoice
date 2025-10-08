import React from "react";
import {
  FileText,
  Plus,
  Edit2,
  Download,
  Trash2,
  DollarSign,
  Users,
} from "lucide-react";
import { Invoice } from "../../types/invoice";

interface DashboardProps {
  invoices: Invoice[];
  onCreateNew: () => void;
  onEditInvoice: (invoice: Invoice) => void;
  onDeleteInvoice: (id: number) => void;
  onPrintInvoice: (invoice: Invoice) => void;
}

export default function Dashboard({
  invoices,
  onCreateNew,
  onEditInvoice,
  onDeleteInvoice,
  onPrintInvoice,
}: DashboardProps) {
  const totalRevenue = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalClients = new Set(invoices.map((inv) => inv.clientName)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                Invoice Generator
              </h1>
              <p className="text-gray-600">
                Create professional invoices in seconds
              </p>
            </div>
            <button
              onClick={onCreateNew}
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
                onClick={onCreateNew}
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
                            onClick={() => onPrintInvoice(invoice)}
                            className="text-blue-600 hover:text-blue-800 p-2 hover:bg-blue-50 rounded transition-colors"
                            title="Download PDF"
                          >
                            <Download size={18} />
                          </button>
                          <button
                            onClick={() => onEditInvoice(invoice)}
                            className="text-green-600 hover:text-green-800 p-2 hover:bg-green-50 rounded transition-colors"
                            title="Edit"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => onDeleteInvoice(invoice.id)}
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
