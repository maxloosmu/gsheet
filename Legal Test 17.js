function testEdit() {
  let sheet = SpreadsheetApp.getActiveSheet();
  let c = sheet.getRange('A2');
  let cvalue = c.getValue();
  let topLeft = c.offset(-1,0);
  let summary = ["="];
  Logger.log("beginning " + summary);
  // Logger.log("typeof " + (typeof summary));
  parseWords(c, summary);
  Logger.log("final " + summary.join(''));
}

function parseWords(c, summary) {
  // Logger.log("parseWords");
  cvalue = c.getValue();
  if (cvalue=="IF") {
    processIf(c, summary);
  }
  else if (cvalue=="AND") {
    processAnd(c, summary);
  }
}

function processIf(cell, summary) {
  // Logger.log("processIf row = " + cell.getRowIndex());
  let rightOfIf = cell.offset(0,1);
  let boxRightOfIf =
    rightOfIf.getDataValidation().getCriteriaType();
  if (boxRightOfIf=="CHECKBOX") {
    summary.push(" (" + rightOfIf.getValue());
    // Logger.log("start parse " + summary);
    let [nextCell, endParse, _] = getNextCell(cell);
    if (!endParse) {
      parseWords(nextCell, summary);
      // summary.push(")");
      // Logger.log("not endparse " + summary);
    } else {
      summary.push(")");
      // Logger.log("endparse " + summary);
    }
  }
  Logger.log("the end " + summary);
}

function processAnd(cell, summary){
  let rightOfIf = cell.offset(0,1);
  let boxRightOfIf =
    rightOfIf.getDataValidation().getCriteriaType();
  if (boxRightOfIf=="CHECKBOX") {
    summary.push(" AND " + rightOfIf.getValue());
    let [nextCell, endParse, cellCol] = getNextCell(cell);
    if (!endParse && cellCol>=0) {
      parseWords(nextCell, summary);
    }
    else if (!endParse && cellCol<0) {
      while (cellCol<0) {
        summary.push(")");
        cellCol++;
      }
      parseWords(nextCell, summary);
    }
    else if (endParse) {
      while (cellCol<0) {
        summary.push(")");
        cellCol++;
      }
    }
  }
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
    if (nextCValue=="IF" || nextCValue=="AND") {
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

