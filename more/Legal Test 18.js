function testEdit() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let c = sheet.getRange('A2');
  let cvalue = c.getValue();
  let h = sheet.getRange('A1');
  h.history = [];
  h.farCol = 0;
  let summary = ["="];
  Logger.log("beginning " + summary);
  // Logger.log("typeof " + (typeof summary));
  drawWords(c, summary, h);
  parseWords(c, summary, h);
  Logger.log("final " + summary.join(''));
  processHistory(h, sheet);
}
function onEdit(e) {
  // respond to Edit events on spreadsheet.
  let c = e.range;
  let cvalue = e.value;
  let sheet = SpreadsheetApp.getActiveSheet();
  let h = sheet.getRange('A1');
  h.history = [];
  h.farCol = 0;
  let summary = ["="];
  parseWords(c, summary, h);
  processHistory(h, sheet);
}
function processHistory(h, sheet) {
  // process the h.history Array.
  let restart = true;
  let rowBegin = 0;
  let rowStop = 0;
  let numOfRows = 0
  let buildRange = "";
  let rangeString = "";
  let columnNow = 1;
  while (columnNow <= h.farCol) {
    for (const element of h.history) {
      if (element != null) {
        let row = h.history.indexOf(element);
        let [col, keyword, predicate] = element;
        if (columnNow==col && restart && keyword=="IF"
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
  if (prevIndex < index) {
    prevIndex = index;
  }
  return prevIndex;
}
function drawWords(c, summary, h) {
  cvalue = c.getValue();
  if (cvalue=="IF" || cvalue=="OR") {
    drawIfOr(c);
  }
  else if (cvalue=="AND") {
    drawAnd(c);
  }
}
function parseWords(c, summary, h) {
  // identify keywords, draw their layout
  // and process them into h.history and summary.
  cvalue = c.getValue();
  if (cvalue=="IF") {
    processIf(c, summary, h);
  }
  else if (cvalue=="AND") {
    processAnd(c, summary, h);
  }
  else if (cvalue=="OR") {
    processOr(c, summary, h);
  }
}
function processIf(c, summary, h) {
  let rightOfIf = c.offset(0,1);
  let predValue = rightOfIf.getValue();
  let topOfIf = c.offset(-1,0);
  h.history[c.getRowIndex()] =
    [c.getColumnIndex(), c.getValue(), predValue];
  h.farCol = getFurthest(h.farCol, c.getColumnIndex());
  let boxRightOfIf =
    rightOfIf.getDataValidation().getCriteriaType();
  if (boxRightOfIf=="CHECKBOX") {
    summary.push(" (" + predValue);
    let [nextCell, endParse, _] = getNextCell(c);
    if (!endParse) {
      parseWords(nextCell, summary, h);
    } else {
      summary.push(")");
    }
  }
  Logger.log("the end " + summary);
}
function processAnd(c, summary, h){
  let rightOfIf = c.offset(0,1);
  let predValue = rightOfIf.getValue();
  h.history[c.getRowIndex()] =
    [c.getColumnIndex(), c.getValue(), predValue];
  let boxRightOfIf =
    rightOfIf.getDataValidation().getCriteriaType();
  if (boxRightOfIf=="CHECKBOX") {
    summary.push(" AND " + predValue);
    let [nextCell, endParse, cellCol] = getNextCell(c);
    const closeBracket = function() {
      while (cellCol<0) {
        summary.push(")");
        cellCol++;
      }
    }
    if (!endParse && cellCol>=0) {
      parseWords(nextCell, summary, h);
    }
    else if (!endParse && cellCol<0) {
      closeBracket();
      parseWords(nextCell, summary, h);
    }
    else if (endParse) {
      closeBracket();
    }
  }
}
function processOr(c, summary, h){
  let rightOfIf = c.offset(0,1);
  let predValue = rightOfIf.getValue();
  h.history[c.getRowIndex()] =
    [c.getColumnIndex(), c.getValue(), predValue];
  let boxRightOfIf =
    rightOfIf.getDataValidation().getCriteriaType();
  if (boxRightOfIf=="CHECKBOX") {
    summary.push(" OR " + predValue);
    let [nextCell, endParse, cellCol] = getNextCell(c);
    const closeBracket = function() {
      while (cellCol<0) {
        summary.push(")");
        cellCol++;
      }
    }
    if (!endParse && cellCol>=0) {
      parseWords(nextCell, summary, h);
    }
    else if (!endParse && cellCol<0) {
      closeBracket();
      parseWords(nextCell, summary, h);
    }
    else if (endParse) {
      closeBracket();
    }
  }
}
function getNextCell(cell) {
  // get cell with value in next row.  if no more
  // cells with value, tag and trigger endParse.
  let nextCell;
  let nextCValue = "";
  let cellCol = 1;
  let endParse = false;
  let columnLimit = 1 - cell.getColumnIndex();
  do {
    nextCell = cell.offset(1,cellCol);
    nextCValue = nextCell.getValue();
    if (nextCValue=="IF" || nextCValue=="AND"
      || nextCValue=="OR") {
      // Logger.log("nextCValue = " + nextCValue);
      break;
    }
    cellCol -= 1;
  } while (cellCol >= columnLimit)
  if (!nextCell.getValue()) {
    endParse = true;
    Logger.log("endParse = " + endParse);
  }
  return [nextCell, endParse, cellCol];
}
function drawIfOr(c) {
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
  c.setHorizontalAlignment("right");
  if (c.offset(0,1).isBlank()) {
    c.offset(0,1).insertCheckboxes()
      .setBorder(null,true,false, false, false,false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
    c.offset(0,1,1,4)
      .setBorder(true,true,false,false,false,false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
    c.setBorder(null,null,null,true,false,false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  }
  if (c.offset(0,2).isBlank()) {
    c.offset(0,2).setValue("some condition");
  }
}
