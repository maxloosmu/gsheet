function onEdit(e) {
 const c = e.range
 const cvalue = e.value;
 console.log({rg:c.getA1Notation(),e})

 if (cvalue == "IF") {
   c.getSheet().insertRowAfter(c.rowStart);
 }
 if (cvalue == "AND") {
   c.getSheet().insertRows(c.rowStart + 1,1);
 }
 if (cvalue == "WHEN") {
   c.getSheet().insertRowsAfter(c.rowStart, 1);
 }
 if (cvalue == "OR") {
   c.getSheet().insertRowAfter(c.getRowIndex());
 }
 if(/OR|WHEN|AND|IF/g.test(cvalue)){
  c.activateAsCurrentCell();
  SpreadsheetApp.flush();
  c.offset(1,0).activateAsCurrentCell()
 };
}

