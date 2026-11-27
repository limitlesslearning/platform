import { describe, expect, it } from 'vitest';
import {
	LOOP_STAGES,
	PROVISIONAL_PRACTICE_BAR,
	circleIsComplete,
	conceptsOpenedBy,
	domainLevel,
	effectiveStatus,
	levelBand,
	meetsProvisionalBar,
	nextStage,
	retentionCheckDate,
	vouchersStillNeeded
} from './mastery';
import { sampleConcepts, sampleConcept } from '#lib/fixtures/sample-concepts.ts';
import { sampleProgress } from '#lib/fixtures/sample-learner.ts';
import { sampleSecurityCircle } from '#lib/fixtures/sample-reviews.ts';

describe('core loop', () => {
	it('runs diagnose → practise → provisional pass → 7-day check → unlock', () => {
		expect(LOOP_STAGES).toEqual([
			'diagnose',
			'practise',
			'provisional-pass',
			'retention-check',
			'unlock'
		]);
		expect(nextStage('retention-check')).toBe('unlock');
		expect(nextStage('unlock')).toBeNull();
	});

	it('uses a 90% provisional practice bar', () => {
		expect(PROVISIONAL_PRACTICE_BAR).toBe(0.9);
		expect(meetsProvisionalBar(0.89)).toBe(false);
		expect(meetsProvisionalBar(0.9)).toBe(true);
	});

	it('schedules the retention check 7 days after a provisional pass', () => {
		expect(retentionCheckDate('2026-11-27')).toBe('2026-12-04');
		expect(retentionCheckDate('2026-12-28')).toBe('2027-01-04');
	});
});

describe('levels', () => {
	it('groups levels into bands of five, then 21–25+', () => {
		expect(levelBand(1)).toBe('1–5');
		expect(levelBand(5)).toBe('1–5');
		expect(levelBand(6)).toBe('6–10');
		expect(levelBand(20)).toBe('16–20');
		expect(levelBand(27)).toBe('21–25+');
	});

	it('takes the domain level from retained concepts only (fixtures)', () => {
		expect(domainLevel('cs', sampleConcepts, sampleProgress)).toBe(3);
		expect(domainLevel('maths', sampleConcepts, sampleProgress)).toBe(4);
	});
});

describe('unlocking (fixtures)', () => {
	it('recommends concepts whose prerequisites are all in place, across domains', () => {
		const opened = conceptsOpenedBy('recursion', sampleConcepts, sampleProgress).map((c) => c.id);
		expect(opened).toEqual(['divide-and-conquer', 'recurrences']);
	});

	it('marks a concept with all prerequisites passed as recommended next', () => {
		const binarySearch = sampleConcept('binary-search');
		expect(binarySearch).toBeDefined();
		expect(effectiveStatus(binarySearch!, sampleProgress)).toBe('open-next');
	});
});

describe('Security Circle', () => {
	it('needs the minimum number of vouches (fixtures)', () => {
		expect(circleIsComplete(sampleSecurityCircle)).toBe(false);
		expect(vouchersStillNeeded(sampleSecurityCircle)).toBe(1);
	});
});
