import { writeFileSync } from 'fs';
import { redirect } from '@sveltejs/kit';
import { json } from '@sveltejs/kit';

const BASE_DIR = "static/shared"

const generate_fname = (ext) => {
    return (Math.random().toString(36).substring(2) + 
            new Date().getTime().toString(36) + 
            Math.random().toString(36).substring(2))
            .concat('.', ext);
}

export async function POST({ request, url, locals }) {
    console.log("FILE POST")
    
    let gen_fname:string;
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

        console.log(`Saving file ${fname} with extension ${fext} for ${n_days} days and/or ${n_down} downalods`);
        writeFileSync(`${BASE_DIR}/${gen_fname}`, file, 'base64');
    } catch(e) {
        console.log(e);
        return new Response(JSON.stringify({error: 'cannot uplaod the file'}), { status: 500});
    }

    return new Response(JSON.stringify({fname: gen_fname}), { status: 200});

}   

