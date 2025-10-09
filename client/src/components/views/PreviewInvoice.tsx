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

  const template = invoice.template || "classic";

  // Render different templates based on selection
  const renderTemplate = () => {
    switch (template) {
      case "modern":
        return <ModernTemplate invoice={invoice} />;
      case "minimal":
        return <MinimalTemplate invoice={invoice} />;
      case "professional":
        return <ProfessionalTemplate invoice={invoice} />;
      case "creative":
        return <CreativeTemplate invoice={invoice} />;
      default:
        return <ClassicTemplate invoice={invoice} />;
    }
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

          <div id="printable">{renderTemplate()}</div>
        </div>
      </div>
    </>
  );
}

// Classic Template (Your original design)
function ClassicTemplate({ invoice }: { invoice: Invoice }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-12">
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
          <h2 className="text-3xl font-bold text-indigo-600 mb-2">INVOICE</h2>
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
              <td className="py-4 text-right text-gray-700">{item.quantity}</td>
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
              <span className="text-gray-700">Tax ({invoice.taxRate}%):</span>
              <span className="font-semibold text-gray-900">
                ${(invoice.subtotal * (invoice.taxRate / 100)).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between py-3 border-t-2 border-gray-300">
            <span className="text-xl font-bold text-gray-900">Total:</span>
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
          <p className="text-gray-700 whitespace-pre-wrap">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}

// Modern Template - Bold with gradient
function ModernTemplate({ invoice }: { invoice: Invoice }) {
  return (
    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg shadow-2xl p-1">
      <div className="bg-white rounded-lg p-12">
        <div className="flex justify-between items-start mb-12 pb-6 border-b-4 border-indigo-500">
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-3">
              {invoice.businessName}
            </h1>
            <p className="text-gray-700 font-medium">{invoice.businessEmail}</p>
            <p className="text-gray-700">{invoice.businessPhone}</p>
            <p className="text-gray-700">{invoice.businessAddress}</p>
          </div>
          <div className="text-right bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-6 rounded-xl">
            <h2 className="text-3xl font-bold mb-2">INVOICE</h2>
            <p className="text-indigo-100">#{invoice.invoiceNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="bg-gray-50 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-indigo-600 uppercase mb-3">
              Bill To:
            </h3>
            <p className="text-xl font-bold text-gray-900 mb-2">
              {invoice.clientName}
            </p>
            <p className="text-gray-600">{invoice.clientEmail}</p>
            <p className="text-gray-600">{invoice.clientAddress}</p>
          </div>
          <div className="bg-gray-50 p-6 rounded-xl text-right">
            <div className="mb-3">
              <span className="text-sm font-bold text-indigo-600 uppercase block">
                Invoice Date
              </span>
              <span className="text-lg font-semibold text-gray-900">
                {invoice.invoiceDate}
              </span>
            </div>
            {invoice.dueDate && (
              <div>
                <span className="text-sm font-bold text-indigo-600 uppercase block">
                  Due Date
                </span>
                <span className="text-lg font-semibold text-gray-900">
                  {invoice.dueDate}
                </span>
              </div>
            )}
          </div>
        </div>

        <table className="w-full mb-8">
          <thead>
            <tr className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
              <th className="text-left py-4 px-4 rounded-tl-lg font-bold uppercase text-sm">
                Description
              </th>
              <th className="text-right py-4 px-4 font-bold uppercase text-sm">
                Qty
              </th>
              <th className="text-right py-4 px-4 font-bold uppercase text-sm">
                Rate
              </th>
              <th className="text-right py-4 px-4 rounded-tr-lg font-bold uppercase text-sm">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr
                key={index}
                className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
              >
                <td className="py-4 px-4 font-medium text-gray-900">
                  {item.description}
                </td>
                <td className="py-4 px-4 text-right text-gray-700">
                  {item.quantity}
                </td>
                <td className="py-4 px-4 text-right text-gray-700">
                  ${item.rate.toFixed(2)}
                </td>
                <td className="py-4 px-4 text-right font-bold text-gray-900">
                  ${(item.quantity * item.rate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-12">
          <div className="w-96 bg-gray-50 p-6 rounded-xl">
            <div className="flex justify-between py-2 text-lg">
              <span className="text-gray-700 font-medium">Subtotal:</span>
              <span className="font-bold text-gray-900">
                ${invoice.subtotal.toFixed(2)}
              </span>
            </div>
            {invoice.taxRate > 0 && (
              <div className="flex justify-between py-2 text-lg">
                <span className="text-gray-700 font-medium">
                  Tax ({invoice.taxRate}%):
                </span>
                <span className="font-bold text-gray-900">
                  ${(invoice.subtotal * (invoice.taxRate / 100)).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between py-4 border-t-2 border-indigo-500 mt-2">
              <span className="text-2xl font-black text-gray-900">Total:</span>
              <span className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                ${invoice.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-xl">
            <h3 className="text-sm font-bold text-indigo-600 uppercase mb-3">
              Notes:
            </h3>
            <p className="text-gray-700 whitespace-pre-wrap leading-relaxed">
              {invoice.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Minimal Template - Clean and spacious
function MinimalTemplate({ invoice }: { invoice: Invoice }) {
  return (
    <div className="bg-white p-16">
      <div className="max-w-3xl mx-auto">
        <div className="mb-20">
          <h1 className="text-6xl font-light text-gray-900 mb-16">Invoice</h1>
          <div className="flex justify-between text-sm">
            <div className="space-y-1">
              <p className="font-semibold text-gray-900">
                {invoice.businessName}
              </p>
              <p className="text-gray-500">{invoice.businessEmail}</p>
              <p className="text-gray-500">{invoice.businessPhone}</p>
              <p className="text-gray-500">{invoice.businessAddress}</p>
            </div>
            <div className="text-right space-y-1">
              <p className="text-gray-500">#{invoice.invoiceNumber}</p>
              <p className="text-gray-500">{invoice.invoiceDate}</p>
              {invoice.dueDate && (
                <p className="text-gray-500">Due: {invoice.dueDate}</p>
              )}
            </div>
          </div>
        </div>

        <div className="mb-16">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">
            Billed To
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {invoice.clientName}
          </p>
          <p className="text-sm text-gray-500">{invoice.clientEmail}</p>
          <p className="text-sm text-gray-500">{invoice.clientAddress}</p>
        </div>

        <table className="w-full mb-16">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="text-right py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Qty
              </th>
              <th className="text-right py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Rate
              </th>
              <th className="text-right py-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-6 text-gray-900">{item.description}</td>
                <td className="py-6 text-right text-gray-500">
                  {item.quantity}
                </td>
                <td className="py-6 text-right text-gray-500">
                  ${item.rate.toFixed(2)}
                </td>
                <td className="py-6 text-right font-medium text-gray-900">
                  ${(item.quantity * item.rate).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end mb-16">
          <div className="w-80 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500">Subtotal</span>
              <span className="text-gray-900">
                ${invoice.subtotal.toFixed(2)}
              </span>
            </div>
            {invoice.taxRate > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Tax ({invoice.taxRate}%)</span>
                <span className="text-gray-900">
                  ${(invoice.subtotal * (invoice.taxRate / 100)).toFixed(2)}
                </span>
              </div>
            )}
            <div className="flex justify-between pt-3 border-t border-gray-900">
              <span className="text-lg font-semibold text-gray-900">Total</span>
              <span className="text-2xl font-semibold text-gray-900">
                ${invoice.total.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="border-t border-gray-200 pt-8">
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">
              Notes
            </p>
            <p className="text-sm text-gray-600 whitespace-pre-wrap leading-relaxed">
              {invoice.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Professional Template - Traditional business style
function ProfessionalTemplate({ invoice }: { invoice: Invoice }) {
  return (
    <div className="bg-white p-12 border-8 border-gray-800">
      <div className="border-b-4 border-gray-800 pb-8 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-2">
              {invoice.businessName}
            </h1>
            <p className="text-gray-700">{invoice.businessEmail}</p>
            <p className="text-gray-700">{invoice.businessPhone}</p>
            <p className="text-gray-700">{invoice.businessAddress}</p>
          </div>
          <div className="text-right">
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">
              INVOICE
            </h2>
            <p className="text-gray-700 font-semibold">
              #{invoice.invoiceNumber}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 mb-12">
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">
            Bill To:
          </h3>
          <p className="text-lg font-serif font-semibold text-gray-900 mb-1">
            {invoice.clientName}
          </p>
          <p className="text-gray-700">{invoice.clientEmail}</p>
          <p className="text-gray-700">{invoice.clientAddress}</p>
        </div>
        <div>
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3 border-b-2 border-gray-800 pb-1">
            Invoice Details:
          </h3>
          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-700 font-semibold">Date:</span>
              <span className="text-gray-900">{invoice.invoiceDate}</span>
            </div>
            {invoice.dueDate && (
              <div className="flex justify-between">
                <span className="text-gray-700 font-semibold">Due:</span>
                <span className="text-gray-900">{invoice.dueDate}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <table className="w-full mb-8 border-2 border-gray-800">
        <thead>
          <tr className="bg-gray-800 text-white">
            <th className="text-left py-3 px-4 font-serif font-bold">
              Description
            </th>
            <th className="text-right py-3 px-4 font-serif font-bold">Qty</th>
            <th className="text-right py-3 px-4 font-serif font-bold">Rate</th>
            <th className="text-right py-3 px-4 font-serif font-bold">
              Amount
            </th>
          </tr>
        </thead>
        <tbody>
          {invoice.items.map((item, index) => (
            <tr key={index} className="border-b-2 border-gray-300">
              <td className="py-3 px-4 text-gray-900">{item.description}</td>
              <td className="py-3 px-4 text-right text-gray-700">
                {item.quantity}
              </td>
              <td className="py-3 px-4 text-right text-gray-700">
                ${item.rate.toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right font-semibold text-gray-900">
                ${(item.quantity * item.rate).toFixed(2)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-end mb-12">
        <div className="w-96 border-4 border-gray-800 p-6">
          <div className="flex justify-between py-2">
            <span className="text-gray-700 font-serif font-semibold">
              Subtotal:
            </span>
            <span className="font-semibold text-gray-900">
              ${invoice.subtotal.toFixed(2)}
            </span>
          </div>
          {invoice.taxRate > 0 && (
            <div className="flex justify-between py-2">
              <span className="text-gray-700 font-serif font-semibold">
                Tax ({invoice.taxRate}%):
              </span>
              <span className="font-semibold text-gray-900">
                ${(invoice.subtotal * (invoice.taxRate / 100)).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between py-3 border-t-4 border-gray-800 mt-2">
            <span className="text-xl font-serif font-bold text-gray-900">
              Total:
            </span>
            <span className="text-2xl font-serif font-bold text-gray-900">
              ${invoice.total.toFixed(2)}
            </span>
          </div>
        </div>
      </div>

      {invoice.notes && (
        <div className="border-t-4 border-gray-800 pt-6">
          <h3 className="text-xs font-bold text-gray-900 uppercase tracking-wider mb-3">
            Notes:
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{invoice.notes}</p>
        </div>
      )}
    </div>
  );
}

// Creative Template - Colorful and vibrant
function CreativeTemplate({ invoice }: { invoice: Invoice }) {
  return (
    <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 p-8 rounded-3xl">
      <div className="bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-2">
              {invoice.businessName}
            </h1>
            <div className="space-y-1">
              <p className="text-purple-600 font-medium">
                {invoice.businessEmail}
              </p>
              <p className="text-purple-600">{invoice.businessPhone}</p>
              <p className="text-purple-600">{invoice.businessAddress}</p>
            </div>
          </div>
          <div className="bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 text-white p-6 rounded-2xl transform rotate-3">
            <h2 className="text-2xl font-black mb-1">INVOICE</h2>
            <p className="text-pink-100">#{invoice.invoiceNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gradient-to-br from-pink-100 to-purple-100 p-4 rounded-2xl">
            <h3 className="text-xs font-black text-purple-600 uppercase tracking-wider mb-2">
              🎨 Bill To:
            </h3>
            <p className="text-lg font-bold text-gray-900 mb-1">
              {invoice.clientName}
            </p>
            <p className="text-purple-700">{invoice.clientEmail}</p>
            <p className="text-purple-700">{invoice.clientAddress}</p>
          </div>
          <div className="bg-gradient-to-br from-blue-100 to-purple-100 p-4 rounded-2xl">
            <h3 className="text-xs font-black text-blue-600 uppercase tracking-wider mb-2">
              📅 Dates:
            </h3>
            <div className="space-y-1">
              <div>
                <span className="text-xs text-blue-700 font-semibold block">
                  Invoice Date
                </span>
                <span className="text-base font-bold text-gray-900">
                  {invoice.invoiceDate}
                </span>
              </div>
              {invoice.dueDate && (
                <div>
                  <span className="text-xs text-blue-700 font-semibold block">
                    Due Date
                  </span>
                  <span className="text-base font-bold text-gray-900">
                    {invoice.dueDate}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 via-purple-50 to-blue-50 rounded-2xl p-6 mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-purple-300">
                <th className="text-left py-2 text-sm font-black text-purple-600 uppercase">
                  Description
                </th>
                <th className="text-right py-2 text-sm font-black text-purple-600 uppercase">
                  Qty
                </th>
                <th className="text-right py-2 text-sm font-black text-purple-600 uppercase">
                  Rate
                </th>
                <th className="text-right py-2 text-sm font-black text-purple-600 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {invoice.items.map((item, index) => (
                <tr key={index} className="border-b border-purple-100">
                  <td className="py-3 text-gray-900 font-medium">
                    {item.description}
                  </td>
                  <td className="py-3 text-right text-purple-700">
                    {item.quantity}
                  </td>
                  <td className="py-3 text-right text-purple-700">
                    ${item.rate.toFixed(2)}
                  </td>
                  <td className="py-3 text-right font-bold text-gray-900">
                    ${(item.quantity * item.rate).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-end mb-8">
          <div className="w-96 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500 p-1 rounded-2xl">
            <div className="bg-white rounded-2xl p-4">
              <div className="flex justify-between py-2">
                <span className="text-purple-700 font-bold">Subtotal:</span>
                <span className="font-bold text-gray-900">
                  ${invoice.subtotal.toFixed(2)}
                </span>
              </div>
              {invoice.taxRate > 0 && (
                <div className="flex justify-between py-2">
                  <span className="text-purple-700 font-bold">
                    Tax ({invoice.taxRate}%):
                  </span>
                  <span className="font-bold text-gray-900">
                    ${(invoice.subtotal * (invoice.taxRate / 100)).toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between py-4 border-t-2 border-purple-300 mt-2">
                <span className="text-2xl font-black text-gray-900">
                  Total:
                </span>
                <span className="text-3xl font-black bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent">
                  ${invoice.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>

        {invoice.notes && (
          <div className="bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 p-4 rounded-2xl">
            <h3 className="text-sm font-black text-purple-600 uppercase tracking-wider mb-2">
              💬 Notes:
            </h3>
            <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
              {invoice.notes}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
