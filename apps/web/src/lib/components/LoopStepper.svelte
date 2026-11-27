<script lang="ts">
	import { resolve } from '$app/paths';
	import { LOOP_STAGES, LOOP_STAGE_LABELS, type LoopStage } from '#lib/domain/mastery.ts';

	let { conceptId, current }: { conceptId: string; current: LoopStage } = $props();

	const currentIndex = $derived(LOOP_STAGES.indexOf(current));
</script>

<nav aria-label="Learning loop steps">
	<ol class="steps">
		{#each LOOP_STAGES as stage, i (stage)}
			<li class:done={i < currentIndex} class:current={i === currentIndex}>
				<a
					href={resolve('/learn/[concept]/[stage]', { concept: conceptId, stage: stage })}
					aria-current={i === currentIndex ? 'step' : undefined}
				>
					<span class="num" aria-hidden="true">{i + 1}</span>
					<span class="label">{LOOP_STAGE_LABELS[stage]}</span>
					{#if i < currentIndex}<span class="visually-hidden">(done)</span>{/if}
				</a>
			</li>
		{/each}
	</ol>
</nav>

<style>
	.steps {
		list-style: none;
		margin: 0 0 1.5rem;
		padding: 0;
		display: grid;
		grid-template-columns: repeat(5, minmax(0, 1fr));
		gap: 0.5rem;
		counter-reset: step;
	}
	a {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 0.35rem;
		padding: 0.6rem 0.7rem;
		border: 1px solid var(--border);
		border-radius: 8px;
		background: var(--surface);
		text-decoration: none;
		height: 100%;
	}
	.num {
		display: inline-grid;
		place-items: center;
		width: 1.6rem;
		height: 1.6rem;
		border-radius: 50%;
		border: 2px solid currentColor;
		font-size: 0.85rem;
		font-weight: 600;
	}
	.done .num {
		background: var(--text);
		color: var(--surface);
		border-color: var(--text);
	}
	.current a {
		border: 2px solid var(--text);
	}
	.label {
		font-weight: 600;
		font-size: 0.92rem;
	}
	@media (max-width: 640px) {
		.steps {
			grid-template-columns: 1fr;
		}
		a {
			flex-direction: row;
			align-items: center;
		}
	}
</style>
