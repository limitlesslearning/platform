<script lang="ts">
	import { resolve } from '$app/paths';
	import { PRODUCT_NAME } from '#lib/site.ts';
	import { useGoal } from '#lib/state/goal.svelte.ts';
	import {
		effectiveStatus,
		formatDate,
		formatPercent,
		PROVISIONAL_PRACTICE_BAR
	} from '#lib/domain/mastery.ts';
	import {
		sampleConcepts,
		sampleDomains,
		sampleMapLayout,
		sampleConcept
	} from '#lib/fixtures/sample-concepts.ts';
	import {
		sampleLearner,
		sampleProgress,
		sampleStudyCircle
	} from '#lib/fixtures/sample-learner.ts';
	import MasteryMap from '#lib/components/MasteryMap.svelte';
	import SampleNotice from '#lib/components/SampleNotice.svelte';
	import StatusGlyph from '#lib/components/StatusGlyph.svelte';

	const goal = useGoal();

	const goalTargets = $derived(
		goal.current.custom
			? []
			: (goal.options.find((g) => g.id === goal.goalId)?.targetConceptIds ?? [])
	);

	const practising = sampleProgress.filter((p) => p.status === 'practising');
	const checksDue = sampleProgress.filter((p) => p.status === 'provisional-pass');
	const recommended = sampleConcepts.filter(
		(c) => effectiveStatus(c, sampleProgress) === 'open-next'
	);

	const title = (id: string) => sampleConcept(id)?.title ?? id;
</script>

<svelte:head><title>Home · {PRODUCT_NAME}</title></svelte:head>

<div class="stack">
	<SampleNotice what="this home view" />

	<h1>Welcome back, {sampleLearner.displayName}</h1>

	<div class="grid main-side">
		<section class="card goal" aria-labelledby="goal-h">
			<p class="eyebrow muted">Your goal, chosen by you</p>
			<h2 id="goal-h">{goal.current.title}</h2>
			<p>{goal.current.description}</p>
			<a class="button secondary" href={resolve('/goal')}>Change goal</a>
		</section>

		<section class="card" aria-labelledby="next-h">
			<h2 id="next-h">What's next</h2>
			<ol class="next">
				{#each practising as p (p.conceptId)}
					<li>
						<StatusGlyph status="practising" />
						<div>
							<a
								href={resolve('/learn/[concept]/[stage]', {
									concept: p.conceptId,
									stage: 'practise'
								})}
							>
								Keep practising {title(p.conceptId)}
							</a>
							<p class="muted small">
								Recent accuracy {formatPercent(p.practiceAccuracy ?? 0)}. Provisional practice bar {formatPercent(
									PROVISIONAL_PRACTICE_BAR
								)}.
							</p>
						</div>
					</li>
				{/each}
				{#each checksDue as p (p.conceptId)}
					<li>
						<StatusGlyph status="provisional-pass" />
						<div>
							<a
								href={resolve('/learn/[concept]/[stage]', {
									concept: p.conceptId,
									stage: 'retention-check'
								})}
							>
								7-day check: {title(p.conceptId)}
							</a>
							<p class="muted small">
								Due {formatDate(p.retentionCheckOn ?? sampleLearner.today)}.
								<span class="tag provisional">Provisional pass</span>
							</p>
						</div>
					</li>
				{/each}
				{#each recommended as c (c.id)}
					<li>
						<StatusGlyph status="open-next" />
						<div>
							<a href={resolve('/learn/[concept]/[stage]', { concept: c.id, stage: 'diagnose' })}>
								Start {c.title}
							</a>
							<p class="muted small">Recommended: its prerequisites are in place.</p>
						</div>
					</li>
				{/each}
			</ol>
		</section>
	</div>

	<section class="card" aria-labelledby="map-h">
		<h2 id="map-h">Your mastery map</h2>
		<p class="muted">
			Computer science and mathematics, the Phase 1 domains. Levels use the 1–25+ scale.
		</p>
		<MasteryMap
			concepts={sampleConcepts}
			progress={sampleProgress}
			domains={sampleDomains}
			layout={sampleMapLayout}
			goalConceptIds={goalTargets}
		/>
	</section>

	<section class="card" aria-labelledby="circle-h">
		<h2 id="circle-h">Study circle <span class="tag">Optional</span></h2>
		<p>
			Small groups matched by mastery on the same concept, with a mentor. Joining is up to you, and
			learning never depends on it.
		</p>
		<p>
			<strong>{sampleStudyCircle.name}</strong>
			<span class="muted">· {sampleStudyCircle.meets}</span>
		</p>
		<ul class="members">
			{#each sampleStudyCircle.members as m (m.name)}
				<li>{m.name}, level {m.level}</li>
			{/each}
			{#if sampleStudyCircle.mentor}
				<li><strong>Mentor:</strong> {sampleStudyCircle.mentor.name}</li>
			{/if}
		</ul>
		<div class="actions">
			<button type="button" class="button secondary">Join this circle</button>
			<button type="button" class="button secondary">Not now</button>
		</div>
	</section>
</div>

<style>
	.eyebrow {
		font-size: 0.85rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}
	.next {
		list-style: none;
		padding: 0;
		margin: 0;
	}
	.next li {
		display: flex;
		gap: 0.6rem;
		align-items: flex-start;
		padding: 0.5rem 0;
		border-bottom: 1px solid var(--border);
	}
	.next li:last-child {
		border-bottom: none;
	}
	.next p {
		margin: 0.1rem 0 0;
	}
	.small {
		font-size: 0.85rem;
	}
	.members {
		margin: 0 0 1rem;
		padding-left: 1.2rem;
	}
	.actions {
		display: flex;
		gap: 0.5rem;
		flex-wrap: wrap;
	}
</style>
