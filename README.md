# SMART-UBUHINZI-RWANDA

Responsive farming platform for crop learning, weather guidance, district marketplace information, crop testing, and farmer accounts.

## Run in VS Code

1. Extract the ZIP and open the `SMART-UBUHINZI-RWANDA` folder in VS Code.
2. Open the integrated terminal.
3. Run `npm install`.
4. Copy `.env.local.example` to a new file called `.env.local`.
5. In Back4App, open **App Settings → Security & Keys** and add your own Application ID and JavaScript Key to `.env.local`.
6. Run `npm run dev` and open the URL shown in the terminal.

## Back4App configuration

Use only these browser-safe values:

```env
VITE_PARSE_APP_ID=YOUR_REAL_APPLICATION_ID
VITE_PARSE_JAVASCRIPT_KEY=YOUR_REAL_JAVASCRIPT_KEY
VITE_PARSE_SERVER_URL=https://parseapi.back4app.com/parse
```

Never put the Master Key in a frontend `.env` file or GitHub. If login returns **Unauthorized**, verify all three values are from the *same* Back4App app and restart `npm run dev` after changing `.env.local`.

## Edit website words and images

- Navigation and shared wording: `src/lib/translations.ts`
- Home messages, crop paragraphs, and image paths: `src/content/siteContent.ts`
- Home sections/cards: `src/data/homeData.ts`
- Put new images in `public/images/`, then reference them as `images/your-image.jpg` in content files.

## Publish online

The preview is available in Back4App Draft while you work. To place it on a public internet URL, use the **Publish** button in the Back4App top bar. Publishing creates the public production URL; it cannot be done from `npm run dev` or a ZIP file.

## Deploy as a Back4App Container App

This repository includes a production `Dockerfile`. In the Container App deployment form, add these environment variables (not the Master Key):

```text
VITE_PARSE_APP_ID
VITE_PARSE_JAVASCRIPT_KEY
VITE_PARSE_SERVER_URL=https://parseapi.back4app.com/parse
```

The container listens on port `80`. Commit and push `Dockerfile`, `.dockerignore`, and the `docker/` folder to the root of your GitHub repository, then select **Redeploy** in Back4App. The Docker startup script safely writes those browser-safe configuration values when the container starts.