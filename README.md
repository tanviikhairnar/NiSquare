# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Local store backend

This project includes a local Node API backed by SQLite. It serves the current product catalog and saves newsletter signups, contact messages, and pending orders. It binds to 127.0.0.1 and is intended for local development.

Use Node.js 24.15 or newer. In one terminal, start the API:

npm run backend

In a second terminal, start the React storefront:

npm run dev

Vite forwards /api requests to the local API. The SQLite file is created at server/data/store.sqlite and is ignored by Git. Orders are saved with status pending_payment; no payment information is collected or payment gateway is connected. Contact messages are stored locally; email delivery and customer accounts are not configured.