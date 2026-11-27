<script lang="ts">
	import { resolve } from '$app/paths';
	import type { Concept, ConceptProgress, Domain } from '#lib/domain/types.ts';
	import { STATUS_LABELS, domainLevel, effectiveStatus, levelBand } from '#lib/domain/mastery.ts';
	import StatusGlyph from './StatusGlyph.svelte';

	let {
		concepts,
		progress,
		domains,
		layout,
		goalConceptIds = []
	}: {
		concepts: Concept[];
		progress: ConceptProgress[];
		domains: Domain[];
		layout: Record<string, { x: number; y: number }>;
		goalConceptIds?: string[];
	} = $props();

	const edges = $derived(
		concepts.flatMap((c) =>
			c.prerequisites
				.filter((p) => layout[p] && layout[c.id])
				.map((p) => ({ from: layout[p], to: layout[c.id], key: `${p}-${c.id}` }))
		)
	);

	const legend = [
		'retained',
		'provisional-pass',
		'practising',
		'open-next',
		'not-started'
	] as const;
</script>

<div class="map">
	<figure class="drawing">
		<svg viewBox="-50 10 740 290" aria-hidden="true" focusable="false">
			{#each edges as e (e.key)}
				<line x1={e.from.x} y1={e.from.y} x2={e.to.x} y2={e.to.y} class="edge" />
			{/each}
			{#each concepts as c (c.id)}
				{@const pos = layout[c.id]}
				{#if pos}
					{@const status = effectiveStatus(c, progress)}
					<g transform="translate({pos.x} {pos.y})" class="node">
						{#if goalConceptIds.includes(c.id)}
							<circle r="17" class="goal-ring" />
						{/if}
						{#if status === 'retained'}
							<circle r="10" class="fill" />
						{:else if status === 'provisional-pass'}
							<circle r="6.5" class="fill" />
							<circle r="11" class="dashed" />
						{:else if status === 'practising'}
							<circle r="10" class="ring" />
							<circle r="3.5" class="fill" />
						{:else if status === 'open-next'}
							<circle r="9.5" class="ring accent" />
						{:else}
							<circle r="9.5" class="dashed faint" />
						{/if}
						<text y="28" text-anchor="middle">{c.title}</text>
					</g>
				{/if}
			{/each}
		</svg>
		<figcaption class="muted">
			Drawing of the concept graph. The same information is in the lists below. A large ring marks
			the end points of your goal.
		</figcaption>
	</figure>

	<ul class="plain legend" aria-label="Map legend">
		{#each legend as s (s)}
			<li><StatusGlyph status={s} /> {STATUS_LABELS[s]}</li>
		{/each}
	</ul>

	<div class="grid two">
		{#each domains as d (d.id)}
			{@const level = domainLevel(d.id, concepts, progress)}
			<section aria-labelledby="domain-{d.id}">
				<h3 id="domain-{d.id}">
					{d.name}
					<span class="muted level">
						{#if level > 0}Level {level}
							<span class="band">(band {levelBand(level)})</span>{:else}Not started{/if}
					</span>
				</h3>
				<ul class="plain concepts">
					{#each concepts.filter((c) => c.domain === d.id) as c (c.id)}
						{@const status = effectiveStatus(c, progress)}
						<li>
							<StatusGlyph {status} />
							<a href={resolve('/learn/[concept]/[stage]', { concept: c.id, stage: 'diagnose' })}>
								{c.title}
							</a>
							<span class="muted small">L{c.level} · {STATUS_LABELS[status]}</span>
							{#if status === 'provisional-pass'}<span class="tag provisional">
									Provisional
								</span>{/if}
						</li>
					{/each}
				</ul>
			</section>
		{/each}
	</div>
	<p class="muted small">
		Every concept is open to start, whatever its status. "Recommended next" means its prerequisites
		are in place.
	</p>
</div>

<style>
	.drawing {
		margin: 0 0 1rem;
	}
	svg {
		width: 100%;
		height: auto;
		display: block;
		color: var(--text);
	}
	.edge {
		stroke: var(--border);
		stroke-width: 2;
	}
	.fill {
		fill: currentColor;
	}
	.ring {
		fill: var(--surface);
		stroke: currentColor;
		stroke-width: 3;
	}
	.ring.accent {
		stroke: var(--accent);
	}
	.dashed {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.75;
		stroke-dasharray: 4 3;
	}
	.dashed.faint {
		fill: var(--surface);
		opacity: 0.75;
	}
	.goal-ring {
		fill: none;
		stroke: var(--muted);
		stroke-width: 1.5;
	}
	text {
		font-size: 10.5px;
		fill: var(--text);
		font-family: var(--font);
	}
	figcaption {
		font-size: 0.85rem;
		margin-top: 0.25rem;
	}
	.legend {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.25rem;
		font-size: 0.9rem;
		margin-bottom: 1rem;
	}
	.legend li {
		display: flex;
		align-items: center;
		gap: 0.35rem;
	}
	.level {
		font-weight: 400;
		font-size: 0.9rem;
		margin-left: 0.35rem;
	}
	.concepts li {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.25rem 0.5rem;
		padding: 0.35rem 0;
		border-bottom: 1px solid var(--border);
	}
	.small {
		font-size: 0.85rem;
	}
</style>
