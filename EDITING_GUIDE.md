# Smart Ubuhinzi Rwanda — Easy Editing Guide

This project is built with **React + TypeScript + Tailwind**.

## Important
There is no separate `html` and `css` page-per-tab structure by default (like old static websites).
Each "tab/section" is a React component file (JSX = HTML-like).

If you want, I can later convert it to static HTML/CSS files, but this current version is much better for dynamic features (auth, dashboard, AI upload, live market prices).

---

## Where to edit each tab/section

### Navigation + slider under nav
- `src/components/layout/MainNav.tsx`
- `src/components/layout/NavCropSlider.tsx`

### Home page sections
- `src/components/home/HomePage.tsx`

### About / Read More crop book
- `src/components/home/CropKnowledgeSection.tsx`

### Farmer news section
- `src/components/home/FarmerNewsSection.tsx`

### Footer
- `src/components/home/HomeFooter.tsx`

### Marketplace
- `src/components/marketplace/MarketplacePage.tsx`

### Dashboard
- `src/components/dashboard/FarmerDashboard.tsx`
- `src/components/dashboard/ProfilePanel.tsx`
- `src/components/dashboard/CropTestPanel.tsx`
- `src/components/dashboard/WeatherControlPanel.tsx`

---

## Where to add your own pictures
Put your images in:

- `public/images/`

Then update paths in component files (example):

```tsx
<img src="/images/my-farmer-photo.jpg" alt="Farmer in field" />
```

---

## Styling (CSS)
Main global CSS file:

- `src/index.css`

Most section styles are directly in components using Tailwind classes.

---

## Quick tip for very easy editing (one place)
Main content file:
- `src/content/siteContent.ts`

You can edit here without touching component logic:
- hero rotating words
- slider titles/tags/images
- about cover/inline images
- all crop guide text + gallery image paths
- farmer news cards

Most users only need to edit this one file + put images in `public/images/`.

---

## Pure HTML/CSS/JS version (new)
I also added a separate easy-to-edit folder:
- `vanilla-app/`

Main edit file there:
- `vanilla-app/js/content.js`

Add pictures there:
- `vanilla-app/images/`
