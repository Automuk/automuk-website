import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

function execWithTimeout(command: string, options: any, timeoutMs: number): Promise<{ stdout: string; stderr: string }> {
    return new Promise((resolve, reject) => {
        const child = exec(command, options, (error, stdout, stderr) => {
            if (error) {
                reject(error);
            } else {
                resolve({ stdout: String(stdout), stderr: String(stderr) });
            }
        });

        const timer = setTimeout(() => {
            child.kill('SIGTERM');
            reject(new Error('Command timed out'));
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
    let url = '';
    let platform = 'unknown';

    try {
        const body = await request.json();
        url = body.url;

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

        platform = detectPlatform(url);

        // Check if yt-dlp is installed
        try {
            await execAsync('yt-dlp --version');
        } catch (error) {
            return NextResponse.json(
                { error: 'yt-dlp is not installed on the server. Please install it using: pip install yt-dlp' },
                { status: 500 }
            );
        }

        // Build yt-dlp command based on platform
        let infoCommand: string;
        if (platform === 'twitch') {
            infoCommand = `yt-dlp --skip-download --print-json --no-warnings "${url}"`;
        } else if (platform === 'instagram') {
            infoCommand = `yt-dlp --dump-json --no-warnings --no-check-certificates "${url}"`;
        } else {
            infoCommand = `yt-dlp --dump-json --no-warnings "${url}"`;
        }

        const { stdout } = await execWithTimeout(
            infoCommand,
            { maxBuffer: 10 * 1024 * 1024 }, // 10MB buffer
            30000 // 30 second timeout
        );

        const videoInfo = JSON.parse(stdout);

        // Build format list — Instagram often has different format structures
        let formats;
        if (videoInfo.formats && videoInfo.formats.length > 0) {
            // First try: formats with both video and audio
            formats = videoInfo.formats
                .filter((f: any) => f.vcodec !== 'none' && f.acodec !== 'none')
                .map((f: any) => ({
                    formatId: f.format_id,
                    quality: f.format_note || f.resolution || f.height ? `${f.height || '?'}p` : 'unknown',
                    ext: f.ext,
                    filesize: f.filesize || f.filesize_approx,
                }));

            // Fallback: if no combined formats found (common for Instagram),
            // include video-only formats and let yt-dlp merge on download
            if (formats.length === 0) {
                formats = videoInfo.formats
                    .filter((f: any) => f.vcodec !== 'none')
                    .map((f: any) => ({
                        formatId: f.format_id,
                        quality: f.format_note || (f.height ? `${f.height}p` : f.resolution) || 'unknown',
                        ext: f.ext,
                        filesize: f.filesize || f.filesize_approx,
                    }));
            }

            // If still no formats, add a 'best' option
            if (formats.length === 0) {
                formats = [{
                    formatId: 'best',
                    quality: 'Best available',
                    ext: 'mp4',
                    filesize: null,
                }];
            }

            formats = formats.slice(0, 10);
        } else {
            // No formats array at all — provide a single "best" option
            formats = [{
                formatId: 'best',
                quality: 'Best available',
                ext: videoInfo.ext || 'mp4',
                filesize: videoInfo.filesize || videoInfo.filesize_approx || null,
            }];
        }

        // Extract relevant information
        const response = {
            title: videoInfo.title || videoInfo.description?.slice(0, 80) || 'Instagram Video',
            thumbnail: videoInfo.thumbnail || videoInfo.thumbnails?.[0]?.url || '',
            duration: videoInfo.duration,
            uploader: videoInfo.uploader || videoInfo.channel || videoInfo.uploader_id || 'Unknown',
            platform: videoInfo.extractor_key || platform,
            width: videoInfo.width,
            height: videoInfo.height,
            formats,
        };

        return NextResponse.json(response);

    } catch (error: any) {
        console.error('Video info error:', error);

        if (error.message?.includes('timed out')) {
            return NextResponse.json(
                { error: 'Request timed out. The video may require authentication or is not accessible.' },
                { status: 504 }
            );
        }

        if (error.message?.includes('Unsupported URL')) {
            return NextResponse.json(
                { error: 'Unsupported platform or invalid URL' },
                { status: 400 }
            );
        }

        if (error.message?.includes('login') || error.message?.includes('Login') || error.message?.includes('authentication') || error.message?.includes('Sign in') || error.message?.includes('empty media response') || error.message?.includes('Private video')) {
            const platformMessages: Record<string, string> = {
                instagram: 'This video requires authentication. Instagram private posts and stories cannot be downloaded without cookies.',
                youtube: 'This video is private or age-restricted and cannot be downloaded without authentication.',
            };
            const msg = platformMessages[platform] || 'This video requires authentication and cannot be downloaded.';
            return NextResponse.json(
                { error: msg },
                { status: 403 }
            );
        }

        return NextResponse.json(
            { error: 'Failed to fetch video information. Please check the URL and try again.' },
            { status: 500 }
        );
    }
}
