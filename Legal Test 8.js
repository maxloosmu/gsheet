function onEdit(e) {
  let c = e.range
  let cvalue = e.value;

  // add a checkbox
  if (cvalue == "IF" || cvalue == "WHEN" || cvalue == "OR") {
    c.offset(0,1).removeCheckboxes();
    c.getSheet().insertRowAfter(c.rowStart);
    c.setHorizontalAlignment("right");
    c.offset(0,1).insertCheckboxes()
      .setBorder(false,true,false,false,false,false,
        "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
    if (c.offset(0,2).isBlank()) {
      c.offset(0,2).setValue("some condition");
    }
    c.setBorder(null, null, null, true, false, false,
      "grey",SpreadsheetApp.BorderStyle.SOLID_THICK);
  }
  // add a checkbox and a horizontal line
  if (cvalue == "AND") {
    c.offset(0,1).removeCheckboxes();
    c.getSheet().insertRows(c.rowStart + 1,1);
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
}
