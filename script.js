// Assignment Code
var generateBtn = document.querySelector("#generate");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);

// code to ask for password requirements and randomly generate password
function generatePassword() {

  // variables
  let genPass = "";
  let passLength = -1;
  let useNumber = false;
  let useLower = false;
  let useUpper = false;
  let useSpecial = false; 
  let specialChars =  " !\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";
  let types = [];

  // ask for password lenght 8-128
  while (passLength === -1) {
    // Ask for password length(8-128))
    let num = prompt("Q 1/5: Enter length of password(number 8-128):");
    // check if user cancelled prompt, in this case exit with no password generated, empty string
    if (num === null) {
      return "";
    }
    
    // check if num variable is  a number
    if (!isNaN(num)) {
      // verify number is in range for password length (8-128)
      if (num >= 8 && num <= 128) {
        // good number and is in range
        passLength = num;
      }
    }
  }

  // ask: usenumber(s) in password?
  if (confirm("Q 2/5: use number(s) in password? (OK => yes, cancel => no)")) {
    useNumber = true;
    types.push("number");
  }

  // ask: use lower case chars in the password?
  if (confirm("Q 3/5: use lower case in password? (OK=>yes, cancel => no)")) {
    useLower = true;
    types.push("lower");
  }
  
  // ask: use uppper case chars in the password?
  if (confirm("Q 4/5: use upper case in password? (OK=>yes, cancel => no)")) {
    useUpper = true;
    types.push("upper");
  }
  
  // ask: use special chars in the password?
  if (confirm("Q 5/5: use special char(s) in password? (OK=>yes, cancel => no)")) {
    useSpecial = true;
    types.push("special");
  }

  if (types.length == 0) {
    // this is special case, user selected a valid number of chars for the password, 
    // but selected not types (number, lower, upeer, special) of chars to use
    // return empty string in this case.
    return "";
  }
    
  for (let i = 0; i < passLength; i++){
    //random for type
    let type = Math.floor(Math.random()*types.length); 

    // random for value type to use in nextchar for password 
    let value;
    switch (types[type]) {
      case "number":
        value = Math.floor(Math.random() * 10);
        break;
      
      case "lower":
        /* decomposing this line to explain.
         see ascci codes in this page : https://www.commfront.com/pages/ascii-chart
         I found that the lower case chars are one after another from 'a'=code(97) to 'z'=code(122)
         so use 'a' code as number and add a random number from 0-25 to get a char in the range 'a'-'z'
         for example:
          'a' code is 97
          floor(random() * 25) gives me a number 0-25
          add these two resuls and get a number from 97-122
          then convert again to char and assign that char to value
        */
        value = String.fromCharCode((('a'.charCodeAt(0) + Math.floor(Math.random() * 25))));
        break;
      
      case "upper":
        // this is the same as in lower, look at notes in lower above on how we created this line of code
        value = String.fromCharCode((('A'.charCodeAt(0) + Math.floor(Math.random() * 25))));
        break;
      
      case "special":
        /* there is a list of special character given in the link from the readme file at
           https://owasp.org/www-community/password-special-characters
           We just used that list as string and use a random number to access entries 
           in this list to assign to value.
           The random number goes from 0 to the lenght of the special char list
         */
        value = specialChars[Math.floor(Math.random() * specialChars.length)];
        break;
    }
    
    // add value generated to the password variable.
    // genPass will contain random values based on the user selected option of char types and length
    genPass += value;
  }

  // return generated password to present in the display
  return genPass;
}
