import { writeFileSync } from 'fs';

export async function POST({ request, url, locals }) {

    const raw_data = await request.json();

    const file = raw_data['file'];

    // console.log(file);
     writeFileSync(`static/XXXXXXfile`, file, 'base64');
}

