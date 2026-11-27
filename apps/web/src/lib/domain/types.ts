export type DomainId = 'cs' | 'maths';

export interface Domain {
	id: DomainId;
	name: string;
}

/** Where a concept sits for one learner. Nothing is ever locked: these are descriptions, not gates. */
export type ConceptStatus =
	/** Reached the provisional practice bar and passed the 7-day retention check. */
	| 'retained'
	/** Reached the provisional practice bar; 7-day retention check still to come. */
	| 'provisional-pass'
	/** Currently practising. */
	| 'practising'
	/** Prerequisites are in place, so this is recommended next. */
	| 'open-next'
	/** Not started and prerequisites not yet in place. Still open to start any time. */
	| 'not-started';

export interface Concept {
	id: string;
	title: string;
	domain: DomainId;
	/** Level on the 1–25+ scale for this domain. */
	level: number;
	summary: string;
	prerequisites: string[];
}

export interface ConceptProgress {
	conceptId: string;
	status: ConceptStatus;
	/** Recent practice accuracy, 0–1. */
	practiceAccuracy?: number;
	/** ISO date of the provisional pass. */
	provisionalPassOn?: string;
	/** ISO date of the 7-day retention check. */
	retentionCheckOn?: string;
}

export interface Goal {
	id: string;
	title: string;
	description: string;
	/** Concepts this goal ends at; the path is everything they depend on. */
	targetConceptIds: string[];
}

export type ReviewerRole = 'peer' | 'mentor';

export interface Review {
	id: string;
	reviewerName: string;
	role: ReviewerRole;
	submittedOn: string;
	summary: string;
	strengths: string[];
	suggestions: string[];
}

export interface Submission {
	id: string;
	conceptId: string;
	title: string;
	submittedOn: string;
	reviews: Review[];
	reviewsRequested: { peer: number; mentor: number };
}

export interface ReviewRequest {
	id: string;
	conceptId: string;
	title: string;
	authorName: string;
	requestedOn: string;
}

export interface SecurityCircle {
	/** People who have vouched for this learner. */
	vouchers: { name: string; vouchedOn: string }[];
	minimumVouchers: number;
	maximumVouchers: number;
}

export type CredentialState = 'not-yet-available' | 'eligible' | 'issued';

export interface CredentialRecord {
	conceptId: string;
	state: CredentialState;
	note: string;
}

export interface StudyCircle {
	id: string;
	name: string;
	focusConceptId: string;
	members: { name: string; level: number }[];
	mentor?: { name: string };
	meets: string;
}
