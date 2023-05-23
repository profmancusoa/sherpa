<script lsng="ts">
	import { saveAs } from 'file-saver';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

    let mex = '';

	onMount(async () => {
		console.log('FACCIO IL FETCH:', $page);
        mex = 'We are fetching your file....';

		let fname = $page.params.fileId;

		// let res = await fetch("http://localhost:5173/file/7amuh2fa6qmli0favtc76dce4g0l2v.docx")
		let res = await fetch(`/file/${fname}`);

		const blob = await res.blob();

		console.log('FETCH FRONT END:', res);
		console.log('FILE NAME:', res.headers.get('fname'));
		if (res.ok) {
        saveAs(blob, res.headers.get('fname'));
        mex = 'File correctly Downloaded. <br>Thank you!!!'
        setTimeout(() => window.close(), 2500);
        // window.close();
        } else {
            mex = 'Ops, your file is not available!!!';
            console.log('ERRORE NON POSSO SCARICARE IL FILE');
        }
	});
</script>

<main>
	<div class="main-container">
        <div class="mex text">
            {@html mex}
        </div>
		<!-- <div class="cell A" />
		<div class="cell B text">Please upload your file here</div>
		<div class="cell C" />
		<div class="cell D">
			<p class="text">How long the file will last?</p>
           
		</div>

		<div class="cell E">
			
		</div>

		<div class="cell F">
			<p class="text">How many downloads allowed?</p>
            
		</div>
		<div class="cell H">
			<p class="text-reverse">xxxx</p>
			
		</div> -->
	</div>
</main>

<style>
	main {
        background-image: url('/img/background.png');
        background-size: cover;
        /* background-position: center; */
		border: 0px solid red;
		background-color: white;
		height: 99vh;
		display: flex;
		justify-content: center;
	}

	.main-container {
		border: 0px solid blue;
		padding: 5vh;
		width: 90%;
		display: flex;
        justify-content: center;
        align-items: center;
	}

	/* .cell {
		border:1px solid red;
	} */

	/* .picture {
		width: 100%;
		height: auto;
	} */

    .mex {
        text-align: center;
    }

	.text {
		font-size: 3.5rem;
		/* color: #003244; */
        color: white;
		font-weight: bold;
        /* text-shadow: 4px 4px 6px #F3F1E9; */
        text-shadow: 4px 4px 6px black;
	}
/* 
    .text-reverse {
		font-size: 1.6rem;
		
        color: #3E5A5E;
		font-weight: bold;
        text-shadow: 4px 4px 6px white;
        text-align: center;
	} */

	/* button {
		color: white;
		background-color: #00c0fa;
		font-size: 1.5rem;
		font-weight: bold;
		border: 5px solid white;
		border-radius: 30px;
		padding: 10px 40px;
		cursor: pointer;
	}

	button:hover,
	.button-selected {
		color: #3E5A5E;
		border: 5px solid #3E5A5E;
	}

	.B {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 2.4rem;
		text-transform: uppercase;
	}

	.D {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3vh;
	}

	.E {
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.F {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 3vh;
	}

	.H {
		display: flex;
		justify-content: center;
		align-items: center;
		font-family: 'Darumadrop One', cursive;
		font-size: 1.6rem;
		color: blue;
		font-weight: bold;
		grid-column: 1 / 4;
		flex-direction: column;
	}

	#drop_zone {
		border: 0px solid blue;
		width: 70%;
	} */

    /* #drop_zone:hover{
        background-color: rgba(255, 255, 255,.3);
    } */



</style>
