# Resume Analyzer (MERN) - Professional UI

This is a complete MERN project scaffold for the Resume Analyzer application.
It includes a backend that connects to MongoDB Atlas and calls Google Gemini via REST,
and a React frontend using Tailwind (via CDN) for a clean, professional UI.

## Quick start

1. Extract the zip.
2. Backend:
   - Open terminal -> `cd resume-analyzer/backend`
   - Install deps: `npm install`
   - Start server: `npm start`
3. Frontend:
   - Open another terminal -> `cd resume-analyzer/frontend`
   - Install deps: `npm install`
   - Start: `npm start`
4. Open `http://localhost:3000` in your browser.

## Notes
- The backend `.env` already contains the MongoDB URI and Gemini API key you provided.
- The Gemini REST call uses the public endpoint:
  `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`
  and sets header `X-goog-api-key`.
- If Gemini returns non-JSON text, the backend attempts to extract the JSON substring.
- Sample PDFs are in `sample_data/`.
- Tailwind is included via CDN in `public/index.html` for quick styling without build changes.

## Troubleshooting
- If upload fails: check backend terminal for detailed error logs.
- Ensure MongoDB Atlas allows connections from your IP (or 0.0.0.0/0).
- If Gemini key is invalid or rate-limited, the app falls back to a safe placeholder analysis.

