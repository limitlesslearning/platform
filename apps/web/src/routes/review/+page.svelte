<script lang="ts">
	import { PRODUCT_NAME } from '#lib/site.ts';
	import { circleIsComplete, formatDate, vouchersStillNeeded } from '#lib/domain/mastery.ts';
	import { sampleConcept } from '#lib/fixtures/sample-concepts.ts';
	import {
		sampleCredentials,
		sampleReviewRequests,
		sampleSecurityCircle,
		sampleSubmissions
	} from '#lib/fixtures/sample-reviews.ts';
	import SampleNotice from '#lib/components/SampleNotice.svelte';

	const circle = sampleSecurityCircle;
	const complete = circleIsComplete(circle);
	const needed = vouchersStillNeeded(circle);
	const title = (id: string) => sampleConcept(id)?.title ?? id;
	const roleLabel = { peer: 'Peer review', mentor: 'Mentor review' } as const;
</script>

<svelte:head><title>Reviews and credentials · {PRODUCT_NAME}</title></svelte:head>

<div class="stack">
	<SampleNotice what="this review view" />

	<h1>Reviews and credentials</h1>
	<p>
		Peers and mentors review submitted work. Reviews and credentials are the only parts of {PRODUCT_NAME}
		that need a Security Circle. Learning, practice and the 7-day check never do.
	</p>

	<section class="card circle" aria-labelledby="circle-h">
		<h2 id="circle-h">Your Security Circle</h2>
		<p>
			{circle.minimumVouchers} to {circle.maximumVouchers} people who know you vouch that you're a real
			person. Once your circle is complete you can review others' work and receive credentials.
		</p>
		<p class="status" role="status">
			<strong>{circle.vouchers.length} of {circle.minimumVouchers} vouches.</strong>
			{#if complete}
				Your circle is complete.
			{:else}
				{needed} more {needed === 1 ? 'person' : 'people'} needed before you can review or receive credentials.
			{/if}
		</p>
		<ul class="plain vouchers">
			{#each circle.vouchers as v (v.name)}
				<li>
					<span class="dot" aria-hidden="true"></span>{v.name}
					<span class="muted">· vouched {formatDate(v.vouchedOn)}</span>
				</li>
			{/each}
			{#each Array.from({ length: needed }, (_, i) => i) as i (i)}
				<li class="muted"><span class="ring" aria-hidden="true"></span>Open place</li>
			{/each}
		</ul>
		<button type="button" class="button secondary">Invite someone to vouch</button>
	</section>

	<div class="grid two">
		<section class="card" aria-labelledby="mine-h">
			<h2 id="mine-h">Reviews of your work</h2>
			<p class="muted small">Asking for feedback on your own work is open to everyone.</p>
			{#each sampleSubmissions as s (s.id)}
				<article class="submission">
					<h3>{s.title}</h3>
					<p class="muted small">
						{title(s.conceptId)} · submitted {formatDate(s.submittedOn)} · {s.reviews.length} of {s
							.reviewsRequested.peer + s.reviewsRequested.mentor} reviews in
					</p>
					{#each s.reviews as r (r.id)}
						<article class="review" aria-label="{roleLabel[r.role]} by {r.reviewerName}">
							<p class="who">
								<span class="tag">{roleLabel[r.role]}</span>
								<strong>{r.reviewerName}</strong>
								<span class="muted small">· {formatDate(r.submittedOn)}</span>
							</p>
							<p>{r.summary}</p>
							<div class="split">
								<div>
									<h4>What works</h4>
									<ul>
										{#each r.strengths as x (x)}<li>{x}</li>{/each}
									</ul>
								</div>
								<div>
									<h4>To improve</h4>
									<ul>
										{#each r.suggestions as x (x)}<li>{x}</li>{/each}
									</ul>
								</div>
							</div>
						</article>
					{/each}
				</article>
			{/each}
		</section>

		<section class="card" aria-labelledby="queue-h">
			<h2 id="queue-h">Work waiting for a reviewer</h2>
			{#if !complete}
				<p class="gate">
					You can read these, but reviewing opens once your Security Circle has {circle.minimumVouchers}
					vouches.
				</p>
			{/if}
			<ul class="plain queue">
				{#each sampleReviewRequests as req (req.id)}
					<li>
						<div>
							<strong>{req.title}</strong>
							<p class="muted small">
								{title(req.conceptId)} · by {req.authorName} · asked {formatDate(req.requestedOn)}
							</p>
						</div>
						<button
							type="button"
							class="button secondary"
							disabled={!complete}
							aria-describedby={!complete ? 'queue-h' : undefined}
						>
							Review as peer
						</button>
					</li>
				{/each}
			</ul>
			<p class="muted small">
				Mentors review in the same way. Mentoring is an optional role you can switch on in your
				profile.
			</p>
		</section>
	</div>

	<section class="card" aria-labelledby="cred-h">
		<h2 id="cred-h">Credentials</h2>
		<p>
			<strong>The credential cut is not set yet.</strong> It will be set after the Phase 1 pilot, from
			evidence about what predicts lasting mastery. Until then, no credentials are issued. The 90% practice
			bar is provisional and is not a credential cut.
		</p>
		<p class="muted small">
			When credentials open they will be verifiable records you control and can share. They also
			need a complete Security Circle.
		</p>
		<table>
			<caption class="visually-hidden">Credential status by concept</caption>
			<thead>
				<tr><th scope="col">Concept</th><th scope="col">Status</th><th scope="col">Note</th></tr>
			</thead>
			<tbody>
				{#each sampleCredentials as c (c.conceptId)}
					<tr>
						<th scope="row">{title(c.conceptId)}</th>
						<td>Not yet available</td>
						<td>{c.note}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</section>
</div>

<style>
	.small {
		font-size: 0.85rem;
	}
	.status {
		font-size: 1.05rem;
	}
	.vouchers {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem 1.5rem;
		margin-bottom: 1rem;
	}
	.vouchers li {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}
	.dot,
	.ring {
		width: 0.8rem;
		height: 0.8rem;
		border-radius: 50%;
		display: inline-block;
	}
	.dot {
		background: var(--text);
	}
	.ring {
		border: 2px solid var(--muted);
	}
	.submission > h3 {
		margin-top: 0.75rem;
	}
	.review {
		border-top: 1px solid var(--border);
		padding-top: 0.75rem;
		margin-top: 0.75rem;
	}
	.who {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 0.4rem;
	}
	h4 {
		font-size: 0.9rem;
		margin: 0.25rem 0;
	}
	.split {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 1rem;
	}
	.split ul {
		margin: 0;
		padding-left: 1.1rem;
		font-size: 0.92rem;
	}
	.gate {
		background: var(--bg);
		border: 1px dashed var(--muted);
		border-radius: 8px;
		padding: 0.6rem 0.8rem;
	}
	.queue li {
		display: flex;
		justify-content: space-between;
		align-items: center;
		gap: 1rem;
		padding: 0.6rem 0;
		border-bottom: 1px solid var(--border);
	}
	.queue p {
		margin: 0;
	}
	table {
		width: 100%;
		border-collapse: collapse;
		font-size: 0.95rem;
	}
	th,
	td {
		text-align: left;
		padding: 0.5rem;
		border-bottom: 1px solid var(--border);
		vertical-align: top;
	}
	thead th {
		font-size: 0.85rem;
		color: var(--muted);
	}
</style>
