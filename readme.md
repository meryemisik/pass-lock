# Password Generator

This is a JavaScript library for generating random passwords.

## Installation

```bash
  npm i pass-lock
```

## Import

```javascript
// ES6 Modules or TypeScript
import generator from 'pass-lock'

// CommanJS
const generator = require("pass-lock")
```




## Basic Usage For Create Password 

```javascript
var password = generator.password() 

// result: !mR$d61O
```

## Basic Usage For Create Memorable 

```javascript
var password = generator.memorable()

// result: churn-fable-urine-human
```

## Basic Usage For Create Number 

```javascript
var password = generator.number() 

// result: 48343074
```

<br><br>
## Options For Number

The following options can be passed to the options object for the number function in this library:

| Name              | Description                                           | Default Value |
|-------------------|-------------------------------------------------------|---------------|
| `length`          | An integer that specifies the password length.      | `8`           |
| `specificDigits`  | An array of specific digits to include in the password. | `null`        |
| `quantity`        | An integer that determines the number of passwords to generate. | `1` |

## Example

```javascript
var password = generator.number({ 
    length: 8, 
    quantity: 4, 
    specificDigits:[4,7,8,2] 
  }) 

// result: [ '42824882', '72484722', '28842287', '28478284' ]
```
```javascript
var password = generator.number({
    length: 6, 
    quantity: 5
  }) 

// result: [ '558343', '694994', '405494', '665645', '557931' ]
```
<br><br> 
## Options For Memorable

The following options can be passed to the options object for the memorable function in this library:

| Name              | Description                                           | Default Value |
|-------------------|-------------------------------------------------------|---------------|
| `length`          | An integer specifying the password length.            | `4`           |
| `customWordList`  | A boolean to include a custom word list in the password. | `null`        |
| `uppercase`       | A boolean or a string to specify the inclusion of uppercase characters. | `false` |
| `lowercase`       | A boolean to include lowercase characters in the password. | `true`      |
| `capitalize`      | A boolean to start the password with a capital letter. | `false` |
| `quantity`        | An integer to determine the number of passwords to generate. | `1`       |

## Example

```javascript
var password = generator.memorable({ 
    length: 6, 
    quantity:4, 
    uppercase: true 
  })    
/*
  result: [
              'NIGHT-VOTER-BEADY-MISER-WRYLY-CABAL',
              'CHOKE-CURRY-BLAME-ARSON-GRACE-SWORD',
              'GIANT-WAIVE-BUGGY-VAULT-FINCH-CRUSH',
              'JELLY-PRISM-WHICH-ALTER-SHARP-SPIED'
            ]
*/
```

```javascript
data = ['Sunshine', 'Mountain', 'Delicious', 'Butterfly', 'Adventure',
    'Serendipity', 'Harmony', 'Freedom', 'Vibrant', 'Tranquility']

var password = generator.memorable({
    length: 4,
    quantity: 5,
    capitalize: true,
    customWordList: data
})

/*   
  result: [
              'Butterfly-Tranquility-Freedom-Mountain',
              'Freedom-Mountain-Tranquility-Vibrant',
              'Tranquility-Sunshine-Butterfly-Mountain',
              'Adventure-Adventure-Butterfly-Sunshine',
              'Vibrant-Mountain-Freedom-Mountain'
            ]
*/
```

<br><br>
## Options For Password

The following options can be passed to the options object for the password function in this library:

| Name              | Description                                           | Default Value |
|-------------------|-------------------------------------------------------|---------------|
| `length`          | An integer specifying the password length.            | `8`           |
| `uppercase`       | A boolean or a string to specify the inclusion of uppercase characters. | `true` |
| `lowercase`       | A boolean to include lowercase characters in the password. | `true`      |
| `capitalize`      | A boolean to start the password with a capital letter. | `true` |
| `symbols`                | A boolean or a string to specify symbol to be included in the password. | `true` |
| `numbers`                | A boolean to indicate whether to include numbers in the password.    | `true`       |
| `quantity`        | An integer to determine the number of passwords to generate. | `1`       |

## Example

```javascript
var password = generator.password({
    length:10, 
    numbers: true, 
    symbols: true
  }) 

// result: [|43%:2&7>
```

```javascript
var password = generator.password({
    length:10, 
    numbers: true, 
    symbols: true, 
    quantity: 4, 
    uppercase: true
  }) 

// result: [ 'YD66]_SF;L', 'H$M>Z(+E!I', '(MI9R9>,[Z', 'PQ3;?)>C^^' ]
```

```javascript
var password = generator.password({
    length:10, 
    numbers: true, 
    symbols: '^+%', 
    quantity: 3
  })

// result: [ '34625^2548', '%^8910%0+0', '7+675%%430' ]
```


