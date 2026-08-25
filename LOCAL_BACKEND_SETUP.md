# Local registration setup

The visual website starts with `npm run dev`, but registration requires a reachable Back4App Parse backend. The in-browser sandbox proxy (`/parse`) only exists while viewing the hosted Back4App preview.

1. In Back4App, open your application settings and copy its **Application ID**.
2. In this project folder, copy `.env.example` and rename the copy to `.env`.
3. Replace `your-back4app-application-id` with your Application ID.
4. Keep `VITE_PARSE_SERVER_URL=https://parseapi.back4app.com/parse`, or replace it with your own Parse API URL if your Back4App application uses a different one.
5. Stop the Vite server with `Ctrl+C`, then run `npm run dev` again.

The registration request sends `username`, `email`, `password`, `fullName`, and `learningTopic` to `POST /parse/users`. A successful Parse registration response is JSON with HTTP 201, `objectId`, `createdAt`, and `sessionToken`.