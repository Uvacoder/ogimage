import type { RequestHandler } from '@sveltejs/kit'
import chromium from 'chrome-aws-lambda'

// flip this on in development
// process.env.AWS_LAMBDA_FUNCTION_NAME = true

export const get: RequestHandler = async ({ params }) => {
	const url = 'http://localhost:3000/template?text='

	const browser = await chromium.puppeteer.launch({
		args: chromium.args,
		defaultViewport: chromium.defaultViewport,
		executablePath: await chromium.executablePath,
		headless: true,
		ignoreHTTPSErrors: true
	})

	console.log(chromium.executablePath)

	const page = await browser.newPage()
	await page.setViewport({ width: 1200, height: 630 })
	await page.goto(`${url}${encodeURIComponent(params.text)}`)
	const image = (await page.screenshot({ type: 'png' })) as Buffer

	return {
		status: 200,
		body: image,
		headers: {
			'Content-Type': 'image/png',
			'Cache-Control': 'public, immutable, no-transform, s-maxage=31536000, max-age=31536000'
		}
	}
}
