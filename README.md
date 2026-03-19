# Media Downloader - Premium Edition 🎨

A premium-grade local-use web app that allows you to paste YouTube Shorts or Instagram Reels URLs and receive direct downloadable video links. Supports quality selection (Best, 720p, 1080p) with a modern, fully-featured UI/UX. **For local development and educational purposes only.**

## ⭐ Premium Features

- **Dark/Light Theme Toggle** - Switch between themes with preference persistence
- **Drag & Drop Input** - Paste or drag URLs directly
- **Real-time Progress** - Visual progress bar during processing
- **Download History** - Last 5 downloads saved locally with timestamps
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Smooth Animations** - Glass morphism effects and micro-interactions
- **Features Showcase** - Beautiful component cards highlighting app benefits
- **LocalStorage** - Theme and history persist across sessions

## 🎯 UI/UX Highlights

### Visual Design
- **Glass Morphism** - Modern frosted glass effect on main container
- **Animated Backgrounds** - Floating orbs with smooth animations
- **Gradient Buttons** - Beautiful color gradients with glow effects
- **Theme System** - Complete dark and light theme support with CSS variables
- **Micro-interactions** - Smooth hover effects, button lifts, pulsing icons

### Components
- **Drag & Drop Zone** - Visual area with bouncing icon for URL input
- **Quality Selection Cards** - Radio buttons styled as visual selection cards
- **Progress Indicator** - Real-time progress bar with percentage display
- **Status Messages** - Success/error alerts with icons and animations
- **Download Ready Card** - Prominent card with pulsing icon when ready
- **Features Showcase** - 4 feature cards highlighting app capabilities
- **Download History** - Recently downloaded items with clear functionality
- **Theme Toggle** - Fixed button to switch between dark/light modes

### Responsive Features
- **Mobile Optimized** - Touch-friendly design for phones (< 480px)
- **Tablet Support** - Perfect layout for tablets (480px - 768px)
- **Desktop Enhanced** - Full features on large screens (> 768px)
- **Adaptive Grids** - Layouts adjust based on screen size
- **Flexible Typography** - Font sizes scale appropriately

## 📂 Folder Structure

```
media-downloader/
├── backend/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   ├── PREMIUM_UI.md          # Detailed UI/UX documentation
│   └── src/
│       ├── main.jsx
│       ├── App.jsx             # 330 lines - All premium features
│       ├── App.css             # 796 lines - Complete styling system
│       ├── index.css
│       └── assets/
└── README.md
```

## Prerequisites

- **Node.js** (v18 or later recommended)
- **yt-dlp** – must be installed and available in your system PATH

## Installing yt-dlp

### Windows (using winget)
```bash
winget install yt-dlp
```

### Windows (manual)
1. Download from https://github.com/yt-dlp/yt-dlp/releases
2. Extract `yt-dlp.exe` to a folder (e.g. `C:\tools`)
3. Add that folder to your system PATH

### macOS
```bash
brew install yt-dlp
```

### Linux
```bash
sudo curl -L https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp -o /usr/local/bin/yt-dlp
sudo chmod a+rx /usr/local/bin/yt-dlp
```

Verify installation:
```bash
yt-dlp --version
```

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd backend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

The backend runs on **http://localhost:5000**

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd frontend
   ```

2. Install dependencies (if not already done):
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The frontend runs on **http://localhost:5173** (Vite default)

## Running Both Servers

Open **two terminal windows**:

**Terminal 1 – Backend:**
```bash
cd backend
npm start
```

**Terminal 2 – Frontend:**
```bash
cd frontend
npm run dev
```

Then open http://localhost:5173 in your browser.

## 🎨 Frontend Documentation

For detailed information about the premium UI/UX features, see [frontend/PREMIUM_UI.md](frontend/PREMIUM_UI.md)

This includes:
- Complete feature breakdown
- Customization guide
- Responsive design details
- Animation explanations
- Browser compatibility
- Accessibility guidelines

## Usage

1. Copy a YouTube Shorts or Instagram Reels URL
2. Paste it into the input field
3. Select quality (Best, 720p, or 1080p)
4. Click **Get Download Link**
5. When ready, click **Download Video** to save the file

## API

**POST** `/download`

Request body:
```json
{
  "url": "https://youtube.com/shorts/xxxxx",
  "quality": "best"
}
```

`quality` is optional: `"best"` (default), `"720"`, or `"1080"`.

Response (success):
```json
{
  "downloadUrl": "https://..."
}
```

Response (error):
```json
{
  "error": "Error message"
}
```
