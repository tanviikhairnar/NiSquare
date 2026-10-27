# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some Oxlint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the Oxlint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and Oxlint's TypeScript related rules in your project.

## Enquiries and deployment

The storefront is a static React application. Enquiries are prepared in the browser and sent directly to a selected founder through WhatsApp; the site does not store enquiry or customer data and does not provide checkout, accounts, or payment processing. No application database is required.

Run the storefront locally with `npm install` followed by `npm run dev`. `npm run backend` starts only a local health endpoint for development; it does not handle or store enquiries. The production host must serve the generated static files and support direct requests to nested routes. Set `VITE_SITE_URL` to the canonical production origin when building for a different domain.
