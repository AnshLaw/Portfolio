# Netlify setup and message delivery

The portfolio is a static Next.js export. Netlify serves `out/`; there are no API routes, server functions, application database, or secrets. The CSS 3D scene needs no WebGL runtime.

## Deploy

Use the existing Netlify project, not a new hosting provider. Build command: `pnpm build`. Publish directory: `out`. These are also in `netlify.toml`. `NETLIFY_NEXT_PLUGIN_SKIP=true` prevents an unnecessary Next.js server adapter.

## Receive messages

1. In the existing Netlify project, open **Forms** and enable **form detection** if it is off.
2. Deploy this version. Confirm the `contact` form appears in Netlify Forms.
3. Under **Forms → Submission notifications**, add an **Email** notification for `contact` to **anshraj65@gmail.com**.
4. Send a test message from the deployed contact page. Verify both the entry in Netlify Forms and the notification in your inbox/spam folder.
5. Reply to the notification: the form's `email` field supplies the visitor's Reply-To address.

Messages are stored by Netlify in its Forms dashboard. Email notifications require the setting above; putting an address in the site alone does not configure delivery. No real submission has been sent or inbox delivery verified during local development. Automated tests intercept requests and never send test messages to the live site.

Native HTML submission works without JavaScript. With JavaScript, the form shows a sending state, confirms only an HTTP success, and retains text after errors. The honeypot helps reject automated spam. Netlify requires URL-encoded POSTs; `public/__forms.html` registers matching fields for static form detection.

Current credit-based Netlify plans include free Forms submissions. Legacy plans can have different limits; check your account plan. Sources checked September 17, 2026:

- [Form setup](https://docs.netlify.com/manage/forms/setup/)
- [Email notifications and Reply-To](https://docs.netlify.com/manage/forms/notifications/)
- [Usage and billing](https://docs.netlify.com/manage/forms/usage-and-billing/)
- [Next.js form troubleshooting](https://docs.netlify.com/manage/forms/troubleshooting-tips/)

## Content and links

The resume source is `C:\Users\anshr\Downloads\Ansh_Resume_2026.pdf`, copied byte-for-byte to the existing download URL. All original projects remain. The site's personal location is Grand Blanc, MI; GM and Kettering retain their actual Flint locations.

Public source links: `AnshLaw/REC-IT`, `AnshLaw/RoadEntertainment`, and `AnshLaw/Givvy`. Taboo, Transcripto, Gigs-for-pi, and Song-chat-live repositories are private, so visitors see a private-source label instead of a GitHub 404. The thesis remains industry research without a guessed repository.

Live sites checked: tabooparty.online, kurecit.netlify.app/signin, gigsforpilive.netlify.app, and songchat.online. Transcripto's existing domain failed TLS verification; the link is retained but explicitly marked potentially unavailable. Givvy has a verified public repository but no verified live deployment.

Taboo includes both the official Discord Activity and the supplied community invite. The Pi award points to [Pi's application list](https://github.com/pi-apps/PiOS/blob/main/list.md).

## Imagery

Taboo, REC-IT, Gigs for Pi, and SongChat use captures of their real public pages. The other four images are explicitly labeled project concept illustrations, not claims about a production UI. `scripts/capture-projects.cjs` can refresh these with local Chrome. `scripts/render-brand.cjs` renders the social preview and icon. These scripts are development tools and do not ship a browser runtime to visitors.
