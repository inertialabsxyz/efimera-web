# Purple-Style Editorial Magazine

A minimal, image-forward magazine website inspired by Purple.fr. Built with Astro and Sanity CMS.

## Features

- Clean, editorial grid layout
- Category-based navigation
- Image-focused design with subtle hover animations
- Mobile responsive
- Fast static generation with on-demand revalidation
- Easy content management via Sanity Studio

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity

First, create a free Sanity account at [sanity.io](https://sanity.io) and create a new project.

Then install the Sanity CLI and initialize your studio:

```bash
npm install -g @sanity/cli
cd sanity
sanity init --env
```

When prompted:
- Select "Create new project"
- Name it (e.g., "Magazine")
- Use the default dataset configuration
- Select "Clean project with no predefined schemas"

After initialization, copy the schemas:

```bash
# The schemas are already in sanity/schemas/
# Just make sure your sanity.config.ts imports them
```

### 3. Configure Environment Variables

Copy the example env file:

```bash
cp .env.example .env
```

Edit `.env` with your Sanity project ID (found at sanity.io/manage):

```
PUBLIC_SANITY_PROJECT_ID=your-actual-project-id
PUBLIC_SANITY_DATASET=production
```

### 4. Add CORS Origins in Sanity

Go to [sanity.io/manage](https://sanity.io/manage) → Your Project → API → CORS Origins

Add:
- `http://localhost:4321` (for development)
- Your production URL (when you deploy)

### 5. Run the Development Server

```bash
npm run dev
```

Visit `http://localhost:4321`

### 6. Run Sanity Studio

In a separate terminal:

```bash
cd sanity
sanity dev
```

Visit `http://localhost:3333` to add content.

## Deployment

### Deploy the Website (Vercel)

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel dashboard.

### Deploy Sanity Studio

```bash
cd sanity
sanity deploy
```

This gives you a hosted studio at `your-name.sanity.studio`

## Content Structure

### Articles

Each article has:
- **Title** (required)
- **Slug** (auto-generated from title)
- **Category** (Diary, Art, Fashion, Music, Travel, Night)
- **Main Image** (with hotspot cropping)
- **Excerpt** (for previews)
- **Body** (rich text with images)
- **Author** (reference to Author document)
- **Published Date**

### Authors

- **Name**
- **Photo**
- **Bio**

## Customization

### Changing Categories

Edit the category list in:
- `sanity/schemas/article.ts` (the options list)
- `src/layouts/Layout.astro` (the navigation)
- `src/pages/index.astro` (the filter)
- `src/pages/category/[category].astro` (the filter)

### Changing the Logo

Edit `src/layouts/Layout.astro` and replace "Magazine" with your publication name.

### Styling

All styles are in `src/styles/global.css`. Key variables:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #1a1a1a;
  --font-display: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Helvetica Neue', Helvetica, Arial, sans-serif;
}
```

### Fonts

The site uses:
- **Cormorant Garamond** for headlines (elegant, editorial)
- **Helvetica Neue** for body text (clean, modern)

To change fonts, update the Google Fonts import at the top of `global.css`.

## Project Structure

```
efimera-web/
├── src/
│   ├── components/
│   │   └── ArticleCard.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── lib/
│   │   └── sanity.ts          # Sanity client & queries
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   ├── article/[slug].astro
│   │   └── category/[category].astro
│   └── styles/
│       └── global.css
├── sanity/
│   └── schemas/
│       ├── article.ts
│       ├── author.ts
│       └── index.ts
├── astro.config.mjs
├── package.json
└── .env.example
```

## For Your Editor

Share this quick guide with whoever will be publishing articles:

### Adding a New Article

1. Go to your Sanity Studio (the URL you deployed it to)
2. Click **Article** in the sidebar
3. Click the **+** button to create new
4. Fill in:
   - Title
   - Click "Generate" next to Slug
   - Select a Category
   - Upload a Main Image (click the hotspot to set focus)
   - Write your content in Body
   - Set the Publish Date
5. Click **Publish**

The article will appear on the site within a few minutes (or instantly if using on-demand revalidation).

### Image Tips

- Use high-quality images (at least 1600px wide)
- Horizontal/landscape orientation works best
- Consistent color grading across images helps the site look cohesive
- Use the hotspot feature to ensure the focal point is visible in crops

## License

MIT
