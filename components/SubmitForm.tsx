"use client";

import { useActionState } from "react";

type ActionResult = {
  ok: boolean;
  message: string;
};

export default function SubmitForm({
  action,
  children,
  submitLabel = "Submit"
}: {
  action: (state: ActionResult | null, formData: FormData) => Promise<ActionResult>;
  children: React.ReactNode;
  submitLabel?: string;
}) {
  const [state, formAction, isPending] = useActionState(action, null);

  return (
    <form action={formAction} className="form-grid">
      {children}
      <div className="span-2 form-actions">
        <button className="btn btn-primary" type="submit" disabled={isPending}>
          {isPending ? "Saving..." : submitLabel}
        </button>
        {state ? (
          <p className={state.ok ? "form-message success" : "form-message error"}>
            {state.message}
          </p>
        ) : null}
      </div>
    </form>
  );
}
