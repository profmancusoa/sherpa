<script lang="ts">
	import { set_input_value } from 'svelte/internal';
	import Number from '../components/number.svelte';
	import { PUBLIC_BASE_URL } from '$env/static/public';

	export let data;
	let is_loading: boolean = false;
	let too_many_files: boolean = false;
	let loaded_ok: boolean = false;
	let loaded_error: boolean = false;
	let dismiss: boolean = false;

	let n_days: number = 1;
	let n_down: number = 1;
	let mex: string = '';
	let uploaded_file: string;

	const clear_mex = (delay) => {
		setTimeout(() => (mex = ''), delay);
	};

	$: {
		if (too_many_files) {
			mex = 'Please upload only 1 file at the time!!!';
			clear_mex(2000);
			too_many_files = false;
		}

		if (is_loading) {
			mex = 'Uploading file...';
		}

		if (loaded_ok && !is_loading) {
			mex = 'OK! Your file has been succesfully uploaded!!!';
			loaded_ok = false;
			clear_mex(1000);
			setTimeout(() => {
				mex = `Your file can be dowloaded here: <br> ${PUBLIC_BASE_URL}/file/${uploaded_file.fname}`;
				navigator.clipboard.writeText(`${PUBLIC_BASE_URL}/file/${uploaded_file.fname}`);
				dismiss = true;
			}, 1000);
		}

		if (loaded_error && !is_loading) {
			mex = 'OPS!!! Something went wrong!!!';
			loaded_error = false;
			is_loading = false;
			clear_mex(3000);
		}
	}

	const reset_status = () => {
		is_loading = false;
		too_many_files = false;
		loaded_ok = false;
		loaded_error = false;
		dismiss = false;
		mex = '';
	};

	async function uploadFunction(fname, fext, base64) {
		is_loading = true;
		loaded_ok = false;
		loaded_error = false;

		const b64_data = base64.split(',');
		const res = await fetch(`/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				fname: fname,
				fext: fext,
				file: b64_data[1],
				n_days: n_days,
				n_down: n_down
			})
		});

		is_loading = false;
		if (res.ok) {
			uploaded_file = await res.json();
			loaded_ok = true;
		} else {
			loaded_error = true;
		}
	}

	function drag(ev) {
		ev.preventDefault();
	}

	async function dropping(ev) {
		ev.preventDefault();

		let file_items = [...ev.dataTransfer.items];

		if (file_items.length > 1) {
			too_many_files = true;
			return;
		}

		is_loading = true;

		let file_handle = file_items[0];
		if (file_handle.kind != 'file') {
			return;
		}

		const file = file_handle.getAsFile();
		const fname = file.name.split('.')[0];
		const fext = file.name.split('.').splice(-1);

		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onload = (e) => {
			uploadFunction(fname, fext, e.target?.result);
		};
	}
</script>

<main>
	<div class="main-container">
		<div class="cell A" />
		<div class="cell B text">Please upload your file here</div>
		<div class="cell C" />
		<div class="cell D">
			<p class="text">How long the file will last?</p>
			<Number bind:number={n_days} min="1" max="30" suffix="d" />
		</div>

		<div class="cell E">
			<div id="drop_zone" on:drop={(e) => dropping(e)} on:dragover={(e) => drag(e)}>
				{#if !is_loading}
					<img src="./img/upload.png" class="picture" alt="upload" />
				{:else}
					<img src="./img/upload-load.png" class="picture" alt="upload" />
				{/if}
			</div>
		</div>

		<div class="cell F">
			<p class="text">How many downloads allowed?</p>
			<Number bind:number={n_down} min="1" max="50" />
		</div>
		<div class="cell H">
			<p class="text-reverse">{@html mex}</p>
			{#if dismiss}
				<div>
					<button on:click={reset_status}>OK</button>
				</div>
			{/if}
		</div>
	</div>
</main>

<style>
	main {
		background-image: url('/img/background.png');
		background-size: cover;
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
		display: grid;
		grid-template-columns: 1fr 2fr 1fr;
		grid-template-rows: 1fr 3fr 2fr;
	}

	.cell {
		border: 0px solid red;
	}

	.picture {
		width: 100%;
		height: auto;
	}

	.text {
		font-size: 1.6rem;
		color: white;
		font-weight: bold;
		text-shadow: 4px 4px 6px black;
	}

	.text-reverse {
		font-size: 1.6rem;
		color: #3e5a5e;
		font-weight: bold;
		text-shadow: 4px 4px 6px white;
		text-align: center;
	}

	button {
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
		color: #3e5a5e;
		border: 5px solid #3e5a5e;
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
	}
</style>
