<script lsng="ts">
	let mex = '404<br>The file you are lookign for <br>does not exists!!!';
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
