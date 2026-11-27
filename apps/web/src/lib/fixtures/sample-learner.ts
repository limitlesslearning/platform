/** SAMPLE CONTENT for design screens. "Asha" is a made-up learner, not a real person. */
import type { ConceptProgress, Goal, StudyCircle } from '#lib/domain/types.ts';

export const sampleLearner = {
	displayName: 'Asha (sample learner)',
	/** Today's date for the sample, so screens render the same every time. */
	today: '2026-11-27'
};

export const sampleProgress: ConceptProgress[] = [
	{ conceptId: 'variables', status: 'retained' },
	{ conceptId: 'conditionals', status: 'retained' },
	{ conceptId: 'loops', status: 'retained' },
	{ conceptId: 'cs-functions', status: 'retained' },
	{ conceptId: 'recursion', status: 'practising', practiceAccuracy: 0.78 },
	{ conceptId: 'sets', status: 'retained' },
	{ conceptId: 'maths-functions', status: 'retained' },
	{ conceptId: 'sequences', status: 'retained' },
	{ conceptId: 'induction', status: 'retained' },
	{
		conceptId: 'summation',
		status: 'provisional-pass',
		practiceAccuracy: 0.92,
		provisionalPassOn: '2026-11-24',
		retentionCheckOn: '2026-12-01'
	},
	{ conceptId: 'binary-search', status: 'not-started' },
	{ conceptId: 'divide-and-conquer', status: 'not-started' },
	{ conceptId: 'merge-sort', status: 'not-started' },
	{ conceptId: 'recurrences', status: 'not-started' }
];

/** Goals offered as starting points. The learner can also write their own. */
export const sampleGoals: Goal[] = [
	{
		id: 'recursive-algorithms',
		title: 'Write and analyse recursive algorithms',
		description: 'From functions to merge sort, with the maths to reason about running time.',
		targetConceptIds: ['merge-sort', 'recurrences']
	},
	{
		id: 'search-and-sort',
		title: 'Understand searching and sorting',
		description: 'Binary search and merge sort, and why they are fast.',
		targetConceptIds: ['binary-search', 'merge-sort']
	},
	{
		id: 'proof-foundations',
		title: 'Get comfortable with proofs',
		description: 'Sets, functions, sequences and proof by induction.',
		targetConceptIds: ['induction']
	}
];

export const sampleChosenGoalId = 'recursive-algorithms';

export const sampleStudyCircle: StudyCircle = {
	id: 'circle-recursion-1',
	name: 'Recursion study circle',
	focusConceptId: 'recursion',
	members: [
		{ name: 'Asha (sample)', level: 4 },
		{ name: 'Tomás (sample)', level: 4 },
		{ name: 'Wen (sample)', level: 3 },
		{ name: 'Kofi (sample)', level: 4 }
	],
	mentor: { name: 'Priya (sample mentor)' },
	meets: 'Thursdays, 45 minutes, online'
};
