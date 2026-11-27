<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import { brand } from '#lib/brand.ts';
	import { PRODUCT_NAME } from '#lib/site.ts';

	const nav = [
		{ href: resolve('/'), label: 'Home', match: undefined },
		{
			href: resolve('/learn/[concept]/[stage]', { concept: 'recursion', stage: 'diagnose' }),
			label: 'Learn',
			match: '/learn'
		},
		{ href: resolve('/review'), label: 'Review', match: undefined },
		{ href: resolve('/profile'), label: 'Profile', match: undefined }
	];

	function isCurrent(item: (typeof nav)[number]): boolean {
		const path = page.url.pathname;
		if (item.match) return path.startsWith(item.match);
		return path === item.href;
	}
</script>

<header class="site-header">
	<a class="skip" href="#main">Skip to content</a>
	<div class="inner">
		<a href={resolve('/')} class="logo">
			<picture>
				<source media="(prefers-color-scheme: dark)" srcset={brand.lockup.inverse} />
				<img src={brand.lockup.ink} alt="{PRODUCT_NAME} home" height="32" width="96" />
			</picture>
		</a>
		<nav aria-label="Main">
			<ul class="plain">
				{#each nav as item (item.href)}
					<li>
						<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- hrefs are built with resolve() above -->
						<a href={item.href} aria-current={isCurrent(item) ? 'page' : undefined}>{item.label}</a>
					</li>
				{/each}
			</ul>
		</nav>
	</div>
</header>

<style>
	.site-header {
		background: var(--surface);
		border-bottom: 1px solid var(--border);
	}
	.inner {
		max-width: 72rem;
		margin: 0 auto;
		padding: 0.75rem 1.25rem;
		display: flex;
		align-items: center;
		justify-content: space-between;
		gap: 1rem;
		flex-wrap: wrap;
	}
	.logo {
		display: inline-flex;
		padding: 4px;
	}
	.logo img {
		display: block;
		height: 32px;
		width: auto;
	}
	nav ul {
		display: flex;
		gap: 0.25rem;
	}
	nav a {
		display: block;
		padding: 0.4rem 0.75rem;
		border-radius: 6px;
		text-decoration: none;
		font-weight: 500;
	}
	nav a:hover {
		text-decoration: underline;
	}
	nav a[aria-current='page'] {
		background: var(--text);
		color: var(--bg);
	}
	.skip {
		position: absolute;
		left: 0.5rem;
		top: -3rem;
		background: var(--text);
		color: var(--bg);
		padding: 0.5rem 0.75rem;
		border-radius: 6px;
		z-index: 10;
	}
	.skip:focus {
		top: 0.5rem;
	}
</style>
