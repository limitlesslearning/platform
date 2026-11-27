<script lang="ts">
	import '../app.css';
	import { brand } from '#lib/brand.ts';
	import { PHASE_LABEL, PRODUCT_NAME, PRODUCT_TAGLINE } from '#lib/site.ts';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import { provideGoal } from '#lib/state/goal.svelte.ts';
	import type { LayoutProps } from './$types';

	let { children }: LayoutProps = $props();

	provideGoal();
</script>

<svelte:head>
	<link
		rel="icon"
		type="image/svg+xml"
		href={brand.favicon.ink}
		media="(prefers-color-scheme: light)"
	/>
	<link
		rel="icon"
		type="image/svg+xml"
		href={brand.favicon.inverse}
		media="(prefers-color-scheme: dark)"
	/>
	<meta name="description" content="{PRODUCT_NAME}: {PRODUCT_TAGLINE}" />
	<meta name="theme-color" content="#F4F6FB" media="(prefers-color-scheme: light)" />
	<meta name="theme-color" content="#0D1117" media="(prefers-color-scheme: dark)" />
</svelte:head>

<SiteHeader />

<main id="main" tabindex="-1">
	{@render children()}
</main>

<footer class="site-footer">
	<p>{PRODUCT_NAME} · {PHASE_LABEL}. Learning is always open; nothing here is gated.</p>
</footer>

<style>
	main {
		max-width: 72rem;
		margin: 0 auto;
		padding: 1.5rem 1.25rem 3rem;
	}
	main:focus {
		outline: none;
	}
	.site-footer {
		border-top: 1px solid var(--border);
		color: var(--muted);
		font-size: 0.85rem;
		text-align: center;
		padding: 1rem;
	}
</style>
