import createClient from '@/app/config/supabaseServer';
// import createClient from '../../config/supabaseServer';

// revalidate after 1 day
const cacheAge = 86400;

// fetch all statuses from the 'Statuses' table
export async function GET() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('Statuses')
        .select('id, Status');

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
    // console.log('Statuses (server): ', data);
    return Response.json(data, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': `public, max-age=${cacheAge}`,
        },
    });
}
