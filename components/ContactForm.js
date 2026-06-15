"use client";

import { useState } from "react";

const fieldClassName =
  "h-20 border border-[var(--color-ink)]/55 bg-white px-7 text-[1.05rem] text-[var(--color-ink)] outline-none transition placeholder:text-[#5f5f5f] focus:border-[#ef7b5d]";

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    location: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState({
    type: "",
    message: ""
  });

  function updateField(field, value) {
    setForm((current) => ({
      ...current,
      [field]: value
    }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setStatus({
          type: "error",
          message: data.error || "Failed to send message."
        });
        setIsSubmitting(false);
        return;
      }

      setStatus({
        type: "success",
        message: "Your message has been sent successfully."
      });

      setForm({
        name: "",
        phone: "",
        email: "",
        location: "",
        message: ""
      });
    } catch (error) {
      setStatus({
        type: "error",
        message: "Something went wrong. Please try again."
      });
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8">
      <div className="grid gap-8 md:grid-cols-2">
        <input
          type="text"
          placeholder="Your Name"
          value={form.name}
          onChange={(event) => updateField("name", event.target.value)}
          className={fieldClassName}
          required
        />
        <input
          type="tel"
          placeholder="Mobile Number"
          value={form.phone}
          onChange={(event) => updateField("phone", event.target.value)}
          className={fieldClassName}
          required
        />
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <input
          type="email"
          placeholder="Email Address"
          value={form.email}
          onChange={(event) => updateField("email", event.target.value)}
          className={fieldClassName}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={(event) => updateField("location", event.target.value)}
          className={fieldClassName}
        />
      </div>

      <textarea
        placeholder="Message"
        rows={6}
        value={form.message}
        onChange={(event) => updateField("message", event.target.value)}
        className="min-h-[11rem] border border-[var(--color-ink)]/55 bg-white px-7 py-5 text-[1.05rem] text-[var(--color-ink)] outline-none transition placeholder:text-[#5f5f5f] focus:border-[#ef7b5d]"
        required
      />

      {status.message ? (
        <div
          className={`border px-5 py-4 text-[1rem] ${
            status.type === "success"
              ? "border-green-600 bg-green-50 text-green-800"
              : "border-red-500 bg-red-50 text-red-700"
          }`}
        >
          {status.message}
        </div>
      ) : null}

      <div className="flex justify-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-3 bg-[#ef7b5d] px-10 py-5 text-[1.15rem] font-semibold text-white transition hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Submit"}
          <span className="text-xl">↗</span>
        </button>
      </div>
    </form>
  );
}
