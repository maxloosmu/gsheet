function testEdit() {
  // respond to special inputs
  sheet = SpreadsheetApp.getActiveSheet();
  let c = sheet.getRange('C3');
  // if (c.getBackground() != "#ffffff") { return }

  let cvalue = c.getValue();
  if (cvalue == "EVERY" ||
      cvalue == "PARTY") {

    if (! allBlank(neighboursOf(c))) { c.getSheet().insertRowsAfter(c.getRowIndex(), 5); }
    // drawPlusUnderEvery(c);
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
function neighboursOf(c) {
  let neighbours = 
    [ c.offset(-1,-1,3)
    , c.offset( 0,-1,1)
    , c.offset( 0, 1,1)
    , c.offset( 1,-1,3)
    ];
  Logger.log("neighbours are:");
  Logger.log(neighbours);
  return neighbours;
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

