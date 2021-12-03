class History {
  constructor(history = []) {
    this.history = history;
  }
}
function onEdit(e) {
  // Respond to Edit events on spreadsheet.
  let c = e.range;
  if (c.getBackground() != "#ffffff") { return; }
  let sheet = SpreadsheetApp.getActiveSheet();
  let h = new History();
  drawWords(c);
  let startCell = findStart(c);
  sheet.getRange(1, 1).setValue(startCell.getValue());
  h = scanDownwards(startCell, h);
  sheet.getRange(1, 2).setValue(c.getA1Notation());
  testHistory(h, sheet);
  processHistory(h, sheet);
}
function drawWords(c) {
  // Identify keywords for formatting.
  cValue = c.getValue();
  if (cValue=="IF" || cValue=="WHEN") {
    c = drawIfWhenTop(c);
    drawIfWhenOr(c);
  }
  else if (cValue=="OR") {
    drawIfWhenOr(c);
  }
  else if (cValue=="AND") {
    drawAnd(c);
  }
  else if(cValue=="IS" || cValue=="MEANS") {
    drawTeeOverIsMeans(c);
  }
}
function findStart(c) {
  // Find the topLeft start of all keywords.
  let nextCol = 0;
  let maxCount = 5;
  while (nextCol < maxCount) {
    let getTopRight = c.offset(-1, nextCol);
    let gtr = getTopRight.getValue();
    if (checkKeyword(gtr)) {
      c = getTopRight;
      return findStart(c);
    }
    nextCol++;
  }
  if (nextCol == maxCount) {
    let getTopLeft = c.offset(-1, -1);
    let gtl = getTopLeft.getValue();
    if (checkKeyword(gtl)) {
      c = getTopLeft;
      return findStart(c);
    }
  }
  return c;
}
function checkKeyword(cValue){
  return (cValue=="IF" || cValue=="OR"
    || cValue=="AND" || cValue=="WHEN"
    || cValue=="MEANS" || cValue=="IS");
}
function scanDownwards(c, h) {
  // Scan downwards for keywords.
  h = parseWords(c, h);
  let cellCol = 1;
  let columnLimit = cellCol - c.getColumnIndex();
  do {
    let nextCellBelow = c.offset(1,cellCol);
    let ncb = nextCellBelow.getValue();
    if (checkKeyword(ncb)) {
      c = nextCellBelow;
      return scanDownwards(c, h);
    }
    cellCol -= 1;
  } while (cellCol >= columnLimit)
  return h;
}
function parseWords(c, h) {
  // Put keywords into h.history Array.
  let rightOfIf = c.offset(0,1);
  let predValue = rightOfIf.getValue();
  h.history[c.getRowIndex()] =
    [c.getColumnIndex(), c.getValue(), predValue];
  return h;
}
function processHistory(h, sheet) {
  // Process the h.history Array.
  let restart = true;
  let rowBegin = rowStop = numOfRows = 0;
  let buildRange = rangeString = "";
  let columnNow = farCol = 1;
  for (const element of h.history) {
    if (element != null) {
      farCol = getFurthest(farCol, element[0]);
    }
  }
  while (columnNow <= farCol) {
    for (const element of h.history) {
      if (element != null) {
        let row = h.history.indexOf(element);
        let [col, keyword, predicate] = element;
        if (columnNow==col && restart &&
          (keyword=="IF" || keyword=="WHEN"
          || keyword=="MEANS" || keyword=="IS")
          && rowBegin<row) {
          restart = false;
          rowBegin = row;
        }
        if (columnNow==col && !restart) {
          rowStop = getFurthest(rowStop, row);
          numOfRows = rowStop - rowBegin + 1;
          buildRange = sheet.getRange(rowBegin,
            columnNow+1, numOfRows, 1);
          rangeString = buildRange.getA1Notation();
          sheet.getRange(rowBegin-1, columnNow)
            .setValue("=" + keyword.toLowerCase()
            + "(" + rangeString + ")");
        }
      }
    }
    columnNow++;
    restart = true;
    rowStop = 0;
  }
}
function getFurthest(prevIndex, index) {
  if (prevIndex < index) return index;
  else return prevIndex;
}
function testHistory(h, sheet) {
  // Test the h.history Array.
  let lastRow = 1;
  let farCol = 1;
  for (const element of h.history) {
    if (element != null) {
      let row = h.history.indexOf(element);
      let [col, keyword, predicate] = element;
      lastRow = row;
      farCol = getFurthest(farCol, col);
    }
  }
  sheet.getRange(1, 3).setValue(h.history.toString());
}
function drawIfWhenTop(c) {
  let topOfIf = c.offset(-1,0);
  if (topOfIf.getDataValidation().getCriteriaType()
    == "CHECKBOX") {
    return c;
  }
  let cValue = c.getValue();
  c.clear();
  c.insertCheckboxes();
  c.offset(1,0).setValue(cValue);
  return c.offset(1,0);
}
function drawIfWhenOr(c) {
  c.offset(0,0,1,9).clearFormat();
  c.setHorizontalAlignment("right");
  if (c.offset(0,1).isBlank()) {
    c.offset(0,1).insertCheckboxes()
      .setBorder(false,true,false,false,false,false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
    c.setBorder(null,null,null,true,false,false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  }
  if (c.offset(0,2).isBlank()) {
    c.offset(0,2).setValue("some condition");
  }
}
function drawAnd(c) {
  c.offset(0,0,1,9).clearFormat();
  c.offset(0,1,1,4)
    .setBorder(true,true,false,false,false,false,
    "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.setHorizontalAlignment("right");
  if (c.offset(0,1).isBlank()) {
    c.offset(0,1).insertCheckboxes()
      .setBorder(null,true,false, false, false,false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
    c.setBorder(null,null,null,true,false,false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  }
  if (c.offset(0,2).isBlank()) {
    c.offset(0,2).setValue("some condition");
  }
}
function drawTeeOverIsMeans(c) {
  let cValue = c.getValue();
  c.clear();
  c.insertCheckboxes();
  c.offset(0,1).setValue("a Defined Term");
  c.offset(0,0,1,3)
    .setBorder(false,false,true,false,false,false,
    "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,0,2,1)
    .setBorder(true,false,false,true,false,false,
    "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  c.offset(1,0).setValue(cValue).setHorizontalAlignment("right");
  c.offset(1,1).insertCheckboxes();
  c.offset(1,2).setValue("a thing");
  c.offset(2,0).setValue("OR").setHorizontalAlignment("right");
  c.offset(2,1).insertCheckboxes();
  c.offset(2,2).setValue("another thing");
}
