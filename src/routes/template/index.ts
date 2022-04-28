import type { RequestHandler } from '@sveltejs/kit'

export const get: RequestHandler = async ({ url }) => {
	const text = url.searchParams.get('text')

	return {
		body: { text }
	}
}
