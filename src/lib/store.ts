import { derived, writable } from "svelte/store";

export type ColorsTeam = 'red' | 'blue';

export type ColorsCard = ColorsTeam | 'white' | 'black';

export type Card = {
    word: string;
    color: ColorsCard;
    revealed: boolean;
}

export type Player = {
    name: string;
    team: ColorsTeam;
    spy: boolean;
}

export type Game = {
    word_id: string;
    board: Card[];
    players: Player[];
    start: ColorsTeam;
    actual: ColorsTeam;
}

export const game = writable<Game>();

export const score = derived(game, $game => {
    if (!$game) return { red: 0, blue: 0 };

    const red = $game.board.filter(word => word.color === 'red' && word.revealed).length;
    const blue = $game.board.filter(word => word.color === 'blue' && word.revealed).length;

    return {
        red,
        blue,
    }
})

export const players = derived(game, $game => {
    if (!$game) return [];

    return $game?.players?.sort(({ team }) => (team === 'red' ? 1 : -1));
})