<script lang="ts">
	import { resolve } from '$app/paths';
	import { PRODUCT_NAME } from '#lib/site.ts';
	import {
		LOOP_STAGE_LABELS,
		PROVISIONAL_PRACTICE_BAR,
		RETENTION_CHECK_DAYS,
		conceptsOpenedBy,
		formatDate,
		formatPercent,
		levelBand,
		nextStage,
		previousStage,
		retentionCheckDate
	} from '#lib/domain/mastery.ts';
	import { sampleConcept, sampleConcepts } from '#lib/fixtures/sample-concepts.ts';
	import { sampleProgress } from '#lib/fixtures/sample-learner.ts';
	import {
		sampleDiagnosticQuestion,
		sampleDiagnosticResult,
		samplePracticeAccuracy,
		samplePracticeItems,
		sampleProvisionalPassOn,
		sampleRetentionQuestion
	} from '#lib/fixtures/sample-loop.ts';
	import LoopStepper from '#lib/components/LoopStepper.svelte';
	import ProvisionalBar from '#lib/components/ProvisionalBar.svelte';
	import SampleNotice from '#lib/components/SampleNotice.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();

	const concept = $derived(data.concept);
	const stage = $derived(data.stage);
	const next = $derived(nextStage(stage));
	const prev = $derived(previousStage(stage));
	/** The design walkthrough is written for one concept only. */
	const hasWalkthrough = $derived(concept.id === 'recursion');
	const prerequisites = $derived(concept.prerequisites.map((id) => sampleConcept(id)?.title ?? id));
	const opened = $derived(conceptsOpenedBy(concept.id, sampleConcepts, sampleProgress));

	let diagnosticAnswer = $state<number | null>(null);
	let retentionAnswer = $state<number | null>(null);
</script>

<svelte:head>
	<title>{concept.title}: {LOOP_STAGE_LABELS[stage]} · {PRODUCT_NAME}</title>
</svelte:head>

<div class="stack">
	<SampleNotice what="this learning step" />

	<header>
		<p class="muted crumbs">
			{concept.domain === 'cs' ? 'Computer science' : 'Mathematics'} · Level {concept.level}
			(band {levelBand(concept.level)})
		</p>
		<h1>{concept.title}</h1>
		<p>{concept.summary}</p>
		{#if prerequisites.length}
			<p class="muted small">
				Builds on: {prerequisites.join(', ')}. Open to everyone; prerequisites are advice, not a
				gate.
			</p>
		{/if}
	</header>

	<LoopStepper conceptId={concept.id} current={stage} />

	{#if !hasWalkthrough}
		<section class="card">
			<h2>{LOOP_STAGE_LABELS[stage]}</h2>
			<p>
				The design walkthrough is written for <a
					href={resolve('/learn/[concept]/[stage]', { concept: 'recursion', stage: stage })}
				>
					Recursion
				</a>. This concept uses the same five steps.
			</p>
		</section>
	{:else if stage === 'diagnose'}
		<section class="card" aria-labelledby="stage-h">
			<h2 id="stage-h">Diagnose: where are you starting from?</h2>
			<p>
				A few short questions find what you already know, so you don't practise what you've
				mastered. There's no score to keep and nothing to lose.
			</p>
			<form onsubmit={(e) => e.preventDefault()}>
				<fieldset>
					<legend>Question 3 of 5 · {sampleDiagnosticQuestion.prompt}</legend>
					<pre><code>{sampleDiagnosticQuestion.code}</code></pre>
					{#each sampleDiagnosticQuestion.options as option, i (option)}
						<label class="option">
							<input type="radio" name="diag" value={i} bind:group={diagnosticAnswer} />
							<span>{option}</span>
						</label>
					{/each}
					<label class="option">
						<input type="radio" name="diag" value={-1} bind:group={diagnosticAnswer} />
						<span>I don't know yet</span>
					</label>
				</fieldset>
			</form>
			<div class="result" role="status">
				<h3>What the diagnostic found</h3>
				<p>{sampleDiagnosticResult.finding}</p>
				<p class="muted small">
					{sampleDiagnosticResult.correct} of {sampleDiagnosticResult.answered} answered correctly.
				</p>
			</div>
		</section>
	{:else if stage === 'practise'}
		<section class="card" aria-labelledby="stage-h">
			<h2 id="stage-h">Practise</h2>
			<p>
				Short, varied problems. Mistakes are expected: each one shows a worked explanation. When
				your recent accuracy reaches the provisional practice bar, you move on to a provisional
				pass.
			</p>
			<ProvisionalBar accuracy={samplePracticeAccuracy.practising} />
			<h3 class="spaced">Recent practice</h3>
			<ul class="plain items">
				{#each samplePracticeItems as item (item.prompt)}
					<li>
						<span>{item.prompt}</span>
						<span class="muted">
							{item.result === 'correct' ? 'Correct' : 'Not yet: see explanation'}
						</span>
					</li>
				{/each}
			</ul>
		</section>
	{:else if stage === 'provisional-pass'}
		<section class="card" aria-labelledby="stage-h">
			<h2 id="stage-h">
				Provisional pass <span class="tag provisional">Provisional</span>
			</h2>
			<p>
				Your recent practice accuracy reached the provisional practice bar of {formatPercent(
					PROVISIONAL_PRACTICE_BAR
				)}. This shows you can do it today. The {RETENTION_CHECK_DAYS}-day check shows whether it
				stuck.
			</p>
			<ProvisionalBar accuracy={samplePracticeAccuracy.passed} />
			<dl class="facts">
				<div>
					<dt>Provisional pass</dt>
					<dd>{formatDate(sampleProvisionalPassOn)}</dd>
				</div>
				<div>
					<dt>7-day check</dt>
					<dd>{formatDate(retentionCheckDate(sampleProvisionalPassOn))}</dd>
				</div>
				<div>
					<dt>Credential</dt>
					<dd>Not yet. The credential cut is set after the Phase 1 pilot.</dd>
				</div>
			</dl>
			<p class="muted small">
				You can keep exploring other concepts while you wait. Nothing is blocked.
			</p>
		</section>
	{:else if stage === 'retention-check'}
		<section class="card" aria-labelledby="stage-h">
			<h2 id="stage-h">7-day check</h2>
			<p>
				A few questions {RETENTION_CHECK_DAYS} days after your provisional pass, without notes. If it
				hasn't stuck yet, you get a short refresher and try again later. Nothing is taken away.
			</p>
			<form onsubmit={(e) => e.preventDefault()}>
				<fieldset>
					<legend>Question 1 of 4 · {sampleRetentionQuestion.prompt}</legend>
					<pre><code>{sampleRetentionQuestion.code}</code></pre>
					{#each sampleRetentionQuestion.options as option, i (option)}
						<label class="option">
							<input type="radio" name="ret" value={i} bind:group={retentionAnswer} />
							<span>{option}</span>
						</label>
					{/each}
				</fieldset>
			</form>
		</section>
	{:else if stage === 'unlock'}
		<section class="card" aria-labelledby="stage-h">
			<h2 id="stage-h">Recursion stuck. Here's what opens next</h2>
			<p>
				You passed the 7-day check. These concepts now have their prerequisites in place, so they
				move to "Recommended next" on your map.
			</p>
			<ul class="plain opened">
				{#each opened as c (c.id)}
					<li class="card inner">
						<h3>
							<a href={resolve('/learn/[concept]/[stage]', { concept: c.id, stage: 'diagnose' })}>
								{c.title}
							</a>
						</h3>
						<p class="muted small">
							{c.domain === 'cs' ? 'Computer science' : 'Mathematics'} · Level {c.level}
						</p>
						<p>{c.summary}</p>
					</li>
				{/each}
			</ul>
			<p class="muted small">
				Every other concept stays open too. Recommendations follow the goal you picked.
			</p>
		</section>
	{/if}

	<nav class="pager" aria-label="Previous and next step">
		{#if prev}
			<a
				class="button secondary"
				href={resolve('/learn/[concept]/[stage]', { concept: concept.id, stage: prev })}
			>
				← {LOOP_STAGE_LABELS[prev]}
			</a>
		{:else}
			<span></span>
		{/if}
		{#if next}
			<a
				class="button"
				href={resolve('/learn/[concept]/[stage]', { concept: concept.id, stage: next })}
			>
				{LOOP_STAGE_LABELS[next]} →
			</a>
		{:else}
			<a class="button" href={resolve('/')}>Back to home</a>
		{/if}
	</nav>
</div>

<style>
	.crumbs {
		font-size: 0.9rem;
		margin-bottom: 0.25rem;
	}
	.small {
		font-size: 0.85rem;
	}
	.spaced {
		margin-top: 1.25rem;
	}
	.result {
		border-top: 1px solid var(--border);
		padding-top: 1rem;
	}
	.items li {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		padding: 0.45rem 0;
		border-bottom: 1px solid var(--border);
	}
	.facts {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
		gap: 0.75rem;
		margin: 1rem 0;
	}
	.facts dt {
		font-size: 0.85rem;
		color: var(--muted);
	}
	.facts dd {
		margin: 0;
		font-weight: 600;
	}
	.opened {
		display: grid;
		gap: 0.75rem;
		grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
		margin-bottom: 1rem;
	}
	.inner {
		padding: 1rem;
		background: var(--bg);
	}
	.pager {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
	}
</style>
