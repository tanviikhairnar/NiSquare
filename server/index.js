import { createServer } from 'node:http';
const server = createServer((request, response) => {
 response.setHeader('Content-Type', 'application/json; charset=utf-8');
 response.setHeader('Cache-Control', 'no-store');
 if (request.method === 'GET' && new URL(request.url, 'http://localhost').pathname === '/api/health') {
  response.writeHead(200); response.end(JSON.stringify({ status: 'ok' })); return;
 }
 response.writeHead(404); response.end(JSON.stringify({ error: 'Endpoint not found.' }));
});
const port = Number(process.env.PORT || 3001);
server.listen(port, '127.0.0.1', () => console.log('Health endpoint listening on http://127.0.0.1:' + port));
