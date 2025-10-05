# Resistance Intelligence Assessment Platform

## Overview

This is a corporate performance assessment platform designed to help organizations identify resistance patterns that hold back performance. The application provides various assessment categories (individual performance, career growth, team communication, management, and leadership) with psychological evaluation tools. Users can take assessments, receive results with archetype analysis, and access detailed reports through an authenticated dashboard.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript using Vite as the build tool
- **Routing**: Wouter for client-side routing with conditional rendering based on authentication status
- **UI Library**: Shadcn/ui components built on Radix UI primitives with Tailwind CSS styling
- **State Management**: TanStack Query for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Session Management**: Express sessions with PostgreSQL storage using connect-pg-simple
- **API Design**: RESTful endpoints with proper error handling and request logging middleware
- **Database ORM**: Drizzle ORM for type-safe database operations

### Authentication System
- **Provider**: Replit OpenID Connect (OIDC) integration
- **Strategy**: Passport.js with custom OIDC strategy
- **Session Storage**: PostgreSQL-backed sessions with configurable TTL
- **Security**: HTTP-only cookies with secure flags for production environments

### Database Design
- **Primary Database**: PostgreSQL with Neon serverless connection pooling
- **Schema Management**: Drizzle Kit for migrations and schema synchronization
- **Key Tables**: 
  - Users (mandatory for Replit Auth)
  - Sessions (mandatory for session storage)
  - Assessment Responses (stores user assessment data with JSONB responses)
  - Corporate Profiles (intake forms for organizational context)
  - Resistance Map Tables:
    - Teams (organizational teams with level tags)
    - Memberships (user-team associations)
    - Archetypes (8 core resistance patterns: SA, VDI, DCA, CH, ED, PCC, RAS, ODA)
    - Assessment Templates (versioned assessment configurations)
    - Assessment Items (questions with context tags and scoring metadata)
    - Assessment Attempts (individual assessment sessions)
    - Archetype Scores (normalized 0-100 scores with band classifications)
    - Derived Metrics (overall resistance, balancing index, situational modes)

### Assessment Engine
- **Scoring Algorithm**: Custom scoring engine that calculates archetype dominance and resistance levels
- **Data Structure**: Questions and archetypes defined in structured TypeScript configurations
- **Results Processing**: Client-side calculation with server-side persistence
- **Archetype System**: Multi-dimensional personality assessment with configurable question mappings

### Build and Deployment
- **Development**: Vite dev server with HMR and Express backend in watch mode
- **Production Build**: Client assets built to dist/public, server bundled with esbuild
- **Path Resolution**: Custom alias configuration for organized imports (@/, @shared/, @assets/)

## External Dependencies

### Core Infrastructure
- **Database**: Neon PostgreSQL serverless with connection pooling
- **Authentication**: Replit OIDC provider for user authentication
- **Session Storage**: PostgreSQL-backed session management

### Development Tools
- **Replit Integration**: Cartographer plugin for development environment integration
- **Error Handling**: Runtime error modal overlay for development debugging
- **Font Loading**: Google Fonts integration (Inter, Architects Daughter, DM Sans, Fira Code, Geist Mono)

### UI and Styling
- **Component Library**: Radix UI primitives for accessible component foundations
- **Styling**: Tailwind CSS with custom design tokens and CSS variables
- **Icons**: Lucide React for consistent iconography
- **Form Validation**: Zod schema validation with React Hook Form resolvers

### Data Management
- **HTTP Client**: Native fetch API with custom request wrapper
- **Caching**: TanStack Query for intelligent data fetching and caching
- **Serialization**: Native JSON with type-safe parsing through Zod schemas
## Recent Changes

### Resistance Map Feature (October 3, 2025)
- **Data Architecture Redesign**: Switched from dedicated resistance map tables to using **existing assessment result data**
  - Uses existing paid assessment result tables: `leadership_assessment_results`, `middle_management_assessment_results`, `team_communication_assessment_results`, `career_growth_assessment_results`, `sales_assessment_results`, `individual_assessment_results`
  - Extracts archetype scores from JSONB `archetype_scores` column containing `archetypeId` and `percentageScore`
  - **Paid-only filtering**: Only displays paid assessments (tier='paid'), excludes all free assessments
  - Latest-per-person aggregation logic prevents power user bias
- **Backend API**: Resistance map data aggregation using existing tables
  - GET /api/resistance-map/archetypes?context={category} - Retrieve category-specific archetypes with abbreviations
  - GET /api/resistance-map/organizations/:orgId - Organization-wide resistance map with mean/P90 aggregates
  - GET /api/resistance-map/teams/:teamId - Team resistance map (placeholder for future team filtering)
  - Backend queries appropriate result table based on assessment context (leadership, middle_management, etc.)
  - Aggregates archetype scores by matching archetypeId to archetype.code
- **Frontend Visualizations**: Multi-mode resistance pattern display at /resistance-map
  - **Radar Chart**: Shows team/org mean and P90 percentile values with archetype abbreviations (SA, VDI, CH, etc.)
  - **Resistance Heatmap Grid**: Color-coded heat grid showing all 8 category-specific archetypes with resistance bands
    - Green (0-34%): Low resistance, healthy adaptive patterns
    - Yellow (35-54%): Moderate resistance, protective behaviors
    - Red (55-100%): High resistance, restrictive patterns
  - **Archetype Cards**: List view with abbreviation + full name, color-coded by resistance band
  - **Filters**: Assessment type selector (6 paid categories), time window (latest/30d/quarter/all_time), organization selector
  - **Band Legend**: Explains three resistance levels with interpretation guidance
- **Navigation**: Admin-only access via dashboard dropdown menu → "Resistance Map"
- **Canonical Archetype System** (server/archetype-config.ts):
  - 48 unique archetypes across 6 categories (8 per category)
  - Leadership: SA, ED, VDI, CH, DCA, PCC, RAS, ODA
  - Middle Management: MM, BM, FF, OD, CA, CS, DM, RBO
  - Team Communication: WH, GC, DOM, PM, FRAG, COC, DIST, OA
  - Career Growth: IC, RS, RA, RL, PP, OQ, SR, CZ
  - Sales: OP, CC, RP, DG, PD, PA, RF, SIR
  - Individual: PA, HOG, AV, CE, ID, RSI, OC, CZI
- **Future Enhancements**: Documentation explains difference between current implementation and future "protective vs restrictive" mode analysis
  - Current: Basic resistance band heatmap using existing archetype scores
  - Future: Would require context tags on assessment items, context-weighted scores, and situational mode calculations
- **Documentation**: RESISTANCE_MAP_DOCUMENTATION.md provides complete archetype taxonomy, API reference, current capabilities, and planned enhancements
