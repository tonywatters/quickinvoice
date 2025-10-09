import React from "react";
import { Download } from "lucide-react";
import { Invoice } from "../../types/invoice";

interface PreviewInvoiceProps {
  invoice: Invoice;
  onBack: () => void;
}

export default function PreviewInvoice({
  invoice,
  onBack,
}: PreviewInvoiceProps) {
  const handlePrint = () => {
    window.print();
  };

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
              onClick={onBack}
              className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-medium transition-colors"
            >
              Back to Dashboard
            </button>
            <button
              onClick={handlePrint}
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
                  {invoice.businessName}
                </h1>
                <p className="text-gray-600">{invoice.businessEmail}</p>
                <p className="text-gray-600">{invoice.businessPhone}</p>
                <p className="text-gray-600">{invoice.businessAddress}</p>
              </div>
              <div className="text-right">
                <h2 className="text-3xl font-bold text-indigo-600 mb-2">
                  INVOICE
                </h2>
                <p className="text-gray-600">#{invoice.invoiceNumber}</p>
              </div>
            </div>

            <div className="flex justify-between mb-12">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Bill To:
                </h3>
                <p className="text-lg font-semibold text-gray-900">
                  {invoice.clientName}
                </p>
                <p className="text-gray-600">{invoice.clientEmail}</p>
                <p className="text-gray-600">{invoice.clientAddress}</p>
              </div>
              <div className="text-right">
                <div className="mb-2">
                  <span className="text-sm font-semibold text-gray-500 uppercase">
                    Invoice Date:{" "}
                  </span>
                  <span className="text-gray-900">{invoice.invoiceDate}</span>
                </div>
                {invoice.dueDate && (
                  <div>
                    <span className="text-sm font-semibold text-gray-500 uppercase">
                      Due Date:{" "}
                    </span>
                    <span className="text-gray-900">{invoice.dueDate}</span>
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
                {invoice.items.map((item, index) => (
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
                    ${invoice.subtotal.toFixed(2)}
                  </span>
                </div>
                {invoice.taxRate > 0 && (
                  <div className="flex justify-between py-2">
                    <span className="text-gray-700">
                      Tax ({invoice.taxRate}%):
                    </span>
                    <span className="font-semibold text-gray-900">
                      ${(invoice.subtotal * (invoice.taxRate / 100)).toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-3 border-t-2 border-gray-300">
                  <span className="text-xl font-bold text-gray-900">
                    Total:
                  </span>
                  <span className="text-2xl font-bold text-indigo-600">
                    ${invoice.total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            {invoice.notes && (
              <div className="border-t pt-8">
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-2">
                  Notes:
                </h3>
                <p className="text-gray-700 whitespace-pre-wrap">
                  {invoice.notes}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
