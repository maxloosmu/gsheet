

# How to Use the Legal Spreadsheet?

*Version: BabyLegalSSv0.9.1.0 -- 11 Mar 2022*

Legal Spreadsheet Logo IMAGE

**Company Name**

## Content

- [About the Legal Spreadsheet](#about)
- [Setup](#Setup)
- [Keywords](#key-functions)
- [Appendix A - Glossary](#glossary)
- [Appendix B - Trademarks](#trademarks)

## About the Legal Spreadsheet<a name="about" />

The Legal Spreadsheet helps users to automate their legal writing.

## Setup

Users must have these setups to access the Legal Spreadsheet and use its keyword functions.

### Signup

Users must first [sign up](https://support.google.com/accounts/answer/27441?hl=en) for a Google:tm: Account.

### Signin and Access

<ol>
  <li>Users must <a href="https://myaccount.google.com">sign in</a> to their Google:tm: Account.</li>
  <li><a href="https://support.google.com/drive/answer/2423485?hl=en">Access Google:tm: Drive.</a></li>
  <li>Access the Legal Spreadsheet in the Google:tm: Drive.</li>
</ol>

### Setting

These settings are done in the Legal Spreadsheet Google Sheet to enable the keyword functions.

<ol>
  <li>Click on "Extensions" in the header and select "Apps Script".</li>
  <img src="images/AppsScript.png" alt="Apps Script" width="300">
  <li>Select "Triggers" and select "Add Trigger".</li>
  <img src="images/Triggers.png" alt="Triggers" width="300">
  <li>Select "onChange" for "Choose which function to run".</li>
  <li>Select "On change" for "Select event type".</li>
  <li>Click the "Save" button.</li>
  <img src="images/SelectOnChange.png" alt="Select onChange" width="300">
  <li>Select back to the Legal Spreadsheet "BabyLegalSS".</li>
  <img src="images/BabyLegalSS.png" alt="BabyLegalSS">
</ol>

## Keywords<a name="key-functions" />

### Single Cell Keywords

| **Type the Keyword** | **Google Sheet Will Output This Layout** |
| --- | --- |
| AND | ![type AND in a cell in the Legal Spreadsheet](images/AND.png) |
| OR | ![type OR in a cell in the Legal Spreadsheet](images/OR.png) |
| EVERY | ![type EVERY in a cell in the Legal Spreadsheet](images/EVERY.png) |
| IF | ![type IF in a cell in the Legal Spreadsheet](images/IF.png) |
| WHEN | ![type WHEN in a cell in the Legal Spreadsheet](images/WHEN.png) |
| MEANS<sup>[1](#footnote1)</sup> | ![type MEANS in a cell in the Legal Spreadsheet](images/MEANS.png) |
| IS<sup>[1](#footnote1)</sup> | ![type IS in a cell in the Legal Spreadsheet](images/IS.png) |
| IT IS<sup>[1](#footnote1)</sup> | ![type IT IS in a cell in the Legal Spreadsheet](images/ITIS.png) |

<a name="footnote1">1</a>: MEANS, IS and IT IS starts a constitutive rule.

### Keyword Cell Sequences

| **Type these keywords** | **Possible layouts of these keywords** |
| --- | --- |
| IF, OR, AND<sup>[2](#footnote2)</sup> | ![type IF, OR, AND in the Legal Spreadsheet](images/IFORAND.png) |
| IF, IF, OR, AND<sup>[2](#footnote2)</sup> | ![type IF, OR, AND in the Legal Spreadsheet](images/IFIFORAND.png) |

<a name="footnote2">2</a>: The logic formula is at the top left outlined in red.  The cell referred to is outlined in blue.

## Appendix A - Glossary<a name="glossary" />

| **Term** | **Explanation** |
| --- | --- |
| Constitutive rules | Rules that make possible new forms of behavior. |

## Appendix B - Trademarks<a name="trademarks" />

Google:tm: is a registered trademark of Google Inc.
