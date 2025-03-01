'use strict';

const standalone = require('../standalone');
const stripIndent = require('common-tags').stripIndent;

it('descriptionlessDisables', async () => {
	const config = {
		rules: { 'block-no-empty': true },
	};

	const css = stripIndent`
		/* stylelint-disable -- Description */
		a {}
		/* stylelint-enable */
		a {
			b {} /* stylelint-disable-line block-no-empty -- Description */
		}
		/* stylelint-disable-next-line block-no-empty
		 * --
		 * Description */
		a {}

		/* stylelint-disable */
		a {}
		/* stylelint-enable */
		a {
			b {} /* stylelint-disable-line block-no-empty */
		}
		/* stylelint-disable-next-line block-no-empty */
		a {}`;

	const linted = await standalone({
		config,
		code: css,
		reportDescriptionlessDisables: true,
	});
	const results = linted.results;

	expect(results).toHaveLength(1);
	const warnings = results[0].warnings.filter(
		(warning) => warning.rule === '--report-descriptionless-disables',
	);

	expect(warnings).toEqual([
		{
			line: 12,
			column: 1,
			endLine: 12,
			endColumn: 23,
			rule: '--report-descriptionless-disables',
			severity: 'error',
			text: 'Disable for "all" is missing a description',
		},
		{
			line: 16,
			column: 7,
			endLine: 16,
			endColumn: 49,
			rule: '--report-descriptionless-disables',
			severity: 'error',
			text: 'Disable for "block-no-empty" is missing a description',
		},
		{
			line: 18,
			column: 1,
			endLine: 18,
			endColumn: 48,
			rule: '--report-descriptionless-disables',
			severity: 'error',
			text: 'Disable for "block-no-empty" is missing a description',
		},
	]);
});

it('descriptionlessDisables from config', async () => {
	const config = {
		reportDescriptionlessDisables: true,
		rules: { 'block-no-empty': true },
	};

	const css = stripIndent`
		/* stylelint-disable -- Description */
		a {}
		/* stylelint-enable */
		a {
			b {} /* stylelint-disable-line block-no-empty -- Description */
		}
		/* stylelint-disable-next-line block-no-empty
		 * --
		 * Description */
		a {}

		/* stylelint-disable */
		a {}
		/* stylelint-enable */
		a {
			b {} /* stylelint-disable-line block-no-empty */
		}
		/* stylelint-disable-next-line block-no-empty */
		a {}`;

	const linted = await standalone({
		config,
		code: css,
	});
	const results = linted.results;

	expect(results).toHaveLength(1);
	const warnings = results[0].warnings.filter(
		(warning) => warning.rule === '--report-descriptionless-disables',
	);

	expect(warnings).toEqual([
		{
			line: 12,
			column: 1,
			endLine: 12,
			endColumn: 23,
			rule: '--report-descriptionless-disables',
			severity: 'error',
			text: 'Disable for "all" is missing a description',
		},
		{
			line: 16,
			column: 7,
			endLine: 16,
			endColumn: 49,
			rule: '--report-descriptionless-disables',
			severity: 'error',
			text: 'Disable for "block-no-empty" is missing a description',
		},
		{
			line: 18,
			column: 1,
			endLine: 18,
			endColumn: 48,
			rule: '--report-descriptionless-disables',
			severity: 'error',
			text: 'Disable for "block-no-empty" is missing a description',
		},
	]);
});

it('descriptionlessDisables true except', async () => {
	const config = {
		rules: { 'block-no-empty': true },
	};

	const css = stripIndent`
		/* stylelint-disable -- Description */
		a {}
		/* stylelint-enable */
		a {
			b {} /* stylelint-disable-line block-no-empty -- Description */
		}
		/* stylelint-disable-next-line block-no-empty
		 * --
		 * Description */
		a {}

		/* stylelint-disable */
		a {}
		/* stylelint-enable */
		a {
			b {} /* stylelint-disable-line invalid-hex-case */
		}
		/* stylelint-disable-next-line block-no-empty */
		a {}`;

	const linted = await standalone({
		config,
		code: css,
		reportDescriptionlessDisables: [true, { except: ['invalid-hex-case'] }],
	});
	const results = linted.results;

	expect(results).toHaveLength(1);
	const warnings = results[0].warnings.filter(
		(warning) => warning.rule === '--report-descriptionless-disables',
	);

	expect(warnings).toEqual([
		{
			line: 12,
			column: 1,
			endLine: 12,
			endColumn: 23,
			rule: '--report-descriptionless-disables',
			severity: 'error',
			text: 'Disable for "all" is missing a description',
		},
		{
			line: 18,
			column: 1,
			endLine: 18,
			endColumn: 48,
			rule: '--report-descriptionless-disables',
			severity: 'error',
			text: 'Disable for "block-no-empty" is missing a description',
		},
	]);
});

it('descriptionlessDisables false except', async () => {
	const config = {
		rules: { 'block-no-empty': true },
	};

	const css = stripIndent`
		/* stylelint-disable -- Description */
		a {}
		/* stylelint-enable */
		a {
			b {} /* stylelint-disable-line block-no-empty -- Description */
		}
		/* stylelint-disable-next-line block-no-empty
		 * --
		 * Description */
		a {}

		/* stylelint-disable */
		a {}
		/* stylelint-enable */
		a {
			b {} /* stylelint-disable-line invalid-hex-case */
		}
		/* stylelint-disable-next-line block-no-empty */
		a {}`;

	const linted = await standalone({
		config,
		code: css,
		reportDescriptionlessDisables: [false, { except: ['invalid-hex-case'] }],
	});
	const results = linted.results;

	expect(results).toHaveLength(1);
	const warnings = results[0].warnings.filter(
		(warning) => warning.rule === '--report-descriptionless-disables',
	);

	expect(warnings).toEqual([
		{
			line: 16,
			column: 7,
			endLine: 16,
			endColumn: 51,
			rule: '--report-descriptionless-disables',
			severity: 'error',
			text: 'Disable for "invalid-hex-case" is missing a description',
		},
	]);
});

it('descriptionlessDisables severity', async () => {
	const config = {
		rules: { 'block-no-empty': true },
	};

	const css = stripIndent`
		/* stylelint-disable -- Description */
		a {}
		/* stylelint-enable */
		a {
			b {} /* stylelint-disable-line block-no-empty -- Description */
		}
		/* stylelint-disable-next-line block-no-empty
		 * --
		 * Description */
		a {}

		/* stylelint-disable */
		a {}
		/* stylelint-enable */
		a {
			b {} /* stylelint-disable-line block-no-empty */
		}
		/* stylelint-disable-next-line block-no-empty */
		a {}`;

	const linted = await standalone({
		config,
		code: css,
		reportDescriptionlessDisables: [true, { severity: 'warning' }],
	});
	const results = linted.results;

	expect(results).toHaveLength(1);
	const warnings = results[0].warnings.filter(
		(warning) => warning.rule === '--report-descriptionless-disables',
	);

	expect(warnings).toEqual([
		{
			line: 12,
			column: 1,
			endLine: 12,
			endColumn: 23,
			rule: '--report-descriptionless-disables',
			severity: 'warning',
			text: 'Disable for "all" is missing a description',
		},
		{
			line: 16,
			column: 7,
			endLine: 16,
			endColumn: 49,
			rule: '--report-descriptionless-disables',
			severity: 'warning',
			text: 'Disable for "block-no-empty" is missing a description',
		},
		{
			line: 18,
			column: 1,
			endLine: 18,
			endColumn: 48,
			rule: '--report-descriptionless-disables',
			severity: 'warning',
			text: 'Disable for "block-no-empty" is missing a description',
		},
	]);
});
