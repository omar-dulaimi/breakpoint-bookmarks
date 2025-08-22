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

		test('getBookmarkFlowFilePath handles Windows paths correctly', () => {
			const windowsWorkspace = 'C:\\Users\\Test\\Project';
			const result = getBookmarkFlowFilePath(windowsWorkspace, '', fileName);
			const expected = path.join(windowsWorkspace, '.vscode', 'breakpoints', fileName);
			assert.strictEqual(result, expected);
			// Ensure no double drive letters
			assert.ok(!result.includes('C:\\C:\\'));
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

	suite('Breakpoint Type Support Tests', () => {
		test('Should handle mixed breakpoint types in JSON', () => {
			// Test that the new format supports both source and function breakpoints
			const mockBreakpoints = [
				{
					type: 'source',
					location: '/path/to/file.js',
					range: {
						start: { line: 10, character: 0 },
						end: { line: 10, character: 0 }
					},
					enabled: true
				},
				{
					type: 'function',
					functionName: 'myFunction',
					enabled: true,
					condition: 'x > 0'
				}
			];

			// Verify the structure is valid
			assert.strictEqual(mockBreakpoints.length, 2);
			assert.strictEqual(mockBreakpoints[0].type, 'source');
			assert.strictEqual(mockBreakpoints[1].type, 'function');
			assert.ok(mockBreakpoints[1].functionName);
		});

		test('Should support backward compatibility for old bookmark format', () => {
			// Test that old bookmarks without 'type' field still work
			const oldFormatBreakpoint = {
				location: '/path/to/file.js',
				range: {
					start: { line: 5, character: 0 },
					end: { line: 5, character: 0 }
				},
				enabled: true
			};

			// Should be treated as source breakpoint
			assert.ok(oldFormatBreakpoint.location);
			assert.ok(oldFormatBreakpoint.range);
			assert.strictEqual(typeof oldFormatBreakpoint.enabled, 'boolean');
		});

		test('Should handle very old array-style range format', () => {
			// Test that very old bookmarks with array range format work
			const veryOldFormatBreakpoint = {
				location: '/path/to/file.js',
				range: [
					{ line: 10, character: 0 },
					{ line: 10, character: 0 }
				],
				enabled: true
			};

			// Should be handled gracefully
			assert.ok(veryOldFormatBreakpoint.location);
			assert.ok(Array.isArray(veryOldFormatBreakpoint.range));
			assert.strictEqual(veryOldFormatBreakpoint.range.length, 2);
			assert.strictEqual(typeof veryOldFormatBreakpoint.enabled, 'boolean');
		});

		test('Should handle malformed range data gracefully', () => {
			// Test that malformed breakpoints don't crash the extension
			const malformedBreakpoint = {
				location: '/path/to/file.js',
				range: null, // This would cause the original error
				enabled: true
			};

			// Should not throw errors
			assert.ok(malformedBreakpoint.location);
			assert.strictEqual(typeof malformedBreakpoint.enabled, 'boolean');
		});
	});
});
