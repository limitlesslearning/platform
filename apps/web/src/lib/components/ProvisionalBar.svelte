<script lang="ts">
	import { PROVISIONAL_PRACTICE_BAR, formatPercent } from '#lib/domain/mastery.ts';

	let { accuracy, label = 'Recent practice accuracy' }: { accuracy: number; label?: string } =
		$props();

	const id = $props.id();
</script>

<div class="wrap">
	<div class="row">
		<span id="{id}-label">{label}</span>
		<strong>{formatPercent(accuracy)}</strong>
	</div>
	<div
		class="track"
		role="meter"
		aria-labelledby="{id}-label"
		aria-describedby="{id}-bar"
		aria-valuemin={0}
		aria-valuemax={100}
		aria-valuenow={Math.round(accuracy * 100)}
		aria-valuetext="{formatPercent(accuracy)}, provisional practice bar is {formatPercent(
			PROVISIONAL_PRACTICE_BAR
		)}"
	>
		<div class="fill" style:width="{Math.min(accuracy, 1) * 100}%"></div>
		<div class="bar" style:left="{PROVISIONAL_PRACTICE_BAR * 100}%" aria-hidden="true"></div>
	</div>
	<p class="legend" id="{id}-bar">
		<span class="tag provisional">Provisional</span>
		Practice bar: {formatPercent(PROVISIONAL_PRACTICE_BAR)}. This is a provisional practice bar, not
		a credential cut. The credential cut is set after the Phase 1 pilot.
	</p>
</div>

<style>
	.row {
		display: flex;
		justify-content: space-between;
		margin-bottom: 0.35rem;
	}
	.track {
		position: relative;
		height: 0.75rem;
		background: var(--bar-track);
		border-radius: 999px;
		overflow: visible;
	}
	.fill {
		height: 100%;
		background: var(--bar-fill);
		border-radius: 999px;
	}
	.bar {
		position: absolute;
		top: -0.3rem;
		bottom: -0.3rem;
		width: 3px;
		margin-left: -1.5px;
		background: var(--text);
		border-radius: 2px;
		box-shadow: 0 0 0 2px var(--surface);
	}
	.legend {
		margin: 0.6rem 0 0;
		font-size: 0.85rem;
		color: var(--muted);
	}
</style>
