function testEdit() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let c = sheet.getRange('A2');
  let cvalue = c.getValue();
  let topLeft = c.offset(-1,0);
  let summary = "";
  summary = "=" + parseWords(c, cvalue, summary);
  Logger.log("final " + summary);
}

function parseWords(c, cvalue, summary) {
  // Logger.log("parseWords");
  if (cvalue=="IF") {
    return processIf(c, summary);
  }
  else {
    return "";
  }
}

function processIf(cell, summary) {
  // Logger.log("processIf row = " + cell.getRowIndex());
  let rightOfIf = cell.offset(0,1);
  let boxRightOfIf =
    rightOfIf.getDataValidation().getCriteriaType();
  if (boxRightOfIf=="CHECKBOX") {
    // summary = summary + "(" + rightOfIf.getValue();
    // Logger.log("start parse " + summary);
    [nextCell, endParse] = getNextCell(cell);
    if (!endParse) {
      summary = summary + "(" + rightOfIf.getValue()
        + parseWords(nextCell, nextCell.getValue(), summary) + ")";
      Logger.log("not endparse " + summary);
    } else if (rightOfIf.getValue()) {
      summary = summary + "(" + rightOfIf.getValue() + ")";
      Logger.log("endparse " + summary);
    }
  }
  Logger.log("the end " + summary);
  return summary;
}

function getNextCell(cell) {
  // Logger.log("getNextCell");
  let nextCell;
  let nextCValue = "";
  let cellCol = 1;
  let endParse = false;
  Logger.log("cell.getColumnIndex() = " + cell.getColumnIndex());
  let columnLimit = 1 - cell.getColumnIndex();
  // Logger.log("columnLimit = " + columnLimit);
  do {
    nextCell = cell.offset(1,cellCol);
    nextCValue = nextCell.getValue();
    if (nextCValue=="IF") {
      // Logger.log("nextCValue = " + nextCValue);
      break;
    }
    cellCol -= 1;
  } while (cellCol >= columnLimit)
  if (!nextCell.getValue()) {
    endParse = true;
    Logger.log("endParse = " + endParse);
  }
  return [nextCell, endParse];
}

function processAnd(cell){
}

