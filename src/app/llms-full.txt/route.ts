import { renderLlmsFullTxt } from '@/lib/markdown';

export async function GET() {
  return new Response(await renderLlmsFullTxt(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
