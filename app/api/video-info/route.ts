import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
    try {
        const { url } = await request.json();

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        // Validate URL format
        const urlPattern = /^https?:\/\/.+/;
        if (!urlPattern.test(url)) {
            return NextResponse.json(
                { error: 'Invalid URL format' },
                { status: 400 }
            );
        }

        // Check if yt-dlp is installed
        try {
            await execAsync('yt-dlp --version');
        } catch (error) {
            return NextResponse.json(
                { error: 'yt-dlp is not installed on the server. Please install it using: pip install yt-dlp' },
                { status: 500 }
            );
        }

        // Fetch video info using yt-dlp
        const isTwitch = url.includes('twitch.tv');
        const infoCommand = isTwitch
            ? `yt-dlp --skip-download --print-json --no-warnings "${url}"`
            : `yt-dlp --dump-json --no-warnings "${url}"`;

        const { stdout } = await execAsync(
            infoCommand,
            { maxBuffer: 10 * 1024 * 1024 } // 10MB buffer
        );

        const videoInfo = JSON.parse(stdout);

        // Extract relevant information
        const response = {
            title: videoInfo.title,
            thumbnail: videoInfo.thumbnail,
            duration: videoInfo.duration,
            uploader: videoInfo.uploader,
            platform: videoInfo.extractor_key,
            width: videoInfo.width,
            height: videoInfo.height,
            formats: videoInfo.formats
                ?.filter((f: any) => f.vcodec !== 'none' && f.acodec !== 'none')
                .map((f: any) => ({
                    formatId: f.format_id,
                    quality: f.format_note || f.resolution || 'unknown',
                    ext: f.ext,
                    filesize: f.filesize,
                }))
                .slice(0, 10) // Limit to top 10 formats
        };

        return NextResponse.json(response);

    } catch (error: any) {
        console.error('Video info error:', error);

        if (error.message?.includes('Unsupported URL')) {
            return NextResponse.json(
                { error: 'Unsupported platform or invalid URL' },
                { status: 400 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch video information. Please check the URL and try again.' },
            { status: 500 }
        );
    }
}
