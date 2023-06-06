import { PrismaClient } from '@prisma/client';

import { unlinkSync } from 'fs';

// const DB = new PrismaDB(); //Istanzia il client SARP DB
// let logger = new Logger("server"); //instanzia il logger

import dotenv from 'dotenv';

const max_down_over = (curr, max) => {
	return curr >= max;
};

const expired = (exp) => {
	return Date.now() > exp.getTime();
};

(async function () {
	try {
		dotenv.config();
		const PRIVATE_SHARED_DIR = process.env.PRIVATE_SHARED_DIR;
        console.log("Cleaning ${PRIVATE_SHARED_DIR} directory");

		//get all file entries from DB
		const DB = new PrismaClient();
		const files = await DB.File.findMany({});

		//find the one to be deleted
		const tbr = files.filter(
			(f) => max_down_over(f.current_downloads, f.max_downloads) || expired(f.expiration)
		);

		//delete the stale DB and files
		tbr.forEach(async (f) => {
			try {
				await DB.File.delete({
					where: { id: f.id }
				});

				unlinkSync(`${PRIVATE_SHARED_DIR}/${f.download_file_name}`);
				console.log(`File: ${f.download_file_name} succesfully removed`);
			} catch (e) {
				// console.log(`Cannot remove ${f.download_file_name}`);
				console.log(e);
			}
		});
	} catch (e) {
		console.log(e);
	}
})();
