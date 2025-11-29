"use client";

import { useState } from "react";
import { uploadArtefact } from "@/utils/uploadArtefact";

interface BugReportModalProps {
  open: boolean;
  onClose: () => void;
}

export default function BugReportModal({ open, onClose }: BugReportModalProps) {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert("Bug Description is required.");
      return;
    }

    setLoading(true);

    // Upload artefact to Supabase
    let artefactUrl = "";
    if (file) {
      artefactUrl = await uploadArtefact(file);
    }

    // Prepare payload for Apps Script
    const formData = new FormData();
    formData.append("type", "bug");
    formData.append("email", email);
    formData.append("description", description);
    formData.append("steps", steps);
    formData.append("artefact", artefactUrl);

    await fetch(
      "https://script.google.com/macros/s/AKfycbxWyYf2c_Rn3N5oj2jUHSUU4Ye8Z82RCg5yAyeksOOaNjhu34CRm10NdFU1idYGWJWF0Q/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    setLoading(false);
    alert("Bug Report Submitted!");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>🐞 Report a Bug</h2>

        <input
          type="email"
          placeholder="Your Email (optional, used for bug reward credits)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Bug Description (required)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <textarea
          placeholder="Steps to Reproduce (optional)"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />

        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button disabled={loading} onClick={handleSubmit}>
          {loading ? "Submitting..." : "Submit Bug"}
        </button>

        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
