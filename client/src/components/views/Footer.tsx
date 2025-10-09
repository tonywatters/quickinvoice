import React from "react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-auto py-6 text-center text-sm text-gray-600 border-t border-gray-200">
      <p>© {currentYear} QuickInvoice. All rights reserved.</p>
    </footer>
  );
}
