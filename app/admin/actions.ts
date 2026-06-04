"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { SESSION_COOKIE, verifySession } from "@/lib/session";
import {
  addUser,
  deleteUser,
  ReadOnlyError,
  setDeckProtected,
  setPresentationPassword,
  updateUser,
} from "@/lib/access";

export interface ActionResult {
  ok: boolean;
  error?: string;
}

async function requireAdmin() {
  const store = await cookies();
  const session = await verifySession(store.get(SESSION_COOKIE)?.value);
  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized");
  }
  return session;
}

function toResult(e: unknown): ActionResult {
  if (e instanceof ReadOnlyError) return { ok: false, error: e.message };
  return { ok: false, error: e instanceof Error ? e.message : "Unknown error." };
}

export async function toggleDeckAction(
  slug: string,
  isProtected: boolean,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    await setDeckProtected(slug, isProtected);
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return toResult(e);
  }
}

export async function setPresentationPasswordAction(
  password: string,
): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!password) return { ok: false, error: "Password is required." };
    await setPresentationPassword(password);
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return toResult(e);
  }
}

export async function addUserAction(input: {
  email: string;
  username: string;
  role: "admin" | "viewer";
  password: string;
}): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!input.email || !input.username || !input.password) {
      return { ok: false, error: "Email, username and password are required." };
    }
    await addUser(input);
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return toResult(e);
  }
}

export async function updateUserAction(
  email: string,
  changes: { username?: string; role?: "admin" | "viewer"; password?: string },
): Promise<ActionResult> {
  try {
    await requireAdmin();
    await updateUser(email, changes);
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return toResult(e);
  }
}

export async function deleteUserAction(email: string): Promise<ActionResult> {
  try {
    await requireAdmin();
    await deleteUser(email);
    revalidatePath("/admin");
    return { ok: true };
  } catch (e) {
    return toResult(e);
  }
}
