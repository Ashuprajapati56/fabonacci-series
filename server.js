/**
 * Media Downloader - Backend Server
 * Local/educational use only. Extracts direct video URLs from YouTube Shorts & Instagram Reels.
 * Requires yt-dlp to be installed on the system.
 */

const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');

/**
 * Runs yt-dlp with format and -g to get direct video URL.
 * Supports YouTube, Instagram Reels, and quality selection.
 * Uses spawn (not exec) to avoid shell injection.
 */
function getDirectUrl(url, quality) {
  return new Promise((resolve, reject) => {
    let formatOption = 'best';
    if (quality === '720') {
      formatOption = 'bestvideo[height<=720]+bestaudio/best[height<=720]';
    } else if (quality === '1080') {
      formatOption = 'bestvideo[height<=1080]+bestaudio/best[height<=1080]';
    }

    const args = ['-f', formatOption, '-g', url];
    const proc = spawn('yt-dlp', args);
    const TIMEOUT_MS = 30000;
    let settled = false;
    let stdout = '';
    let stderr = '';

    const timeout = setTimeout(() => {
      if (settled) return;
      settled = true;
      proc.kill('SIGTERM');
      reject(new Error('Request timed out'));
    }, TIMEOUT_MS);

    proc.stdout.on('data', (data) => { stdout += data.toString(); });
    proc.stderr.on('data', (data) => { stderr += data.toString(); });

    proc.on('close', (code, signal) => {
      clearTimeout(timeout);
      if (settled) return;
      settled = true;
      if (code === 0) {
        // yt-dlp may return multiple URLs for merged formats; take first
        const downloadUrl = stdout.trim().split('\n')[0];
        resolve(downloadUrl);
      } else {
        const err = new Error(stderr || `yt-dlp exited with code ${code}`);
        err.stderr = stderr;
        err.code = code;
        reject(err);
      }
    });

    proc.on('error', (err) => {
      clearTimeout(timeout);
      if (settled) return;
      settled = true;
      reject(err);
    });
  });
}

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

/**
 * POST /download
 * Body: { "url": "https://...", "quality": "best" | "720" | "1080" }
 * Supports YouTube Shorts, YouTube videos, and Instagram Reels.
 */
app.post('/download', async (req, res) => {
  try {
    const { url, quality } = req.body;

    if (!url || typeof url !== 'string') {
      return res.status(400).json({
        error: 'URL is required. Please provide a valid YouTube or Instagram URL.',
      });
    }

    const trimmedUrl = url.trim();
    if (!trimmedUrl) {
      return res.status(400).json({
        error: 'URL cannot be empty.',
      });
    }

    const downloadUrl = await getDirectUrl(trimmedUrl, quality || 'best');

    if (!downloadUrl) {
      console.error('yt-dlp returned empty URL for:', trimmedUrl);
      return res.status(500).json({
        error: 'Could not extract video URL. The video may be private, restricted, or unavailable.',
      });
    }

    return res.status(200).json({ downloadUrl });
  } catch (error) {
    console.error('Download endpoint error:', error);

    if (error.code === 'ENOENT') {
      return res.status(503).json({
        error: 'yt-dlp is not installed. Please install yt-dlp and ensure it is in your PATH.',
      });
    }

    if (error.killed || error.signal || error.message === 'Request timed out') {
      return res.status(504).json({
        error: 'Request timed out. The video may be too large or the service is slow.',
      });
    }

    if (error.stderr && error.stderr.includes('Unsupported URL')) {
      return res.status(400).json({
        error: 'Unsupported URL. Please provide a valid YouTube Shorts, YouTube video, or Instagram Reels URL.',
      });
    }

    return res.status(500).json({
      error: error.message || 'Failed to extract video URL. Please check the URL and try again.',
    });
  }
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Media Downloader API is running' });
});

app.listen(PORT, () => {
  console.log(`Media Downloader backend running on http://localhost:${PORT}`);
  console.log('POST /download - YouTube Shorts & Instagram Reels');
});
