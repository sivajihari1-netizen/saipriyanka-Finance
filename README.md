# Finance Intelligence Platform
### Saipriyanka Cheerla — Full-Stack CMS Website

---

## What This Is

A complete Next.js 14 + Sanity CMS platform. The admin publishes content
through Sanity Studio (at `/studio`). The website fetches it automatically.
No code changes needed to publish articles, IPO reports, regulatory insights,
or research PDFs.

---

## Project Structure

```
finsite/
├── app/
│   ├── layout.tsx               ← Root layout + Google Fonts + SEO
│   ├── page.tsx                 ← Homepage (fetches all CMS data)
│   ├── globals.css              ← ALL styling (exact original design)
│   ├── not-found.tsx            ← 404 page
│   ├── sitemap.ts               ← Auto-generated XML sitemap
│   ├── insights/
│   │   ├── page.tsx             ← All articles listing
│   │   └── [slug]/page.tsx      ← Individual article page
│   ├── ipo/
│   │   ├── page.tsx             ← IPO listing page
│   │   └── [slug]/page.tsx      ← Individual IPO report page
│   ├── regulatory/
│   │   └── [slug]/page.tsx      ← Individual regulatory insight page
│   └── studio/[[...tool]]/
│       └── page.tsx             ← Sanity Studio admin panel
├── components/
│   ├── Nav.tsx                  ← Sticky nav (client component)
│   ├── Hero.tsx                 ← Hero section
│   ├── Ticker.tsx               ← Gold ticker bar
│   ├── InsightsSection.tsx      ← Blog section with category filter
│   ├── RegulatorySection.tsx    ← Regulatory hub
│   ├── ResearchSection.tsx      ← PDF research library
│   ├── IpoSection.tsx           ← IPO cards on homepage
│   ├── AboutSection.tsx         ← About / philosophy
│   ├── NewsletterSection.tsx    ← Newsletter signup
│   ├── ContactSection.tsx       ← Contact form
│   ├── Footer.tsx               ← Site footer
│   ├── ScrollReveal.tsx         ← Scroll animation trigger
│   └── sections.tsx             ← Shared section implementations
├── sanity/
│   ├── client.ts                ← Sanity client + image URL builder
│   ├── queries.ts               ← All GROQ queries
│   └── schemas/
│       ├── index.ts             ← Schema registry
│       ├── article.ts           ← Blog article schema
│       ├── ipoAnalysis.ts       ← IPO analysis schema
│       ├── regulatoryInsight.ts ← Regulatory insight schema
│       ├── researchItem.ts      ← Research / PDF schema
│       └── siteSettings.ts      ← Global site settings
├── lib/
│   ├── types.ts                 ← TypeScript interfaces
│   └── utils.ts                 ← Date formatting, color maps
├── sanity.config.ts             ← Sanity Studio configuration
├── next.config.js               ← Next.js config
├── tsconfig.json
└── package.json
```

---

## Step 1 — Create a Sanity Project

1. Go to **https://sanity.io** and sign up (free)
2. Click **"Create new project"**
3. Name it: `Finance Intelligence`
4. Choose dataset: `production`
5. Copy your **Project ID** (looks like: `abc12def`)

---

## Step 2 — Set Up Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-01-01
SANITY_API_TOKEN=your_token_here
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

**Getting the API Token:**
1. Go to sanity.io/manage → your project → API → Tokens
2. Click **"Add API token"**
3. Name: `Next.js Read Token`
4. Permission: **Viewer** (read-only is sufficient)
5. Copy the token into `.env.local`

---

## Step 3 — Install Dependencies

```bash
npm install
```

---

## Step 4 — Run Locally

```bash
npm run dev
```

- **Website:** http://localhost:3000
- **Admin Studio:** http://localhost:3000/studio

---

## Step 5 — Deploy to Vercel

### Option A — Via Vercel CLI (fastest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. When asked about environment variables, add them one by one.

### Option B — Via Vercel Dashboard

1. Push this project to a GitHub repository
2. Go to **https://vercel.com** → New Project
3. Import your GitHub repo
4. Add environment variables (same as `.env.local`):
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
   - `NEXT_PUBLIC_SITE_URL`
5. Click **Deploy**

---

## Step 6 — Configure CORS in Sanity

After deploying, add your Vercel domain to Sanity's allowed origins:

1. Go to sanity.io/manage → your project → API → CORS Origins
2. Click **"Add CORS origin"**
3. Add: `https://yourdomain.vercel.app` (and your custom domain)
4. Check **"Allow credentials"**
5. Save

Also add your Studio origin:
- `https://yourdomain.com` (for the embedded Studio at `/studio`)

---

## Step 7 — Connect Custom Domain

1. In Vercel dashboard → your project → Settings → Domains
2. Add your domain (e.g., `saipriyankacheerla.com`)
3. Update DNS records at your domain registrar:
   - Add CNAME: `www` → `cname.vercel-dns.com`
   - Or A record: `@` → Vercel's IP (shown in dashboard)
4. Update `NEXT_PUBLIC_SITE_URL` in Vercel environment variables

---

## How to Use the Admin Panel

Visit: `https://yourdomain.com/studio`

### Publishing a Blog Article

1. Click **📝 Blog Articles** in the sidebar
2. Click **"+ New Document"** (top right)
3. Fill in:
   - **Title** — the article headline
   - **Slug** — click "Generate" (auto-fills from title)
   - **Category** — select from dropdown
   - **Cover Image** — upload or drag-and-drop
   - **Excerpt** — 1–2 sentence summary
   - **Body** — rich text editor (headings, bold, italic, quotes)
   - **Reading Time** — enter number in minutes
   - **Publish Date** — select date
   - **Tags** — type and press Enter
   - **Feature on Homepage** — toggle ON to make this the hero article
4. Click **"Publish"** (top right)
5. Website updates within ~60 seconds automatically

### Publishing an IPO Analysis

1. Click **📊 IPO Analysis**
2. Fill in company details, price band, sector, exchange
3. Write the Analyst Summary (appears in card preview)
4. Add Valuation Discussion (rich text)
5. Add Risk Factors (one per entry — type and click +)
6. Select Recommendation (Subscribe / Avoid / Neutral)
7. **Upload PDF Report** — drag and drop the PDF file
8. Click **"Publish"**
9. A new page auto-generates at: `/ipo/company-name`

### Publishing a Regulatory Insight

1. Click **⚖️ Regulatory Insights**
2. Select **Authority** (SEBI / RBI / MCA etc.)
3. Enter Circular Title and Reference Number
4. Write the Summary (shown in card preview)
5. Add Impact Analysis (rich text)
6. Add Compliance Notes (each note can have a deadline date)
7. Upload the PDF circular or your analysis PDF
8. Click **"Publish"**

### Uploading a Research PDF

1. Click **📚 Research Library**
2. Enter Title and Description
3. Select Category (Framework / Research Note / Guide / Analysis)
4. **Upload PDF** — the download button generates automatically
5. Enter page count
6. Toggle **"Feature at Top"** to pin it to the top of the library
7. Click **"Publish"**

### Editing Site Settings

1. Click **⚙️ Site Settings**
2. Update:
   - Site title and description (used for SEO)
   - Social media URLs (LinkedIn, Twitter/X, Substack)
   - Default OG image (1200×630 recommended)
   - Newsletter section subtext
3. Click **"Publish"**

---

## Content Rendering — How It Works

```
Admin publishes in Studio
        ↓
Content stored in Sanity CMS
        ↓
Next.js fetches via GROQ queries (every 60 seconds)
        ↓
Pages re-render automatically (ISR — Incremental Static Regeneration)
        ↓
Content appears on website within ~60 seconds
```

No deployment needed when publishing new content.

---

## SEO — What's Automated

Every page automatically generates:

| Element              | Source                                      |
|----------------------|---------------------------------------------|
| `<title>`            | Article/IPO title (or SEO override field)   |
| Meta description     | Excerpt/summary (or SEO override field)     |
| Open Graph title     | Same as page title                          |
| Open Graph image     | Cover image or default site OG image        |
| Twitter card         | `summary_large_image` type                  |
| Canonical URL        | Auto from `NEXT_PUBLIC_SITE_URL`            |
| XML Sitemap          | Auto-generated at `/sitemap.xml`            |

To override SEO for any article/IPO:
1. Open the document in Studio
2. Scroll to the **SEO Settings** section at the bottom
3. Enter a custom Meta Title and Meta Description
4. Upload a custom OG image

---

## Adding a Real Portrait Photo

Replace the initials placeholder in `components/Hero.tsx`:

```tsx
// Replace the portrait-box content with:
<div className="portrait-box r right d2">
  <img
    src="/portrait.jpg"
    alt="Saipriyanka Cheerla"
    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
  />
</div>
```

Place the photo file at: `public/portrait.jpg`
Recommended: 680×900px, professional headshot, JPEG.

---

## Performance Notes

- **ISR (60s revalidation):** Pages are statically generated and refreshed every 60 seconds. Zero cold-start latency for visitors.
- **Image optimization:** All Sanity images pass through Next.js Image Optimization automatically.
- **Fonts:** Loaded via Google Fonts with `display=swap` for zero layout shift.
- **Core Web Vitals:** Expect 95+ Lighthouse score in production.

---

## Troubleshooting

**Content not appearing after publishing:**
- Wait 60 seconds (ISR revalidation interval)
- Or trigger a manual revalidation by redeploying on Vercel

**Studio shows CORS error:**
- Add your domain to Sanity's CORS Origins (Step 6 above)

**Images not loading:**
- Verify `cdn.sanity.io` is in `next.config.js` image domains (already done)
- Check your Sanity project ID is correct in `.env.local`

**Build fails on Vercel:**
- Confirm all 5 environment variables are set in Vercel dashboard
- Check the Vercel build logs for the specific error

---

## Tech Stack Summary

| Layer      | Technology                    | Purpose                          |
|------------|-------------------------------|----------------------------------|
| Frontend   | Next.js 14 (App Router)       | React framework + SSG/ISR        |
| Styling    | Pure CSS (globals.css)        | Exact original design preserved  |
| CMS        | Sanity v3                     | Headless CMS + asset storage     |
| Studio     | Sanity Studio (embedded)      | Admin panel at `/studio`         |
| Rich Text  | @portabletext/react           | Renders CMS body content         |
| Deployment | Vercel                        | CDN + serverless + auto-deploys  |
| Images     | Sanity CDN + next/image       | Optimized, resized automatically |
| SEO        | Next.js Metadata API          | Auto OG tags + sitemap           |

---

*Built for Saipriyanka Cheerla — Finance Intelligence Platform*
