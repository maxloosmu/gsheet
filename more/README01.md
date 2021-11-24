# gsheet
These GAS(Google Apps Script)/JavaScript code were tested in Google Sheets.


### Legal Test 11 Summary
Implemented "Features and UI specifications" 3 and 4 for "MEANS", "IS" and "IT IS".

### Legal Test 12 to 20 Summary
Implementing "Features and UI specifications" 5:  "Given a range containing IF/AND/OR text with checkboxes, set up the logic formula at top left, based on the IF/AND/OR words. =AND/OR(xxx) where xxx is the checkboxes."

#### Legal Test 13 Summary
The start function is testEdit.  The script then loops through the functions parseWords, processIf and getNextCell repeatedly to identify a keyword in each subsequent cell below the start cell in the active spreadsheet.  The predicate next to each keyword is logged.

The problem stopping continued development is that the logged predicate count is wrong.  2 IF keywords throw up 3 predicates, while 3 IF keywords throw up 6 predicates.

To troubleshoot this, the next test is to use Legal Test 14 to try the functions parseWords, processIf and getNextCell on letters A, B, C only.

After Legal Test 14, the next troubleshooting test is to use Legal Test 15 to reduce the script to functions parseWords and processIf only.
#### Legal Test 16 Summary
Legal Test 13 problem fixed.

But new unresolved problem: 2 IF keywords throw up 1 predicate, 3 IF keywords throw up 3 predicates, 4 IF keywords throw up 3 predicates.

After resolving this new problem, the next goal is to include AND and form the right parentheses.
#### Legal Test 17 Summary
Legal Test 16 problem fixed and goals achieved.

New problem: Output of Example 13 in Constitutive Rules has 3 predicates.  Current implementation of Example 13 delivers 4 predicates because one of the predicate is the checking predicate.

Tentative solution to be implemented for Legal Test 18: Create a summary.history object based on the JavaScript Map object to store positions of all predicates, so that there is control over checking predicate conclusion of IF parentheses statements.  Map object's Key will be a array object containing position values.  Map object's Values will be the predicates.  summary.topLeft, summary.furthestRow and summary.furthestCol properties can be recorded.

Reworked solution for Legal Test 18: Due to requirement for top left of every IF statement to contain a summary logic, the new idea is to use an Array object `h.history` instead of a Map object.  Each element of Array will be [col, keyword, predicate], so it's an array of arrays.  The index of the Array will be the row number.
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
- use Legal Test 20 to reduce the code to bare minimum to surface ideas of how to resolve this issue
#### Legal Test 20 Summary
- in progress ...
