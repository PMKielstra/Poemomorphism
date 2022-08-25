import { getPrompts } from './Prompts';
import { ActivePlayers, TurnOrder } from 'boardgame.io/core';

function getPoemIndex(ctx, playerID) {
    return (Number(ctx.currentPlayer) + Number(playerID)) % ctx.numPlayers;
}

export const Poemomorphism = {
    name: 'poemomorphism',

    setup: (ctx) => ({ poems: getPrompts(ctx.numPlayers, ctx.random) }),

    // Abusing playerView a little bit: each player gets the poem they're currently trying to continue.  We're not so much stripping secrets as choosing them.
    playerView: (G, ctx, playerID) => ({ poem: G.poems[getPoemIndex(ctx, playerID)] }),

    turn: {
        order: TurnOrder.ONCE,
        activePlayers: ActivePlayers.ALL_ONCE,
        endIf: (G, ctx) => ctx.activePlayers == null
    },

    moves: {
        writeLine: {
            move: (G, ctx, line) => {
                G.poems[getPoemIndex(ctx, ctx.playerID)].push(line);
            },
            client: false
        }
    },

    endIf: (G, ctx) => {
        if (G.poems.every(x => x.length == ctx.numPlayers + 1)) {
            return true // If endIf returns anything, even `false`, the game ends, so we have to use an if() { return true }.  :-(
        }
    }

};