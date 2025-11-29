"use client";
import { useState } from "react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ContactModal({ open, onClose }: ContactModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!email.trim()) {
      alert("Email is required.");
      return;
    }
    if (!message.trim()) {
      alert("Message is required.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("type", "contact");
    formData.append("email", email);
    formData.append("description", message);

    await fetch(
      "https://script.google.com/macros/s/AKfycbxWyYf2c_Rn3N5oj2jUHSUU4Ye8Z82RCg5yAyeksOOaNjhu34CRm10NdFU1idYGWJWF0Q/exec",
      {
        method: "POST",
        body: formData,
      }
    );

    setLoading(false);
    alert("Message Sent!");
    onClose();
  };

  if (!open) return null;

  return (
    <div className="modal-bg">
      <div className="modal">
        <h2>📩 Contact Us</h2>

        <input
          type="email"
          placeholder="Your Email (required)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <textarea
          placeholder="Your Message (required)"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button onClick={handleSubmit} disabled={loading}>
          {loading ? "Sending..." : "Send Message"}
        </button>
        <button onClick={onClose}>Cancel</button>
      </div>
    </div>
  );
}
