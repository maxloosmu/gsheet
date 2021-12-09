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
- Using `SpreadsheetApp.getUi().alert`, it is discovered that onEdit will clash with onChange because both react to deletion of rows.

Solutions:
- Avoid using onChange, and amended `processHistory` to include a check for keywords "OR" and "AND" before updating the cell above "IF", "WHEN", "MEANS", "IS" with a logic equation (the topLeft equation).  This topLeft equation is deleted if there is no "OR" or "AND".
- Amended `scanDownwards` to check for keywords before updating `h.history`.

#### BabyLegalSSv0.9.0.2 Summary
Updates:
- Removed `forEachCellInRange` and `onChange`.
- Features 8, 9 implemented and tested, but admittedly, this implementation and test is premised upon an unknown working of the cell reference returned upon deletion or insertion of a row.  For some inexplicable reason, the topLeft cell of the code block is returned upon insertion or deletion of the last row of the block.

#### BabyLegalSSv0.9.0.3 Summary
Goals:
- To implement Feature 11.

Results:
- Feature 11 is about "AND" and "OR" borders.  What I've added, is the drawing of a vertical bridge border between "IF" (and "WHEN", "MEANS", "IS") and "AND", "OR".  But I'm not sure if this is the right implementation.  Worse of all, it added about 60 rows of code in one function for this to happen, and these rows of code cannot be integrated into other functions in order to keep functionalities separate.  The name of this function is `drawBridgeIfAndOr`.

Link for trying out the Google Sheet:
- https://docs.google.com/spreadsheets/d/1AbAQYH_AL_G1JpqQtVQaD2cQqfZlBSpPdrm3HdOmrto/edit#gid=0

#### BabyLegalSSv0.9.0.4 Summary
Goals:
- To do some research into how GAS onEdit responds to insertions and deletions of rows to try to resolve the issue raised in "BabyLegalSSv0.9.0.2 Summary".  This issue may not be resolvable because this problem is built into GAS: https://stackoverflow.com/questions/13718269/google-apps-script-how-to-get-the-deleted-row-in-onedit-script-or-ondelete.

Outcome of Research:
- Reference webpage: https://developers.google.com/apps-script/guides/triggers/events#change
- The webpage indicates that the `changeType` option can be used to detect changes to the Google Sheet, but there's no `range` option to indicate where the rows are inserted or deleted.  To resolve this, it will have to made permanent that a fixed range of cells may have to be scanned every time there's a change to identify the insertions and deletions.  This means that the spreadsheet will only allow inserts and deletes in those cells.  In addition to this limitation, there's also the problem of conflicts between onEdit and onChange functions in responding at the same time to the same deletion and insertion event, thereby leading to race conditions from within GAS.  This race condition will not be resolvable at an end user programmer's coding level, and will require Google's GAS creators to resolve.
- A choice will have to be made as to whether only a specific area of the spreadsheet is allowed for editing.  If this is confirmed, then an attempt can be made to remove the onEdit function and replace with a onChange function to avoid race conditions, but that will also require a major rewrite of the entire script.  I'm uncertain as of now whether this is doable.

