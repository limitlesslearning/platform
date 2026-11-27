/** SAMPLE CONTENT for design screens. Not real curriculum data. */
import type { Concept, Domain } from '#lib/domain/types.ts';

export const sampleDomains: Domain[] = [
	{ id: 'cs', name: 'Computer science' },
	{ id: 'maths', name: 'Mathematics' }
];

export const sampleConcepts: Concept[] = [
	{
		id: 'variables',
		title: 'Variables',
		domain: 'cs',
		level: 1,
		summary: 'Naming values and changing them over time.',
		prerequisites: []
	},
	{
		id: 'conditionals',
		title: 'Conditionals',
		domain: 'cs',
		level: 2,
		summary: 'Choosing between paths with if and else.',
		prerequisites: ['variables']
	},
	{
		id: 'loops',
		title: 'Loops',
		domain: 'cs',
		level: 2,
		summary: 'Repeating steps with for and while.',
		prerequisites: ['conditionals']
	},
	{
		id: 'cs-functions',
		title: 'Functions',
		domain: 'cs',
		level: 3,
		summary: 'Packaging steps behind a name, with inputs and a result.',
		prerequisites: ['loops']
	},
	{
		id: 'recursion',
		title: 'Recursion',
		domain: 'cs',
		level: 4,
		summary: 'A function that solves a problem by calling itself on a smaller version of it.',
		prerequisites: ['cs-functions']
	},
	{
		id: 'binary-search',
		title: 'Binary search',
		domain: 'cs',
		level: 3,
		summary: 'Finding an item in a sorted list by halving the search range.',
		prerequisites: ['loops']
	},
	{
		id: 'divide-and-conquer',
		title: 'Divide and conquer',
		domain: 'cs',
		level: 5,
		summary: 'Split a problem, solve the parts, combine the answers.',
		prerequisites: ['recursion']
	},
	{
		id: 'merge-sort',
		title: 'Merge sort',
		domain: 'cs',
		level: 5,
		summary: 'Sorting by splitting a list in half, sorting each half and merging.',
		prerequisites: ['divide-and-conquer']
	},
	{
		id: 'sets',
		title: 'Sets',
		domain: 'maths',
		level: 1,
		summary: 'Collections of distinct objects and how they combine.',
		prerequisites: []
	},
	{
		id: 'maths-functions',
		title: 'Functions (maths)',
		domain: 'maths',
		level: 2,
		summary: 'Rules that map every input to exactly one output.',
		prerequisites: ['sets']
	},
	{
		id: 'sequences',
		title: 'Sequences',
		domain: 'maths',
		level: 3,
		summary: 'Ordered lists of numbers defined by a rule.',
		prerequisites: ['maths-functions']
	},
	{
		id: 'induction',
		title: 'Proof by induction',
		domain: 'maths',
		level: 4,
		summary: 'Prove a base case, then prove each case implies the next.',
		prerequisites: ['sequences']
	},
	{
		id: 'summation',
		title: 'Summation notation',
		domain: 'maths',
		level: 4,
		summary: 'Writing and manipulating sums with sigma notation.',
		prerequisites: ['sequences']
	},
	{
		id: 'recurrences',
		title: 'Recurrence relations',
		domain: 'maths',
		level: 5,
		summary: 'Sequences defined in terms of earlier terms, and how to solve them.',
		prerequisites: ['induction', 'recursion']
	}
];

/** Layout for the mastery map drawing (drawn in a -50 10 740 290 viewBox). Presentation only. */
export const sampleMapLayout: Record<string, { x: number; y: number }> = {
	variables: { x: 40, y: 70 },
	conditionals: { x: 130, y: 70 },
	loops: { x: 220, y: 70 },
	'cs-functions': { x: 310, y: 70 },
	recursion: { x: 400, y: 110 },
	'binary-search': { x: 500, y: 40 },
	'divide-and-conquer': { x: 500, y: 120 },
	'merge-sort': { x: 600, y: 120 },
	sets: { x: 40, y: 240 },
	'maths-functions': { x: 130, y: 240 },
	sequences: { x: 220, y: 240 },
	induction: { x: 310, y: 200 },
	summation: { x: 310, y: 270 },
	recurrences: { x: 500, y: 220 }
};

export function sampleConcept(id: string): Concept | undefined {
	return sampleConcepts.find((c) => c.id === id);
}
