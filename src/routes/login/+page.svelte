<script lang="ts">
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { PUBLIC_GOOGLE_CLIENT_ID } from '$env/static/public';
	import { invalidateAll } from '$app/navigation';
    
    let login_error = false; // signal error to user
	let google_button: any; // google login button

	async function login_callback(response: Response): Promise<void> {
		login_error = false;

		// call auth backend to complete login
		const res = await fetch('/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			body: 'token=' + response.credential
		});

		if (res.ok) {
			login_error = false;
			invalidateAll();
		} else {
			login_error = true;
		}
	}

	function init_google_login(): void {
		google.accounts.id.initialize({
			client_id: PUBLIC_GOOGLE_CLIENT_ID,
			callback: login_callback,
			nonce: new Date().getTime().toString(),
			ux_mode: 'popup'
		});
	}

	function render_google_button(): void {
		if (google_button) {
			google.accounts.id.renderButton(google_button, {
				type: 'standard',
				theme: 'filled_blue',
				size: 'large',
				width: '300',
				shape: 'square',
				locale: 'it_IT'
			});
		}
	}

	onMount(() => {
		invalidateAll();
		init_google_login();
		render_google_button();
	});
</script>

<div class="row g-0 flex-fill">
	<div
		class="col-12 col-lg-6 col-xl-4 d-flex flex-column justify-content-center"
	>
		<div class="text-center mb-5 mt-5">
			<a href="." class="navbar-brand navbar-brand-autodark"
				><img class="logo" src="img/your_logo.png" alt="" /></a
			>
		</div>

            <h2 class="h3 text-center mb-3 text-muted">Usa le tue credenziali aziendali</h2>
            <div class="mb-4 mt-4 gbutton">
                <div id="googleButton" bind:this={google_button} />
            </div>
            {#if login_error}
                <div class="login-error text-center mt-3">Impossibile effettuare il login!!</div>
            {/if}
	</div>
	<div class="col-12 col-lg-6 col-xl-8 d-none d-lg-block">
        <div class="bg-cover h-100 min-vh-100 bg-img" />
	</div>
</div>

<style>
    .bg-img {
        background-image: url(/img/your_login_cover.jpg); 
        opacity: 0.75;  
        background-repeat: no-repeat; 
        background-position: right top;
    }

    .logo {
        width: 300px;
    }

	.gbutton {
		left: 6.5rem;
		margin: auto;
	}

	.login-error {
		color: red;
	}
</style>
