import { OAuth2Client } from 'google-auth-library';
import { SESSION_TIMEOUT } from '$env/static/private';
import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
import { redirect, error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { Logger } from '../../js/logger';
import { PrismaClientValidationError } from '@prisma/client/runtime';

const logger: Logger = Logger.getInstance();
const DB = new PrismaClient();

export const load = async ({ locals }) => {
	if (locals.session) throw redirect(302, '/');

	return {
		session: locals.session
	};
};

async function decode_JWT(token: FormDataEntryValue | null) {
	try {
		const client = new OAuth2Client(PUBLIC_GOOGLE_CLIENT_ID);
		const ticket = await client.verifyIdToken({
			idToken: <string>token,
			audience: PUBLIC_GOOGLE_CLIENT_ID
		});

		const payload = ticket.getPayload();
		if (!payload) throw error(500, 'Errore nella verifica del token Google');
		return payload;
	} catch (err) {
		let message = '';
		if (err instanceof Error) message = err.message;
		throw error(500, `Impossibile autenticare l'utente Google: ${message}`);
	}
}

export const actions = {
	default: async ({ cookies, request }) => {
		try {
			const session_id = crypto.randomUUID(); // id sessione
			const form_data = await request.formData();
			const jwt_token = form_data.get('token'); // google token da autenticare
			const info_utente = await decode_JWT(jwt_token);

			// se utente non è verificato e non appartiene ad istituto agnelli errore
			if (info_utente.hd != 'alba-robot.com' || !info_utente.email_verified) {
				logger.error('Tentativo di login ABUSIVO');
				throw error(401, 'Impossibile autenticare utente');
			}

			// rimuovo eventuali vecchie sessioni
			await DB.session.deleteMany({
				where: { utente: info_utente.email }
			});

			// utente valido quindi crea la sessione con scadenza SESSION_TIMEOUT
			await DB.session.create({
				data: {
					utente: <string>info_utente.email,
					session_id: session_id,
					scadenza: new Date(Date.now() + +SESSION_TIMEOUT)
				}
			});

			// rimuovo eventuali vecchi cookie
			cookies.delete('session');

			// utente valido quindi crea cookie con scadenza SESSION_TIMEOUT
			cookies.set('session', session_id, {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				secure: true,
				maxAge: Number(SESSION_TIMEOUT) / 1000
			});
		} catch (exception) {
			if (exception instanceof PrismaClientValidationError) logger.error(exception.message);
			else {
				logger.error(JSON.stringify(exception));
				logger.error(exception.message);
				logger.error(exception.stack);
				throw error(401, 'Impossibile autenticare utente');
			}
		}
		return { success: true };
	}
};
