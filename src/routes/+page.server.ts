import { redirect } from '@sveltejs/kit';

export async function load({ request, locals }) {
	const session = locals.session;

	if (!session) {
		throw redirect(302, '/login');
	}

	return {
		session: locals.session
	};
}
