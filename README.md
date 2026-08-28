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

For real admin notifications outside the inbox, configure these variables in the server-side Back4App Cloud Code environment. Never put them in `VITE_*` browser variables or commit them to GitHub:

```env
RESEND_API_KEY=YOUR_RESEND_API_KEY
NOTIFICATION_FROM_EMAIL=notifications@example.com
TWILIO_ACCOUNT_SID=YOUR_TWILIO_ACCOUNT_SID
TWILIO_AUTH_TOKEN=YOUR_TWILIO_AUTH_TOKEN
TWILIO_FROM_NUMBER=+250XXXXXXXXX
```

Farmers should register a phone number in international format such as `+250...`. Inbox delivery works without these provider variables; email, SMS, and phone call delivery require the matching provider credentials.

Never put the Master Key in a frontend `.env` file or GitHub. If login returns **Unauthorized**, verify all three values are from the *same* Back4App app and restart `npm run dev` after changing `.env.local`.

## Google and production setup

The website reads these browser-safe values from `.env.local`, Vercel Environment Variables, or the Docker runtime environment:

```env
VITE_GOOGLE_SITE_VERIFICATION=VALUE_FROM_SEARCH_CONSOLE
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
```

For Search Console, add the verified production domain, choose **HTML tag**, copy its content value into `VITE_GOOGLE_SITE_VERIFICATION`, deploy, and then click **Verify**. Google Analytics 4 uses the `G-...` measurement ID and starts after deployment. The app loads Analytics only when that variable is present.

HTTPS and `www` are configured at the hosting provider: add the custom domain and its `www` hostname, set the preferred hostname redirect (for example `www` to the apex domain), and wait for the provider-managed TLS certificate. Do not put private certificates in this repository. The canonical URL in `index.html` should be changed if the final production domain is different.

Google Business Profile is created and verified in the Google Business Profile manager, then the website URL is added to the profile. Business Profile API access requires a Google Cloud project, OAuth consent, and approved API access; those credentials must stay server-side.

Gemini also requires a server-side Google AI API key. Do not expose a Gemini key as `VITE_*` or call Gemini directly from the browser. Add a protected Cloud Code endpoint that validates the signed-in farmer, calls Gemini with the server-only key, and returns a bounded diagnosis response. The current crop diagnosis remains available without that optional provider.

For image performance, store compressed WebP or AVIF versions in `public/images/` (keep a JPG fallback where needed), use responsive `srcset` sizes, and avoid uploading camera originals. The Nginx and Vercel configurations cache image files for 30 days and compress text/SVG assets.

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