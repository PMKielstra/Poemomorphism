import { Server, Origins } from 'boardgame.io/server';
import path from 'path';
import serve from 'koa-static';
import { Poemomorphism } from './Game';

const server = Server({
    games: [Poemomorphism],
    origins: [
        "https://poemo.herokuapp.com", // Old frontend -- to be retired soon due to free Heroku being EOL'd
        "https://poemomorphism.onrender.com", // New frontend
        Origins.LOCALHOST_IN_DEVELOPMENT
    ]});
const PORT = process.env.PORT || 8000;

// Build path relative to the Server.js file
const frontEndAppBuildPath = path.resolve(__dirname, '../build');
server.app.use(serve(frontEndAppBuildPath))

server.run(PORT, () => {
  server.app.use(
    async (ctx, next) => await serve(frontEndAppBuildPath)(
      Object.assign(ctx, { path: '../index.html' }),
      next
    )
  )
});
