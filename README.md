# Social Share Images

## 🤔 What is an open graph image?

Social share images are a must to grab the attention of readers when sharing your content on social media.

The [Open Graph protocol](https://ogp.me/) is extra metadata about your site social media sites can use. One of the meta tags you can include is `og:image` which is a URL to a **1200x630 px** image that's going to be used for the preview of your content.

```html
<head>
	<!-- ... -->
	<meta property="og:image" content="og-image.png" />
	<!-- ... -->
</head>
```

If you have a blog creating a social share image for every post is tedious so I created this to automate it.

## 🤔 How does it work?

- I use SvelteKit as the backend but any backend could work if you apply the same principles
- The HTML template for the social share image can be found in `src/template/index.svelte` that accepts any text we pass it
- Using [Puppeteer](https://github.com/puppeteer/puppeteer) and visiting `http://localhost:3000/images/screenshot.png` navigates to the HTML template and takes a screenshot which is served from the endpoint and cached on Vercel's CDN forever using serverless

**Because serverless functions are limited to 50 MB the Chromium binary has to be small enough to not exceed that limit** so I use [chrome-aws-package](https://github.com/alixaxel/chrome-aws-lambda) and [https://github.com/puppeteer/puppeteer](puppeteer-core).

In development you can uncomment the `process.env.AWS_LAMBDA_FUNCTION_NAME = true` line so `chrome-aws-lambda` thinks it's in a serverless environment and uses the Chromium binary.

The Chromium bundle size is going to increase more over time so you can use an older version if you encounter that problem because if you're using Next.js the size of the framework might push you over the 50 MB limit.

## 🧭 Setup

The project uses 📦️ [pnpm](https://pnpm.io/) but you can use any package manager.

👬 Clone the project.

```sh
git clone https://github.com/mattcroat/og-image.git
```

📦️ Install the dependencies.

```sh
pnpm i
```

📜 Run the development server with `pnpm run dev` or build and preview the project with `pnpm run build && pnpm run preview`.

```sh
pnpm run dev
```
