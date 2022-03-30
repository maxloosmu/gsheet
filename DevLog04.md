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

