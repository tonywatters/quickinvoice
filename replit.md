# Invoice Generator

## Overview

This is a React-based invoice generator application built with a modern tech stack. The application allows users to create, manage, and preview professional invoices. It uses a full-stack architecture with React on the frontend, Express on the backend, and is configured to use PostgreSQL with Drizzle ORM for data persistence.

The application follows Material Design principles with a focus on clarity, professionalism, and usability. It leverages shadcn/ui components built on Radix UI primitives for a consistent and accessible user interface.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build System:**
- React 18 with TypeScript for type safety
- Vite as the build tool and development server
- Client-side routing (structure indicates future router implementation)
- Hot module replacement (HMR) enabled in development

**UI Component System:**
- shadcn/ui component library (New York style variant) built on Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- Component aliases configured for clean imports (`@/components`, `@/lib`, etc.)
- Comprehensive set of pre-built components (buttons, forms, dialogs, tables, etc.)

**Design System:**
- Material Design approach optimized for productivity tools
- Custom color palette with full light/dark mode support
- Typography using Inter (UI/data) and JetBrains Mono (numbers/IDs) fonts
- Consistent spacing using Tailwind units (4, 6, 8, 12, 16)
- Professional color scheme with blue primary, neutral grays, and semantic colors for status

**State Management:**
- React hooks for local component state
- TanStack React Query v5 for server state management and data fetching
- Custom query client with configured defaults (no refetch on window focus, infinite stale time)

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- ESM module system
- Custom middleware for request logging and error handling
- JSON body parsing and URL-encoded form support

**Development Workflow:**
- Separate dev and production builds
- tsx for development with hot reload
- esbuild for production bundling
- Vite middleware integration in development mode

**API Design:**
- RESTful API architecture (routes prefixed with `/api`)
- Centralized route registration system
- Error handling middleware with proper status codes
- Request/response logging with JSON payload capture

### Data Storage

**ORM & Database:**
- Drizzle ORM v0.39+ for type-safe database operations
- PostgreSQL as the primary database (via Neon serverless driver)
- Schema-first design with Drizzle Kit for migrations
- Zod integration for runtime validation via drizzle-zod

**Storage Abstraction:**
- Interface-based storage pattern (IStorage)
- Initial in-memory implementation (MemStorage) for development
- Designed for easy migration to PostgreSQL implementation
- CRUD operations for user management (baseline schema includes users table)

**Session Management:**
- Session storage configured with connect-pg-simple
- PostgreSQL-backed sessions for production scalability

### External Dependencies

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled components (dialogs, dropdowns, tooltips, etc.)
- Lucide React for consistent iconography
- embla-carousel-react for carousel functionality
- cmdk for command palette/search interface
- react-day-picker for date selection
- vaul for drawer components

**Form Handling:**
- React Hook Form for form state management
- @hookform/resolvers for validation integration
- Zod schemas for validation rules

**Utility Libraries:**
- date-fns v3.6+ for date manipulation
- class-variance-authority (CVA) for component variant management
- clsx + tailwind-merge for conditional styling
- nanoid for unique ID generation

**Development Tools:**
- Replit-specific plugins for development (cartographer, dev banner, error overlay)
- TypeScript for static type checking
- PostCSS with Tailwind CSS and Autoprefixer

**Database & Backend:**
- @neondatabase/serverless for PostgreSQL connectivity
- Drizzle ORM with PostgreSQL dialect
- connect-pg-simple for session management

**Build & Deployment:**
- Vite for frontend bundling
- esbuild for backend bundling
- Environment variable configuration via drizzle.config.ts