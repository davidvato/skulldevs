export const dynamic = 'force-dynamic';

const html = `<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>DashTask · SAFe Dashboard</title>
    <meta name="description" content="Dashboard SAFe con roles, intakes y Kanban" />
    <script type="module" crossorigin src="/dashtask/assets/index.js"></script>
    <link rel="stylesheet" crossorigin href="/dashtask/assets/index.css">
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;

export async function GET() {
  return new Response(html, {
    status: 200,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });
}
