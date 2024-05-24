import createClient from '@/app/config/supabaseServer';

// fetch needs repair equipment from the 'Equipment' table
export async function GET() {
    const supabase = createClient();
    const { data, error } = await supabase
        .from('Equipment')
        .select('id, Name, Store_Name, Reason')
        .eq('Status_id', 9); // 9 = Needs Repair

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
    return Response.json(data, {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
