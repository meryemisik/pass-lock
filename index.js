const dummyWordList = require("./data");

function validateNumber(input, defaultValue, paramName) {
  if (typeof input === 'string') {
    const parsedValue = parseInt(input);
    if (!isNaN(parsedValue)) {
      return parsedValue;
    } else {
      console.warn(`Warning: The '${paramName}' parameter is not a valid number. Using the default value of ${defaultValue}.`);
      return defaultValue;
    }
  } else if (typeof input !== 'number') {
    console.warn(`Warning: The '${paramName}' parameter should be a number. Using the default value of ${defaultValue}.`);
    return defaultValue;
  }
  return input;
}

function generatePassword(charset, length, capitalize) {
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset.charAt(randomIndex);
  }
  if (capitalize) {
    password = password.charAt(0).toUpperCase() + password.slice(1);
  }
  return password;
}

function generateSinglePassword(payload) {
  if (typeof payload.length === 'string') {
    const parsedLength = parseInt(payload.length);

    if (!isNaN(parsedLength)) {
      payload.length = parsedLength;
    } else {
      console.warn("Warning: The 'length' parameter is not a valid number. Using the default length of 8.");
      payload.length = 8;
    }
  } else if (typeof payload.length !== 'number') {
    console.warn("Warning: The 'length' parameter should be a number. Using the default length of 8.");
    payload.length = 8;
  }
  let wordList = payload.customWordList || dummyWordList;

  if (payload.lowercase) {
    wordList = wordList.map(word => word.toLowerCase());
  }
  if (payload.uppercase) {
    wordList = wordList.map(word => word.toUpperCase());
  }
  if (payload.capitalize) {
    wordList = wordList.map(word => word.charAt(0).toUpperCase() + word.slice(1));
  }
  let password = "";
  for (let i = 0; i < payload.length; i++) {
    const randomIndex = Math.floor(Math.random() * wordList.length);
    password += wordList[randomIndex];
    if (i < payload.length - 1) {
      password += "-"
    }
  }
  return password;
}



const generator = {
  number(payload) {
    const length = payload && payload.length ? validateNumber(payload.length, 8, 'length') : 8;
    const charset = payload && payload.specificDigits ? payload.specificDigits : '0123456789';
    if (payload && (payload.quantity === 1 || payload.quantity === undefined)) {
      return generatePassword(charset, length, false);
    } else {
      const passwords = [];
      for (let i = 0; i < (payload && payload.quantity ? payload.quantity : 1); i++) {
        passwords.push(generatePassword(charset, length, false));
      }
      return passwords.length === 1 ? passwords[0] : passwords;
    }
  }
  ,

  memorable(payload) {
    if (!payload) {
      payload = { length: 4 };
    }

    const quantity = 1;
    if (payload && payload.quantity) {
      quantity = payload.quantity
    }
    if (quantity === 1) {
      if (!payload.length) {
        payload.length = 3;
      } else if (typeof payload.length === 'string') {
        const parsedLength = parseInt(payload.length);
        if (!isNaN(parsedLength)) {
          payload.length = parsedLength;
        } else {
          console.warn("Warning: The 'length' parameter is not a valid number. Using the default length of 3.");
          payload.length = 3;
        }
      } else if (typeof payload.length !== 'number') {
        console.warn("Warning: The 'length' parameter should be a number. Using the default length of 3.");
        payload.length = 3;
      }

      let wordList = payload.customWordList || dummyWordList;

      if (payload.lowercase) {
        wordList = wordList.map(word => word.toLowerCase());
      }
      if (payload.uppercase) {
        wordList = wordList.map(word => word.toUpperCase());
      }
      if (payload.uppercase && payload.lowercase) {
        throw new Error("You can't enable both uppercase and lowercase at the same time.");
      }
      if (payload.capitalize) {
        wordList = wordList.map(word => word.charAt(0).toUpperCase() + word.slice(1));
      }

      let password = "";
      for (let i = 0; i < payload.length; i++) {
        const randomIndex = Math.floor(Math.random() * wordList.length);
        password += wordList[randomIndex];
        if (i < payload.length - 1) {
          password += "-";
        }
      }
      return password;
    } else {
      const passwords = [];
      for (let j = 0; j < quantity; j++) {
        passwords.push(generateSinglePassword(payload));
      }
      return passwords;
    }
  }
  ,

  password(options = {
    length: 8,
    uppercase: true,
    lowercase: true,
    numbers: true,
    symbols: true,
    capitalize: true,
    quantity: 1
  }) {
    const characterSets = {
      uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
      lowercase: 'abcdefghijklmnopqrstuvwxyz',
      numbers: '0123456789',
      symbols: '!@#$%^&*()_+[]{}|;:,.<>?'
    };

    if(options.length <1 || options.length === undefined){
      options.length = 8
    }
    let allowedChars = '';

    if (options.uppercase) allowedChars += characterSets.uppercase;
    if (options.lowercase) allowedChars += characterSets.lowercase;
    if (options.numbers) allowedChars += characterSets.numbers;
    
    if (options.symbols != true){ allowedChars += options.symbols }
    else{ allowedChars += characterSets.symbols }



    if (!allowedChars) {
      allowedChars += characterSets.uppercase;
      allowedChars += characterSets.lowercase;
      allowedChars += characterSets.numbers;
      allowedChars += characterSets.symbols;

    }

    console.log('sembol',characterSets.symbols )

    if (options && (options.quantity === 1 || options.quantity === undefined)) {
      return generatePassword(allowedChars, options.length, options.capitalize);
    } else {
      const passwords = [];
      for (let i = 0; i < (options && options.quantity ? options.quantity : 1); i++) {
        passwords.push(generatePassword(allowedChars, options.length, options.capitalize));
      }
      return passwords.length === 1 ? passwords[0] : passwords;
    }
  }
};

module.exports = generator;
