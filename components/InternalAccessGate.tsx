"use client";

import { useActionState } from "react";
import { verifyInternalAccess, type AccessResult } from "@/app/actions";

export default function InternalAccessGate({
  title,
  description,
  children
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  const [state, formAction, isPending] = useActionState<AccessResult | null, FormData>(verifyInternalAccess, null);

  if (state?.ok) {
    return <>{children}</>;
  }

  return (
    <main className="dashboard-main admin-page">
      <header className="dashboard-header">
        <div>
          <div className="eyebrow">Internal Access</div>
          <h1>{title}</h1>
          <p>{description}</p>
        </div>
        <a className="btn btn-primary" href="/">Public Site</a>
      </header>
      <section className="command-panel">
        <h2>Worker Passcode</h2>
        <p>Enter the HBG internal passcode to continue.</p>
        <form action={formAction} className="form-grid">
          <div className="field">
            <label>Passcode</label>
            <input name="passcode" type="password" placeholder="Enter passcode" required />
          </div>
          <div className="form-actions">
            <button className="btn btn-primary" type="submit" disabled={isPending}>
              {isPending ? "Checking..." : "Enter"}
            </button>
            {state ? (
              <p className={state.ok ? "form-message success" : "form-message error"}>
                {state.message}
              </p>
            ) : null}
          </div>
        </form>
      </section>
    </main>
  );
}
