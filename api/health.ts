export default function handler(_req: any, res: any) {
  res.status(200).json({
    ok: true,
    service: "the-carnivore-ai-voice-dashboard",
    timestamp: new Date().toISOString()
  });
}
