import { getContext, setContext } from 'svelte';
import { sampleChosenGoalId, sampleGoals } from '#lib/fixtures/sample-learner.ts';
import type { Goal } from '#lib/domain/types.ts';

const KEY = Symbol('learner-goal');

/**
 * The learner's own goal. Kept per page session in a context (not module state, so it is never
 * shared between server requests). Starts from the sample fixture until a backend exists.
 */
export class GoalState {
	goalId = $state<string>(sampleChosenGoalId);
	customTitle = $state('');

	readonly options: Goal[] = sampleGoals;

	get current(): { title: string; description: string; custom: boolean } {
		if (this.goalId === 'custom') {
			return {
				title: this.customTitle || 'My own goal',
				description: 'A goal you wrote yourself.',
				custom: true
			};
		}
		const goal = this.options.find((g) => g.id === this.goalId) ?? this.options[0];
		return { title: goal.title, description: goal.description, custom: false };
	}
}

export function provideGoal(): GoalState {
	return setContext(KEY, new GoalState());
}

export function useGoal(): GoalState {
	return getContext<GoalState>(KEY);
}
