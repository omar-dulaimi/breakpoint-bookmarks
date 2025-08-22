import * as assert from 'assert';
import * as path from 'path';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
import { getBookmarkFlowFilePath, getBookmarkFlowDirectoryPath, BookmarkFlowItem } from '../../utils/path-utils';
// import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});

	suite('Path Utils Tests', () => {
		const workspacePath = '/test/workspace';
		const fileName = 'test-flow.json';

		test('getBookmarkFlowFilePath with custom save location', () => {
			const saveLocation = 'custom-bookmarks';
			const result = getBookmarkFlowFilePath(workspacePath, saveLocation, fileName);
			const expected = path.join(workspacePath, saveLocation, fileName);
			assert.strictEqual(result, expected);
		});

		test('getBookmarkFlowFilePath with default save location', () => {
			const saveLocation = '';
			const result = getBookmarkFlowFilePath(workspacePath, saveLocation, fileName);
			const expected = path.join(workspacePath, '.vscode', 'breakpoints', fileName);
			assert.strictEqual(result, expected);
		});

		test('getBookmarkFlowDirectoryPath with custom save location', () => {
			const saveLocation = 'custom-bookmarks';
			const result = getBookmarkFlowDirectoryPath(workspacePath, saveLocation);
			const expected = path.join(workspacePath, saveLocation);
			assert.strictEqual(result, expected);
		});

		test('getBookmarkFlowDirectoryPath with default save location', () => {
			const saveLocation = '';
			const result = getBookmarkFlowDirectoryPath(workspacePath, saveLocation);
			const expected = path.join(workspacePath, '.vscode', 'breakpoints');
			assert.strictEqual(result, expected);
		});
	});

	suite('BookmarkFlowItem Interface Tests', () => {
		test('BookmarkFlowItem should have required properties', () => {
			const item: BookmarkFlowItem = {
				id: 'test-flow.json',
				label: 'flow: test-flow'
			};

			assert.ok(item.id);
			assert.ok(item.label);
			assert.strictEqual(typeof item.id, 'string');
			assert.strictEqual(typeof item.label, 'string');
		});
	});
});
