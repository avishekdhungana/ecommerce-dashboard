interface JwtPayload {
  sub?: number | string;
}

function decodeBase64Url(value: string): string {
  const base64 = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, "=");
  return atob(padded);
}

export function getUserIdFromToken(token: string): number | null {
  try {
    const [, encodedPayload] = token.split(".");
    if (!encodedPayload) return null;

    const payload = JSON.parse(decodeBase64Url(encodedPayload)) as JwtPayload;
    const userId = typeof payload.sub === "string" ? Number(payload.sub) : payload.sub;

    return typeof userId === "number" && Number.isInteger(userId) && userId > 0 ? userId : null;
  } catch {
    return null;
  }
}
