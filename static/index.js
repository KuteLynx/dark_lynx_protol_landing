// Render compatibility shim.
//
// The public site is deployed as static files to GitHub Pages. Render is only
// used as the journal API. If the Render dashboard still has the old
// `node build` start command, Node resolves this copied file from the static
// adapter output and starts the API instead of trying to serve the site.
import '../server/journal-api.mjs';
