function testEdit() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let c = sheet.getRange('A2');
  let cvalue = c.getValue();
  let topLeft = c.offset(-1,0);
  let summary = "=";
  // let summary = topLeft;
  parseWords(c, cvalue, summary);
}

function parseWords(c, cvalue, summary) {
  // Logger.log("parseWords");
  if (cvalue=="A" || cvalue=="B" || cvalue=="C") {
    return processIf(c, summary);
  }
}

function processIf(cell, summary) {
  // Logger.log("processIf row = " + cell.getRowIndex());
  letter = cell.getValue();
  if (letter) {
    summary = summary + "(" + letter;
    Logger.log("start parse " + summary);
    [nextCell, endParse] = getNextCell(cell);
    if (!endParse) {
      summary = summary
        + parseWords(nextCell, nextCell.getValue(), summary) + ")";
      Logger.log("not endparse " + summary);
    } else {
      summary = summary + ")";
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
  // Logger.log("cell.getColumnIndex() = " + cell.getColumnIndex());
  let columnLimit = 1 - cell.getColumnIndex();
  // Logger.log("columnLimit = " + columnLimit);
  do {
    nextCell = cell.offset(1,cellCol);
    nextCValue = nextCell.getValue();
    if (nextCValue=="A"||nextCValue=="B"||nextCValue=="C") {
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

