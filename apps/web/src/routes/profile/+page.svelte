<script lang="ts">
	import { PRODUCT_NAME } from '#lib/site.ts';
	import { TEACHING_OPENS_ABOVE_LEVEL, domainLevel, levelBand } from '#lib/domain/mastery.ts';
	import { sampleConcepts, sampleDomains } from '#lib/fixtures/sample-concepts.ts';
	import { sampleLearner, sampleProgress } from '#lib/fixtures/sample-learner.ts';
	import SampleNotice from '#lib/components/SampleNotice.svelte';

	const levels = sampleDomains.map((d) => ({
		...d,
		level: domainLevel(d.id, sampleConcepts, sampleProgress)
	}));
	const teachable = levels.filter((d) => d.level > TEACHING_OPENS_ABOVE_LEVEL);

	let offerExplain = $state(false);
	let offerQuestions = $state(false);
	let offerMentor = $state(false);
</script>

<svelte:head><title>Profile · {PRODUCT_NAME}</title></svelte:head>

<div class="stack narrow">
	<SampleNotice what="this profile" />
	<h1>{sampleLearner.displayName}</h1>
	<p class="muted">
		Your profile shows what you can do, never your age, background or anything you didn't choose to
		share.
	</p>

	<section class="card" aria-labelledby="levels-h">
		<h2 id="levels-h">Levels</h2>
		<ul class="plain levels">
			{#each levels as d (d.id)}
				<li>
					<span>{d.name}</span>
					<strong>
						{d.level > 0 ? `Level ${d.level} (band ${levelBand(d.level)})` : 'Not started'}
					</strong>
				</li>
			{/each}
		</ul>
	</section>

	<section class="card" aria-labelledby="teach-h">
		<h2 id="teach-h">Teaching and contributing <span class="tag">Optional</span></h2>
		<p>
			Above level {TEACHING_OPENS_ABOVE_LEVEL} in a domain you can choose to help others. It's entirely
			up to you, and it shows on your profile only if you switch it on.
		</p>
		{#if teachable.length}
			<p class="muted small">Open to you in: {teachable.map((d) => d.name).join(', ')}.</p>
			<fieldset>
				<legend>What would you like to offer?</legend>
				<label class="option">
					<input type="checkbox" bind:checked={offerExplain} />
					<span>Explain concepts to learners in a study circle</span>
				</label>
				<label class="option">
					<input type="checkbox" bind:checked={offerQuestions} />
					<span>Contribute practice questions and worked explanations</span>
				</label>
				<label class="option">
					<input type="checkbox" bind:checked={offerMentor} />
					<span>Be a mentor for a study circle (mentor reviews also need a Security Circle)</span>
				</label>
			</fieldset>
			<p class="muted small" aria-live="polite">
				{#if offerExplain || offerQuestions || offerMentor}
					Shown on your profile: {[
						offerExplain && 'explains concepts',
						offerQuestions && 'contributes questions',
						offerMentor && 'mentor'
					]
						.filter(Boolean)
						.join(', ')}.
				{:else}
					Nothing selected, so nothing extra is shown on your profile.
				{/if}
			</p>
		{:else}
			<p class="muted">
				This opens once you're above level {TEACHING_OPENS_ABOVE_LEVEL} in any domain.
			</p>
		{/if}
	</section>
</div>

<style>
	.narrow {
		max-width: 44rem;
	}
	.small {
		font-size: 0.85rem;
	}
	.levels li {
		display: flex;
		justify-content: space-between;
		padding: 0.45rem 0;
		border-bottom: 1px solid var(--border);
	}
	input[type='checkbox'] {
		accent-color: var(--text);
		width: 1.1rem;
		height: 1.1rem;
		margin-top: 0.15rem;
	}
</style>
