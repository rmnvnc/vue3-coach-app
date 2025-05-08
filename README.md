# Vue 3 Coach App

A Vue 3 application that allows users to register and find coaches. It uses Firebase for data storage and authentication, and includes protected routes, form validation, and dynamic routing.

[Available on this link](https://coach-app-new.web.app/coaches)

---

## 🚀 Features

- Coach registration (name, description, hourly rate, expertise areas)
- Coach list and detail pages
- Contact coaches through messages
- User login and logout
- Route protection (requires auth / unauth)
- Lazy-loaded routes for performance
- Basic form validation
- Data stored in Firebase Realtime Database

---

## 🛠️ Technologies Used

- [Vue 3](https://vuejs.org/) 
- [Vite](https://vitejs.dev/) - (migrated from Vue CLI + Webpack)
- Options API
- Vue Router
- Vuex 
- Firebase (realtime DB)
- SCSS for styling

---

## 🧭 Planned Technologies

These will be introduced after completing the core features:

- [Pinia](https://pinia.vuejs.org/) – modern state management (replacement for Vuex)
- ~~[Vite](https://vitejs.dev/) – faster build tool (replacement for Webpack)~~
- Composition API – to restructure logic into composables (replacement for Options API)
- `<script setup>` syntax – for cleaner and more concise components
- TypeScript – for static typing and better DX
- CMS integration (Netlify CMS or Storyblok)
- Nuxt 3 – for SSR, file-based routing, and hybrid hosting (marketing + app)

---

## 📦 Project Setup

```
npm install
```

---

## 🧪 Run for Development

```
npm run serve
```

---

## 🔨 Build for Production

```
npm run build
```

> ⚠️ **Node.js Compatibility Issue**  
> If you're using **Node.js version 17 or higher**, you may encounter a build error due to OpenSSL changes.  
> You can fix it temporarily by running:

```
# Linux / macOS
NODE_OPTIONS=--openssl-legacy-provider npm run build

# Windows CMD
set NODE_OPTIONS=--openssl-legacy-provider && npm run build

# Windows PowerShell
$env:NODE_OPTIONS="--openssl-legacy-provider"; npm run build
```

> ✅ Recommended solution: Use **Node.js v16.x** via [nvm](https://github.com/coreybutler/nvm-windows) or install manually.

---

## 🔑 Environment Variables

Create a `.env.local` file in your root folder and add:

```
VUE_APP_FIREBASE_DB=https://your-project.firebaseio.com
VUE_APP_FIREBASE_API_KEY=your-api-key
```

These values are injected at build time. Do **not** store secrets here.

---
