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
Backwards search using `findStart` and forward scan using `scanDownwards` implemented successfully.  `h.history` now works not because it records keywords between edits, but by recording all the keywords in the Legal Spreadsheet when they are all parsed from scratch for every edit.  Implemented processing for "IF", "OR", "AND", "WHEN" keywords.
### Legal Test 22 to 23 Summary
Implementing "Features and UI specifications" 3 and 4 again, with the additional 6 and 8:

"Similarly, a constitutive rule needs a checkbox to span the children."

"Handle the situation where the user adds a new row and then writes in a new OR/AND/UNLESS; currently this creates a checkbox to the right; need to update checkbox above."
#### Legal Test 22 Summary
Goals:
Implement "MEANS", "IS", "IT IS", "UNLESS" with topLeft logic equation.

