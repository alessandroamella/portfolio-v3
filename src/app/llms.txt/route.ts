import { renderLlmsTxt } from '@/lib/markdown';

export async function GET() {
  return new Response(await renderLlmsTxt(), {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
