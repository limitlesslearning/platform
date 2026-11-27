<script lang="ts">
	import { resolve } from '$app/paths';
	import { goto } from '$app/navigation';
	import { PRODUCT_NAME } from '#lib/site.ts';
	import { useGoal } from '#lib/state/goal.svelte.ts';
	import SampleNotice from '#lib/components/SampleNotice.svelte';

	const goal = useGoal();

	let choice = $state(goal.goalId);
	let custom = $state(goal.customTitle);

	async function save(event: SubmitEvent) {
		event.preventDefault();
		goal.goalId = choice;
		goal.customTitle = custom.trim();
		await goto(resolve('/'));
	}
</script>

<svelte:head><title>Pick your goal · {PRODUCT_NAME}</title></svelte:head>

<div class="stack narrow">
	<SampleNotice what="the suggested goals" />
	<h1>Pick your goal</h1>
	<p>
		Your goal is yours. {PRODUCT_NAME} suggests a path to it, and you can change it whenever you like.
		Changing your goal never resets your progress.
	</p>

	<form class="card" onsubmit={save}>
		<fieldset>
			<legend>What do you want to be able to do?</legend>
			{#each goal.options as g (g.id)}
				<label class="option">
					<input type="radio" name="goal" value={g.id} bind:group={choice} />
					<span>
						<strong>{g.title}</strong><br />
						<span class="muted">{g.description}</span>
					</span>
				</label>
			{/each}
			<label class="option">
				<input type="radio" name="goal" value="custom" bind:group={choice} />
				<span><strong>Write my own goal</strong></span>
			</label>
			{#if choice === 'custom'}
				<div class="custom">
					<label for="custom-goal">Your goal, in your words</label>
					<input
						id="custom-goal"
						type="text"
						bind:value={custom}
						placeholder="For example: understand how a compiler turns code into a program"
						required
					/>
				</div>
			{/if}
		</fieldset>
		<div class="actions">
			<button class="button" type="submit">Save goal</button>
			<a class="button secondary" href={resolve('/')}>Cancel</a>
		</div>
	</form>
</div>

<style>
	.narrow {
		max-width: 44rem;
	}
	.custom {
		display: grid;
		gap: 0.35rem;
		padding: 0.25rem 0 0 2rem;
	}
	.actions {
		display: flex;
		gap: 0.5rem;
	}
</style>
