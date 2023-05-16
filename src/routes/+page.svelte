<script lang="ts">
	import { set_input_value } from 'svelte/internal';

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
			clear_mex(1000);
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
				mex = `Your file can be dowloaded here: https://share.alba-robot.com/${uploaded_file.fname}`;
				navigator.clipboard.writeText(`https://share.alba-robot.com/${uploaded_file.fname}`);
				dismiss = true;
			}, 1000);
		}

		if (loaded_error && !is_loading) {
			mex = 'OPS!!! Something went wrong!!!';
			loaded_error = false;
			is_loading = false;
			clear_mex(4000);
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
		console.log('UPLAOD FILE START:');
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
			console.log('TUTTO OK');
			uploaded_file = await res.json();
			loaded_ok = true;
		} else {
			console.log('ERRORI NEL UPLOAS FILE');
			loaded_error = true;
		}
	}

	function drag(ev) {
		ev.preventDefault();
	}

	async function dropping(ev) {
		console.log('FILE DROPPED:', ev);
		ev.preventDefault();

		let file_items = [...ev.dataTransfer.items];

		if (file_items.length > 1) {
			console.log('Error: too many files');
			too_many_files = true;
			return;
		}

		is_loading = true;

		console.log('FILE DA CATRICRE:', file_items);

		let file_handle = file_items[0];
		if (file_handle.kind != 'file') {
			console.log('Error non stai facendo uiplaod di un file');
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
		<div class="cell B text">Please uplaod your file here</div>
		<div class="cell C" />
		<div class="cell D">
			<p class="text">How long the file will last?</p>
			<button on:click={() => (n_days = 1)} class={n_days == 1 ? 'button-selected' : ''}
				>1&nbsp; d</button
			>
			<button on:click={() => (n_days = 3)} class={n_days == 3 ? 'button-selected' : ''}
				>3&nbsp; d</button
			>
			<button on:click={() => (n_days = 5)} class={n_days == 5 ? 'button-selected' : ''}
				>5&nbsp; d</button
			>
			<button on:click={() => (n_days = 10)} class={n_days == 10 ? 'button-selected' : ''}
				>10 d</button
			>
		</div>

		<div class="cell E">
			<div id="drop_zone" on:drop={(e) => dropping(e)} on:dragover={(e) => drag(e)}>
				<img src="./img/upload.png" class="picture" />
			</div>
		</div>

		<div class="cell F">
			<p class="text">How many downloads?</p>
			<button on:click={() => (n_down = 1)} class={n_down == 1 ? 'button-selected' : ''}
				>1&nbsp;</button
			>
			<button on:click={() => (n_down = 3)} class={n_down == 3 ? 'button-selected' : ''}
				>3&nbsp;</button
			>
			<button on:click={() => (n_down = 5)} class={n_down == 5 ? 'button-selected' : ''}
				>5&nbsp;</button
			>
			<button on:click={() => (n_down = 10)} class={n_down == 10 ? 'button-selected' : ''}
				>10</button
			>
		</div>
		<div class="cell H">
			<p>{mex}</p>
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
		grid-template-rows: 2fr 3fr 2fr;
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
		color: blue;
		font-weight: bold;
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
		color: blue;
		border: 5px solid blue;
	}

	.B {
		display: flex;
		justify-content: center;
		align-items: flex-start;
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
		width: 50%;
	}
</style>
