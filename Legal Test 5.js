function testEdit() {
  /* for testing at cell C3 */
  let sheet = SpreadsheetApp.getActiveSheet();
  let c = sheet.getRange('C3')
    , cellrow = c.getRowIndex()
    , cellcol = c.getColumnIndex()
    , c2
    , checkWrite = 0;
  main(sheet, c, cellrow, cellcol, c2, checkWrite);
}
function onEdit(e) {
  /* respond to spreadsheet events with onEdit(e) */
  let sheet = SpreadsheetApp.getActiveSheet();
  let c = e.range
    , cellrow = c.getRowIndex()
    , cellcol = c.getColumnIndex()
    , c2
    , checkWrite = 0;
  main(sheet, c, cellrow, cellcol, c2, checkWrite);
}
function main(sheet, c, cellrow, cellcol, c2, checkWrite) {
  sheet.getRange('B1').setValue(cellrow + "," + cellcol);
  /* code to part a sea of words in spreadsheet */
  let cvalue = c.getValue();
  if ((checkWrite == 0) && (cvalue == "EVERY" || cvalue == "PARTY")) {
    let [upper, left, right, lower] = checkNeighbours(c);
    let neighbours = [upper, left, right, lower]
    if (! allBlank(neighbours)) { 
      cellrow = c.getRowIndex() + 2;
      /* this line of code works with testEdit() */
      c.getSheet().insertRowsAfter(c.getRowIndex(), 6); 
      
      /* checkWrite condition required for onEdit(e)
      // this code prevents too many lines from being added
      if (checkWrite == 0) {
        c.getSheet().insertRowsAfter(c.getRowIndex(), 6); 
        checkWrite = 1;
      } */
      c.setValue("");
      c2 = sheet.getRange(cellrow, cellcol);
      c2.setValue(cvalue);
    }
  }  
}
// return cells surrounding cell c
function checkNeighbours(c) {
  let nbUpperRow = c.offset(-1,-2,1,8) //.setValue("nbUpperRow")
      , nbLeft = c.offset(0,-2,1,2) //.setValue("nbLeft")
      , nbRight = c.offset(0,1,1,5) //.setValue("nbRight")
      , nbLowerRow = c.offset(1,-2,3,8) //.setValue("nbLowerRow")
      ;
  // Logger.log(nbUpperRow);
  return [nbUpperRow, nbLeft, nbRight, nbLowerRow];
}
// are all the cells given, blank?
function allBlank(rs) {
  for (var c of rs) {
    if (! c.isBlank()) return false; 
  }
  return true;
}
