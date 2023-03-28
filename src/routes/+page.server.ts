// import {
// 	route_protect,
// 	raise_error,
// } from '../js/helper';
import { redirect } from '@sveltejs/kit';
// import { Logger } from '../js/logger';

// let logger = new Logger('server'); //instanzia il logger
// const SARP = new PrismaDB(); //Istanzia il client SARP DB

// function catch_error(exception, type, code) {
//     if(exception instanceof PrismaClientValidationError)
//         logger.error(exception.message);
//     else {
//         logger.error(JSON.stringify(exception));
//         logger.error(exception.message);
//         logger.error(exception.stack);
//     }
//     raise_error(
// 		500,
// 		code,
// 		`Errore irreversibile durante ${type} dei KPI. TIMESTAMP: ${new Date().toISOString()} Riportare questo messaggio agli sviluppatori`
// 	);
// }

export async function load({ request, locals }) {
	const session = locals.session;

    console.log("LOCALS:", locals)
    console.log("REQUSST:", request)
	if (!session) {
		throw redirect(302, '/login');
	}
}




// export const actions = {
//     default: async ({ request, locals }) => {
//         if (!locals.session) {
//             throw redirect(302, '/login');
//         }
        
//         const data = JSON.parse((await request.body.read()).toString());

//         const file = data['file'];
    
//         // writeFileSync(`static/avatar.png`, file, 'base64');
        

//         console.log(file);

        // try {
        //     if (!fs.existsSync(PUBLIC_CONVERT_DIR)) fs.mkdirSync(PUBLIC_CONVERT_DIR); // Se non esiste la cartella temporanea creala

        //     for (const file of files) {
        //         let file_name = file.name;
        //         file_name  = strip_spaces(file_name);
            
        //         const extension = fextension(file_name); // L'estensione del file test.pdf sarà [test, pdf]
        //         if (!['doc', 'docx', 'pdf'].includes(extension)) {
        //             // Il file è invalido
        //             raise_error(
        //                 500,
        //                 100,
        //                 `Hai caricato un file non consentito. Puoi caricare solo .pdf, .doc e .docx`
        //             );
        //         }

        //         fs.writeFileSync(
        //             `${PUBLIC_CONVERT_DIR}/${file_name}`,
        //             Buffer.from(await file.arrayBuffer())
        //         ); // Scrivo il file nella cartella temporanea
    
        //         if (extension == 'docx' || extension == 'doc') {
        //             // Se il file è Word dobbiamo convertirlo in PDF
        //             const cmd = `libreoffice --headless --convert-to pdf --outdir ${PUBLIC_CONVERT_DIR} ${PUBLIC_CONVERT_DIR}/${file_name}`;
        //             execSync(cmd);
        //             file_name = file_name.split('.')[0] + '.pdf';
        //         }
    
        //         const our_pdf = fs.readFileSync(`${PUBLIC_CONVERT_DIR}/${file_name}`);
        //         const pages = await pdf_counter(our_pdf);
        //         await merger.add(`${PUBLIC_CONVERT_DIR}/${file_name}`); // Aggiungo il pd// Usiamo un for classico al posto di forEach per il corretto merge dei filef al nuovo file
    
        //         if (pages.numpages % 2 != 0) {
        //             // Aggingiamo una pagina se la verifica è dispari
        //             await merger.add(PUBLIC_PDF_BLANK_FILE);
        //         }
        //     }
        //     const file_name_of_merged_pdf = user_login(locals).cognome + '_' + random_name() + '.pdf'; // Generiamo un nome casuale per evitare sovrascritture

        //     cleanup_uploaded(files); // Rimuovo i files caricati in questo form, ormai non servono più
            
        //     autit_conversion(locals, `generato file ${file_name_of_merged_pdf}`);
        //     return {
        //         file: JSON.stringify(await merger.saveAsBuffer()), // Convertiamo il buffer in stringa sennò sveltekit va in errore
        //         nome_file: file_name_of_merged_pdf
        //     };
        // } catch (exception) {
        //     console.log(exception);
        //     logger.error(JSON.stringify(exception));
        //     raise_error(
        //         500,
        //         700,
        //         `Errore irreversibile durante la generazione del PDF. TIMESTAMP: ${new Date().toISOString()} Riportare questo messaggio agli sviluppatori`
        //     );
        // }
//     }
// // };
