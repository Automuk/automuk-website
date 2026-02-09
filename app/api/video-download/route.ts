import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function POST(request: NextRequest) {
    try {
        const { url, formatId } = await request.json();

        if (!url) {
            return NextResponse.json(
                { error: 'URL is required' },
                { status: 400 }
            );
        }

        // Check if yt-dlp is installed
        try {
            await execAsync('yt-dlp --version');
        } catch (error) {
            return NextResponse.json(
                { error: 'yt-dlp is not installed on the server' },
                { status: 500 }
            );
        }

        // Build yt-dlp command
        const format = formatId || 'best';
        const command = `yt-dlp -f ${format} --no-warnings --print filename -o "%(title)s.%(ext)s" "${url}"`;

        // Get the filename first
        const { stdout: filename } = await execAsync(command);
        const trimmedFilename = filename.trim();

        // Download the video
        const isTwitch = url.includes('twitch.tv');
        const downloadCommand = isTwitch
            ? `yt-dlp -f "${format}" -o - "${url}"`
            : `yt-dlp -f ${format} --no-warnings -o - "${url}"`;

        const { stdout: videoBuffer } = await execAsync(
            downloadCommand,
            {
                encoding: 'buffer',
                maxBuffer: 500 * 1024 * 1024 // 500MB buffer
            }
        );

        // Determine content type based on file extension
        const ext = trimmedFilename.split('.').pop()?.toLowerCase();
        const contentType = ext === 'mp4' ? 'video/mp4' :
            ext === 'webm' ? 'video/webm' :
                ext === 'mkv' ? 'video/x-matroska' :
                    'video/mp4';

        // Safe filename for headers (RFC 5987)
        const safeFilename = encodeURIComponent(trimmedFilename);

        // Return the video stream
        return new NextResponse(videoBuffer, {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename*=UTF-8''${safeFilename}`,
                'Cache-Control': 'no-cache',
            },
        });

    } catch (error: any) {
        console.error('Video download error:', error);

        return NextResponse.json(
            { error: 'Failed to download video. The video may be private, age-restricted, or unavailable.' },
            { status: 500 }
        );
    }
}
