import createClient from '../../config/supabaseServer';

// revalidate after 1 day
const cacheAge = 86400;

export async function GET() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('Equipment_Types')
        .select('Name');

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
    // console.log('Equipment Types (server): ', data);
    return Response.json(data, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': `public, max-age=${cacheAge}`,
        },
    });
}
