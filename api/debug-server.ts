export default async function handler(_req: any, res: any) {
  try {
    process.env.VERCEL = process.env.VERCEL || "1";
    const serverModule = await import("../server");
    res.status(200).json({
      ok: true,
      exports: Object.keys(serverModule)
    });
  } catch (error: any) {
    res.status(500).json({
      ok: false,
      name: error?.name,
      message: error?.message,
      stack: error?.stack
    });
  }
}
