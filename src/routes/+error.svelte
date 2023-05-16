<script>
    import { page } from '$app/stores';
  </script>
  
  <mark>PAGINA ERRORE</mark>
  <h1>{$page.error.message}</h1>
  ###{JSON.stringify($page)}###

  <h1>{$page.status}</h1>