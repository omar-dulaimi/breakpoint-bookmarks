# Watch Expression Automation Research

## Overview

This document tracks the research and implementation attempts for automating watch expression management in VS Code extensions, specifically for the Breakpoint Bookmarks extension's GitHub issue #4.

## Current Implementation Status ✅

The extension successfully implements watch expression management with the following features:

### ✅ Working Features
- **Save watch expressions**: Users can add watch expressions when saving breakpoint bookmarks
- **Interactive UI**: Step-by-step prompts for adding multiple expressions with descriptions
- **Load with options**: Multiple options when loading bookmarks with watch expressions:
  - "View & Copy Individual" - Navigate through expressions one by one
  - "Copy All at Once" - Copy all expressions to clipboard
  - "Show Instructions" - Detailed instructions with copy option
  - "Skip" - Dismiss without action
- **Backward compatibility**: Old bookmarks without watch expressions continue to work
- **Data structure**: Extended JSON format with `watchExpressions` array and metadata

### ✅ Data Format
```json
{
  "breakpoints": [...],
  "watchExpressions": [
    {
      "expression": "variable.property",
      "enabled": true,
      "description": "Optional description"
    }
  ],
  "metadata": {
    "version": "1.3.0",
    "createdAt": "2025-08-23T11:44:05.153Z",
    "lastModified": "2025-08-23T11:44:05.153Z"
  }
}
```

## Automation Limitation ⚠️

### The Challenge
VS Code does not provide a public API for programmatically adding watch expressions to the debug panel. Multiple automation attempts were made but failed due to platform limitations.

### What Works vs. What Doesn't

#### ✅ Successfully Automated:
- Opening debug view: `workbench.view.debug`
- Opening add watch dialog: `workbench.debug.viewlet.action.addWatchExpression`  
- Copying expressions to clipboard
- Pasting into input field: `editor.action.clipboardPasteAction`

#### ❌ Cannot Automate Reliably:
- **Submitting the watch expression** (pressing Enter in the input field)
- The `type` command with `\n` or `\r` doesn't work consistently
- Various confirmation commands fail to submit the expression

### Root Cause Analysis
The watch expression input appears to be a specialized UI component that doesn't respond to standard keyboard simulation commands. This is likely intentional from VS Code's perspective to maintain user control over debugging workflows.

## Attempted Solutions 🔬

### Attempt 1: Direct Command Parameters
```typescript
await vscode.commands.executeCommand('workbench.debug.viewlet.action.addWatchExpression', expression);
```
**Result**: Commands don't accept expression parameters

### Attempt 2: Selection-to-Watch Method
```typescript
// Create temp document, select text, use editor.debug.action.selectionToWatch
```
**Result**: Too flaky, unreliable across different file types

### Attempt 3: Keyboard Simulation
```typescript
await vscode.commands.executeCommand('type', { text: '\n' });
await vscode.commands.executeCommand('type', { text: '\r' });
```
**Result**: Opens input field and pastes expression, but Enter key doesn't submit

### Attempt 4: Multiple Confirmation Commands
```typescript
const commands = [
  'list.select',
  'acceptSelectedSuggestion', 
  'workbench.action.acceptSelectedQuickOpenItem',
  'workbench.action.submitQuickOpen'
];
```
**Result**: None successfully submit the watch expression

## Current User Experience 🎯

Despite automation limitations, the current implementation provides an excellent user experience:

1. **Effortless saving**: Users can easily add watch expressions when creating bookmarks
2. **Flexible loading**: Multiple options for handling saved expressions
3. **Individual management**: Browse and copy expressions one by one
4. **Assisted manual entry**: "Copy All & Open Watch" option that:
   - Copies all expressions to clipboard
   - Opens debug view
   - Opens watch input dialog
   - Shows helpful instructions

## Future Improvement Opportunities 🔮

### VS Code API Enhancement
Monitor VS Code extension API updates for:
- `vscode.debug.addWatchExpression(expression)` method
- Enhanced debug namespace capabilities
- Watch expression management in extension API

### Alternative Approaches
1. **Custom Watch Panel**: Create a dedicated tree view for saved watch expressions
2. **Debug Session Integration**: Automatically evaluate expressions during debug sessions
3. **Command Palette Integration**: Register custom commands for quick expression access

### Platform-Specific Solutions
Research platform-specific keyboard automation:
- Windows: SendKeys or similar
- macOS: AppleScript integration
- Linux: xdotool or similar

## Technical Implementation Notes 📝

### Working Code Patterns
```typescript
// This works - opens input and pastes expression
await vscode.commands.executeCommand('workbench.view.debug');
await vscode.commands.executeCommand('workbench.debug.viewlet.action.addWatchExpression');
await vscode.commands.executeCommand('editor.action.clipboardPasteAction');
// User must press Enter manually
```

### Failed Code Patterns
```typescript
// These don't work for submitting watch expressions
await vscode.commands.executeCommand('type', { text: '\n' });
await vscode.commands.executeCommand('acceptSelectedSuggestion');
await vscode.commands.executeCommand('list.select');
```

### Timing Considerations
- 300-400ms delays needed for UI stability
- Clipboard operations require immediate restoration
- Focus management is critical for reliable automation

## Conclusion 📋

The current implementation represents the **best possible solution** given VS Code's API constraints. It provides:

- ✅ Complete watch expression storage and management
- ✅ Excellent user experience with multiple interaction options
- ✅ Backward compatibility and data integrity
- ✅ Graceful handling of automation limitations

**Recommendation**: Maintain current implementation and revisit automation when VS Code API evolves.

## Related Issues & References

- **GitHub Issue**: #4 "Feature request: save watched variables"
- **VS Code API**: https://code.visualstudio.com/api/references/vscode-api#debug
- **Extension Location**: `src/commands/load-bookmarks.cmd.ts:78-200`

---
*Last Updated: August 23, 2025*
*Status: Current implementation optimal given API constraints*