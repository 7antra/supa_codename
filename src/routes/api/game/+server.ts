import { supabase } from "$lib/DB";
import { dico } from "$lib/dico";
import { slugify } from "$lib/helpers";
import { json } from "@sveltejs/kit";

export const POST = async () => {

    //colors
    const nbWhites = Array(7).fill('white');
    const nbRed = Array(8).fill('red');
    const nbBlue = Array(8).fill('blue');

    const start = Math.random() > 0.5 ? 'red' : 'blue';

    const colors = [
        ...nbWhites,
        ...nbRed,
        ...nbBlue,
        'black',
        start,
    ].sort(() => Math.random() - 0.5);

    //dico
    const words = dico.sort(() => Math.random() - 0.5).slice(0, 25);

    const board = words.map((word, i) => ({
        word,
        color: colors[i],
        revealed: false,
    }))

    const word_id = slugify(words[0]);

    const { data, error } = await supabase.from('cn_games')
        .insert({
            word_id,
            board,
            start,
        }).select().single();

    if (error) {
        console.log(error)
        return json({ error })
    };


    return json(data)
}