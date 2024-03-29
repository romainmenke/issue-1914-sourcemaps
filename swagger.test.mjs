import postcss32 from 'postcss-8.4.32';
import postcss33 from 'postcss-8.4.33';
import fs from 'fs/promises';
import test from 'node:test';
import assert from 'node:assert';

// With `swagger-ui` and their sourcemap, we don't know how it was created.

const source = await fs.readFile('./swagger-ui.css', 'utf8');

const noopPlugin = () => {
	return {
		postcssPlugin: 'noop-plugin',
		Once() {
			// do nothing
		},
	};
};

noopPlugin.postcss = true;

test('swagger | postcss 8.4.32', async () => {
	const result = postcss32().process(
		source,
		{
			from: './swagger-ui.css',
			map: true,
		},
	);

	assert.equal(result.constructor.name, 'NoWorkResult');

	await result;
});

test('swagger | postcss 8.4.32 - with plugin', async () => {
	const result = postcss32([noopPlugin()]).process(
		source,
		{
			from: './swagger-ui.css',
			map: true,
		},
	);

	assert.equal(result.constructor.name, 'LazyResult');

	await result;
});

test('swagger | postcss 8.4.33', async () => {
	const result = postcss33().process(
		source,
		{
			from: './swagger-ui.css',
			map: true,
		},
	);

	assert.equal(result.constructor.name, 'NoWorkResult');

	await result;
});

test('swagger | postcss 8.4.33 - with plugin', async () => {
	const result = postcss33([noopPlugin()]).process(
		source,
		{
			from: './swagger-ui.css',
			map: true,
		},
	);

	assert.equal(result.constructor.name, 'LazyResult');

	await result;
});
