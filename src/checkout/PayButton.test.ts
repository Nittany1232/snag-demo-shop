import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock the charge network call so the test never hits fetch.
vi.mock("./api", () => ({
  charge: vi.fn(() => Promise.resolve(new Response(null, { status: 200 }))),
}));

// Minimal in-memory localStorage so getSession()/expireSession() work in node.
class MemoryStorage {
  private store = new Map<string, string>();
  getItem(key: string): string | null {
    return this.store.has(key) ? (this.store.get(key) as string) : null;
  }
  setItem(key: string, value: string): void {
    this.store.set(key, String(value));
  }
  removeItem(key: string): void {
    this.store.delete(key);
  }
  clear(): void {
    this.store.clear();
  }
}

import { charge } from "./api";
import { performPay } from "./PayButton";
import { expireSession, seedSession } from "../session";

beforeEach(() => {
  // @ts-expect-error - assigning a test double for localStorage
  globalThis.localStorage = new MemoryStorage();
  vi.mocked(charge).mockClear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("performPay (PayButton pay flow)", () => {
  it("does not throw and does not charge when there is no active session", async () => {
    expireSession(); // ensure getSession() returns null

    // Before the fix this rejects with TypeError: Cannot read properties of
    // null (reading 'token'). After the fix it resolves to false.
    await expect(performPay()).resolves.toBe(false);
    expect(charge).not.toHaveBeenCalled();
  });

  it("charges with the session token when a valid session exists", async () => {
    seedSession(); // writes { token: "sess_demo" }

    await expect(performPay()).resolves.toBe(true);
    expect(charge).toHaveBeenCalledTimes(1);
    expect(charge).toHaveBeenCalledWith("sess_demo");
  });
});
