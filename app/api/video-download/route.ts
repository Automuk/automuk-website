import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

function execBufferWithTimeout(command: string, options: any, timeoutMs: number): Promise<{ stdout: Buffer }> {
    return new Promise((resolve, reject) => {
        const child = exec(command, options, (error, stdout) => {
            if (error) {
                reject(error);
            } else {
                resolve({ stdout: stdout as Buffer });
            }
        });

        const timer = setTimeout(() => {
            child.kill('SIGTERM');
            reject(new Error('Download timed out'));
        }, timeoutMs);

        child.on('exit', () => clearTimeout(timer));
    });
}

function detectPlatform(url: string): string {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('instagram.com')) return 'instagram';
    if (url.includes('twitch.tv')) return 'twitch';
    return 'unknown';
}

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

        const platform = detectPlatform(url);
        const format = formatId || 'best';

        // Build yt-dlp flags based on platform
        const platformFlags = platform === 'instagram'
            ? '--no-check-certificates --extractor-args "instagram:api_type=graphql"'
            : '';

        // Get the filename first
        const filenameCommand = `yt-dlp -f ${format} --no-warnings ${platformFlags} --print filename -o "%(title)s.%(ext)s" "${url}"`;
        const { stdout: filename } = await execAsync(filenameCommand, { timeout: 30000 });
        const trimmedFilename = filename.trim() || 'video.mp4';

        // Build download command
        let downloadCommand: string;
        if (platform === 'twitch') {
            downloadCommand = `yt-dlp -f "${format}" -o - "${url}"`;
        } else if (platform === 'instagram') {
            downloadCommand = `yt-dlp -f ${format} --no-warnings --no-check-certificates --extractor-args "instagram:api_type=graphql" -o - "${url}"`;
        } else {
            downloadCommand = `yt-dlp -f ${format} --no-warnings -o - "${url}"`;
        }

        const { stdout: videoBuffer } = await execBufferWithTimeout(
            downloadCommand,
            {
                encoding: 'buffer',
                maxBuffer: 500 * 1024 * 1024 // 500MB buffer
            },
            6000 // 2 minute timeout for download
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
        return new NextResponse(new Uint8Array(videoBuffer), {
            headers: {
                'Content-Type': contentType,
                'Content-Disposition': `attachment; filename*=UTF-8''${safeFilename}`,
                'Cache-Control': 'no-cache',
            },
        });

    } catch (error: any) {
        console.error('Video download error:', error);

        if (error.message?.includes('timed out') || error.message?.includes('Download timed out')) {
            return NextResponse.json(
                { error: 'Download timed out. The video may be too large or the server is under load.' },
                { status: 504 }
            );
        }

        if (error.message?.includes('login') || error.message?.includes('Login')) {
            return NextResponse.json(
                { error: 'This video requires authentication and cannot be downloaded.' },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to download video. The video may be private, age-restricted, or unavailable.' },
            { status: 500 }
        );
    }
}
