<script lang="ts">
	let { what = 'this screen' }: { what?: string } = $props();
</script>

<aside class="notice" aria-label="Sample content notice">
	<strong>Sample content.</strong>
	Everything on {what} comes from design fixtures. It is not real learner data.
</aside>

<style>
	.notice {
		background: var(--notice-bg);
		border: 1px solid var(--notice-border);
		color: var(--notice-text);
		border-radius: 8px;
		padding: 0.5rem 0.85rem;
		font-size: 0.9rem;
	}
</style>
