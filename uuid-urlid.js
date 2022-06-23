function myFunction() {
  const ui = SpreadsheetApp.getUi();
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = SpreadsheetApp.getActiveSheet();
  spreadsheetId = spreadsheet.getId()
  sheetId = sheet.getSheetId();
  if (sheetId == 0) {
    sheetId = sheetId.toFixed();
  }
  Logger.log(spreadsheetId);
  Logger.log(sheetId);
  let cache = CacheService.getUserCache();
  let cached = "";
  if (cache.get("uuid") != null) {
    cached = cache.get("uuid");
    Logger.log(cached);
  }
  else {
    cached = Utilities.getUuid();
    Logger.log(cached);
    cache.put("uuid", cached, 3600);
  }
}
