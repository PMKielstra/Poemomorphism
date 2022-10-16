import { getPrompts } from './Prompts';
import { ActivePlayers, TurnOrder } from 'boardgame.io/core';

// 
function getPoemIndex(ctx, playerID) {
    // playerID is guaranteed to be numeric, but annoyingly it's stored and passed as a string.
    return (ctx.turn - 1 + Number(playerID)) % ctx.numPlayers;
}

export const Poemomorphism = {
    // The multiplayer server is capable of hosting several different games at once, so we need to name this one.  It's not shown to the user.
    name: 'poemomorphism',

    setup: (ctx, setupData) => ({ poems: getPrompts(ctx.numPlayers, ctx.random), linesPerPlayer: setupData.linesPerPlayer }),

    // Abusing playerView a little bit: each player gets the poem they're currently trying to continue.  We're not so much stripping secrets as choosing them.
    playerView: (G, ctx, playerID) => ({ poem: G.poems[getPoemIndex(ctx, playerID)] }),

    turn: {
        order: TurnOrder.ONCE,
        activePlayers: ActivePlayers.ALL_ONCE,
        endIf: (G, ctx) => ctx.activePlayers == null // End turn once everyone's had one go.
    },

    moves: {
        writeLine: {
            move: (G, ctx, line) => {
                G.poems[getPoemIndex(ctx, ctx.playerID)].push(line);
            },
            client: false // Since we use playerView to parcel out poems to each player, we can't just push directly to poems from the client.  That's done on the server.
        }
    },

    endIf: (G, ctx) => {
        if (G.poems.every(x => x.length == (G.linesPerPlayer * ctx.numPlayers) + 1)) {
            return true // If endIf returns anything, even `false`, the game ends, so we have to use an if() { return true }.  :-(
        }
    }

};