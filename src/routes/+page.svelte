<script lang="ts">
	import { construct_svelte_component } from "svelte/internal";


	let n: string;

	n = 'ccc';

    async function uploadFunction(base64) {
        const data = {}
        const b64_data = base64.split(',');
        data["file"] = b64_data[1];
        console.log(data);
       
        await fetch(`/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json'
            },
            body: JSON.stringify(data)
        });
    };

	async function dropping(ev) {
		// console.log('FILE DROPPED:', ev);
		ev.preventDefault();

        let file_items = [...ev.dataTransfer.items];
        
        if(file_items.length > 1) {
            console.log("Error: too many files");
            return;
        }

        let file_hnadle = file_items[0];
        if(file_hnadle.kind != "file") {
            console.log("Error non stai facendo uiplaod di un file");
            return;
        }

        const file = file_hnadle.getAsFile();
        // console.log(`… file[0].name = ${file.name} -- ${file.size}`);
        // console.log("FILE:", file);
        // let xxx = await file.arrayBuffer();
        // console.log(xxx)

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (e) => {
            // console.log(e.target.result);
            uploadFunction(e.target.result);
        };
        

        // https://www.programonaut.com/how-to-create-a-sveltekit-image-upload-step-by-step/
       
        // try{
        //     const res = await fetch('/', {
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': 'multipart/form-data'
        //         },
		// 	    body: formData
		//     });

		//     console.log("RESULT:", res.ok);
        // }catch(e){
        //     console.log(e);

        // }


        // console.log(ev)
		// if (ev.dataTransfer.items) {
        //     console.log("QUI");
		// 	// Use DataTransferItemList interface to access the file(s)
		// 	console.log(typeof([...ev.dataTransfer.items]));
        //     [...ev.dataTransfer.items].forEach((item, i) => {
		// 		// If dropped items aren't files, reject them
		// 		console.log("ITEM:", item)
        //         if (item.kind === 'file') {
		// 			const file = item.getAsFile();
		// 			console.log(`… file[${i}].name = ${file.name}`);
        //             console.log("FILE:", file);
		// 		}
		// 	});
		// } else {
        //     console.log("QUO");
		// 	// Use DataTransfer interface to access the file(s)
		// 	[...ev.dataTransfer.files].forEach((file, i) => {
		// 		console.log(`… file[${i}].name = ${file.name}`);
		// 	});
		// }
	}

	function drag(ev) {
		// console.log('FILE FRAGGING:', ev);
		ev.preventDefault();
	}
</script>

<h1>HOME PAGE {n}</h1>

<div id="drop_zone" on:drop={(e) => dropping(e)} on:dragover={(e) => drag(e)}>
	<p>Drag one or more files to this <i>drop zone</i>.</p>
</div>

<style>
	#drop_zone {
		border: 5px solid blue;
		width: 200px;
		height: 100px;
	}
</style>
