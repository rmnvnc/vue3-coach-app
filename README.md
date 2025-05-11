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
- Composition API - (migrated from Options API)
- Vue Router
- [Pinia](https://pinia.vuejs.org/) - (Migrated from Vuex) 
- Firebase (realtime DB)
- SCSS for styling

---

## 🧭 Planned Technologies

These will be introduced after completing the core features:

- ~~[Pinia](https://pinia.vuejs.org/) – modern state management (replacement for Vuex)~~
- ~~[Vite](https://vitejs.dev/) – faster build tool (replacement for Webpack)~~
- ~~Composition API – to restructure logic into composables (replacement for Options API)~~
- ~~`<script setup>` syntax – for cleaner and more concise components~~
- TypeScript – for static typing and better DX
- CMS integration (Netlify CMS or Storyblok)
- Nuxt 3 – for SSR, file-based routing, and hybrid hosting (marketing + app)
- [Vercel](https://vercel.com/) – for secure deployment and environment variable management


---

Ak chceš, môžem ti aj pripraviť stručný anglický návod, ako nasadiť tvoju Vite/Vue appku na Vercel vrátane .env nastavení. Chceš?

Jasné! Tu máš odporúčaný zápis pre sekciu Planned Technologies v angličtine, vrátane Vercelu:

## 🧭 Planned Technologies

These will be introduced after completing the core features:

- [x] Vite – faster build tool (replacing Webpack)
- [ ] Pinia – modern state management (replacing Vuex)
- [ ] Composition API – to modularize logic into composables (replacing Options API)
- [ ] `<script setup>` syntax – for cleaner and more concise components
- [ ] TypeScript – for static typing and better DX
- [ ] CMS integration (Netlify CMS or Storyblok)
- [ ] Nuxt 3 – for SSR, file-based routing, and hybrid rendering (marketing + app)
- [ ] [Vercel](https://vercel.com/) – for secure deployment and environment variable management


---

Ak chceš, môžem ti aj pripraviť stručný anglický návod, ako nasadiť tvoju Vite/Vue appku na Vercel vrátane .env nastavení. Chceš?



---

## 📦 Project Setup

```
npm install
```

---

## 🧪 Run for Development

```
npm run dev
```

---

## 🔨 Build for Production

```
npm run build
```

---

## 🔑 Environment Variables

Create a `.env.local` file in your root folder and add:

```
VITE_FIREBASE_DB=https://your-project.firebaseio.com
VITE_FIREBASE_API_KEY=your-api-key
```

These values are injected at build time. Do **not** store secrets here.

---
