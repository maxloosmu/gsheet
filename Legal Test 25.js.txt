let sheet = SpreadsheetApp.getActiveSheet();
sheet.getRange(1, 1).
  addEventListener('click', event => {
  sheet.getRange(1, 2).setValue(`click ${event.id}`);
});
sheet.getRange(1, 1).
  addEventListener('contentdelete', event => {
  sheet.getRange(1, 2).setValue(`deleted ${event.id}`);
});
function myFunction() {
  let sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(1, 1).
    addEventListener('contentdelete', event => {
    sheet.getRange(1, 2).setValue(`${event.id}`);
});
}
