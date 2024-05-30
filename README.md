# Equipment Manager

Equipment Manager web app for Ava Roasteria. A React/Next.js/JS/CSS/Supabase project.

## To Run

1. Clone the repo to your local machine.
2. Create a `.env.local` file in project's parent folder: `touch .env.local`
3. Message repo owner for Supabase Project URL and API key, and add them to the `.env.local` file. For example:
    ```
    NEXT_PUBLIC_SUPABASE_URL=<url_here>
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<random_key_here>
    ```
4. Run `npm i` in project's parent folder.
5. Finally, run `npm run dev` in project's parent folder, then navigate to the `localhost` link given in terminal (eg `http://localhost:3000`)

## Tooling / Resources:

The following are the tools and resources already installed and in-use in the project (see package.json). Ensure to use to keep consistency across contributions, as well as keeping project size small:

1. Routing: Next.js App Router (https://nextjs.org/docs/app/building-your-application/routing#the-app-router)
2. Icons: react-icons (https://react-icons.github.io/react-icons/)
3. Tables: react-table-library (https://react-tables.com)
4. Calendar: react-big-calendar
5. Icons: react-icons
6. Loading spinners and skeletons: react-loading-skeleton and react-spinners

## Styling:

Use the "Prettier" code formatter before submitting your code to keep consistency and code quality across contributions. Default settings should do, but ensure the following settings are set:

-   Bracket spacing: enabled
-   JSX single quotes: enabled
-   Print width: 80
-   Semi: enabled
-   Tab width: 4
-   Trailing comma: es5

## Docs:

-   React: https://react.dev/reference/react
-   Next.js: https://nextjs.org/docs
-   Supabase: https://supabase.com/docs
