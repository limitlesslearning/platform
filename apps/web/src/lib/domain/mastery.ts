import type { Concept, ConceptProgress, ConceptStatus, SecurityCircle } from './types';

/**
 * The 90% practice bar is PROVISIONAL (locked decision S5).
 * It decides when a learner moves on to the 7-day retention check.
 * It is not the credential cut: that is set after the Phase 1 pilot,
 * so there is deliberately no credential threshold constant here.
 */
export const PROVISIONAL_PRACTICE_BAR = 0.9;

/** Days between a provisional pass and the retention check. */
export const RETENTION_CHECK_DAYS = 7;

/** Teaching and contributing become optional profile sections above this level. */
export const TEACHING_OPENS_ABOVE_LEVEL = 3;

export const LOOP_STAGES = [
	'diagnose',
	'practise',
	'provisional-pass',
	'retention-check',
	'unlock'
] as const;

export type LoopStage = (typeof LOOP_STAGES)[number];

export const LOOP_STAGE_LABELS: Record<LoopStage, string> = {
	diagnose: 'Diagnose',
	practise: 'Practise',
	'provisional-pass': 'Provisional pass',
	'retention-check': '7-day check',
	unlock: 'Unlock next'
};

export function isLoopStage(value: string): value is LoopStage {
	return (LOOP_STAGES as readonly string[]).includes(value);
}

export function nextStage(stage: LoopStage): LoopStage | null {
	const i = LOOP_STAGES.indexOf(stage);
	return i < LOOP_STAGES.length - 1 ? LOOP_STAGES[i + 1] : null;
}

export function previousStage(stage: LoopStage): LoopStage | null {
	const i = LOOP_STAGES.indexOf(stage);
	return i > 0 ? LOOP_STAGES[i - 1] : null;
}

export function meetsProvisionalBar(accuracy: number): boolean {
	return accuracy >= PROVISIONAL_PRACTICE_BAR;
}

export function formatPercent(value: number): string {
	return `${Math.round(value * 100)}%`;
}

/** ISO date (YYYY-MM-DD) of the retention check for a provisional pass on `passedOn`. */
export function retentionCheckDate(passedOn: string): string {
	const d = new Date(`${passedOn}T00:00:00Z`);
	d.setUTCDate(d.getUTCDate() + RETENTION_CHECK_DAYS);
	return d.toISOString().slice(0, 10);
}

export function formatDate(iso: string): string {
	return new Date(`${iso}T00:00:00Z`).toLocaleDateString('en-GB', {
		day: 'numeric',
		month: 'short',
		year: 'numeric',
		timeZone: 'UTC'
	});
}

/** Level band label, e.g. level 4 → "1–5". Bands follow the 1–25+ scale. */
export function levelBand(level: number): string {
	if (level > 20) return '21–25+';
	const start = Math.floor((level - 1) / 5) * 5 + 1;
	return `${start}–${start + 4}`;
}

/**
 * Concepts that open next once `conceptId` is retained: every concept that lists it as a
 * prerequisite and whose other prerequisites are already passed. Nothing is ever gated;
 * this only decides what the learner sees recommended.
 */
export function conceptsOpenedBy(
	conceptId: string,
	concepts: Concept[],
	progress: ConceptProgress[]
): Concept[] {
	const passed = new Set(
		progress
			.filter((p) => p.status === 'retained' || p.status === 'provisional-pass')
			.map((p) => p.conceptId)
	);
	passed.add(conceptId);
	return concepts.filter(
		(c) =>
			c.prerequisites.includes(conceptId) &&
			c.prerequisites.every((id) => passed.has(id)) &&
			!passed.has(c.id)
	);
}

/** Security Circles gate reviewing and credentials only. Learning is never gated. */
export function circleIsComplete(circle: SecurityCircle): boolean {
	return circle.vouchers.length >= circle.minimumVouchers;
}

export function vouchersStillNeeded(circle: SecurityCircle): number {
	return Math.max(0, circle.minimumVouchers - circle.vouchers.length);
}

export const STATUS_LABELS: Record<ConceptStatus, string> = {
	retained: 'Passed 7-day check',
	'provisional-pass': 'Provisional pass',
	practising: 'Practising',
	'open-next': 'Recommended next',
	'not-started': 'Not started'
};

/** Highest level reached in a domain: the top level among retained concepts. */
export function domainLevel(
	domain: string,
	concepts: Concept[],
	progress: ConceptProgress[]
): number {
	const retained = new Set(progress.filter((p) => p.status === 'retained').map((p) => p.conceptId));
	return concepts
		.filter((c) => c.domain === domain && retained.has(c.id))
		.reduce((max, c) => Math.max(max, c.level), 0);
}

/**
 * Status shown for a concept. A concept with no recorded progress whose prerequisites are all
 * passed is shown as "recommended next". Everything stays open to start either way.
 */
export function effectiveStatus(concept: Concept, progress: ConceptProgress[]): ConceptStatus {
	const own = progress.find((p) => p.conceptId === concept.id)?.status ?? 'not-started';
	if (own !== 'not-started') return own;
	const passed = new Set(
		progress
			.filter((p) => p.status === 'retained' || p.status === 'provisional-pass')
			.map((p) => p.conceptId)
	);
	return concept.prerequisites.every((id) => passed.has(id)) ? 'open-next' : 'not-started';
}
