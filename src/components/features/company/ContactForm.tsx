"use client";

import { Send } from "lucide-react";
import { useId, useRef, useState, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { FormField, fieldClass } from "./FormField";

type Values = { firstName: string; lastName: string; email: string; phone: string; message: string };
type Errors = Partial<Record<keyof Values, string>>;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(v: Values): Errors {
  const e: Errors = {};
  if (!v.firstName.trim()) e.firstName = "Please enter your first name.";
  if (!v.email.trim()) e.email = "Please enter your email address.";
  else if (!EMAIL.test(v.email.trim())) e.email = "Please enter a valid email address, like name@store.com.";
  if (!v.message.trim()) e.message = "Please tell us how we can help.";
  return e;
}

export function ContactForm({ to, submitLabel, note }: { to: string; submitLabel: string; note: string }) {
  const id = useId().replace(/:/g, "");
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  const onSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const v = Object.fromEntries(["firstName", "lastName", "email", "phone", "message"].map((k) => [k, String(data.get(k) ?? "")])) as Values;
    const e = validate(v);
    setErrors(e);
    const first = Object.keys(e)[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      setSent(false);
      return;
    }
    const name = `${v.firstName} ${v.lastName}`.trim();
    const body = [v.message.trim(), "", `— ${name}`, v.email.trim(), v.phone.trim()].filter((l, i) => i < 3 || l).join("\n");
    window.location.href = `mailto:${to}?subject=${encodeURIComponent(`Website enquiry from ${name}`)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  const f = (k: keyof Values) => ({
    id: `${id}-${k}`,
    name: k,
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": `${id}-${k}-error`,
  });

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2 short:gap-3" aria-describedby={`${id}-note`}>
      <FormField id={`${id}-firstName`} label="First Name" required error={errors.firstName}>
        <input {...f("firstName")} type="text" autoComplete="given-name" required className={`${fieldClass} h-11`} />
      </FormField>
      <FormField id={`${id}-lastName`} label="Last Name" error={errors.lastName}>
        <input {...f("lastName")} type="text" autoComplete="family-name" className={`${fieldClass} h-11`} />
      </FormField>
      <FormField id={`${id}-email`} label="Email" required error={errors.email}>
        <input {...f("email")} type="email" autoComplete="email" required className={`${fieldClass} h-11`} />
      </FormField>
      <FormField id={`${id}-phone`} label="Phone Number" error={errors.phone}>
        <input {...f("phone")} type="tel" autoComplete="tel" className={`${fieldClass} h-11`} />
      </FormField>
      <FormField id={`${id}-message`} label="Message" required error={errors.message} className="sm:col-span-2">
        <textarea {...f("message")} rows={4} required className={`${fieldClass} min-h-28 resize-y py-2.5 short:min-h-24`} />
      </FormField>
      <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center">
        <Button type="submit" size="lg">
          <Send aria-hidden className="mr-1 size-4" />
          {submitLabel}
        </Button>
        <p id={`${id}-note`} className="text-[0.82rem] leading-snug text-ink-subtle">
          {note}
        </p>
      </div>
      <p className="text-sm font-medium text-mint-700 sm:col-span-2" role="status">
        {sent ? `Your email app should now open with your message. If it doesn’t, write to ${to}.` : ""}
      </p>
    </form>
  );
}
