# gsheet
These GAS(Google Apps Script)/JavaScript code were tested in Google Sheets.  Past copies of this README is stored in the /more folder.


### Legal Test 11 Summary
Implemented "Features and UI specifications" 3 and 4 for "MEANS", "IS" and "IT IS".

### Legal Test 12 to 20 Summary
Implementing "Features and UI specifications" 5:  "Given a range containing IF/AND/OR text with checkboxes, set up the logic formula at top left, based on the IF/AND/OR words. =AND/OR(xxx) where xxx is the checkboxes."

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
