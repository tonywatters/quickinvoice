import React from "react";
import { FileText, Check, Zap, Clock, DollarSign, Users } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
  onViewDashboard: () => void;
}

export default function LandingPage({
  onGetStarted,
  onViewDashboard,
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FileText className="text-indigo-600" size={32} />
              <span className="text-2xl font-bold text-gray-900">
                QuickInvoice
              </span>
            </div>
            <button
              onClick={onViewDashboard}
              className="text-indigo-600 hover:text-indigo-700 font-medium"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-8">
            <Zap size={16} />
            100% Free • No Signup Required
          </div>

          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Get Paid Faster with
            <span className="text-indigo-600"> Instant Invoices</span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
            Create professional invoices in 60 seconds. Add payment links,
            download as PDF, and get paid today—not in 30 days.
          </p>

          {/* CTA Button */}
          <button
            onClick={onGetStarted}
            className="bg-indigo-600 hover:bg-indigo-700 text-white text-xl px-12 py-5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 mb-12 inline-flex items-center gap-3"
          >
            Create Your First Invoice
            <span className="text-2xl">→</span>
          </button>

          {/* Trust Signals */}
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 text-gray-600 mb-12">
            <div className="flex items-center gap-2">
              <div className="bg-green-100 rounded-full p-1">
                <Check className="text-green-600" size={16} />
              </div>
              <span className="font-medium">No signup needed</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 rounded-full p-1">
                <Check className="text-green-600" size={16} />
              </div>
              <span className="font-medium">100% free forever</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-green-100 rounded-full p-1">
                <Check className="text-green-600" size={16} />
              </div>
              <span className="font-medium">Instant PDF download</span>
            </div>
          </div>

          {/* Social Proof */}
          <p className="text-gray-500 flex items-center justify-center gap-2">
            <Users size={20} />
            <span>Join 100+ freelancers who created invoices this week</span>
          </p>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
          Everything you need to get paid
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-indigo-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <Clock className="text-indigo-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Lightning Fast
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Create professional invoices in under 60 seconds. No complicated
              forms, just the essentials.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <DollarSign className="text-green-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Payment Links (Coming Soon)
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Add Stripe payment buttons to your invoices. Get paid instantly
              instead of waiting 30+ days.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-14 h-14 rounded-xl flex items-center justify-center mb-6">
              <FileText className="text-purple-600" size={28} />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Professional PDFs
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Download clean, professional invoices as PDF. Perfect for email or
              printing.
            </p>
          </div>
        </div>
      </div>

      {/* Final CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to get paid faster?
          </h2>
          <p className="text-xl text-indigo-100 mb-8">
            Join freelancers who are getting paid today, not in 30 days
          </p>
          <button
            onClick={onGetStarted}
            className="bg-white text-indigo-600 hover:bg-gray-100 text-xl px-12 py-5 rounded-xl font-bold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-3"
          >
            Start Creating Invoices
            <span className="text-2xl">→</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-600">
          <p>
            Built by indie makers, for indie makers. 100% free, forever. © 2025
          </p>
          <p>QuickInvoice. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
