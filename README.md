# The Carnivore AI Voice Dashboard

Dashboard for The Carnivore's Zara agent.

Zara conversations run through ElevenLabs, not Gemini:

- Voice calls use the ElevenLabs Conversational AI browser session.
- Text chat uses the same ElevenLabs agent in `textOnly` mode.
- Completed customer actions are handled by the n8n workflow and stored in Supabase.

## Local Setup

1. Install dependencies:
   `npm install`
2. Copy `.env.example` to `.env` and set the required values:
   - `ELEVENLABS_AGENT_ID`
   - `ELEVENLABS_API_KEY`
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `OWNER_EMAIL`
   - `OWNER_PASSWORD`
   - `OWNER_SESSION_SECRET`
3. Run the app:
   `npm run dev`

## Build

Run `npm run build` before deploying.

## Production ElevenLabs Configuration

The application reads the agent configuration from server-side environment variables. In Vercel, define these values for Production, Preview, and Development:

- `ELEVENLABS_AGENT_ID`
- `VITE_ELEVENLABS_AGENT_ID`
- `ELEVENLABS_API_KEY`

Both agent-ID variables should identify the same ElevenLabs agent. Keep the API key only in Vercel or a local ignored `.env` file; never commit it.

The current production agent is Zara (`Carnivore Voice Agent`). Its ElevenLabs-side configuration includes the restaurant system prompt, menu knowledge base, n8n webhook tool, authenticated conversation sessions, and the end-call system tool.
