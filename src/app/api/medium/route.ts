import Parser from 'rss-parser';
import { NextResponse } from 'next/server';

type MediumItem = {
    title?: string;
    link?: string;
    isoDate?: string;
    guid?: string;
    'content:encoded'?: string;
};

const MEDIUM_RSS_URL = 'https://medium.com/feed/@ppriyankuu';

function extractExcerpt(html: string, maxLength: number = 220): string {
    // Strip HTML tags
    let text = html
        .replace(/<[^>]*>/g, " ")   // remove tags
        .replace(/\s+/g, " ")       // collapse spaces
        .trim();

    // Decode HTML entities like &#39; &amp; &quot;
    text = text.replace(/&#(\d+);/g, (_, code) => {
        return String.fromCharCode(Number(code));
    });
    text = text
        .replace(/&quot;/g, '"')
        .replace(/&apos;/g, "'")
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');

    // Limit to maxLength
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trimEnd() + "…";
}

export async function GET() {
    try {
        const parser: Parser<unknown, MediumItem> = new Parser();
        const feed = await parser.parseURL(MEDIUM_RSS_URL);

        const posts = (feed.items || []).map((item) => {

            const rawContent = item['content:encoded'] || '';
            const description = rawContent ? extractExcerpt(rawContent) : '';

            return {
                id: item.guid || item.link || item.title,
                title: item.title || 'Untitled post',
                description,
                link: item.link || '#',
                pubDate: item.isoDate || null,
            };
        });

        return NextResponse.json(posts);
    } catch (error) {
        console.error('Error fetching Medium feed:', error);
        return NextResponse.json(
            { error: 'Failed to fetch Medium posts' },
            { status: 500 }
        );
    }
}