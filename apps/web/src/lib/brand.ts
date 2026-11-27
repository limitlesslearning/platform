/**
 * Brand files are imported straight from the repository's `assets/brand/` folder,
 * so there is exactly one copy of each logo file. Never redraw the mark.
 * Ink is for light backgrounds, inverse for dark backgrounds (see docs/brand/BRAND.md).
 */
import lockupInk from '../../../../assets/brand/lockup-horizontal-ink.svg';
import lockupInverse from '../../../../assets/brand/lockup-horizontal-inverse.svg';
import markInk from '../../../../assets/brand/mark-ink.svg';
import markInverse from '../../../../assets/brand/mark-inverse.svg';
import faviconInk from '../../../../assets/brand/mark-small-16grid-ink.svg';
import faviconInverse from '../../../../assets/brand/mark-small-16grid-inverse.svg';

export const brand = {
	lockup: { ink: lockupInk, inverse: lockupInverse },
	mark: { ink: markInk, inverse: markInverse },
	favicon: { ink: faviconInk, inverse: faviconInverse }
} as const;
