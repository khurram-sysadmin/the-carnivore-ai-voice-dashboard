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
