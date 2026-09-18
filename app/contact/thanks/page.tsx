import Link from "next/link"
import { PageLayout } from "@/components/page-layout"

export default function ThanksPage() {
  return <PageLayout><section className="page-container py-32"><h1 className="text-5xl font-semibold mb-6">Thanks for reaching out.</h1><p className="text-muted-foreground mb-8">Your message has been submitted. I’ll reply to the email address you provided.</p><Link className="primary-link" href="/">Back to home</Link></section></PageLayout>
}
