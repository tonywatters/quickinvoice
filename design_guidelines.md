# React Invoice Generator - Design Guidelines

## Design Approach: Design System (Material Design)

**Rationale**: Invoice generators are utility-focused productivity tools where clarity, professionalism, and usability are paramount. Material Design provides clean, accessible patterns perfect for data-heavy business applications.

## Core Design Elements

### A. Color Palette

**Light Mode:**
- Primary: 219 90% 50% (Professional blue for actions)
- Background: 0 0% 100% (Pure white for documents)
- Surface: 220 14% 96% (Light gray for cards/sections)
- Text Primary: 220 13% 18% (Dark gray for readability)
- Text Secondary: 220 9% 46% (Medium gray for labels)
- Border: 220 13% 91% (Subtle dividers)
- Success: 142 71% 45% (Payment status)
- Warning: 38 92% 50% (Due dates)

**Dark Mode:**
- Primary: 219 90% 55%
- Background: 222 47% 11%
- Surface: 217 33% 17%
- Text Primary: 210 40% 98%
- Text Secondary: 215 20% 65%
- Border: 217 19% 27%

### B. Typography

**Font Family:**
- Primary: 'Inter' (via Google Fonts) - excellent for UI and data
- Monospace: 'JetBrains Mono' for invoice numbers/amounts

**Type Scale:**
- Headers (h1): text-3xl font-bold (invoice titles)
- Headers (h2): text-xl font-semibold (section headings)
- Body: text-base (standard content)
- Labels: text-sm font-medium (form labels, metadata)
- Captions: text-xs (timestamps, fine print)
- Numbers: font-mono for amounts and IDs

### C. Layout System

**Tailwind Spacing Units**: Use 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-6 or p-8
- Section spacing: space-y-8
- Form gaps: gap-4 or gap-6
- Page margins: mx-4 md:mx-auto with max-w-4xl

**Container Strategy:**
- Invoice previews: max-w-4xl (letter-size proportions)
- Forms: max-w-2xl
- Dashboard: max-w-7xl

### D. Component Library

**Core Components:**
- **Forms**: Clean input fields with subtle borders, focus states with primary color ring
- **Buttons**: Solid primary buttons for actions, ghost buttons for secondary actions
- **Cards**: Elevated surfaces (shadow-sm) for invoice previews and sections
- **Tables**: Striped rows for line items, sticky headers for long invoices
- **Inputs**: Consistent height (h-10), rounded corners (rounded-md), clear labels above fields

**Invoice-Specific:**
- **Document Preview**: A4/Letter aspect ratio card with subtle shadow
- **Line Items Table**: Clean grid with alternating row colors
- **Summary Section**: Right-aligned totals with bold final amount
- **Header Section**: Company info + invoice metadata in clean two-column layout

### E. Icons

**Library**: Heroicons (outline for UI, solid for filled states)
- Use sparingly: document icons, action buttons, status indicators
- Size: w-5 h-5 for inline icons, w-6 h-6 for standalone

### F. Interactions

**Minimal Animations:**
- Button hover: subtle scale (hover:scale-[1.02]) or brightness
- Focus states: ring-2 ring-primary/50 for accessibility
- Transitions: transition-colors duration-200 for state changes
- No decorative animations - keep it professional

## Application Structure

**Layout Pattern:**
- Clean header with app name + primary action
- Main content area with generous whitespace
- Simple sidebar/tabs for navigation (if needed)
- Responsive: stack vertically on mobile

**Invoice Document Design:**
- Professional header with company details
- Clear invoice number and date
- Client information block
- Clean line items table with descriptions, quantities, rates
- Right-aligned subtotal, tax, and total sections
- Payment terms and notes at bottom
- White background for print compatibility

## Key Principles

1. **Clarity First**: Every element serves a purpose, no decorative clutter
2. **Print-Ready**: Invoice designs work perfectly on paper/PDF
3. **Data Hierarchy**: Amounts and totals are visually prominent
4. **Professional Aesthetic**: Trustworthy, business-appropriate styling
5. **Efficiency**: Quick data entry, clear validation, fast generation

This foundation provides a clean, professional base for building custom invoice functionality.