import { PUBLIC_DB_TENANT } from '$env/static/public';
import { supabase } from '$lib/DB.js';
import { error as err } from '@sveltejs/kit';

export const load = async (url) => {
    const game = url.params.game;
    const { data, error } = await supabase.from(PUBLIC_DB_TENANT).select('*').eq('word_id', game).single();

    if (error) {
        console.log(error)
        throw err(404)
    };

    return {
        game: data,
    }
}