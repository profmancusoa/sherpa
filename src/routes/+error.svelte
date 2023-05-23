<!-- <script>
    import { page } from '$app/stores';
  </script>
  
  <mark>PAGINA ERRORE</mark>
  <h1>{$page.error.message}</h1>
  ###{JSON.stringify($page)}###

  <h1>{$page.status}</h1> -->

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
