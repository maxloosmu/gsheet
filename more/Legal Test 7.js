function onEdit(e) {
  let c = e.range
    , cellrow = c.rowStart
    , cellcol = c.columnStart
    , c0
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
      c.clear();
      // paste original word in cell 2 rows below original position
      cellrow += 2;
      c2 = sheet.getRange(cellrow, cellcol).setValue(cvalue);
    }
    drawPlusUnderEvery(c2);
    c0 = sheet.getRange(1,1).setValue(cvalue);
  }
  // add a checkbox
  if (cvalue == "IF" || cvalue == "WHEN" || cvalue == "OR") {
    c.offset(0,1).removeCheckboxes();
    c.getSheet().insertRowAfter(c.rowStart);
    c.setHorizontalAlignment("right");
    c.offset(0,1).insertCheckboxes()
      .setBorder(false,true,false,false,false,false,
        "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
    if (c.offset(0,2).isBlank()) {
      c.offset(0,2).setValue("some condition");
    }
    /*if (e.oldValue == "AND" || e.oldValue == "UNLESS") {
      c.offset(0,1,1,4).setBorder(false,null,false,false,false,false,
        "white",SpreadsheetApp.BorderStyle.SOLID_THICK);
    }*/
    c.setBorder(null, null, null, true, false, false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  }
  // add a checkbox and a horizontal line
  if (cvalue == "AND") {
    c.offset(0,1).removeCheckboxes();
    c.getSheet().insertRowsAfter(c.getRowIndex(),1);
    c.setHorizontalAlignment("right");
    c.offset(0,1).insertCheckboxes()
      .setBorder(null,true,false, false, false,false,
        "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
    if (c.offset(0,2).isBlank()) {
      c.offset(0,2).setValue("some condition");
    }
    c.offset(0,1,1,4).setBorder(true,true,false,false,false,false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
    c.setBorder(null, null, null, true, false, false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
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

  c.offset(0,0,3).setBorder( false, false, false, true, false, false,
    "grey", SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,-1,1,7).setBorder(false, false, true, false, false, false,
    "grey", SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,0).setBorder( false, false, true, true, false, false,
    "grey", SpreadsheetApp.BorderStyle.SOLID_THICK);
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

