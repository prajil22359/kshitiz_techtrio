# All Product God: Procurement Platform Master PRD
**Version:** 1.0 (Final Draft)
**Purpose:** North Star document for development teams outlining the aesthetics, technology stack, and core workflows for the All Product God B2B Procurement Platform.

---

## 1. Product Overview & Vision
This is a premium, client-facing gateway and operational backend that digitizes a managed procurement service. It is **NOT** a self-serve SaaS product. It is the digital operating layer that powers the All Product God service.



**The Aesthetic (Reference: sap.framer.website)**
The UI must feel like a "Modern SaaS" product—credible, calm, branded, and polished.
- **Vibe:** Sleek, minimalist, high-trust. High use of white space and "bento-box" structural layouts.
- **Colors:** High contrast. Pure white/off-white backgrounds, deep charcoal (`#1A1A1A`) text, and a vibrant accent color (e.g., Lime Green `#B0FF4D` or Electric Blue) used strictly for primary CTAs to drive action.
- **Styling:** Soft multi-layered ambient shadows, heavy border-radii (`24px-32px` on cards), and pill-shaped interactive elements.
- **Motion:** Framer Motion for subtle, premium micro-interactions (e.g., cards lifting gently on hover, smooth accordion expansions). No aggressive animations.

## 2. Technology Stack
- **Framework:** Next.js (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + custom aesthetic overrides
- **UI Components:** shadcn/ui (heavily modified to fit the rounded, premium aesthetic)
- **Icons:** lucide-react
- **Motion:** Framer Motion
- **Backend (Phase 2):** Supabase (PostgreSQL, Auth, Edge Functions)
- **Integrations:** OpenAI/Gemini (Assistant), Shiprocket (Logistics), WhatsApp Business API (Notifications).

---

## 3. Core User Journeys & Workflows

### A. The Client (User) Flow
The client experience focuses on minimizing effort and maximizing visibility.

1. **Submission (The AI Concierge):** 
   - A conversational UI where the client types a raw request (e.g., "I need a 20-seat cafe setup in Mumbai").
   - The AI parses this and generates a *Main Structured List of Items Needed* (Item, Quantity, Category).
2. **The Verification Check:** 
   - Before any vendors are contacted, this structured list is sent back to the client to confirm accuracy.
3. **The Presentation & Approval:**
   - Once the Admin processes the RFQs (see Admin flow), the client receives a curated presentation.
   - For each item, they are presented with curated options (e.g., Basic, Intermediate, Premium) selected by the admin, rather than raw vendor data.
4. **Tracking (Shiprocket):**
   - A polished timeline view (Ordered → Dispatched → In Transit → Delivered).

**Client UI & Layout Structure:**
- **Navigation:** Slim sidebar (Dashboard, My Requests, Orders, Payments, Settings) with a clean topbar (Notifications, Profile).
- **Dashboard Home:** Primary "Start New Requirement" action card at top. Below, a grid of active requests grouped by status (Planning, Scoping, In Transit).
- **Request Detail Page:** Large summary card at the top → Polished Progress Timeline → Vendor Quotes Comparison Card → Status & Communication area.

### B. The Vendor Flow
The Vendor portal acts as a rigid funnel to ensure quality control before trading begins.

1. **The Gatekeeper Onboarding:**
   - Vendors sign up but are immediately locked in a "Pending Approval" state.
   - They must complete a multi-step wizard: *Company Info → GST/Docs → Serviceable Locations → Product Categories*.
   - Admins must manually approve them before they unlock the RFQ inbox.
2. **Catalog Management (Excel Sync):**
   - A dedicated UI for bulk-uploading their product catalog and base prices via CSV/Excel.
   - All catalog updates require an Admin approval check (showing a yellow "Pending" badge) to prevent unauthorized price hikes.
3. **The RFQ Inbox:**
   - A clean list of incoming requests. Vendors click a request to submit their quoted price, ETA, and specific terms in a structured form.
4. **Order Tracking:**
   - A view of "Awarded" contracts where they must update fulfillment status and upload dispatch documents.

**Vendor UI & Layout Structure:**
- **Navigation:** Action-oriented sidebar (Dashboard, New RFQs, My Quotations, Active Orders, Catalog).
- **Dashboard Home:** Heavy focus on pending actions. Metric cards for "New RFQs" and "Pending Quotes", followed by an urgent actions list.
- **RFQ Detail Page:** Split view. Left side shows client's needed items, attachments, and notes. Right side contains the "Submit Quote" form (Price, Delivery timeline, Terms).

### C. The Admin Flow (The Control Room)
The Admin portal is optimizing for speed, vendor comparison, and margin control. 

1. **Intake & Dispatch:**
   - Admin reviews the Client's confirmed structured list.
   - Using a row-based UI, they click a **"Send for Quotation"** dropdown next to an item, select eligible vendors, and blast the RFQ out.
2. **The Triage & Tiering System (Crucial Feature):**
   - **Accordion UI:** The comparison screen uses expanding rows. The Admin clicks "Item 1" to expand it.
   - **Review Bids:** Inside, they see all vendor quotations received for that item.
   - **The "Packaging" Step:** The Admin evaluates a bid and assigns it to a presentation tier: **Basic**, **Intermediate**, or **Premium**.
   - **Lock & Collapse:** Once assigned, that winning quote locks to the top of the item's row. The Admin collapses the accordion and moves downwards to Item 2 to repeat the process.
3. **Margin & Finalize:**
   - The Admin adds the All Product God service margin to these curated packages and pushes the final, pristine proposal to the Client.
4. **Global Oversight:**
   - Master tables for pending Vendor approvals, outstanding invoices, and delayed Shiprocket tracking statuses.

**Admin UI & Layout Structure:**
- **Navigation:** Comprehensive "Control Room" sidebar (Dashboard, Requests, Quotations, Orders, Shipments, Vendor Approvals, Blog CMS).
- **Dashboard Home:** Global operational metrics (Active requests, Overdue items, Exceptions/Alerts).
- **Triage Screen (Intake):** Wide view. Left pane shows the structured client request. Right pane features a searchable, multi-select vendor database to instantly dispatch RFQs.
- **Quotation Comparison (Accordion):** Stacked accordion rows for each item. Expanding a row reveals incoming vendor bids. Includes "Basic/Intermediate/Premium" selector buttons to categorize and package the final proposal.

---

## 4. Information Architecture (Routes)

**Public (Marketing & Entry):**
- `/` (Hero, Services, Vibe)
- `/how-it-works`
- `/blog`
- `/login` (Directs to role-specific dashboard based on auth claims)
- `/register` (Role Selection: Client vs. Vendor)

**Client Portal:**
- `/client/dashboard` (At a glance: Active Requests, Transit alerts)
- `/client/requests/new` (AI Chat / Form)
- `/client/requests/[id]` (The Curated Proposal view / Tracking)

**Vendor Portal:**
- `/vendor/onboarding` (Wizard for unapproved users)
- `/vendor/dashboard` (Inbox, Pending Quotes, Active Orders)
- `/vendor/catalog` (Excel upload & manual edits)

**Admin Portal:**
- `/admin/dashboard` (Global operational metrics)
- `/admin/requests/triage` (The AI list review -> RFQ dispatch screen)
- `/admin/quotations/compare` (The Accordion Tiering UI)
- `/admin/vendors/approvals` (Gatekeeper queue)

---

## 5. Development Phasing

### Phase 1: Frontend & Design System (Month 1)
**Goal:** Deliver a high-fidelity, interactive prototype without a database.
- **Step 1:** Next.js scaffolding, Tailwind setup, and establishing the "sap.framer" design system (colors, typography, global rounded standard).
- **Step 2:** Building core reusable components (Floating Navbar, Accordions, Status Badges, Premium Form Inputs).
- **Step 3:** Developing the static Public Pages.
- **Step 4:** Building out the interactive Client, Vendor, and Admin Portal UIs using mocked JSON data. *Focus heavily on the complex Admin Accordion UI and Client AI Chat UI.*

### Phase 2: Backend & Integrations (Month 2)
**Goal:** Hook the UI into live data pipelines.
- **Step 1:** Supabase schema creation (Profiles, Requests, Quotes, Orders).
- **Step 2:** Next.js Auth implementation (Role-based flow blocking).
- **Step 3:** AI Integration (Streaming the chat response into the structured list).
- **Step 4:** WhatsApp API (Triggering notifications on status changes).
- **Step 5:** Shiprocket API (Webhook receivers for live tracking).
