# Easy Editing Guide (VS Code)

## 1) Main files you will edit most

- `src/lib/theme.ts` → change global colors in one place
- `src/content/siteContent.ts` → edit home text/content
- `src/content/authContent.ts` → edit login/register slides + auth text
- `src/components/auth/AuthShowcase.tsx` → login/register design + form behavior
- `src/components/dashboard/FarmerDashboard.tsx` → dashboard cards/tables/charts
- `src/components/layout/MainNav.tsx` → top navigation and mobile side drawer

## 2) Update colors quickly

Open `src/lib/theme.ts` and change:
- `brandGreen`
- `brandGreenDeep`
- `brandGreenSoft`
- `accentGold`
- `night`
- `slate`
- `light`

Save file, and the app updates automatically.

## 3) Run in VS Code

```bash
npm install
npm run dev
```

## 4) Build for production

```bash
npm run build
npm run preview
```

## 5) Where login/register data is saved

- Users are created in `_User`
- Farmer profile records are created in `FarmerProfile`
- Dashboard diagnosis uses `CropDiagnosis`
