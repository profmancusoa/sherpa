import { PRIVATE_SHARED_DIR } from '$env/static/private';
import { accessSync, readFileSync, constants } from 'fs';
import { Blob } from "buffer";
import { error } from '@sveltejs/kit';

export async function GET({ request, url, locals }) {
    console.log("GET DEL FILE")

    try {
        console.log("URL:",url.pathname.split('/file/')[1])

        const fname =  url.pathname.split('/file/')[1];
        accessSync(`${PRIVATE_SHARED_DIR}/${fname}`, constants.R_OK);
        const buffer = readFileSync(`${PRIVATE_SHARED_DIR}/${fname}`); 
        const file_blob = new Blob([buffer]);
        const header = new Headers();
        header.append('fname', fname);
        const options = { status: 200, headers: header };
        
        return new Response(file_blob, options);

    // let fname="7amuh2fa6qmli0favtc76dce4g0l2v.docx"
    // let buffer = readFileSync(`${PRIVATE_SHARED_DIR}/${fname}`);
    // const myBlob = new Blob([buffer]);
    // const myOptions = { status: 200, statusText: "SuperSmashingGreat!" };
    // const myResponse = new Response(myBlob, myOptions);
    // console.log("GET DEL FILE2")
    // return myResponse;
    } catch(e) {
        console.log(e)
        //return new Response(null, {status: 404})
        throw error(404, 'Not found');
    }
}