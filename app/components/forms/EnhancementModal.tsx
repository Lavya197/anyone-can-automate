"use client";
import { useState } from "react";

interface EnhancementModalProps {
  open: boolean;
  onClose: () => void;
}

export default function EnhancementModal({ open, onClose }: EnhancementModalProps) {
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!description.trim()) {
      alert("Enhancement description is required.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("type", "enhancement");
    formData.append("email", email);
    formData.append("description", description);

    await fetch(
      "https://script.google.com/macros/s/AKfycbxWyYf2c_Rn3N5oj2jUHSUU4Ye8Z82RCg5yAyeksOOaNjhu34CRm10NdFU1idYGWJWF0Q/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    setLoading(false);
    alert("Enhancement Submitted!");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>💡 Enhancement Suggestion</h2>

        <input
          type="email"
          placeholder="Email (optional)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Describe the enhancement (required)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Suggestion"}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
