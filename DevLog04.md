## Actions to take to run the Legal Spreadsheet
- When a new spreadsheet is created, all the existing code will be cut and pasted into the files Code.gs and main.html.  After that, the Run button on the menu of the Script Editor will have to be clicked and the processes approved.
- After approving the processes, click on the Triggers button in the left sidemenu and create new triggers for the onOpen, onEdit and onChange functions, responding to On Open, On Edit and On Change events respectively.

#### BabyLegalSSv0.9.1.0 Summary
Goals
- Since I could not determine the feasibility of using the `onChange` function unless I try it, BabyLegalSSv0.9.1.0 will be used to test this function.

Attempts
- I tried to utilise on `onEdit` and `onChange` functions in the same code, with the help of timer functions to avoid conflicts between the processing of both functions.
- Timer code is taken from: https://stackoverflow.com/questions/12711072/how-to-pause-app-scripts-until-spreadsheet-finishes-calculation
- Function `scanDoc` is created to check the first 100 rows at the first 3 columns for the keyword IF.  Upon detecting keyword IF in a row, the next row is checked for the keyword IF.  If no IF is detected in next row, the current row's keyword's checkbox is blanked.  If a IF is detected in next row, the function `startProcessing` is called to update the current row's keyword's checkbox's value.

Results and Remarks
- Features 8 and 9 now tested and works.
- Feature 11 is about appearance and has been implemented based on my understanding of the requirement.
- Features 8 and 9 were the last to be implemented because of the limitations of Google Apps Script (GAS).  The GAS interpreter does not provide a ready means of scheduling the `onEdit` and `onChange` triggered processes, so a timer function has to be implemented as a scheduling hack to queue the 2 triggered processes.

#### BabyLegalSSv0.9.1.1 Summary
Error found
- When IT IS is typed in, the Tee became broken at the top of the cell with keyword WHEN.

Goals
- To resolve this error by building a proper Tee.

Result and Analysis
- Problem resolved.  The problem arises from the drawBridgeIfAndOr function, where the top of buildRange.setBorder for AND was set to false.  It is now set to null.

#### BabyLegalSSv0.9.2.0.js Summary
Goals
- This version of the Legal Spreadsheet is just to test the code at https://gist.github.com/pamelafox/1878143.  The code changes the spreadsheet data into JSON, and then exports JSON to a display function.

Results
- The code was tested and works.

#### BabyLegalSSv0.9.2.1.js Summary
Tasks done
- Adapt the code from BabyLegalSSv0.9.2.0.js into the actual Legal Spreadsheet.
- Test and implement the Class UrlFetchApp in the Legal Spreadsheet, as described at: https://app.asana.com/0/1200815832581011/1202104680454158/f.
- Finetune some of the code to remove Legal Spreadsheet Keyword formatting errors and better satisfy project requirements.

#### BabyLegalSSv0.9.2.2.js Summary
Goal
- To troubleshoot a bug arising from a "row delete and row insert" action.  This has been tested to happen between the IT IS set of keyword formatting placed above the deleted and inserted row(s), and the Example 13 set of IF IF AND OR set of keyword formatting placed below.

Possible sources of problem:
- Intuitively, the problem may arise because of a bug in Google Sheets: when a cell has a checkbox, inserting a row above it will add a row with another checkbox in the cell of the added row above the original checkbox.  However, this is unlikely because the code does not respond to checkbox detections.
- Tests done on BabyLegalSSv0.9.2.2.js and insertrow-onedit.js show that the problem likely arises from onEdit responding in unpredictable ways to row inserts.

Implemented solution:
- Instead of the original idea of implementing code to overwrite the erroneous outputs, another test moving the code
```let startWord = getNext1 = getNext2 = "";```
from the function `scanDocIF` from outside the 2 for loops into both for loops, resolved the problem.  It is likely that the variables involved were not reset before reusing them in each loop.

Final Outcome:
- I tried to replicate the error by moving the code
```let startWord = getNext1 = getNext2 = "";```
back to the previous position, but failed to replicate the error.  This is strange and is likely due to some inherent updates in Google Sheets itself that were not reported.  However, to avoid future problems, the code is moved to its new position.

Additional changes:
- included onOpen and created exportCSV functions. onOpen adds to the menu bar of Google Sheets, exportCSV provides the functionality for the extra menu option.  exportCSV creates CSV string to send to remote server and outputs response in dialog box.

#### insertrow-onedit.js Summary
Tasks done:
- Code for onEdit to detect cell range for event created.
- Row inserts tested in the spreadsheet.  Detection of cell range using onEdit sometimes show the first leftmost cell of inserted row, sometimes show the cell which had the focus before the insert, and sometimes nothing showed.
- Row deletes do not trigger response.

#### insertrow-onedit-testCSV.js Summary
Changes made:
- changed from insertrow-onedit.js
- created and tested testCSV, testCSV2, cellArraysToCsv functions.
- tested Sidebars in Google Sheets
- created testIndexOf to check output

#### BabyLegalSSv0.9.2.3.js Summary
Changes made:
- troubleshoot exportCSV function due to mistaken impression that `values[i][j]` selects for individual character, when it only selects for individual cell in 2D array of cells.
- received help from https://stackoverflow.com/questions/72688102/how-do-i-parse-text-strings-in-google-sheets-cells-to-a-csv-file-with-google-app
- tested sending CSV string to different remote websites.

#### BabyLegalSSv0.9.2.4.js Summary
Changes made:
- testing how sidebar works by creating doGet function.  doGet function is meant to support sidebar to display output from remote L4 server, but did not work.
- received help from https://stackoverflow.com/questions/72715553/google-apps-script-google-sheet-template-scriplets-dont-work

Outcome:
- Sidebar working.  Output from remote server displayed in Sidebar.

#### uuid-urlid.js Summary
- Created for testing various methods

#### BabyLegalSSv0.9.2.5.js and answers.html Summary
Some relevant links:
- https://developers.google.com/apps-script/reference/utilities/utilities?hl=en#getUuid()
- https://developers.google.com/apps-script/reference/cache/cache-service?hl=en#getUserCache()
- https://developers.google.com/apps-script/reference/cache
- https://developers.google.com/apps-script/guides/html/reference/url
- https://developers.google.com/apps-script/reference/forms/date-time-item

Received help from:
- https://stackoverflow.com/questions/72722597/google-apps-script-google-sheets-getting-spreadsheet-id-and-sheet-id-programm

Goals:
- to implement a transfer of uuid, spreadsheet id and sheet id data to remote L4 server.
- to get commands list from remote L4 server for user to choose using the Sidebar UI, and then send back to server.
- Finetuned the Sidebar UI using bootstrap.

#### BabyLegalSSv0.9.3.0.js and mainV0.9.3.0.js.html Summary
Goals:
- the exportCSV function to remote server to get output will be triggered by every onEdit function call, and displayed in the Sidebar.

Outcome:
- Successfully triggered the exportCSV function based on every onEdit function call.
- New problem encountered: selection of L4 function is unstable due to inability to properly handle the cache.

#### onedit-sidebar.js and mainV0.2.html Summary
Goals:
- to troubleshoot a proper way to handle the cache and update the L4 function.


