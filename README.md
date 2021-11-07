# gsheet
These GAS(Google Apps Script)/JavaScript code were tested in Google Sheets.



###### Legal Test 13 Summary
The start function is testEdit.  The script then loops through the functions parseWords, processIf and getNextCell repeatedly to identify a keyword in each subsequent cell below the start cell in the active spreadsheet.  The predicate next to each keyword is logged.
The problem stopping continued development is that the logged predicate count is wrong.  2 IF keywords throw up 3 predicates, while 3 IF keywords throw up 6 predicates.
The next test is to use Legal Test 14 to try the functions parseWords, processIf and getNextCell on letters A, B, C only.
The next next test is to use Legal Test 15 to reduce the script to functions parseWords and processIf only.
###### Legal Test 16 Summary
Legal Test 13 problem fixed.
But new problem: 2 IF keywords throw up 1 predicate, 3 IF keywords throw up 3 predicates, 4 IF keywords throw up 3 predicates.
After resolving the problem, the next goal is to include AND and form the right parentheses.