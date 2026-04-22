import type { APIRoute } from 'astro';
import { cases } from '@/data/cases';

export const GET: APIRoute = async ({ site }) => {
  const siteUrl = site?.toString() || 'https://day-fintech.co.kr/';
  const siteName = 'DAY 금융사기 피해회복 솔루션';
  const now = new Date().toUTCString();

  const items = cases.slice(0, 100).map((c) => `    <item>
      <title>${escapeXml(c.title)}</title>
      <link>${siteUrl}cases/${c.slug}/</link>
      <guid isPermaLink="true">${siteUrl}cases/${c.slug}/</guid>
      <description>${escapeXml(c.description)}</description>
      <pubDate>${new Date(c.date).toUTCString()}</pubDate>
      <category>${escapeXml(c.category)}</category>
    </item>`).join('\n');

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${siteName}</title>
    <link>${siteUrl}</link>
    <description>${siteName} - 투자사기 사건 목록 및 집단소송 진행 현황</description>
    <language>ko</language>
    <docs>https://www.rssboard.org/rss-specification</docs>
    <lastBuildDate>${now}</lastBuildDate>
    <atom:link href="${siteUrl}rss.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}
