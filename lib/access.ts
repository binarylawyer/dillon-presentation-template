import "server-only";
import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";

/**
 * Node-only access store. Reads/writes the repo config files and handles
 * bcrypt hashing. The repo is the source of truth; on Vercel the filesystem
 * is read-only, so writes throw ReadOnlyError — manage locally, commit, push.
 */

export interface User {
  email: string;
  username: string;
  role: "admin" | "viewer";
  passwordHash: string;
}
/** User shape safe to send to the client (no hash). */
export type SafeUser = Omit<User, "passwordHash">;

export interface DeckAccess {
  protected: boolean;
}
export type DecksAccess = Record<string, DeckAccess>;

const USERS_PATH = path.join(process.cwd(), "config", "users.json");
const DECKS_PATH = path.join(process.cwd(), "config", "decks-access.json");

export class ReadOnlyError extends Error {
  constructor() {
    super(
      "Configuration is read-only in this environment. Run the app locally, make changes, then commit and push.",
    );
    this.name = "ReadOnlyError";
  }
}

export function isReadOnly(): boolean {
  // Vercel (and most serverless) ship a read-only app filesystem.
  return process.env.VERCEL === "1" || process.env.READ_ONLY_CONFIG === "1";
}

async function readJson<T>(p: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(p, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(p: string, data: unknown): Promise<void> {
  if (isReadOnly()) throw new ReadOnlyError();
  await fs.writeFile(p, JSON.stringify(data, null, 2) + "\n", "utf8");
}

// ---- Users ----
export async function readUsers(): Promise<User[]> {
  const data = await readJson<{ users: User[] }>(USERS_PATH, { users: [] });
  return data.users ?? [];
}
export async function readSafeUsers(): Promise<SafeUser[]> {
  return (await readUsers()).map(({ passwordHash: _omit, ...u }) => u);
}
async function writeUsers(users: User[]): Promise<void> {
  await writeJson(USERS_PATH, { users });
}

export async function verifyCredentials(
  identifier: string,
  password: string,
): Promise<User | null> {
  const id = identifier.trim().toLowerCase();
  const user = (await readUsers()).find(
    (u) => u.email.toLowerCase() === id || u.username.toLowerCase() === id,
  );
  if (!user) return null;
  return (await bcrypt.compare(password, user.passwordHash)) ? user : null;
}

export async function addUser(input: {
  email: string;
  username: string;
  role: "admin" | "viewer";
  password: string;
}): Promise<void> {
  const users = await readUsers();
  const email = input.email.trim().toLowerCase();
  if (users.some((u) => u.email.toLowerCase() === email)) {
    throw new Error(`A user with email ${email} already exists.`);
  }
  users.push({
    email,
    username: input.username.trim(),
    role: input.role,
    passwordHash: await bcrypt.hash(input.password, 10),
  });
  await writeUsers(users);
}

export async function updateUser(
  email: string,
  changes: { username?: string; role?: "admin" | "viewer"; password?: string },
): Promise<void> {
  const users = await readUsers();
  const user = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user) throw new Error(`No user found for ${email}.`);
  if (changes.username !== undefined) user.username = changes.username.trim();
  if (changes.role !== undefined) user.role = changes.role;
  if (changes.password) user.passwordHash = await bcrypt.hash(changes.password, 10);
  await writeUsers(users);
}

export async function deleteUser(email: string): Promise<void> {
  const users = await readUsers();
  const next = users.filter(
    (u) => u.email.toLowerCase() !== email.toLowerCase(),
  );
  if (next.length === users.length) throw new Error(`No user found for ${email}.`);
  if (next.filter((u) => u.role === "admin").length === 0) {
    throw new Error("Cannot delete the last admin user.");
  }
  await writeUsers(next);
}

// ---- Deck access ----
export async function readDecksAccess(): Promise<DecksAccess> {
  return readJson<DecksAccess>(DECKS_PATH, {});
}

export async function setDeckProtected(
  slug: string,
  isProtected: boolean,
): Promise<void> {
  const access = await readDecksAccess();
  access[slug] = { protected: isProtected };
  await writeJson(DECKS_PATH, access);
}
