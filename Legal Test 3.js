function onEdit(e) {
  /* for testing at cell C3 
  sheet = SpreadsheetApp.getActiveSheet();
  let c = sheet.getRange('C3')
    , cellrow = c.getRowIndex()
    , cellcol = c.getColumnIndex()
    ;
  */
  /* respond to special inputs */
  let c = e.range
    , cellrow = c.getRowIndex()
    , cellcol = c.getColumnIndex()
    , c2;
  
  sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange('B1').setValue(cellrow + "," + cellcol);
  // if (c.getBackground() != "#ffffff") { return }
  
  /* code to part of words in spreadsheet */
  let cvalue = c.getValue();
  if (c2 === undefined && (cvalue == "EVERY" ||
      cvalue == "PARTY")) {
    let [upper, left, right, lower] = checkNeighbours(c);
    let neighbours = [upper, left, right, lower]
    if (! allBlank(neighbours)) { 
      cellrow = c.getRowIndex() + 2;
      c.getSheet().insertRowsAfter(c.getRowIndex(), 6); 
      c.setValue("");
    }
    c2 = sheet.getRange(cellrow, cellcol);
    c2.setValue(cvalue);
    drawPlusUnderEvery(c2);
  }
  
}

// set the cell borders so as to draw horizontal and vertical lines
function drawPlusUnderEvery(c) {
  c.setHorizontalAlignment("right");

  if (c.getValue() == "EVERY") { c.offset(0,1).setValue("Entity"); }
  if (c.getValue() == "PARTY") { c.offset(0,1).setValue("P"); }
  c.offset(1,0).setValue("MUST").setHorizontalAlignment("right");
  c.offset(1,1).setValue("BY").setHorizontalAlignment("right");
  c.offset(1,2).setValue("some deadline");
  c.offset(2,0).setValue("➔").setHorizontalAlignment("right");
  c.offset(2,1).setValue("take").setHorizontalAlignment("right");
  c.offset(2,2).setValue("some Action");

  c.offset(0,0,3).setBorder( false, false, false, true, false, false, "grey", SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,-1,1,7).setBorder(false, false, true, false, false, false, "grey", SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,0).setBorder( false, false, true, true, false, false, "grey", SpreadsheetApp.BorderStyle.SOLID_THICK);
 
}

// return the (up to) 8 cells surrounding cell c
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
    Logger.log("testing " + c)
    if (! c.isBlank()) { Logger.log("allBlank: returning false");
                        return false; }
  }
  Logger.log("allBlank: returning true");
  return true;
}
