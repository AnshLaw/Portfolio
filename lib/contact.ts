const CONTACT_TIMEOUT_MS = 15_000

export async function submitContact(fields: Iterable<[string, FormDataEntryValue]>) {
  const body = new URLSearchParams({ "form-name": "contact" })
  for (const [name, value] of fields) body.set(name, String(value))
  const response = await fetch("/__forms.html", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: body.toString(),
    signal: AbortSignal.timeout(CONTACT_TIMEOUT_MS),
  })
  if (!response.ok) throw new Error("Message could not be sent. Please retry or email me directly.")
}
