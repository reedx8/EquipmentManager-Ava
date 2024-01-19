# Equipment List

## To Run
1. Clone the repo to your local machine
2. Run `npm i` in project's parent folder
3. Create a `.env.local` file in  project's parent folder: `touch .env.local`
4. Message repo owner for Supabase Project URL and API key, and add them to the `.env.local` file, with no quotes. For example:
    ```
    NEXT_PUBLIC_SUPABASE_URL=<url_here>`
    NEXT_PUBLIC_SUPABASE_ANON_KEY=<random_key_here>
    ```
5. Run `npm run dev` in project's parent folder, then navigate to the `localhost` link given in terminal (eg `http://localhost:3000`)