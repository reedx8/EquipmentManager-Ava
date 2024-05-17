import createClient from '@/app/config/supabaseServer';

// revalidate after 1 hour for now
const cacheAge = 3600;

export async function GET() {
    const supabase = createClient();
    const { data, error } = await supabase.from('Providers').select('name');

    if (error) {
        return Response.json(
            { error: error.message },
            {
                status: 500,
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
    }
    // console.log('Stores (server): ', data);
    return Response.json(data, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': `public, max-age=${cacheAge}`,
        },
    });
}
