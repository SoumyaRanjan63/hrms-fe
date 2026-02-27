# HRMS Frontend

## Project Overview

This is the frontend of a Human Resource Management System (HRMS) built using React and TypeScript.
The application allows users to manage employees and track their daily attendance through a clean dashboard interface.

It connects to a Django REST API backend to perform all data operations such as creating employees, recording attendance, and viewing records.

---

## Tech Stack Used

* React
* TypeScript
* Vite
* Axios
* Tailwind CSS
* REST API integration
* Vercel (deployment)

---

## Steps to Run the Project Locally

1. Clone the repository

```
git clone https://github.com/SoumyaRanjan63/hrms-fe
```

2. Navigate to project folder

```
cd hrms-fe
```

3. Install dependencies

```
npm install
```

4. Create environment file
   Create `.env` in root:

```
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

5. Start development server

```
npm run dev
```

6. Open in browser

```
http://localhost:5173
```

---

## Assumptions or Limitations

* Attendance is recorded once per employee per date.
* Attendance is linked to existing employees only.
* Deleting an employee also deletes related attendance records (backend cascade).
* No authentication is implemented (single-user admin scenario).
* Backend API must be running for full functionality.
