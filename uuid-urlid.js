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
  const tempId = Utilities.getUuid();
  Logger.log(tempId);
  let cache = CacheService.getUserCache();
  cache.put("uuid", tempId, 60);
  cached = cache.get("uuid");
  Logger.log(cached);
}
