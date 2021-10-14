function myFunction() {
  
}

function sayHelloBrowser() {
  // Declare a string literal variable.
  var greeting = 'Hello world!';
  // Display a message dialog with the greeting 
//(visible from the containing spreadsheet).
  Browser.msgBox(greeting);
}

/** 
 * @customfunction
 */
function sayHelloAlert() {
  // Declare a string literal variable.
  let greeting = 'Hello world!',
      ui = SpreadsheetApp.getUi();
  // Display a message dialog with the greeting 
  //(visible from the containing spreadsheet).
  // Older versions of Sheets used the Browser.msgBox()
  ui.alert(greeting);
}

function helloDocument() {
  var greeting = 'Hello world!';
  // Create DocumentApp instance.
  var doc = 
    DocumentApp.create('test_DocumentApp');
  // Write the greeting to a Google document.
  doc.setText(greeting);
  // Close the newly created document
  doc.saveAndClose();  
}

function helloLogger() {
  var greeting = 'Hello world!';
  //Write the greeting to a logging window.
  // This is visible from the script editor
  //   window menu "View->Logs...".
  Logger.log(greeting);  
}

/** 
 * @customfunction
 */
function helloCell() {
  return 'Hello world!';
}

function helloSpreadsheet() {
  var greeting = 'Hello world!',
      sheet = SpreadsheetApp.getActiveSheet();
  // Post the greeting variable value to cell A1
  // of the active sheet in the containing 
  //  spreadsheet.
  sheet.getRange('A1').setValue(greeting);
  // Using the LanguageApp write the 
  //  greeting to cell:
  // A2 in Spanish, 
  //  cell A3 in German, 
  //  and cell A4 in French.
  sheet.getRange('A2')
        .setValue(LanguageApp.translate(
                  greeting, 'en', 'es'));
  sheet.getRange('A3')
        .setValue(LanguageApp.translate(
                  greeting, 'en', 'de'));
  sheet.getRange('A4')
         .setValue(LanguageApp.translate(
                   greeting, 'en', 'fr'));
}

/**
* Simple function that cannot be called from
* the spreadsheet as a user-defined function
* because it sets a spreadsheet property.
*
* @param {String} rangeAddress
* @return {undefined}
*/
function setRangeFontBold (rangeAddress) {
  var sheet = SpreadsheetApp.getActiveSheet();
  sheet.getRange(rangeAddress).setFontWeight('bold');
}

// Code Example 3.2
/**
* A function that demonstrates that function "setRangeFontBold()
* is valid although it cannot be called as a user-defined function.
*
* @return {undefined}
*/
function call_setCellFontBold () {
  var ui = SpreadsheetApp.getUi(),
      response = ui.prompt(
                    'Set Range Font Bold', 
                    'Provide a range address',
                    ui.ButtonSet.OK_CANCEL),
      rangeAddress = response.getResponseText();
  setRangeFontBold(rangeAddress);
}

/**
 * Function to demonstrate how to check
 * the number and types of passed arguments.
 * 
 * 
 * @return {undefined}
 */
function testFunc(arg1, arg2) {
  var i;
  Logger.log('Number of arguments given: ' + 
              arguments.length);
  Logger.log('Number of arguments expected: ' + 
              testFunc.length);
  for (i = 0; i< arguments.length; i += 1) {
    Logger.log('The type of argument number ' + 
               (i + 1) + ' is ' + 
                      typeof arguments[i]);
  }
}
/**
 * Function that calls "testFunc()"
 * twice with different argument types
 * and different argument counts.
 * 
 * @return {undefined}
 */
 function call_testFunc() {
  Logger.log('First Invocation:');
  testFunc('arg1', 2);
  Logger.log('Second Invocation:');
  testFunc('arg1', 2, 'arg3', false, new Date(), null, undefined);
}

// Function that is expected
// to add numbers but will also
// "add" strings.
function adder(a, b) {
  return a + b;
}
// Test "adder()" with numeric arguments
// and with one numeric and one string
// argument.
function run_adder() {
  Logger.log(adder(1, 2));
  Logger.log(adder('cat', 1));
}

// Function that checks that
// both arguments are of type number.
// Throws an error if this is not true.
function adder(a, b) {
  if (!(typeof a === 'number' && 
        typeof b === 'number')) {
    throw TypeError(
          'TypeError: Both arguments must be numeric!');
  }
  return a + b;
}

// Test "adder()" with numeric arguments
// Thrown error is caught, see logger.
function run_adder() {
  Logger.log(adder(1, 2));
  try {
    Logger.log(adder(2, 3));
  } catch (error) {
    Logger.log(error.message);
  }
  try {
    Logger.log(adder('cat', 1));
  } catch (error) {
    Logger.log(error.message);
  }
}

/**
 * Print all string properties to the 
 *  Script Editor Logger
 * @return {undefined}
 */
function printStringMethods() {
  var strMethods = 
    Object.getOwnPropertyNames(String.prototype);
  Logger.log('String has ' +
              strMethods.length +
             ' properties.');
  Logger.log(strMethods.sort().join('\n'));
}

/** Concatenate cell values from
* an input range.
* Single quotes around concatenated 
* elements are optional.
* 
* @param {String[]} inputFromRng
* @param {String} concatStr
* @param {Boolean} addSingleQuotes
* @return {String}
* @customfunction
*/
function CONCATRANGE(inputFromRng, concatStr,
                    addSingleQuotes) {
  var cellValues;
  if (addSingleQuotes) {
    cellValues = 
      inputFromRng.map(
        function (element) {
          return "'" + element + "'";
        });
    return cellValues.join(concatStr);
 }
   return inputFromRng.join(concatStr);
}

/**
 * Return the ID of the active
 *  spreadsheet.
 * 
 * @return {String}
 * @customfunction
 */
function GETSPREADSHEETID() {
  return SpreadsheetApp
    .getActiveSpreadsheet().getId();
}
/**
 Return the URL of the active
 *  spreadsheet.
 * 
 * @return {String}
 * @customfunction
 */
function GETSPREADSHEETURL() {
  return SpreadsheetApp
    .getActiveSpreadsheet().getUrl();
}
/**
  Return the owner of the active
 *  spreadsheet.
 * 
 * @return {String}
 * @customfunction
 */
function GETSPREADSHEETOWNER() {
  return SpreadsheetApp
    .getActiveSpreadsheet().getOwner();
}
/**
 Return the viewers of the active
 *  spreadsheet.
 * 
 * @return {String}
 * @customfunction
 */
function GETSPREADSHEETVIEWERS() {
  var ss = 
    SpreadsheetApp.getActiveSpreadsheet();
  return ss.getViewers().join(', ');
}
/**
 Return the locale of the active
 *  spreadsheet.
 * 
 * @return {String}
 * @customfunction
 */
function GETSPREADSHEETLOCALE() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  return ss.getSpreadsheetLocale();
}

/**
 * Return French version
 * of English input.
 * 
 * @param {String} input
 * @return {String}
 * @customfunction
 */
function ENGLISHTOFRENCH(input) {
  return LanguageApp
    .translate(input, 'en', 'fr');
}

// Extract an array of all the property names 
//  defined for Spreadsheet and write them to
//  column A of the active sheet in the active
//   spreadsheet.
function testSpreadsheet () {
  var ss = 
     SpreadsheetApp.getActiveSpreadsheet(),
      sh = ss.getActiveSheet(),
      i,
      spreadsheetProperties = [],
      outputRngStart = sh.getRange('B8');
  sh.getRange('B7')
    .setValue('spreadsheet_properties');
  sh.getRange('B7')
    .setFontWeight('bold');
  /* spreadsheetProperties = 
    ss.getProperties();
  for (i = 0; 
       i < spreadsheetProperties.length;
       i += 1) {
    outputRngStart.offset(i, 0)
       .setValue(spreadsheetProperties[i]);
  } */
  // https://stackoverflow.com/questions/25722682/iterate-over-an-object-in-google-apps-script
  for (const [key, value] of Object.entries(ss)) {
    Logger.log(`${key}: ${value}`);
  }
  var keys = [];
  for(var k in Object) keys.push(k+':'+Object[k]);
  Logger.log("total " + keys.length + "\n" + keys.join('\n'));

  // Logger.log(Object.getProperties());
}


