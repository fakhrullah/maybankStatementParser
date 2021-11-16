# Maybank statement parser

This will parse your Maybank statement to JSON or CSV.

> **Notes:** I use this on my Maybank current account (Akaun semasa) with monthtly statement file
> AND my account not that much active.
> If you have any problem, please open and issue, I will try to solve it.

## How to use

1. Download your statement PDF from Maybank.
2. Open the PDF file.
3. Copy all (<kbd>CTRL</kbd> + <kbd>A</kbd>)
4. Paste in new file. (Example: `/path_to_file/statement.txt`)
5. Then use command line by piping the content or use arguments

**Piping content**

```
cat /path_to_file/statement.txt | npx maybank-statement-parser
```

**Use `--file` aurguments**

```
npx maybank-statement-parser
```

## Other arguments

`--format=csv` or `--format=json`
Print output format in JSON or CSV. Default format csv will be print.

`--output='path_to_file/filename'`
Create file for the output instead of print it on terminal. File extension `.csv` or `.json` will be added depend on `--format` arguments.
Default is `.csv`.


## Using package

```javascript
const fs = require('fs');
const {parser} = require('maybank-statement-parser');

const fileContents = fs.readFileSync('maybank-statements-june.txt');
const maybankStatementData = parser(fileContents.toString());

console.log(maybankStatementData);
// [
//   {
//     account: {
//          ...
//     },
//     date: 2021-05-31T16:00:00.000Z,
//     type: 'brought-forward',
//     balance: 109450,
//     value: 0,
//     description: 'BEGINNING BALANCE',
//     moreDetail: []
//   },
//   {
//     account: {
//          ...
//     },
//     date: 2021-06-04T16:00:00.000Z,
//     type: 'income',
//     balance: 209450,
//     value: 100000,
//     description: 'TRANSFER TO A/C',
//     moreDetail: [ 'NAME OF D*', 'More detail' ]
//   },
//   {
//     account: {
//          ...
//     },
//     date: 2021-06-10T16:00:00.000Z,
//     type: 'income',
//     balance: 236450,
//     value: 27000,
//     description: 'TRANSFER TO A/C',
//     moreDetail: [ 'NAME OF D*', 'More detail' ]
//   },
// ]
```

## Known problems

* Only working with monthly statements file.
