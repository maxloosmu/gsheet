# gsheet
These GAS(Google Apps Script)/JavaScript code were tested in Google Sheets.



#### Legal Test 13 Summary
The start function is testEdit.  The script then loops through the functions parseWords, processIf and getNextCell repeatedly to identify a keyword in each subsequent cell below the start cell in the active spreadsheet.  The predicate next to each keyword is logged.

The problem stopping continued development is that the logged predicate count is wrong.  2 IF keywords throw up 3 predicates, while 3 IF keywords throw up 6 predicates.

To troubleshoot this, the next test is to use Legal Test 14 to try the functions parseWords, processIf and getNextCell on letters A, B, C only.

After Legal Test 14, the next troubleshooting test is to use Legal Test 15 to reduce the script to functions parseWords and processIf only.
#### Legal Test 16 Summary
Legal Test 13 problem fixed.

But new unresolved problem: 2 IF keywords throw up 1 predicate, 3 IF keywords throw up 3 predicates, 4 IF keywords throw up 3 predicates.

After resolving this new problem, the next goal is to include AND and form the right parentheses.
### Legal Test 17 Summary
Legal Test 16 problem fixed and goals achieved.

New problem: Output of Example 13 in Constitutive Rules has 3 predicates.  Current implementation of Example 13 delivers 4 predicates because one of the predicate is the checking predicate.

Tentative solution to be implemented: Create a summary.history object based on the JavaScript Map object to store positions of all predicates, so that there is control over checking predicate conclusion of IF parentheses statements.  Map object's Key will be a array object containing position values.  Map object's Values will be the predicates.  summary.furthestRow and summary.furthestCol properties can be recorded.
### Legal Test 18 Summary
In progress...