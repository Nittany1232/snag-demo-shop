const KEY = "aurora.session";

export interface Session {
  token: string;
}

/** The signed-in session, or null when the visitor is not signed in. */
export function getSession(): Session | null {
  return JSON.parse(localStorage.getItem(KEY) ?? "null");
}

/** Signs a first-time visitor in with a demo session. */
export function seedSession(): void {
  if (localStorage.getItem(KEY) === null) {
    localStorage.setItem(KEY, JSON.stringify({ token: "sess_demo" }));
  }
}

/** Expires the session (the "Introduce a bug" toggle). */
export function expireSession(): void {
  localStorage.removeItem(KEY);
}
