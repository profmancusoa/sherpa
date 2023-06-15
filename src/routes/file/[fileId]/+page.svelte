<script lsng="ts">
    import axios from 'axios';
	import { saveAs } from 'file-saver';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
    import Progress from '../../../components/progress.svelte';
    let current_bytes = 0;
	let total_bytes = 0;
    let is_downloading = false;
	let mex = 'We are looking for your file......';

	onMount(async () => {
		mex = 'We are fetching your file....';
        let fname = $page.params.fileId;

		try {
            const res = await axios.request({
                url: `/file/${fname}`,
                responseType: 'blob',
                onDownloadProgress: (p) => { is_downloading = true; total_bytes = p.total; current_bytes = p.loaded }
            });

            if (res && res.status == 200) {
                const blob = res.data;
                saveAs(blob, res.headers.fname);
                mex = 'File correctly Downloaded. <br>Thank you!!!';
                setTimeout(() => window.close(), 2500);
            }
            is_downloading = false;
        } catch (e) {
            is_downloading = false;        
            mex = 'Ops, your file is not available!!!';
        }
	});
</script>

<main>
	<div class="main-container">
		<div class="mex text">
			{@html mex}
            {#if is_downloading}
            <br>
            <Progress
                current={current_bytes}
                total={total_bytes}
            />
        {/if}
		</div>
	</div>
</main>

<style>
	main {
		background-image: url('/img/share_background.png');
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
