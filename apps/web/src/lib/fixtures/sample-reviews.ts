/** SAMPLE CONTENT for the review design screen. All names are made up. */
import type {
	CredentialRecord,
	ReviewRequest,
	SecurityCircle,
	Submission
} from '#lib/domain/types.ts';

export const sampleSecurityCircle: SecurityCircle = {
	vouchers: [
		{ name: 'Priya (sample)', vouchedOn: '2026-11-10' },
		{ name: 'Daniel (sample)', vouchedOn: '2026-11-18' }
	],
	minimumVouchers: 3,
	maximumVouchers: 5
};

export const sampleSubmissions: Submission[] = [
	{
		id: 'sub-1',
		conceptId: 'recursion',
		title: 'Recursive file-tree size calculator',
		submittedOn: '2026-11-25',
		reviewsRequested: { peer: 2, mentor: 1 },
		reviews: [
			{
				id: 'rev-1',
				reviewerName: 'Tomás (sample)',
				role: 'peer',
				submittedOn: '2026-11-26',
				summary: 'Works on every tree I tried, including an empty folder.',
				strengths: ['Base case handles empty folders', 'Clear names'],
				suggestions: ['Add a test for a deeply nested tree']
			},
			{
				id: 'rev-2',
				reviewerName: 'Priya (sample mentor)',
				role: 'mentor',
				submittedOn: '2026-11-27',
				summary: 'Solid. Worth explaining why the recursion always terminates.',
				strengths: ['Correct use of the call stack'],
				suggestions: [
					'Write two sentences on why each call works on a smaller tree',
					'Compare with an iterative version using an explicit stack'
				]
			}
		]
	}
];

export const sampleReviewRequests: ReviewRequest[] = [
	{
		id: 'req-1',
		conceptId: 'recursion',
		title: 'Towers of Hanoi solver with move count',
		authorName: 'Wen (sample)',
		requestedOn: '2026-11-26'
	},
	{
		id: 'req-2',
		conceptId: 'induction',
		title: 'Proof that 1 + 2 + … + n = n(n + 1)/2',
		authorName: 'Kofi (sample)',
		requestedOn: '2026-11-27'
	}
];

export const sampleCredentials: CredentialRecord[] = [
	{
		conceptId: 'cs-functions',
		state: 'not-yet-available',
		note: 'Passed the 7-day check. Credentials open after the Phase 1 pilot sets the credential cut.'
	},
	{
		conceptId: 'induction',
		state: 'not-yet-available',
		note: 'Passed the 7-day check. Credentials open after the Phase 1 pilot sets the credential cut.'
	},
	{
		conceptId: 'summation',
		state: 'not-yet-available',
		note: 'Provisional pass. The 7-day check is due 1 Dec 2026.'
	}
];
