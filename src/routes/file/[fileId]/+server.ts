import { PRIVATE_SHARED_DIR } from '$env/static/private';
import { accessSync, readFileSync, constants } from 'fs';
import { Blob } from 'buffer';
import { error } from '@sveltejs/kit';
import { PrismaClient } from '@prisma/client';
import { Logger } from '../../../js/logger';

const DB = new PrismaClient();
const logger:Logger = Logger.getInstance();

export async function GET({ request, url, locals }) {
	try {
		const fname = url.pathname.split('/file/')[1];

        logger.info(`Request to download file ${fname}`);
		let file_entry = await DB.File.findMany({
			where: {
				download_file_name: fname
			}
		});

		if (file_entry.length != 1) {
            logger.error(`zero or too many entries in the DB for ${fname}`);
			throw error(404, 'Not found');
		}
		file_entry = file_entry[0];

		// if reached max_download or reached expirationc annot download
		if (
			file_entry.current_downloads >= file_entry.max_downloads ||
			Date.now() > file_entry.expiration.getTime()
		) {
            logger.info(`max download or expiration failed for ${fname}`);
			throw error(404, 'Not found');
		}

		accessSync(`${PRIVATE_SHARED_DIR}/${fname}`, constants.R_OK);
		const buffer = readFileSync(`${PRIVATE_SHARED_DIR}/${fname}`);
		const file_blob = new Blob([buffer]);
		const header = new Headers();
		header.append('fname', file_entry.upload_file_name);
		const options = { status: 200, headers: header };

		//update file entry in DB
		await DB.File.update({
			where: { id: file_entry.id },
			data: {
				current_downloads: ++file_entry.current_downloads
			}
		});
        logger.error(`OK downloading ${fname}`);

		return new Response(file_blob, options);
	} catch (e) {
        logger.error(JSON.stringify(e));
		throw error(404, 'Not found');
	}
}
