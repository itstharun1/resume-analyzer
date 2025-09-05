require('dotenv').config();
const axios = require('axios');

const GEMINI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
const API_KEY = process.env.GOOGLE_API_KEY;

const PROMPT_TEMPLATE = (text) => `You are an expert technical recruiter and career coach. Analyze the resume text between triple quotes and return ONLY a single valid JSON object exactly matching the structure below. Do NOT include any explanation, headings, or extra text.

Resume Text:
"""${text}"""

JSON schema:
{
  "name": "string|null",
  "email": "string|null",
  "phone": "string|null",
  "linkedin_url": "string|null",
  "portfolio_url": "string|null",
  "summary": "string|null",
  "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
  "education": [{ "degree":"string", "institution":"string", "graduation_year":"string" }],
  "technical_skills": ["string"],
  "soft_skills": ["string"],
  "projects":[{ "name":"string","description":"string","technologies":["string"] }],
  "certifications":["string"],
  "resume_rating": "number (1-10)",
  "improvement_areas": "string",
  "upskill_suggestions":["string"]
}
`;

function extractJSONFromString(s) {
  if (!s) return null;

  // Remove Markdown fences if present
  s = s.replace(/```json/gi, "").replace(/```/g, "").trim();

  const first = s.indexOf("{");
  const last = s.lastIndexOf("}");
  if (first === -1 || last === -1) return null;

  const candidate = s.slice(first, last + 1);
  try {
    return JSON.parse(candidate);
  } catch (e) {
    console.error("JSON parse error:", e.message);
    return null;
  }
}

async function callGemini(prompt) {
  if (!API_KEY) throw new Error('Missing GOOGLE_API_KEY in environment');

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ]
  };

  const headers = {
    'Content-Type': 'application/json',
    'X-goog-api-key': API_KEY
  };

  const resp = await axios.post(GEMINI_ENDPOINT, body, { headers, timeout: 120000 });
  return resp.data;
}

exports.analyzeText = async function (resumeText) {
  try {
    const prompt = PROMPT_TEMPLATE(resumeText);
    const raw = await callGemini(prompt);

    // ✅ Correct: Extract the text where Gemini puts the JSON
    let textual = "";
    if (raw?.candidates?.[0]?.content?.parts?.[0]?.text) {
      textual = raw.candidates[0].content.parts[0].text;
    }

    const parsed = extractJSONFromString(textual);

    if (parsed) return parsed;

    // fallback if parsing fails
    return {
      name: null,
      email: null,
      phone: null,
      linkedin_url: null,
      portfolio_url: null,
      summary: null,
      work_experience: [],
      education: [],
      technical_skills: [],
      soft_skills: [],
      projects: [],
      certifications: [],
      resume_rating: 1,
      improvement_areas: "Could not parse response",
      upskill_suggestions: []
    };
  } catch (err) {
    console.error('Gemini call error:', err.message);
    return {
      name: "Fallback Name",
      email: "fallback@example.com",
      phone: null,
      linkedin_url: null,
      portfolio_url: null,
      summary: "Could not get AI analysis. This is fallback data.",
      work_experience: [],
      education: [],
      technical_skills: [],
      soft_skills: [],
      projects: [],
      certifications: [],
      resume_rating: 1,
      improvement_areas: "AI call failed",
      upskill_suggestions: []
    };
  }
};
