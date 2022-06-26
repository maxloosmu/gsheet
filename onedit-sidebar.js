function onEdit(e) {
  showSidebar();
}
function onOpen() {
  saveUuid();
  saveCommands();
}
function saveUuid() {
  let userCache = CacheService.getUserCache();
  let cached = "";
  if (userCache.get("uuid") == null) {
    cached = Utilities.getUuid();
    userCache.put("uuid", cached, 21600);
  }
}
function saveCommands() {
  let response = UrlFetchApp.fetch('http://18.139.62.80:8080/get')
  let commandArray = response.getContentText().split("\n");
  let scriptCache = CacheService.getScriptCache();
  scriptCache.put('commands', JSON.stringify(commandArray), 21600);
}
function getAllCommands() {
  let scriptCache = CacheService.getScriptCache();
  const commandArray = JSON.parse(scriptCache.get('commands'));
  return commandArray;
}
function getFirstCommand() {
  let scriptCache = CacheService.getScriptCache();
  const commandArray = JSON.parse(scriptCache.get('commands'));
  // Logger.log(commandArray);
  return commandArray[0];
}
function putChangedCommand(command) {
  let userCache = CacheService.getUserCache();
  userCache.put("command", command, 21600);
}
function showSidebar() {
  let html = HtmlService.createTemplateFromFile('main');
  let htmlOutput = html.evaluate().setTitle('New Sidebar');
  SpreadsheetApp.getUi().showSidebar(htmlOutput);
}
function getCommand() {
  let userCache = CacheService.getUserCache();
  cachedCommand = userCache.get("command");
  if (cachedCommand == null) {
    cachedCommand = getFirstCommand();
    userCache.put("command", cachedCommand, 21600);
  }
  return cachedCommand;
}
function exportCSV() {
  saveUuid();
  let userCache = CacheService.getUserCache();
  let cachedUuid = userCache.get("uuid");
  saveCommands();
  let storedCommand = getCommand();

  let spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = SpreadsheetApp.getActiveSheet();
  let spreadsheetId = spreadsheet.getId();
  let sheetId = sheet.getSheetId();
  if (sheetId == sheetId.toFixed()) {
    sheetId = sheetId.toFixed();
  }
  let formData = {
    'uuid': cachedUuid,
    'command': storedCommand,
    'spreadsheetId': spreadsheetId,
    'sheetId': sheetId,
    'testdata': "this does not include the spreadsheet content"
  };
  let options = {
    'method' : 'post',
    'payload' : formData
  };
  let response = UrlFetchApp.fetch('https://httpbin.org/post', options);
  return response.getContentText();
}
function optionChanged(value) {
  putChangedCommand(value);
  showSidebar();
  // let ui = SpreadsheetApp.getUi();
  // ui.prompt(value);
}