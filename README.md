# gsheet
These GAS(Google Apps Script)/JavaScript code were tested in Google Sheets.  Past copies of this README is stored in the /more folder.


### Legal Test 11 Summary
Implemented "Features and UI specifications" 3 and 4 for "MEANS", "IS" and "IT IS":

"A new "MEANS" or "IS" starts a constitutive rule, so create a T by colouring the borders."

"Similarly a new "IT IS" starts a constitutive rule."

### Legal Test 12 to 21 Summary
Implementing "Features and UI specifications" 2, 5, 7, 10:

"A new "IF" or "WHEN" should create a checkbox in the cell to the right."

"Given a range containing IF/AND/OR text with checkboxes, set up the logic formula at top left, based on the IF/AND/OR words. =AND/OR(xxx) where xxx is the checkboxes."

"Handle nested structures – example 13 of the constitutive rules."

"Basically the invariant is that we always want the =OR/AND(...) checkboxes to be up to date and correct with whatever is below them."
#### Legal Test 18 Summary
Goals: Besides what's stated in "Reworked solution for Legal Test 18", the goal is to use `sheet.getRange` and `getA1Notation` on the elements of the `h.history` Array.

Legal Test 18 goals achieved.  "Features and UI specifications" 5's basic effects implemented.  What's left is to smooth onEdit behaviours.
#### Legal Test 19 Summary
Possible goals:
- implement clearRow to clear formatting of row of cells before drawing a new keyword.
- convert floating anonymous function to declared function.
- merge processAnd and processOr functions if separate functions not required.
New Problem:
- typing in AND or OR does not lead to update of top left cell of each IF.
- root cause of problem is `processHistory` function.
- for some reason, a for loop inside a while loop behaves differently from the for loop outside the while loop.
- use Legal Test 20 to reduce the code to bare minimum to surface ideas of how to resolve this issue.
#### Legal Test 20 Summary
Problem identified:
The array `h.history` cannot store historic values.  Evidence for this is recorded in the comments of Legal Test 20.js.  The Google sheet is also available for testing at: https://docs.google.com/spreadsheets/d/1TSK-qezGqMNDOJ1wDefcrLeAbIbb7dwnUzyP2MUcwo4/edit#gid=0.

Goals for Legal Test 21:
To find a way to parse the keywords without storing them.
#### Legal Test 21 Summary
Possibility of doing a backwards search of keywords using the `findStart` function is confirmed.  The first keyword must start from column 2 of the spreadsheet because if not, Google Sheets code execution will fail without warning - meaning, there is no response from the Sheet.

Next Steps:
Implement a forward processing of keywords from the start keyword.  Possibility of reusing the getNextCell function from Legal Test 19.

Result:
- Backwards search using `findStart` and forward scan using `scanDownwards` implemented successfully.  `h.history` now works not because it records keywords between edits, but by recording all the keywords in the Legal Spreadsheet when they are all parsed from scratch for every edit.  Implemented processing for "IF", "OR", "AND", "WHEN" keywords.
- Reimplemented drawing of "IF", "WHEN" to add new line for topLeft input.  Adding new line simply means deleting the keyword and printing the keyword one line down to avoid the insert line problem of GAS.  Also ensure that if topLeft cell contains checkbox, do not print keyword one line down.
### Legal Test 22 to 24 Summary
Implementing "Features and UI specifications" 3 and 4 again, with the additional 6, 8 and 11:

"Similarly, a constitutive rule needs a checkbox to span the children."

"Handle the situation where the user adds a new row and then writes in a new OR/AND/UNLESS; currently this creates a checkbox to the right; need to update checkbox above."

"For future work: Sanity check that the "AND" matches the right kind of border line, and the "OR" does too. This is hard because JS doesn't give us access easily to read the border, so maybe just always redraw it."
#### Legal Test 22 Summary
Goals:
- Implement ERROR alert if keywords entered in column A or rows 1, 2.

Problem discovered:
- Before ERROR alert is implemented, "IF", "WHEN" fails.  This happened in "Legal Test 21" too.

Resolution:
- In Legal Test 23, reduce code in "Legal Test 21" to bare minimum "IF", "WHEN" and "OR" to troubleshoot.
#### Legal Test 23 Summary
Resolutions:
- ERROR alerts are tested to be working.
- In the `drawIfWhenTop` function, `getDataValidation` of `topCell` requires testing for `not null` outcome before applying `getCriteriaType` to check for "CHECKBOX" string.  The reason why the problem arises in Legal Test 21, is because I've erroneously amended that file before transferring to Legal Test 22.
#### Legal Test 24 Summary
Goals:
- Reimplement "MEANS", "IS" drawing function.
- Reimplement "IT IS" drawing function.
- Reattach all the requisite drawing and processing functions and test.

Problems found:
- When processing "IF", "WHEN", "IS", and "MEANS", the topLeft logic formula uses the logic of the last condition.  How should we handle multiple conditions?
- How to implement "UNLESS" condition in A1 notation, which means "AND NOT"?

Resolution:
- Multiple consecutive conditions consisting of all "OR" or all "AND" works, but if there's a mix, the "OR" and "AND" will have to be separated with another "IF".
```
    =
    IF =
       IF true
       AND true
       AND true
    OR true
    OR true
```
- "UNLESS" condition implemented in `h.history` by changing the keyword "UNLESS" to "AND", and then negating the predicate.
### BabyLegalSSv0.9.0 Overview
Goals (Upcoming Features and UI specification):
- Feature 8: Handle the situation where the user adds a new row and then writes in a new OR/AND/UNLESS; currently this creates a checkbox to the right; need to update checkbox above.
- Feature 9: Handle the situation where the user deletes a row.
- Feature 11: Sanity check that the "AND" matches the right kind of border line, and the "OR" does too. This is hard because JS doesn't give us access easily to read the border, so maybe just always redraw it.
#### BabyLegalSSv0.9.0.0 Summary
Goals (Features 8, 9):
- Test onChange function.
- When "IF", "WHEN", "IS", and "MEANS" keywords are deleted from a cell, ensure that checkbox above keyword cell is cleared of equation.
- Currently, `findStart`, `scanDownwards`, `processHistory` function only works within each code block of consecutive keywords upon each edit.  Use onChange function to react to deletion of rows.  Insertion of rows works when user has keyed in a new keyword in the inserted row, but onChange will likely react to that too.

Results:
- Setting up onChange function requires configuring GAS options, which has been done.
- "IF", "WHEN", "IS", and "MEANS" keyword deletion with checkbox above the keyword cell cleared done.

Problem:
- onChange setup with a fixed range of cells to scan and update.  However, using a `drawTeeOverIsMeans` drawing, when the last row of the drawing with the "OR" keyword is deleted, the value in the checkbox above the keyword recurringly flip flopped between the value before deletion, and an erroneous value post deletion.

Possible Solutions:
- In BabyLegalSSv0.9.0.1, test the new function `forEachCellInRange` to ensure it works properly.
- Think up some ways to inject alerts into the code to signpost the `startProcessing` function to ensure correctness of values at various steps of the function.

Overlaps with BabyLegalSSv0.9.0.1:
- I erroneously coded changes and tests to BabyLegalSSv0.9.0.0.

#### BabyLegalSSv0.9.0.1 Summary
Results of tests:
- `forEachCellInRange` is working ok.
- Using SpreadsheetApp.getUi().alert, it is discovered that onEdit will clash with onChange because both react to deletion of rows.

Solutions:
- Avoid using onChange, and amended `processHistory` to include a check for keywords "OR" and "AND" before updating the cell above "IF", "WHEN", "MEANS", "IS" with a logic equation.  The topLeft equation is deleted if there is no "OR" or "AND".
- Amended `scanDownwards` to check for keywords before updating `h.history`.

#### BabyLegalSSv0.9.0.2 Summary
Updates:
- Removed `forEachCellInRange` and `onChange`.
- Features 8, 9 implemented and tested, but admittedly, this implementation and test is premised upon an unknown working of the cell reference returned upon deletion or insertion of a row.  For some inexplicable reason, the topLeft cell of the code block is returned upon insertion or deletion.

#### BabyLegalSSv0.9.0.3 Summary
- in progress
