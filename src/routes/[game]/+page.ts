import { supabase } from '$lib/DB.js';

export const load = async (url) => {
    const game = url.params.game;
    const { data, error } = await supabase.from('cn_games').select('*').eq('word_id', game).single();

    if (error) console.log(error);

    return {
        game: data,
    }
}