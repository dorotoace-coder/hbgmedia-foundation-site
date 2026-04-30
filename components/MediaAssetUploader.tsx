"use client";

import { useActionState, useState } from "react";
import { uploadMediaAsset, type AssetUploadResult } from "@/app/actions";

export default function MediaAssetUploader() {
  const [state, formAction, isPending] = useActionState<AssetUploadResult | null, FormData>(uploadMediaAsset, null);
  const [copied, setCopied] = useState(false);

  function copyUrl() {
    if (!state?.ok) return;
    void navigator.clipboard.writeText(state.assetUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  return (
    <section className="command-panel">
      <h2>Upload Media Asset</h2>
      <p>
        Upload sermon clips, worship clips, images, or audio files. The asset link can be attached to a video brief and used by Remotion templates.
      </p>
      <form action={formAction} className="form-grid">
        <div className="field">
          <label>Media Passcode</label>
          <input name="passcode" type="password" placeholder="Media passcode" required />
        </div>
        <div className="field">
          <label>Asset Title</label>
          <input name="title" placeholder="Sunday sermon clip" required />
        </div>
        <div className="field span-2">
          <label>Upload File</label>
          <input name="asset" type="file" accept="image/*,video/*,audio/*" required />
        </div>
        <div className="span-2 form-actions">
          <button className="btn btn-primary" type="submit" disabled={isPending}>
            {isPending ? "Uploading..." : "Upload Asset"}
          </button>
          {state ? (
            <p className={state.ok ? "form-message success" : "form-message error"}>
              {state.message}
            </p>
          ) : null}
        </div>
      </form>
      {state?.ok ? (
        <div className="asset-result">
          <div>
            <span>Asset URL</span>
            <strong>{state.assetUrl}</strong>
          </div>
          <button className="btn btn-secondary" type="button" onClick={copyUrl}>
            {copied ? "Copied" : "Copy URL"}
          </button>
        </div>
      ) : null}
    </section>
  );
}
