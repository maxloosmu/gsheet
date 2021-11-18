function onEdit(e) {
  // respond to special inputs
  let c = e.range
      , cellrow = c.rowStart
      , cellcol = c.columnStart
      , c0
      , c2
      sheet = SpreadsheetApp.getActiveSheet()
      ;
  if (c.getBackground() != "#ffffff") { return }

  let cvalue = e.value;
  if (cvalue=="EVERY"||cvalue=="PARTY") {
    let [upper, left, right, lower] = checkNeighbours(c);
    let neighbours = [upper, left, right, lower]
    if (! allBlank(neighbours)) {
      c.getSheet().insertRowsAfter(c.rowStart, 6);
    }
    drawPlusUnderEvery(c);
  }
  // add a checkbox
  if (cvalue=="IF"||cvalue=="WHEN"||cvalue=="OR") {
    c.setHorizontalAlignment("right");
    c.offset(0,1).insertCheckboxes()
      .setBorder(false,true,false, false, false,false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);

    if (c.offset(0,2).isBlank()) {
      c.offset(0,2).setValue("some condition");
    }
    /*if (e.oldValue=="AND"||e.oldValue=="UNLESS") {
      c.offset(0,1,1,4).setBorder(false,null,false,false,false,false,"white",SpreadsheetApp.BorderStyle.SOLID_THICK);
    }*/
    c.setBorder(null, null, null, true, false, false,
    "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  }
  // add a checkbox and a horizontal line
  if (cvalue=="AND") {
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
  // draw an L
  if (cvalue=="HENCE"||cvalue=="LEST") {
    c.setHorizontalAlignment("right");
    c.offset(0,1,1,4).setBorder(false,true,true,false,false,false,
    "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  }
  // draw the borders around the checkbox to carve out
  if (cvalue=="UNLESS") {
    c.setHorizontalAlignment("right");
    c.offset(0,1).insertCheckboxes()
      .setBorder(true,false,true,true,false,false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
    if (c.offset(0,2).isBlank()) {
      c.offset(0,2).setValue("some exception");
    }
  }
  // draw a Tee over IS, MEANS
  if (cvalue=="IS"||cvalue=="MEANS") {
    let [upper, left, right, lower] = checkNeighbours(c);
    let neighbours = [upper, left, right, lower]
    if (! allBlank(neighbours)) {
      c.getSheet().insertRowsAfter(c.rowStart, 4);
    }
    drawTeeOverIs(c, cvalue);
  }
  // draw a Tee for IT IS
  if (cvalue=="IT IS") {
    let [upper, left, right, lower] = checkNeighbours(c);
    let neighbours = [upper, left, right, lower]
    if (! allBlank(neighbours)) {
      c.getSheet().insertRowsAfter(c.rowStart, 4);
    }
    drawTeeForITIS(c, cvalue);
  }
}



function drawTeeForITIS(c, cvalue) {
  c.clear();
  c.insertCheckboxes();
  c.offset(0,-1).setValue(cvalue).setHorizontalAlignment("right");
  c.offset(0,1).setValue("a Defined Situation");
  c.offset(0,-1,1,4)
    .setBorder(false,false,true,false,false,false,
    "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,0,2,1)
    .setBorder(true,false,false,true,false,false,
    "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,0).setValue("WHEN").setHorizontalAlignment("right");
  c.offset(1,1).insertCheckboxes();
  c.offset(1,2).setValue("something holds");
  c.offset(2,0).setValue("AND").setHorizontalAlignment("right");
  c.offset(2,1).insertCheckboxes();
  c.offset(2,2).setValue("something else holds");
}

function drawTeeOverIs(c, cvalue) {
  c.clear();
  c.insertCheckboxes();
  c.offset(0,1).setValue("a Defined Term");
  c.offset(0,0,1,3)
    .setBorder(false,false,true,false,false,false,
    "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,0,2,1)
    .setBorder(true,false,false,true,false,false,
    "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,0).setValue(cvalue).setHorizontalAlignment("right");
  c.offset(1,1).insertCheckboxes();
  c.offset(1,2).setValue("a thing");
  c.offset(2,0).setValue("OR").setHorizontalAlignment("right");
  c.offset(2,1).insertCheckboxes();
  c.offset(2,2).setValue("another thing");
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

  c.offset(0,0,3).setBorder(false,false,false,true,false,false,
  "grey", SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,-1,1,7).setBorder(false,false,true,false,false,false,
  "grey", SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,0).setBorder( false,false,true,true,false,false,
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

