function onEdit(e) {
  // if (e.value != null) {
  //   showSidebar();
  // }
  showSidebar();
}
function showSidebar() {
  let html = HtmlService.createTemplateFromFile('main');
  let htmlOutput = html.evaluate().setTitle('New Sidebar');
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
