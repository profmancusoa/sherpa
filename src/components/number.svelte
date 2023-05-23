<script>
	export let number = 1;
	export let min = 0;
	export let max = 0;
	export let suffix = '';

	const update_num = (n) => {
		number = +number + n;
		if (number < min) number = max;
		if (number > max) number = min;
	};
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
	/>
</svelte:head>

<div class="container">
	<div class="num-button">
		<button>
			<span class="material-symbols-outlined icon" on:click={() => update_num(-1)}
				>keyboard_double_arrow_left</span
			>
		</button>
	</div>
	<div class="number">
		{number}{suffix}
	</div>
	<div class="num-button">
		<button>
			<span class="material-symbols-outlined icon" on:click={() => update_num(1)}
				>keyboard_double_arrow_right</span
			>
		</button>
	</div>
</div>

<style>
	.container {
		border: 10px solid #f4f3ea;
		display: flex;
		justify-content: space-between;
		border-radius: 30px;
		width: 60%;
	}

	.num-button {
		display: flex;
		align-items: center;
	}

	.icon {
		font-size: 2.5rem;
		color: #f4f3ea;
		font-weight: bolder;
	}

	.icon:hover {
		color: #3d737a;
		transition: 0.5s;
		cursor: pointer;
	}

	.number {
		font-weight: bold;
		font-size: 2.5rem;
		color: #f4f3ea;
	}

	button {
		border: none;
		background: none;
	}
</style>
