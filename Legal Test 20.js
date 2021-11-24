  // moving sheet and h out of onEdit function
  // does not result in both being stored
  // permanently.
  let sheet = SpreadsheetApp.getActiveSheet();
  let h = sheet.getRange('A1');
  h.history = [];

function onEdit(e) {
  // Respond to Edit events on spreadsheet.
  let c = e.range;
  let cvalue = e.value;
  drawWords(c);
  parseWords(c, h);
  processHistory(h, sheet);
}
function drawWords(c) {
  // Identify keywords for formatting.
  cvalue = c.getValue();
  if (cvalue=="IF" || cvalue=="OR") {
    drawIfOr(c);
  }
}
function parseWords(c, h) {
  // Identify keywords for processing.
  cvalue = c.getValue();
  if (cvalue=="IF") {
    processIf(c, h);
  }
  else if (cvalue=="OR") {
    processAndOr(c, h);
  }
}
function processHistory(h, sheet) {
  // process the h.history Array.
  let lastRow = 1;
  let farCol = 1;
  for (const element of h.history) {
    if (element != null) {
      let row = h.history.indexOf(element);
      let [col, keyword, predicate] = element;
      // Only the most recent keyword is printed.
      // This effect can be seen if we delete
      // past prints. There is no reprinting of
      // past values.
      sheet.getRange(row+8, col).setValue(keyword);
      lastRow = row;
      farCol = getFurthest(farCol, col);
    }
  }
  sheet.getRange(1, 1).setValue(lastRow);
  // Furthest column value is not retained when
  // keyword is typed in a column with lower value.
  sheet.getRange(1, 2).setValue(farCol);
  // Convert Array h.history to String to check:
  sheet.getRange(1, 3).setValue(h.history.toString());
  // Confirm effects of conversion with testArray:
  testArray = [[1,1],['b',"b"],[3,3]]
  sheet.getRange(1, 4).setValue(testArray.toString());
}
function getFurthest(prevIndex, index) {
  if (prevIndex < index) return index;
  else return prevIndex;
}
function processIf(c, h) {
  let rightOfIf = c.offset(0,1);
  let predValue = rightOfIf.getValue();
  let topOfIf = c.offset(-1,0);
  if (topOfIf.isBlank()) {
    topOfIf.insertCheckboxes();
  }
  h.history[c.getRowIndex()] =
    [c.getColumnIndex(), c.getValue(), predValue];
}
function processAndOr(c, h){
  let rightOfIf = c.offset(0,1);
  let predValue = rightOfIf.getValue();
  let cvalue = c.getValue();
  h.history[c.getRowIndex()] =
    [c.getColumnIndex(), cvalue, predValue];
}
function drawIfOr(c) {
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
