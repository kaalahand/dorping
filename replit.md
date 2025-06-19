# Dorp AI - AI Prompt Engineering Platform

## Overview

Dorp AI is a full-stack web application that provides AI-powered prompt engineering services. The platform allows users to create structured prompts (called "Dorps") for content generation, with features like user authentication, subscription management, and a comprehensive dashboard interface.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized production builds
- **UI Framework**: Tailwind CSS with shadcn/ui components for consistent design
- **State Management**: React hooks and local state (ready for React Query integration)
- **Routing**: Single-page application with conditional rendering for different views

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Development**: tsx for TypeScript execution in development
- **Production Build**: esbuild for fast bundling

### Database Architecture
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Schema**: Shared schema definitions between client and server
- **Migrations**: Drizzle Kit for database schema management
- **Development Storage**: In-memory storage implementation for rapid prototyping
- **Production Ready**: Configured for NeonDB serverless PostgreSQL

## Key Components

### Authentication System
- User registration and login functionality
- Shared schema for user data validation using Zod
- Session management ready (connect-pg-simple configured)
- In-memory storage implementation for development

### Content Management
- Multi-step content generation workflow
- Template-based prompt engineering
- Export functionality (PDF, Google Docs, Gmail integration)
- Real-time content preview and editing

### User Interface
- Responsive design with mobile-first approach
- Modal-based authentication flows
- Dashboard with sidebar navigation
- Blog system with SEO optimization
- Legal pages (Terms, Privacy Policy)

### SEO and Marketing
- Comprehensive SEO head component
- Structured data markup
- Sitemap and robots.txt configuration
- Web manifest for PWA capabilities

## Data Flow

1. **User Authentication**: Users sign up/in through modals → Server validates → Session created
2. **Content Creation**: User selects template → AI generates questions → User provides answers → Final content generated
3. **Content Export**: Generated content → Format selection → Export to chosen platform
4. **Subscription Management**: Plan selection → Payment processing → Feature access control

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL client
- **drizzle-orm**: Type-safe ORM with PostgreSQL support
- **@tanstack/react-query**: Data fetching and caching (installed but not yet implemented)
- **@radix-ui**: Headless UI components for accessibility

### Development Tools
- **Vite**: Build tool with React plugin
- **Tailwind CSS**: Utility-first CSS framework
- **PostCSS**: CSS processing
- **TypeScript**: Type safety and development experience

### Replit Integrations
- **@replit/vite-plugin-runtime-error-modal**: Development error handling
- **@replit/vite-plugin-cartographer**: Development tooling

## Deployment Strategy

### Development Environment
- Replit-hosted with hot module replacement
- PostgreSQL 16 module enabled
- Development server on port 5000
- Vite middleware for client-side development

### Production Deployment
- Autoscale deployment target
- Build process: Vite for client, esbuild for server
- Static file serving from dist/public
- Environment variable configuration for database

### Build Process
1. Client build: `vite build` → dist/public
2. Server build: `esbuild` → dist/index.js
3. Production start: `node dist/index.js`

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

✓ Successfully migrated from Bolt to Replit environment (June 18, 2025)
✓ All dependencies verified and working
✓ Frontend React application with comprehensive UI components
✓ Backend Express server with proper routing structure
✓ Authentication system with modals and user management
✓ Dashboard with 8 content creation categories matching business requirements
✓ Subscription tiers implemented (Free, Starter, Pro, Unlimited)
✓ SEO optimization with dynamic meta tags and structured data
✓ Profile dropdown with Profile, Subscription, and Sign Out options (June 18, 2025)
✓ Dynamic user data integration showing real database information
✓ Demo user account created: jondoe@test.com / demo123
✓ New users see personalized dashboard with correct prompt limits
✓ Google OAuth integration completed with proper HTTPS and session handling (June 18, 2025)
✓ Fixed Google authentication iframe issues and redirect URI configuration

## Changelog

```
Changelog:
- June 18, 2025. Migrated from Bolt to Replit, verified all functionality
- June 16, 2025. Initial setup
```