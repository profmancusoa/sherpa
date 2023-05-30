import { writeFileSync } from 'fs';
import { redirect } from '@sveltejs/kit';
import { PRIVATE_SHARED_DIR } from '$env/static/private';
import { PrismaClient } from '@prisma/client';
import { Logger } from '../js/logger';

const DB = new PrismaClient();
const logger:Logger = Logger.getInstance();

const generate_fname = () => {
	return (
		Math.random().toString(36).substring(2) +
		new Date().getTime().toString(36) +
		Math.random().toString(36).substring(2)
	);
};

export async function POST({ request, url, locals }) {
	let gen_fname: string;
	const session = locals.session;
	if (!session) {
		throw redirect(302, '/login');
	}

	try {
		const raw_data = await request.json();
		const file = raw_data['file'];
		const fname = raw_data['fname'];
		const fext = raw_data['fext'];
		const n_days = raw_data['n_days'];
		const n_down = raw_data['n_down'];

		gen_fname = generate_fname(fext);

		logger.info(
			`Saving file ${fname}.${fext} for ${n_days} days and/or ${n_down} downalods as ${gen_fname}`
		);
		writeFileSync(`${PRIVATE_SHARED_DIR}/${gen_fname}`, file, 'base64');

		await DB.File.create({
			data: {
				upload_file_name: `${fname}.${fext}`,
				download_file_name: gen_fname,
				expiration: new Date(Date.now() + n_days * 24 * 60 * 60 * 1000),
				max_downloads: +n_down
			}
		});
	} catch (e) {
		return new Response(JSON.stringify({ error: 'cannot uplaod the file' }), { status: 500 });
	}
	return new Response(JSON.stringify({ fname: gen_fname }), { status: 200 });
}
