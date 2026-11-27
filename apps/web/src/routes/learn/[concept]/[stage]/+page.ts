import { error } from '@sveltejs/kit';
import { isLoopStage, LOOP_STAGES } from '#lib/domain/mastery.ts';
import { sampleConcept, sampleConcepts } from '#lib/fixtures/sample-concepts.ts';
import type { EntryGenerator, PageLoad } from './$types';

export const entries: EntryGenerator = () =>
	sampleConcepts.flatMap((c) => LOOP_STAGES.map((stage) => ({ concept: c.id, stage })));

export const load: PageLoad = ({ params }) => {
	const concept = sampleConcept(params.concept);
	if (!concept) error(404, 'Concept not found');
	if (!isLoopStage(params.stage)) error(404, 'Unknown step');
	return { concept, stage: params.stage };
};
