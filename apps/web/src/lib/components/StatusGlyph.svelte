<script lang="ts">
	import type { ConceptStatus } from '#lib/domain/types.ts';

	/**
	 * Shape, not colour, carries the status (same rule as the brand: filled = where you are,
	 * open = a next step that stays open). Always paired with a text label.
	 */
	let { status, size = 18 }: { status: ConceptStatus; size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 20 20" aria-hidden="true" class="glyph">
	{#if status === 'retained'}
		<circle cx="10" cy="10" r="7" fill="currentColor" />
	{:else if status === 'provisional-pass'}
		<circle cx="10" cy="10" r="4.5" fill="currentColor" />
		<circle
			cx="10"
			cy="10"
			r="8"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-dasharray="3 2.2"
		/>
	{:else if status === 'practising'}
		<circle cx="10" cy="10" r="7" fill="none" stroke="currentColor" stroke-width="2.5" />
		<circle cx="10" cy="10" r="2.5" fill="currentColor" />
	{:else if status === 'open-next'}
		<circle cx="10" cy="10" r="6.5" fill="none" stroke="var(--accent)" stroke-width="2.5" />
	{:else}
		<circle
			cx="10"
			cy="10"
			r="6.5"
			fill="none"
			stroke="currentColor"
			stroke-width="1.5"
			stroke-dasharray="2 2.5"
			opacity="0.7"
		/>
	{/if}
</svg>

<style>
	.glyph {
		flex: none;
		vertical-align: middle;
	}
</style>
