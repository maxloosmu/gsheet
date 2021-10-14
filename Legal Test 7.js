function onEdit(e) {
  let c = e.range
    , cellrow = c.rowStart
    , cellcol = c.columnStart
    , c2
    sheet = SpreadsheetApp.getActiveSheet()
    ;
  /* code to part sea of words in spreadsheet */
  let cvalue = e.value;
  if (cvalue == "EVERY" || cvalue == "PARTY") {
    let [upper, left, right, lower] = checkNeighbours(c);
    let neighbours = [upper, left, right, lower]
    if (! allBlank(neighbours)) {
      // insert 6 rows and delete original word at original position
      c.getSheet().insertRowsAfter(c.rowStart, 6);
      c.setValue("");
      // paste original word in cell 2 rows below original position
      cellrow += 2;
      c2 = sheet.getRange(cellrow, cellcol);
      c2.setValue(cvalue);
    }
  }
}
// return the (up to) 8 cells surrounding cell c
function checkNeighbours(c) {
  let nbUpperRow = c.offset(-1,-2,1,8)
      , nbLeft = c.offset(0,-2,1,2)
      , nbRight = c.offset(0,1,1,5)
      , nbLowerRow = c.offset(1,-2,3,8)
      ;
  return [nbUpperRow, nbLeft, nbRight, nbLowerRow];
}
// are all the cells given, blank?
function allBlank(rs) {
  for (var c of rs) {
    if (! c.isBlank()) return false;
  }
  return true;
}
