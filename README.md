# Blog4u

A full-stack blogging platform where users can browse blogs by category, create and manage their own blogs, and interact with content through a clean and minimal interface. Administrators have access to a dedicated dashboard for platform-wide management.

---

## Table of Contents

- [Overview](#overview)
- [User Flow](#user-flow)
- [Admin Flow](#admin-flow)
- [Pages and Features](#pages-and-features)
- [API Reference](#api-reference)
- [Authentication and Middleware](#authentication-and-middleware)
- [Tech Stack](#tech-stack)

---

## Overview

Blog4u allows anyone to browse public blogs without signing in. Users who want to create, edit, or delete their own blogs must register and log in. Administrators log in with admin credentials and are redirected to a separate dashboard where they can manage all content and view platform statistics. The platform is organized around categories, making it easy to discover relevant content.

---

## User Flow

### Public Access (No Login Required)

- Landing page displays blog categories as cards.
- Clicking a category filters and shows blogs belonging to that category.
- Individual blog posts can be read without authentication.
- The About page and other legal sub-pages (Privacy Policy, Terms of Service, etc.) are accessible to everyone.

### Authentication

- If a user tries to create a blog, edit a blog, delete a blog, or view their profile, they are redirected to the login page.
- New users must register first via the Sign Up page.
- Existing users can log in directly via the Sign In page.
- Users with admin credentials are redirected to the Admin Dashboard upon successful login instead of the regular home page.

### Authenticated User Access

Once logged in, the following features become available through the header navigation:

**View Profile**
- Accessible via the profile icon in the header.
- Displays user details fetched from `/api/profile`.
- Option to log out from the profile page.

**Create Blog**
- Accessible via the Create button in the header.
- Users fill in the title, category, tags, cover image, visibility (public or private), and content.
- Content is written using a rich text editor (Tiptap) that supports bold, italic, headings, lists, and blockquotes.
- On submission, the blog is sent to the API and the user is redirected to their dashboard.

**View My Blogs**
- Shows all blogs created by the logged-in user.
- Each blog card has Edit and Delete options.

**Edit Blog**
- Opens the same form as Create Blog but pre-filled with existing blog data.
- Submits an update request to the API.

**Delete Blog**
- Deletes the blog after confirmation.
- Sends a delete request to the API.

---

## Admin Flow

### Login and Redirect

- Admin credentials are entered on the same Sign In page used by regular users.
- On successful login, the server identifies the admin role from the JWT token.
- The middleware redirects the admin directly to `/admin/dashboard` instead of the regular home page.
- All routes under `/admin/*` are protected and accessible only to users with the admin role.

### Admin Dashboard

The dashboard is the central view for the admin. It is composed of the following sections:

**Stats Overview**

- On page load, the dashboard fetches data from `/api/blogs/stats`.
- The stats section displays two key metrics as prominent cards: total number of registered users and total number of blogs on the platform.

**Visual Blog Activity Chart**

- Below the stats cards, a bar chart renders the blog data fetched from `/api/blogs`.
- The chart visualizes blog volume over time or by category, giving the admin a quick visual understanding of platform activity.
- The chart updates based on the blog data available at load time.

**Top 4 Categories**

- Also derived from the `/api/blogs` data, the dashboard displays the four categories with the highest number of blogs.
- Each category is shown with its name and blog count, ranked from highest to lowest.

### Admin Sidebar

The sidebar is present on all admin pages and provides the following navigation options:

- Dashboard (link to `/admin/dashboard`)
- All Blogs (link to `/admin/blogs`)
- Create New Blog (button that navigates to the blog creation form)
- Logout (button that clears the session cookie and redirects to the Sign In page)

### Manage All Blogs

- Accessible via the All Blogs option in the sidebar, routed at `/admin/blogs`.
- Displays every blog on the platform, including both public and private blogs from all users.
- Each blog entry shows the title, author, category, visibility status, and creation date.
- The admin can edit any blog by clicking the Edit option, which opens the pre-filled blog form and submits a PUT request to `/api/blogs/:id`.
- The admin can delete any blog by clicking the Delete option, which sends a DELETE request to `/api/blogs/:id` after confirmation.

### Create New Blog (Admin)

- Accessible from the Create New Blog button in the sidebar.
- Uses the same rich text editor form as regular users.
- The blog is created under the admin's account and submitted via POST to `/api/blogs`.

### Logout

- Available directly in the sidebar on all admin pages.
- Clears the HTTP-only authentication cookie and redirects the admin to the Sign In page.

---

## Pages and Features

| Page | Route | Access | Description |
|---|---|---|---|
| Home / Category Listing | / | Public | Shows category cards, clicking filters blogs |
| Blog Detail | /blog/:id | Public | Full blog post view |
| About | /about | Public | Information about the platform |
| Legal (sub-pages) | /legal/* | Public | Privacy policy, terms, etc. |
| Sign In | /auth/login | Public | Login form for users and admins |
| Sign Up | /auth/register | Public | Registration form |
| Create Blog | /user/blog/create | Protected (user) | Rich text editor form to write and publish |
| View My Blogs | /user/blogs | Protected (user) | Lists user's blogs with edit and delete options |
| Edit Blog | /user/blog/edit/:id | Protected (user) | Pre-filled form to update an existing blog |
| Profile | /user/profile | Protected (user) | User info and logout |
| Admin Dashboard | /admin/dashboard | Admin only | Stats, bar chart, and top 4 categories |
| Admin All Blogs | /admin/blogs | Admin only | View, edit, and delete all blogs on the platform |

---

## API Reference

### Auth

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | /auth/register | No | Register a new user |
| POST | /auth/login | No | Login and receive token. Admins are redirected to /admin/dashboard |

### Blogs

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/blogs | No | Fetch all public blogs (supports category filter). Admin receives all blogs including private |
| GET | /api/blogs/:id | No | Fetch a single blog by ID |
| POST | /api/blogs | Yes | Create a new blog |
| PUT | /api/blogs/:id | Yes | Update an existing blog. Admin can update any blog |
| DELETE | /api/blogs/:id | Yes | Delete a blog. Admin can delete any blog |
| GET | /api/blogs/stats | Yes (admin) | Returns total user count and total blog count for the dashboard |

### Categories

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/category | No | Fetch all categories |

### Profile

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/profile | Yes | Get the logged-in user's profile |

---

## Authentication and Middleware

- Authentication is token-based. The token is stored in an HTTP-only cookie.
- On login, the server decodes the JWT to check the user role.
- If the role is admin, the response redirects to `/admin/dashboard`. Otherwise it redirects to the regular home page.
- Middleware protects the following route groups:
  - `/user/*` — accessible only to authenticated users with any valid role.
  - `/admin/*` — accessible only to users with the admin role. Any other authenticated user attempting to access admin routes is redirected to the home page.
- Public routes are open and require no token.
- If an unauthenticated user tries to access a protected route, they are redirected to the login page.

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Tiptap (rich text editor), FontAwesome
- **Auth**: Cookie-based JWT authentication with role-based route protection
- **API Communication**: REST via Fetch API with FormData for file uploads
- **Middleware**: Route-level protection for user and admin sections
- **Admin Charts**: Bar chart rendered on the admin dashboard using blog data from the REST API