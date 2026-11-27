/** SAMPLE CONTENT for the core-loop design screens: one concept (recursion) at every stage. */

export const sampleDiagnosticQuestion = {
	prompt: 'What does this function return when called with n = 3?',
	code: `function f(n) {\n  if (n === 0) return 0;\n  return n + f(n - 1);\n}`,
	options: ['3', '6', '0', 'It never stops'],
	correctIndex: 1
};

export const sampleDiagnosticResult = {
	answered: 5,
	correct: 2,
	finding:
		'You can trace a recursive call one level deep. Base cases and the call stack are new, so practice starts there.'
};

export const samplePracticeItems = [
	{ prompt: 'Identify the base case in a factorial function', result: 'correct' },
	{ prompt: 'Trace sum(4) through the call stack', result: 'correct' },
	{ prompt: 'Spot the missing base case', result: 'incorrect' },
	{ prompt: 'Write countdown(n) recursively', result: 'correct' },
	{ prompt: 'Convert a loop that reverses a string into recursion', result: 'correct' }
] as const;

/** Recent practice accuracy at each stage of the sample walkthrough. */
export const samplePracticeAccuracy = { practising: 0.78, passed: 0.91 };

export const sampleProvisionalPassOn = '2026-11-27';

export const sampleRetentionQuestion = {
	prompt: 'Without running it, how many times is f called for f(4), counting the first call?',
	code: `function f(n) {\n  if (n === 0) return 0;\n  return n + f(n - 1);\n}`,
	options: ['4', '5', '10', '16'],
	correctIndex: 1
};
