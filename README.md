# Unfiltered OS (MVP)

Unfiltered OS is a business operating system for creative entrepreneurs to manage pricing, bookings, client flow, and income in one clean workspace.

**Tagline:** _Run your business. Not just your talent._

## Tech Stack
- React (Vite)
- Tailwind CSS
- Firebase Authentication
- Firestore

## Quick Implementation Plan
1. Scaffold a simple React + Tailwind app shell with responsive navigation.
2. Add Firebase Auth scaffolding (sign up, login, logout) and protected routes.
3. Implement Firestore data services for users, bookings, and clients.
4. Build MVP pages: Dashboard, Pricing Calculator, Bookings, Clients, Client Detail, Income, Tasks.
4. Build MVP pages: Dashboard, Pricing Calculator, Bookings, Clients, Client Detail, Income.
5. Apply polished, minimal UI styles and add clear empty states.

## Folder Structure

```bash
.
├── src
│   ├── components
│   │   ├── BookingForm.jsx
│   │   ├── Layout.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   └── TopNav.jsx
│   ├── context
│   │   └── AuthContext.jsx
│   ├── lib
│   │   ├── firebase.js
│   │   └── firestoreService.js
│   ├── pages
│   │   ├── AuthPage.jsx
│   │   ├── BookingsPage.jsx
│   │   ├── ClientDetailPage.jsx
│   │   ├── ClientsPage.jsx
│   │   ├── DashboardPage.jsx
│   │   ├── IncomePage.jsx
│   │   └── PricingPage.jsx
│   ├── styles
│   │   └── index.css
│   ├── utils
│   │   └── pricing.js
│   ├── App.jsx
│   └── main.jsx
├── index.html
└── ...
```

## Firestore Data Structure (MVP)

```text
users (collection)
  └── {uid} (document)
      ├── email
      ├── createdAt
      ├── appName
      ├── clients (subcollection)
      │   └── {clientId}
      │       ├── name
      │       ├── contact
      │       ├── notes
      │       ├── serviceBooked
      │       ├── bookingDate
      │       ├── depositPaid (boolean)
      │       ├── fullPaymentPaid (boolean)
      │       ├── amountDue (number)
      │       ├── statusHistory (array)
      │       └── updatedAt
      ├── bookings (subcollection)
      └── bookings (subcollection)
          └── {bookingId}
              ├── clientName
              ├── service
              ├── date
              ├── status
              ├── paymentStatus
              └── amountDue

      └── tasks (subcollection)
          └── {taskId}
              ├── title
              ├── description
              ├── dueDate
              ├── priority (low|medium|high)
              ├── completed (boolean)
              └── createdAt
```

> Optional future extension: add `pricingEntries` subcollection for saved quote templates.

## Component Approach
- **Layout-first architecture:** shared shell (`Sidebar + TopNav + content`) for consistency.
- **Feature pages:** each core business function has a focused page component.
- **Reusable UI units:** `StatCard`, `BookingForm` keep repetitive UI simple.
- **Light service layer:** Firestore logic in `src/lib/firestoreService.js` to keep page components readable.

## Setup Instructions

### 1) Install dependencies
```bash
npm install
```

### 2) Add environment variables
Create a `.env` file in project root:

```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

If these are missing, the app uses placeholder values in `src/lib/firebase.js` so the integration points remain visible.

### 3) Run locally
```bash
npm run dev
```

### 4) Build for production
```bash
npm run build
```

## Core MVP Features Included
- Firebase Authentication: sign up, login, logout
- Dashboard cards + quick actions
- Pricing calculator with editable formula and package tiers (Basic/Standard/Premium)
- Bookings CRUD + status filter
- Client list + searchable records + client detail editing
- Income tracking summary + payment statuses
- Task manager (add/edit/delete/toggle complete/incomplete)
- Responsive, polished UI and empty states

## Notes for Future Enhancements
- Add chart widgets on dashboard/income views
- Save pricing calculations into Firestore
- Add reminders and automated follow-up workflows
- Add stronger validation and role-based permissions
