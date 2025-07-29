# Multiplication Tables Application

## Overview

This is a full-stack web application that displays multiplication tables from 1 to 50. The application features an interactive grid layout where users can select any table and view multiplication results from 1 to 10. Built with a modern tech stack including React, Express, TypeScript, and PostgreSQL with a focus on clean UI design using shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM with PostgreSQL dialect
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Session Management**: PostgreSQL-based sessions using connect-pg-simple
- **Development**: Hot module replacement with Vite middleware integration

### Data Storage
- **Primary Database**: PostgreSQL (configured for Neon Database)
- **ORM**: Drizzle ORM for type-safe database operations
- **Schema Management**: Drizzle Kit for migrations and schema management
- **Fallback Storage**: In-memory storage implementation for development

## Key Components

### Database Schema
- **Users Table**: Basic user management with id, username, and password fields
- **Schema Location**: `shared/schema.ts` for shared type definitions
- **Validation**: Zod schemas for runtime type validation

### Frontend Components
- **Home Page**: Main multiplication table interface with interactive grid
- **UI Components**: Comprehensive shadcn/ui component library including:
  - Form controls (Input, Button, Select, etc.)
  - Layout components (Card, Dialog, Sheet, etc.)
  - Navigation components (Breadcrumb, Navigation Menu, etc.)
  - Data display components (Table, Progress, Chart, etc.)

### Backend Services
- **Storage Interface**: Abstracted storage layer supporting multiple implementations
- **Route Registration**: Centralized route management in `server/routes.ts`
- **Development Server**: Vite integration for hot reloading in development

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express routes handle API requests
3. **Database Operations**: Drizzle ORM manages database interactions
4. **Response Handling**: Type-safe responses with proper error handling
5. **State Management**: Client-side caching and synchronization via React Query

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for Neon
- **drizzle-orm**: Type-safe SQL query builder and ORM
- **@tanstack/react-query**: Server state management for React
- **wouter**: Lightweight React router

### UI Dependencies
- **@radix-ui/***: Primitive UI components for accessibility
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Type-safe CSS class variants

### Development Dependencies
- **vite**: Build tool and development server
- **typescript**: Type checking and compilation
- **esbuild**: Fast JavaScript bundler for production

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds React application to `dist/public`
2. **Backend Build**: ESBuild bundles server code to `dist/index.js`
3. **Static Assets**: Frontend assets served from `dist/public`

### Environment Configuration
- **Database**: Requires `DATABASE_URL` environment variable
- **Development**: Uses Vite dev server with Express middleware
- **Production**: Serves static files through Express

### Development Workflow
- **Dev Command**: `npm run dev` starts development server with hot reloading
- **Build Command**: `npm run build` creates production bundles
- **Database Migrations**: `npm run db:push` applies schema changes

### Deployment Considerations
- Application designed for serverless deployment (Replit-optimized)
- Database migrations handled through Drizzle Kit
- Environment-specific configuration through environment variables
- Static asset serving optimized for production