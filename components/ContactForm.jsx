"use client";

import { useState } from "react";
import { ArrowUpRightIcon, ClipboardDocumentIcon, CheckIcon, InformationCircleIcon } from "@heroicons/react/24/outline";

export default function ContactForm({ recipient }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  function getDraft() {
    return `From: ${name} <${email}>\nSubject: ${subject}\n\n${message}`;
  }

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(getDraft());
      setStatus("Message copied. Paste it into your email or messaging app.");
    } catch {
      setStatus("Clipboard unavailable. Select your message above to copy it.");
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!event.currentTarget.reportValidity()) return;
    if (recipient) {
      const mailto = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`${message}\n\nFrom: ${name} (${email})`)}`;
      window.location.href = mailto;
      setStatus("Your email app should open with a prepared message. Please press Send there.");
    } else {
      copyMessage();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2"><div><label className="mb-2 block text-sm font-bold" htmlFor="contact-name">Your name <span className="text-accent">*</span></label><input className="input-field" id="contact-name" name="name" autoComplete="name" value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" maxLength={80} required /></div><div><label className="mb-2 block text-sm font-bold" htmlFor="contact-email">Email address <span className="text-accent">*</span></label><input className="input-field" id="contact-email" name="email" autoComplete="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" maxLength={160} required /></div></div>
      <div><label className="mb-2 block text-sm font-bold" htmlFor="contact-subject">What&apos;s this about? <span className="text-accent">*</span></label><input className="input-field" id="contact-subject" name="subject" value={subject} onChange={(event) => setSubject(event.target.value)} placeholder="A project, question, or just hello" maxLength={140} required /></div>
      <div><label className="mb-2 block text-sm font-bold" htmlFor="contact-message">Your message <span className="text-accent">*</span></label><textarea className="input-field min-h-[170px] resize-y" id="contact-message" name="message" value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Tell me what you have in mind..." maxLength={5000} rows={6} required /></div>
      <p className="text-xs leading-6 text-muted">{recipient ? "This opens your email app with a prepared message. Nothing is stored or sent by this website." : "Demo mode: this copies your message. Add NEXT_PUBLIC_CONTACT_EMAIL to enable sending through your email app."}</p>
      <div className="flex flex-wrap items-center gap-4"><button type="submit" className="button-primary">{recipient ? "Open email app" : "Copy my message"} {recipient ? <ArrowUpRightIcon className="h-4 w-4" /> : <ClipboardDocumentIcon className="h-4 w-4" />}</button>{status && <p role="status" className="flex max-w-xs items-center gap-2 text-sm leading-6 text-forest">{status.startsWith("Message copied") ? <CheckIcon className="h-4 w-4 shrink-0" /> : <InformationCircleIcon className="h-4 w-4 shrink-0" />}{status}</p>}</div>
    </form>
  );
}
