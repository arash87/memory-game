# Kid Memory Match

This project is a Vite + React app with a small Express server for production hosting.

## Local development

```bash
npm install
npm run dev
```

## Production

```bash
npm run build
npm start
```

## Azure App Service

Recommended App Service settings:

- Runtime stack: `Node`
- Node version: `20 LTS` or newer
- App setting: `SCM_DO_BUILD_DURING_DEPLOYMENT=true`
- Startup command: `npm run build && npm start`

Deployment flow:

1. Push this repository to GitHub.
2. In Azure App Service, open Deployment Center.
3. Connect the GitHub repo and branch.
4. Save and let App Service deploy.

The app will build the Vite client into `dist/` and the Node server in `server.js` will serve the built files.
