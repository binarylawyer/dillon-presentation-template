"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, KeyRound, Pencil, Trash2, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  addUserAction,
  deleteUserAction,
  setPresentationPasswordAction,
  toggleDeckAction,
  updateUserAction,
  type ActionResult,
} from "./actions";
import type { SafeUser } from "@/lib/access";

interface DeckRow {
  slug: string;
  title: string;
  protected: boolean;
}

export function AdminClient({
  decks,
  users,
  readOnly,
  currentEmail,
  gateSet,
}: {
  decks: DeckRow[];
  users: SafeUser[];
  readOnly: boolean;
  currentEmail: string;
  gateSet: boolean;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();

  function run(fn: () => Promise<ActionResult>, onOk?: () => void) {
    setError(undefined);
    startTransition(async () => {
      const res = await fn();
      if (res.ok) {
        onOk?.();
        router.refresh();
      } else {
        setError(res.error);
      }
    });
  }

  return (
    <div className="mt-10 flex flex-col gap-12">
      {readOnly ? (
        <div className="flex items-start gap-3 border-l-4 border-brass bg-cloud px-5 py-4">
          <AlertTriangle size={18} className="mt-0.5 shrink-0 text-brass-deep" />
          <p className="m-0 max-w-none text-sm leading-relaxed text-slate">
            <b className="text-navy">Read-only environment.</b> Editing is disabled
            here (the deployed filesystem is read-only). Run the platform locally
            (<code>npm run dev</code>), make changes, then commit and push — Vercel
            redeploys with the new access config.
          </p>
        </div>
      ) : null}

      {error ? (
        <div className="border-l-4 border-negative bg-negative-soft px-5 py-3 text-sm text-negative">
          {error}
        </div>
      ) : null}

      {/* Presentations */}
      <section>
        <SectionHead
          title="Presentations"
          note="Toggle whether a deck requires sign-in to view."
        />
        <div className="card mt-4 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Deck</TableHead>
                <TableHead>Path</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Require login</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {decks.map((d) => (
                <TableRow key={d.slug}>
                  <TableCell className="font-display text-base text-navy">
                    {d.title}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-mid">
                    /{d.slug}
                  </TableCell>
                  <TableCell>
                    <Badge variant={d.protected ? "protected" : "public"}>
                      {d.protected ? "Protected" : "Public"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Switch
                      checked={d.protected}
                      disabled={readOnly || pending}
                      onCheckedChange={(v) =>
                        run(() => toggleDeckAction(d.slug, v))
                      }
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      {/* Presentation password */}
      <PresentationPasswordSection
        gateSet={gateSet}
        disabled={readOnly || pending}
        onSubmit={(password) =>
          run(() => setPresentationPasswordAction(password))
        }
      />

      {/* Users */}
      <section>
        <div className="flex items-end justify-between">
          <SectionHead
            title="Access records"
            note="Accounts that can sign in to protected presentations."
          />
          <AddUserDialog
            disabled={readOnly || pending}
            onSubmit={(input, close) =>
              run(() => addUserAction(input), close)
            }
          />
        </div>
        <div className="card mt-4 overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Username</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead className="text-right">Manage</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((u) => (
                <TableRow key={u.email}>
                  <TableCell className="font-medium text-navy">
                    {u.username}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-mid">
                    {u.email}
                  </TableCell>
                  <TableCell>
                    <Badge variant={u.role === "admin" ? "admin" : "default"}>
                      {u.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <EditUserDialog
                        user={u}
                        disabled={readOnly || pending}
                        onSubmit={(changes, close) =>
                          run(() => updateUserAction(u.email, changes), close)
                        }
                      />
                      <PasswordDialog
                        user={u}
                        disabled={readOnly || pending}
                        onSubmit={(password, close) =>
                          run(
                            () => updateUserAction(u.email, { password }),
                            close,
                          )
                        }
                      />
                      <DeleteUserDialog
                        user={u}
                        disabled={
                          readOnly ||
                          pending ||
                          u.email === currentEmail
                        }
                        onConfirm={(close) =>
                          run(() => deleteUserAction(u.email), close)
                        }
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </div>
  );
}

function PresentationPasswordSection({
  gateSet,
  disabled,
  onSubmit,
}: {
  gateSet: boolean;
  disabled: boolean;
  onSubmit: (password: string) => void;
}) {
  const [password, setPassword] = useState("");
  return (
    <section>
      <SectionHead
        title="Presentation password"
        note="A single shared password (Vimeo-style) that unlocks every protected deck. Hand this out to viewers."
      />
      <div className="card mt-4 flex flex-col gap-4 p-6 sm:flex-row sm:items-end">
        <div className="flex flex-1 flex-col gap-1.5">
          <Label>{gateSet ? "Set a new password" : "Set the password"}</Label>
          <Input
            type="text"
            placeholder={gateSet ? "•••••••• (a password is set)" : "Enter a password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button
          disabled={disabled || !password}
          onClick={() => {
            onSubmit(password);
            setPassword("");
          }}
        >
          {gateSet ? "Update password" : "Set password"}
        </Button>
      </div>
    </section>
  );
}

function SectionHead({ title, note }: { title: string; note: string }) {
  return (
    <div>
      <h2 className="font-display text-[24px] font-medium text-navy">{title}</h2>
      <p className="mt-1 max-w-none text-sm text-slate-mid">{note}</p>
    </div>
  );
}

function RoleSelect({
  value,
  onChange,
}: {
  value: "admin" | "viewer";
  onChange: (v: "admin" | "viewer") => void;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as "admin" | "viewer")}
      className="h-9 w-full rounded-[2px] border border-line-strong bg-white px-3 font-sans text-sm text-char focus-visible:border-navy focus-visible:outline-none"
    >
      <option value="viewer">viewer</option>
      <option value="admin">admin</option>
    </select>
  );
}

function AddUserDialog({
  disabled,
  onSubmit,
}: {
  disabled: boolean;
  onSubmit: (
    input: {
      email: string;
      username: string;
      role: "admin" | "viewer";
      password: string;
    },
    close: () => void,
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState<"admin" | "viewer">("viewer");
  const [password, setPassword] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button disabled={disabled} size="sm">
          <Plus size={15} /> Add record
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add access record</DialogTitle>
          <DialogDescription>
            Creates a sign-in account. The password is stored hashed (bcrypt).
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Field label="Email">
            <Input value={email} onChange={(e) => setEmail(e.target.value)} />
          </Field>
          <Field label="Username">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>
          <Field label="Role">
            <RoleSelect value={role} onChange={setRole} />
          </Field>
          <Field label="Password">
            <Input
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Field>
        </div>
        <Button
          onClick={() =>
            onSubmit({ email, username, role, password }, () => {
              setOpen(false);
              setEmail("");
              setUsername("");
              setPassword("");
              setRole("viewer");
            })
          }
        >
          Create record
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function EditUserDialog({
  user,
  disabled,
  onSubmit,
}: {
  user: SafeUser;
  disabled: boolean;
  onSubmit: (
    changes: { username?: string; role?: "admin" | "viewer" },
    close: () => void,
  ) => void;
}) {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [role, setRole] = useState<"admin" | "viewer">(user.role);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" disabled={disabled} title="Edit">
          <Pencil size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit {user.email}</DialogTitle>
          <DialogDescription>Update the username or role.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          <Field label="Username">
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Field>
          <Field label="Role">
            <RoleSelect value={role} onChange={setRole} />
          </Field>
        </div>
        <Button onClick={() => onSubmit({ username, role }, () => setOpen(false))}>
          Save changes
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function PasswordDialog({
  user,
  disabled,
  onSubmit,
}: {
  user: SafeUser;
  disabled: boolean;
  onSubmit: (password: string, close: () => void) => void;
}) {
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={disabled}
          title="Change password"
        >
          <KeyRound size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change password</DialogTitle>
          <DialogDescription>
            Set a new password for {user.email}. It is stored hashed.
          </DialogDescription>
        </DialogHeader>
        <Field label="New password">
          <Input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Field>
        <Button
          disabled={!password}
          onClick={() =>
            onSubmit(password, () => {
              setOpen(false);
              setPassword("");
            })
          }
        >
          Update password
        </Button>
      </DialogContent>
    </Dialog>
  );
}

function DeleteUserDialog({
  user,
  disabled,
  onConfirm,
}: {
  user: SafeUser;
  disabled: boolean;
  onConfirm: (close: () => void) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          disabled={disabled}
          title="Delete"
          className="text-slate-mid hover:text-negative"
        >
          <Trash2 size={15} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete access record</DialogTitle>
          <DialogDescription>
            Remove {user.email}? They will no longer be able to sign in. This
            cannot be undone.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={() => onConfirm(() => setOpen(false))}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label>{label}</Label>
      {children}
    </div>
  );
}
