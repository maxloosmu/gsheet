function onEdit(e) {
  let c = e.range
  let cvalue = e.value;

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
}
