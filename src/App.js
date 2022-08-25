import { Client } from 'boardgame.io/client';
import { SocketIO } from 'boardgame.io/multiplayer';
import { LobbyClient } from 'boardgame.io/client';
import { Poemomorphism } from './Game';

const { protocol, hostname, port } = window.location;
const server = `${protocol}//${hostname}:${port}`;

class PoemomorphismClient {
    constructor(matchID, rootElement, { playerID, playerCredentials }) {
        this.poemDisplay = rootElement.children[0];
        this.lineEntry = rootElement.children[1];

        this.client = Client({
            game: Poemomorphism,
            multiplayer: SocketIO({ server }),
            playerID,
            credentials: playerCredentials,
            matchID
        });
        this.client.start();
        this.client.subscribe(state => this.update(playerID, state));

        this.lineEntry.children[1].onclick = event => {
            this.client.moves.writeLine(this.lineEntry.children[0].value);
            this.lineEntry.children[0].value = "";
        }
    }

    renderPoem(gameover, poem) {
        if (gameover) {
            return poem.map((line, index) => `${index == 0 ? '<p class="prompt">' : '<p>'}${line}</p>`).join('');
        } else {
            return `<p>${poem[poem.length - 1]}</p>`;
        }
    }

    update(playerID, state) {
        if (state == null || state.ctx == null || state.G == null) return;
        this.poemDisplay.innerHTML = this.renderPoem(state.ctx.gameover, state.G.poem);
        this.lineEntry.style.display = (state.ctx.gameover || !(playerID in state.ctx.activePlayers)) ? "none" : "";
    }
}

const gameElement = document.getElementById('game');
const lobbyElement = document.getElementById('lobby');

const lobbyClient = new LobbyClient({ server });

function shortIDFromLong(matchID) {
    return matchID.replace(/\W/g, '').substring(0, 5);
}

async function joinMatch(shortID) {
    const match = (await lobbyClient.listMatches('poemomorphism')).matches
        .filter(m => shortIDFromLong(m.matchID) == shortID)[0];

    const matchData = await lobbyClient.joinMatch('poemomorphism', match.matchID, { playerName: 'Name' });
    gameElement.style.display = "";
    lobbyElement.innerHTML = `<p class="gameID">Game ID: ${shortID}</p>`

    new PoemomorphismClient(match.matchID, gameElement, matchData);
}

document.getElementById('create').onclick = async event => {
    const { matchID } = await lobbyClient.createMatch('poemomorphism', {
        numPlayers: Number(document.getElementById('numplayers').value)
    });
    joinMatch(shortIDFromLong(matchID)); // For ease of typing in on mobile
}

document.getElementById('join').onclick = event => {
    joinMatch(document.getElementById('gamecode').value);
}