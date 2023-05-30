<script lsng="ts">
	import { saveAs } from 'file-saver';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';

	let mex = '';

	onMount(async () => {
		mex = 'We are fetching your file....';

		let fname = $page.params.fileId;
		let res = await fetch(`/file/${fname}`);

		const blob = await res.blob();

		if (res.ok) {
			saveAs(blob, res.headers.get('fname'));
			mex = 'File correctly Downloaded. <br>Thank you!!!';
			setTimeout(() => window.close(), 2500);
		} else {
			mex = 'Ops, your file is not available!!!';
		}
	});
</script>

<main>
	<div class="main-container">
		<div class="mex text">
			{@html mex}
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
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.mex {
		text-align: center;
	}

	.text {
		font-size: 3.5rem;
		color: white;
		font-weight: bold;
		text-shadow: 4px 4px 6px black;
	}
</style>
