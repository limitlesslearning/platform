<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { PRODUCT_NAME } from '#lib/site.ts';
</script>

<svelte:head><title>{page.status} · {PRODUCT_NAME}</title></svelte:head>

<h1>{page.status}</h1>
<p>{page.error?.message}</p>
<p><a href={resolve('/')}>Back to home</a></p>
