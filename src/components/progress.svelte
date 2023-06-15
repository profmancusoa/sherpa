<script>
    export let current;
    export let total;
</script>

<progress id="file" value={current} max={total} />

<style>
    progress {
		/* Turns off styling - not usually needed, but good to know. */
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		border: solid white 5px;
		border-radius: 10px;
		height: 45px;
	}

	/* Chrome */
	progress::-webkit-progress-bar {
		background: white;
	}

	/* Firefox */
	progress::-moz-progress-bar {
		border-radius: 5px;
		background-image: -moz-linear-gradient(
			center bottom,
            rgb(24, 91, 100) 37%,
			rgb(115, 215, 229) 69%
		);
	}

	/* Chrome */
	progress::-webkit-progress-value {
		border-radius: 5px;
		background-image: -webkit-gradient(
			linear,
			left bottom,
			left top,
            color-stop(0, rgb(24, 91, 100)),
			color-stop(1, rgb(115, 215, 229))
		);
		background-image: -webkit-linear-gradient(
			center bottom,
            rgb(24, 91, 100) 37%,
			rgb(115, 215, 229) 69%
		);
	}
</style>