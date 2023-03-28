import { error } from '@sveltejs/kit';

export async function load({ params }) {
    console.log("FILESID:", params.fileId);

    if(params.fileId == "123")
        return { file_exist: true };
    else
     throw error(404, 'Not found');
    
  }