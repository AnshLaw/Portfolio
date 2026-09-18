"use client"

import { useState, type FormEvent } from "react"
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react"
import { profile } from "@/data/portfolio"
import { submitContact } from "@/lib/contact"

type Status = "idle" | "sending" | "success" | "error"

function ContactFields() {
  return <>
    <div className="contact-row">
      <label>Your name<input name="name" autoComplete="name" required maxLength={100} placeholder="Alex Morgan" /></label>
      <label>Email address<input name="email" type="email" autoComplete="email" required maxLength={254} placeholder="alex@company.com" /></label>
    </div>
    <label>Subject<input name="subject" required maxLength={160} placeholder="An opportunity, a project, an idea…" /></label>
    <label>Message<textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="Tell me a little about what you have in mind." /></label>
  </>
}

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle")
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "sending") return
    const form = event.currentTarget
    setStatus("sending")
    try {
      await submitContact(new FormData(form))
      setStatus("success")
      form.reset()
    } catch {
      setStatus("error")
    }
  }
  return <form className="contact-form" name="contact" method="POST" action="/contact/thanks/" data-netlify="true" netlify-honeypot="bot-field" onSubmit={handleSubmit}>
    <input type="hidden" name="form-name" value="contact" />
    <p hidden><label>Leave this blank<input name="bot-field" tabIndex={-1} autoComplete="off" /></label></p>
    <h2>Send a message</h2><p className="text-muted-foreground">Have a role or a project in mind? Let’s talk.</p>
    <fieldset disabled={status === "sending"}><ContactFields /></fieldset>
    <div aria-live="polite" role="status">
      {status === "success" && <p className="form-success"><CheckCircle2 size={18} /> Message sent. I’ll reply to your email.</p>}
      {status === "error" && <p className="form-error">Message couldn’t be sent. Your text is still here. Try again or <a href={`mailto:${profile.email}`}>email me directly</a>.</p>}
    </div>
    <button className="primary-link" disabled={status === "sending"} type="submit">{status === "sending" ? <>Sending… <Loader2 className="animate-spin" size={18} /></> : <>Send message <ArrowUpRight size={18} /></>}</button>
    <p className="text-xs text-muted-foreground">Your email is only used to reply to your message.</p>
  </form>
}
