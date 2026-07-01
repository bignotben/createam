"use client";

import { useState, type FormEvent } from "react";

import type { Service } from "@/lib/types";

const WEB3FORMS_ACCESS_KEY =
  process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

type Status = "idle" | "submitting" | "success" | "error";

export function ContactForm({ services }: { services: Service[] }) {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("access_key", WEB3FORMS_ACCESS_KEY);
    formData.append("subject", "Novi upit sa Createam sajta");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });
      const result = await res.json();
      if (result.success) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="border border-border bg-bg-alt p-10 md:p-12">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-full bg-accent text-xl text-bg">
          ✓
        </div>
        <h3 className="mb-3 text-2xl font-semibold tracking-[-0.02em]">Hvala na upitu!</h3>
        <p className="max-w-[42ch] text-[17px] leading-relaxed text-ink-muted">
          Javljamo se u roku od 24 sata s prijedlogom termina za poziv.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className="text-sm text-ink-muted">Ime i prezime</span>
          <input
            type="text"
            name="name"
            required
            placeholder="Vaše ime"
            className="w-full rounded-flat border border-border bg-bg px-4 py-3.5 text-base text-ink focus:border-accent focus:outline-none"
          />
        </label>
        <label className="flex flex-col gap-2">
          <span className="text-sm text-ink-muted">Email</span>
          <input
            type="email"
            name="email"
            required
            placeholder="vas@email.com"
            className="w-full rounded-flat border border-border bg-bg px-4 py-3.5 text-base text-ink focus:border-accent focus:outline-none"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-ink-muted">
          Kompanija <span className="text-ink-faint">(opciono)</span>
        </span>
        <input
          type="text"
          name="company"
          placeholder="Naziv kompanije"
          className="w-full rounded-flat border border-border bg-bg px-4 py-3.5 text-base text-ink focus:border-accent focus:outline-none"
        />
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-ink-muted">Koja usluga vas interesuje</span>
        <select
          name="service"
          defaultValue=""
          className="w-full appearance-none rounded-flat border border-border bg-bg px-4 py-3.5 text-base text-ink focus:border-accent focus:outline-none"
        >
          <option value="">Nisam siguran/na — predložite</option>
          {services.map((s) => (
            <option key={s.id} value={s.title}>
              {s.title}
            </option>
          ))}
        </select>
      </label>
      <label className="flex flex-col gap-2">
        <span className="text-sm text-ink-muted">Kratko opišite šta vam treba</span>
        <textarea
          name="message"
          rows={5}
          placeholder="Nekoliko rečenica o projektu…"
          className="w-full resize-y rounded-flat border border-border bg-bg px-4 py-3.5 text-base text-ink focus:border-accent focus:outline-none"
        />
      </label>
      <div>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="rounded-flat bg-accent px-[34px] py-4 text-[17px] font-medium text-bg disabled:opacity-60"
        >
          {status === "submitting" ? "Šaljem…" : "Pošalji upit"}
        </button>
        {status === "error" ? (
          <p className="mt-3 text-sm text-accent">
            Nešto nije uspjelo. Pokušajte ponovo ili nam pišite direktno na email.
          </p>
        ) : null}
      </div>
    </form>
  );
}
