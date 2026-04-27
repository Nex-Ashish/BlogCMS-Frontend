# Blog4u

A full-stack blogging platform where users can browse blogs by category, create and manage their own blogs, and interact with content through a clean and minimal interface.

---

## Table of Contents

- [Overview](#overview)
- [User Flow](#user-flow)
- [Pages and Features](#pages-and-features)
- [API Reference](#api-reference)
- [Authentication and Middleware](#authentication-and-middleware)
- [Tech Stack](#tech-stack)

---

## Overview

Blog4u allows anyone to browse public blogs without signing in. Users who want to create, edit, or delete blogs must register and log in. The platform is organized around categories, making it easy to discover relevant content.

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

## Pages and Features

| Page | Access | Description |
|---|---|---|
| Home / Category Listing | Public | Shows category cards, clicking filters blogs |
| Blog Detail | Public | Full blog post view |
| About | Public | Information about the platform |
| Legal (sub-pages) | Public | Privacy policy, terms, etc. |
| Sign In | Public | Login form |
| Sign Up | Public | Registration form |
| Create Blog | Protected | Rich text editor form to write and publish |
| View My Blogs | Protected | Lists user's blogs with edit and delete options |
| Edit Blog | Protected | Pre-filled form to update an existing blog |
| Profile | Protected | User info and logout |
| Admin Panel | Admin only | Restricted to admin role via middleware |

---

## API Reference

### Auth

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| POST | /auth/register | No | Register a new user |
| POST | /auth/login | No | Login and receive token |

### Blogs

| Method | Endpoint | Auth Required | Description |
|---|---|---|---|
| GET | /api/blogs | No | Fetch all public blogs (supports category filter) |
| GET | /api/blogs/:id | No | Fetch a single blog by ID |
| POST | /api/blogs | Yes | Create a new blog |
| PUT | /api/blogs/:id | Yes | Update an existing blog |
| DELETE | /api/blogs/:id | Yes | Delete a blog |

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
- Middleware protects the following route groups:
  - `/user/*` — accessible only to authenticated users.
  - `/admin/*` — accessible only to users with the admin role.
- Public routes are open and require no token.
- If an unauthenticated user tries to access a protected route, they are redirected to the login page.

---

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, Tiptap (rich text editor), FontAwesome
- **Auth**: Cookie-based JWT authentication
- **API Communication**: REST via Fetch API with FormData for file uploads
- **Middleware**: Route-level protection for user and admin sections 