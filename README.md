# RVCE AIML Student Data Portal

Welcome to the **AIML Student Data Portal**, an exclusive web dashboard designed for AIML students at RVCE to seamlessly securely log in and verify their academic profiles, placement standings, and database records.

---

## 🎯 Purpose of the Application

This dashboard is built primarily to ensure that all internal department data is mapped accurately. Students are expected to sign in using their official college IDs and review the comprehensive 21-point database profile registered under their name for any discrepancies.

**Core Objectives:**
1. **Data Verification:** Allow students intuitive, read-only access to their personal database mappings (USN, CGPA, Backlogs, Aadhar, Quota, Internships, etc).
2. **Missing Profile Tracking:** Help class representatives (SPCs) easily track down students whose profiles are missing from the master database. 
3. **Secure Identity Enforcement:** Restrict access strictly and autonomously to verified `@rvce.edu.in` domain users.

---

## 🚀 Features & Architecture

### 1. The Autonomous Landing Page (`/`)
When navigating to the root URL, users land on the public gateway containing:
* **SPCs Contact Directory:** Dedicated support pipelines linking to Section A (Kavya Jain, Monil Mehta) and Section B (Vineet, Yuvaraj).
* **Live Missing-USN Engine:** The server natively compares a master array of 148 officially expected USN strings against the active PostgreSQL database. It instantly computes and displays a live, scrolling leaderboard of precisely which students still need to be registered into the database. As soon as a missing student is added, they vanish from this list.

### 2. The Secure Gateway (`/login`)
* **Google OAuth Binding:** Powered by `NextAuth`, the login screen prevents access from any email address not terminating in `@rvce.edu.in`. 
* **Stateful Session Redirection:** Checks your session cookies intrinsically to prevent authentic users from looping back into the login screen—immediately redirecting returning students to their dashboard.

### 3. The Interactive Dashboard (`/dashboard`)
Upon passing OAuth and verifying that the database holds a record for their email, the student lands on their personalized dashboard:
* **Zero-API-Call Strategy:** The NextAuth `signIn` callback natively executes the master `SELECT * FROM students` PostgreSQL query upon authentication. All 21 profile columns (like `10th percentage`, `Stipend`, `Native City`) are appended directly into the user's secure server session token. The frontend dashboard UI renders completely instantaneously using this cached profile snippet without needing secondary API endpoints.
* **Premium Glassmorphism Aesthetics:** The entire project operates on a custom, highly robust **Vanilla CSS** design system (`app/globals.css`). It features drifting ambient glowing orbs, frosted glass panels (`backdrop-filter`), conditional UI coloring (`var(--danger)`, `var(--accent-emerald)`), and floating micro-animations—delivering a stunning aesthetic **without** depending on heavy external libraries like Tailwind CSS.

---

## 🛠️ Technology Stack
* **Framework:** [Next.js](https://nextjs.org/) (App Router)
* **Authentication:** NextAuth.js (`GoogleProvider`)
* **Database Driver:** PostgreSQL (`pg`)
* **Styling:** Vanilla CSS3 (Custom Variables, Flex/Grid Systems, Keyframe Animations)
* **Language:** TypeScript (`.tsx`, `.ts`)

---

## 💻 Running the Project Locally

1. **Clone & Setup:**
   Ensure you have NodeJS installed.
   ```bash
   npm install
   ```

2. **Environment Variables:**
   Ensure you have a `.env.local` file placed at the root containing your active Google OAuth Credentials and PostgreSQL connection strings:
   ```env
   GOOGLE_CLIENT_ID=your_google_client_id
   GOOGLE_CLIENT_SECRET=your_google_client_secret
   NEXTAUTH_SECRET=your_nextauth_secret
   NEXTAUTH_URL=http://localhost:3000
   ```
   *(Ensure your `lib/db` file is configured correctly to hook into your Postgres instance!)*

3. **Start the Dev Server:**
   ```bash
   npm run dev
   ```
4. **Access the Portal:**
   Navigate into `http://localhost:3000` to review the public directory, and `http://localhost:3000/login` to authenticate!
