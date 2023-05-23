import { PrismaClient } from '@prisma/client';

const DB = new PrismaClient();

export const handle = async ({ event, resolve }) => {
	const session_id = event.cookies.get('session');

    console.log(session_id)

	// se facciamo logout oppure il cookie è scaduto chiudiamo la sessione
	if (event.route.id == 'logout' || !session_id) {
		event.locals.session = undefined;    
		return await resolve(event);
	}

	// se il coockie è valido settiamo la sessione
	if (session_id) {
		const db_session = await DB.session.findUnique({
			where: { session_id: session_id }
		});
		event.locals.session = db_session;
	}
	return await resolve(event);
};
