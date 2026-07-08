# mern-auth

Minimal MERN auth starter with separate `backend` and `frontend` folders.

Quick start

- Install backend deps and run server:

```powershell
cd backend
npm install
npm start
```

- Install frontend deps and run dev server:

```powershell
cd frontend
npm install
npm run dev
```

Environment

- Copy `backend/.env.example` to `backend/.env` and set `MONGO_URI`, `PORT`, `JWT_SECRET`.
- Copy `frontend/.env.example` to `frontend/.env` and set `VITE_API_URL` if needed.

GitHub

- This repo includes a basic GitHub Actions workflow at `.github/workflows/ci.yml` that installs backend and frontend dependencies and builds the frontend on push/PR to `main`.

License

This repository includes an `LICENSE` file (MIT) by default. Change as needed before publishing.
