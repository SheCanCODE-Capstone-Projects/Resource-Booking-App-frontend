
# SpaceSync - Concurrent Study Room & Resource Booking UI

**SpaceSync** is a responsive React web application that enables users to discover, reserve, and manage shared spaces and equipment while preventing double bookings and automatically handling waiting lists.

Designed for multi-industry versatility from campuses and libraries to restaurants, corporate offices, coworking spaces, and outdoor event gardens. the frontend provides real-time availability intervals, clear HTTP 409 Conflict handling for simultaneous booking attempts, one-click waitlist enrollment, and instant in-app promotion notifications.

This repository contains the client-side user interface and connects to the **SpaceSync Spring Boot REST API**.

---

## Table of Contents

- [Use Cases Supported by the UI](#use-cases-supported-by-the-ui)
- [Frontend Core Functionalities](#frontend-core-functionalities)
  - [Resource Discovery & Admin Management](#1-resource-discovery--admin-management)
  - [Booking & Reservation Management](#2-booking--reservation-management)
  - [Automatic Waitlist & In-App Notifications](#3-automatic-waitlist--in-app-notifications)
- [Frontend Project Structure](#frontend-project-structure)
- [Tech Stack](#tech-stack)
- [Expected Backend API Contract](#expected-backend-api-contract)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Available Scripts](#available-scripts)
- [Contributing (Fork & Pull Request)](#contributing-fork--pull-request)

---

## Use Cases Supported by the UI

The interface adapts dynamically to whatever resource categories administrators configure.

### 1. Campuses & Libraries

- Study rooms
- Computer labs
- Projectors
- Shared laboratory equipment

### 2. Offices & Coworking Spaces

- Meeting rooms
- Conference halls
- Hot desks
- Audio-visual equipment

### 3. Restaurants

- Private dining rooms
- Banquet halls
- Reservable VIP tables

### 4. Gardens & Events

- Outdoor event venues
- Celebration spaces
- Photography studios

---

## Core Functionalities

### 1. Resource Discovery & Admin Management

- **Resource Listing & Search:** Browse available spaces and equipment with real-time filters for category, location, capacity, and basic amenities.

- **Resource Detail Page:** Displays high-resolution image previews (via image URLs), descriptions, capacity limits, amenities, operating hours, and live availability for any selected date.

- **Admin Dashboard:** Role-protected management interface with forms to create, edit, configure operating hours, and remove resources.

### 2. Booking & Reservation Management

- **Date & Time Interval Picker:** Displays available versus already-booked time slots so users can make reservations without overlapping existing bookings.

- **Back-to-Back Reservations:** Supports consecutive bookings such as 10:00 AM–12:00 PM followed by 12:00 PM–2:00 PM, while blocking overlapping selections.

- **Conflict & Race-Condition Feedback:** Displays clear, user-friendly alerts when another user books the same slot simultaneously (HTTP `409 Conflict`).

- **My Reservations Page:** Allows users to view personal bookings grouped by status:
  - Confirmed
  - Canceled
  - Waitlisted

- **Reservation Cancellation:** Users can cancel their bookings directly from the application.

### 3. Automatic Waitlist & In-App Notifications

- **Join or Leave Waitlist:** Automatically displays a "Join Waitlist" option whenever a requested time slot is already occupied.

- **Waitlist Status Tracking:** Displays active waiting list entries directly inside the My Reservations page.

- **Automatic Waitlist Promotion:** When a confirmed booking is canceled, the backend automatically evaluates eligible waiting list entries for promotion.

- **In-App Notification Center:** Alerts users when a reservation status changes, including automatic confirmation after waitlist promotion.

---

## Frontend Project Structure

The project follows a modular React architecture, separating API communication, reusable components, application pages, authentication, and utility functions.

```text
spacesync-frontend/
├── public/
│   ├── index.html                  # Main HTML template for the React application
│   └── favicon.ico                 # Application favicon
│
├── src/
│   ├── api/                        # Axios/Fetch client and API service modules
│   │   ├── client.js               # Configured HTTP client with auth headers and 409 Conflict interceptors
│   │   ├── resourceApi.js          # /api/resources endpoints and availability requests
│   │   ├── reservationApi.js       # /api/reservations endpoints for booking and cancellation
│   │   ├── waitlistApi.js          # /api/waitlist endpoints for joining and leaving queues
│   │   └── notificationApi.js      # /api/notifications endpoints for booking status alerts
│   │
│   ├── components/                 # Reusable React UI building blocks
│   │   ├── Navbar.jsx              # Navigation bar with links and notification badge
│   │   ├── NotificationBell.jsx    # Dropdown/drawer for waitlist and booking status alerts
│   │   ├── ResourceCard.jsx        # Summary card displaying resource details in the catalog
│   │   ├── FilterBar.jsx           # Filters for resource category, location, and capacity
│   │   ├── TimeSlotPicker.jsx      # Displays available/booked intervals and supports back-to-back slots
│   │   ├── BookingForm.jsx         # Reservation form with booking and Join Waitlist actions
│   │   ├── StatusBadge.jsx         # Visual status labels: Confirmed, Canceled, and Waitlisted
│   │   └── ProtectedRoute.jsx      # Authentication and Admin role-based route protection
│   │
│   ├── context/                    # React Context providers for global application state
│   │   └── AuthContext.jsx         # Manages user session, JWT token, and roles (User/Admin)
│   │
│   ├── pages/                      # Main application pages connected to React Router
│   │   ├── ResourceListPage.jsx    # Resource discovery page with search and filtering
│   │   ├── ResourceDetailPage.jsx  # Resource information, operating hours, availability, and booking
│   │   ├── MyReservationsPage.jsx  # User reservations grouped by Confirmed, Canceled, and Waitlisted
│   │   ├── AdminDashboardPage.jsx  # Admin CRUD interface for resources and operating hours
│   │   └── LoginPage.jsx           # User authentication and login interface
│   │
│   ├── utils/                      # Shared utility functions and helpers
│   │   └── timeUtils.js            # Date/time formatting and reservation interval overlap helpers
│   │
│   ├── App.jsx                     # Root component containing routes and application layout
│   └── index.js                    # React DOM entry point that renders the application
│
├── .env.example                    # Environment variable template for backend API configuration
├── package.json                    # Project dependencies, metadata, and npm scripts
└── README.md                       # Project setup instructions and documentation
```

### Project Organization Guidelines

- **api/** — All backend communication should be handled through API service files rather than making HTTP requests directly in UI components.
- **components/** — Create reusable components that can be shared across multiple pages.
- **context/** — Manage authentication and application-wide state using React Context API.
- **pages/** — Each page should represent a main application route and use reusable components.
- **utils/** — Store shared helper functions for date formatting, time validation, and interval calculations.
- **App.jsx** — Define application routes, protected routes, and the main layout.
- **index.js** — Initialize React and render the root application component.
---

## Tech Stack

| Layer | Technology |
|-------|------------|
| Core Library | React 18+ |
| Build Tool | Create React App |
| Routing | React Router v6 |
| HTTP Client | Axios / Fetch API |
| Styling | CSS3 / Tailwind CSS |
| State Management | React Context API & Hooks |
| Backend Integration | Spring Boot REST API |
| Database (Backend) | PostgreSQL |

---

## Expected Backend API Contract

The frontend connects to the **SpaceSync Spring Boot + PostgreSQL REST API**.

The following endpoints describe the expected API contract. Actual endpoint availability depends on the backend implementation.

### 1. Resources & Availability

| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| GET | `/api/resources` | Public / Auth | List and filter resources by category, location, and capacity |
| GET | `/api/resources/:id` | Public / Auth | Retrieve resource details, amenities, and image URL |
| GET | `/api/resources/:id/availability` | Public / Auth | Retrieve operating hours and booked/available intervals |
| POST | `/api/resources` | Admin | Create a new resource |
| PUT | `/api/resources/:id` | Admin | Update resource details or operating hours |
| DELETE | `/api/resources/:id` | Admin | Delete a resource |

### 2. Reservations

| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| POST | `/api/reservations` | Auth | Submit a booking and handle HTTP 409 Conflict |
| GET | `/api/reservations/my` | Auth | Load the current user's reservations |
| GET | `/api/reservations/:id` | Auth | Load details for a single reservation |
| PATCH | `/api/reservations/:id/cancel` | Owner / Admin | Cancel a booking and trigger backend waitlist promotion |

### 3. Waitlist & Notifications

| Method | Endpoint | Access | Purpose |
|--------|----------|--------|---------|
| POST | `/api/waitlist` | Auth | Join the waiting list when an interval is occupied |
| GET | `/api/waitlist/my` | Auth | Load the current user's active waiting list entries |
| DELETE | `/api/waitlist/:id` | Owner | Leave a waiting list |
| GET | `/api/notifications` | Auth | Fetch in-app notifications for booking status changes |

### HTTP 409 Conflict Handling

When two users attempt to reserve the same resource at overlapping times, the backend must prevent both reservations from being confirmed.

The frontend is responsible for:

1. Sending the requested reservation to the backend.
2. Handling an HTTP `409 Conflict` response.
3. Displaying a clear message explaining that the selected slot is unavailable.
4. Refreshing resource availability.
5. Offering the user an option to join the waitlist.

> **Important:** The backend is responsible for enforcing concurrency-safe reservations. Frontend availability checks alone cannot guarantee that double bookings will be prevented.

---

## Getting Started

### Prerequisites

Make sure you have the following installed on your machine:

- **Node.js** (v18.x or higher)
- **npm** (v9.x or higher)
- A running instance of the **SpaceSync Spring Boot Backend**
- Backend API URL: `http://localhost:8080`

### Installation & Setup

#### 1. Clone the Repository

Clone your forked repository:

```bash
git clone https://github.com/<your-username>/<frontend-repo-name>.git
cd <frontend-repo-name>
```

#### 2. Install Dependencies

Install all npm dependencies:

```bash
npm install
```

#### 3. Configure Environment Variables

Create a `.env` file in the root directory of the project.

You can copy `.env.example` if it is available.

**For Create React App:**

```env
REACT_APP_API_URL=http://localhost:8080/api
```

> **Note:** Create React App uses the `REACT_APP_` prefix, while Vite uses the `VITE_` prefix. Use the one that matches your build tool.

### Running the Application

#### 1. Start the Development Server

For Create React App:

```bash
npm start
```

For Vite:

```bash
npm run dev
```

#### 2. Open the Application

Open your browser and navigate to:

**Create React App:**

http://localhost:3000

Ensure the backend server is running before testing reservations, availability, waitlists, or notifications.

---

## Available Scripts

In the project directory, you can run the following commands.

### `npm start`

Runs the application in development mode using Create React App.

```bash
npm start
```

Open http://localhost:3000 to view the application.

- The page reloads when you make changes.
- Lint errors may appear in the console.

### `npm test`

Launches the test runner in interactive watch mode when configured.

```bash
npm test
```

Use this command to verify application functionality and component behavior.

### `npm run build`

Builds the production application.

```bash
npm run build
```

- Generates optimized production files in the `build/` folder for Create React App.
- Minifies the application code.
- Creates hashed filenames for improved caching.
- Prepares the application for deployment.

### `npm run eject`

> **Warning:** This is a one-way operation. Once you eject a Create React App project, you cannot automatically undo it.

```bash
npm run eject
```

This command exposes the underlying build configuration and dependencies.

Only use this command when advanced build customization is necessary.

> **Note:** `npm run eject` applies to Create React App, not Vite. All scripts must exist in your `package.json` before they can be executed.

---

## Contributing (Fork & Pull Request)

Contributions to the SpaceSync Frontend are welcome!

Follow the steps below to fork the repository, implement changes, and submit a Pull Request.

### 1. Fork the Repository

1. Open the original SpaceSync Frontend GitHub repository.
2. Click the **Fork** button in the top-right corner.
3. Create a copy under your GitHub account.

### 2. Clone Your Fork Locally

```bash
git clone https://github.com/<your-username>/<frontend-repo-name>.git
cd <frontend-repo-name>
```

### 3. Add the Upstream Remote

Connect your local repository to the original project.

```bash
git remote add upstream https://github.com/<original-owner>/<frontend-repo-name>.git
```

Verify your remotes:

```bash
git remote -v
```

### 4. Create a Feature Branch

Do not commit directly to the `main` branch.

Create a descriptive branch for your feature or bug fix.

```bash
git checkout -b feature/your-feature-name
```

Examples of branch names:

- `feature/resource-search`
- `feature/booking-calendar`
- `feature/waitlist-notifications`
- `fix/booking-conflict-handling`
- `fix/responsive-navbar`

Recommended commit prefixes:

| Prefix | Purpose |
|--------|---------|
| `feat:` | New functionality |
| `fix:` | Bug fix |
| `refactor:` | Code restructuring |
| `test:` | Adding or updating tests |
| `docs:` | Documentation changes |
| `chore:` | Maintenance and configuration |

### 5. Implement & Verify Your Changes

Follow the existing frontend structure:

- `src/api/` — API communication
- `src/components/` — Reusable components
- `src/pages/` — Application pages
- `src/context/` — Global state
- `src/utils/` — Utility functions

Before submitting your changes:

1. Test the feature locally.
2. Check responsive behavior.
3. Verify backend API integration.
4. Test relevant booking and waitlist functionality.
5. Ensure the application builds successfully.

Run:

```bash
npm test
npm run build
```

### 6. Commit and Push to Your Fork

Stage your changes:

```bash
git add .
```

Commit your changes:

```bash
git commit -m "feat: add brief description of your UI changes"
```

Push your feature branch:

```bash
git push origin feature/your-feature-name
```

### 7. Open a Pull Request (PR)

1. Navigate to your forked repository on GitHub.
2. Click **Compare & pull request**.
3. Target the corresponding branch from the original repository.
4. Provide a clear summary of the changes.
5. Mention any tested edge cases, such as:
   - HTTP 409 Conflict handling
   - Overlapping reservation prevention
   - Back-to-back booking behavior
   - Waitlist enrollment
   - Automatic waitlist promotion alerts
   - Reservation cancellations

### Pull Request Guidelines

Before submitting a Pull Request, ensure that:

- Your code follows the existing project structure.
- Your components are reusable and properly named.
- Your changes do not break existing functionality.
- Your application builds without errors.
- Your branch contains only changes related to your contribution.

---

## Project Notes

SpaceSync is designed to support different types of reservable resources across multiple industries.

Although the frontend displays availability and reservation status, the **Spring Boot backend is responsible for preventing double bookings, enforcing reservation rules, and promoting eligible users from the waitlist**.

The frontend focuses on delivering a clear, responsive, and accessible experience for both users and administrators.

---

## License

A license has not yet been specified for this project.

Refer to the repository's `LICENSE` file if one is added.
