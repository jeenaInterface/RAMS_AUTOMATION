const { getRandomInt } = require('./randomGenerator');


function generateRandomPhoneNumber() {
    const areaCode = getRandomInt(123, 999); // Random area code between 123 and 999
    const prefix = getRandomInt(123, 999); // Random prefix between 123 and 999
    const lineNumber = getRandomInt(1000, 9999); // Random line number between 1000 and 9999
  
    return `(${areaCode}) ${prefix}-${lineNumber}`;
  }
  function generateRandomName() {
    const firstNames = ['John', 'Emma', 'Michael', 'Olivia', 'William', 'Ava', 'James', 'Sophia', 'Robert', 'Isabella'];
    const lastNames = ['Smith', 'Johnson', 'Brown', 'Jones', 'Williams', 'Davis', 'Miller', 'Garcia', 'Martinez', 'Rodriguez'];
  
    const randomFirstName = firstNames[getRandomInt(0, firstNames.length - 1)];
    const randomLastName = lastNames[getRandomInt(0, lastNames.length - 1)];
  
    return `${randomFirstName} ${randomLastName}`;
  }
  
const randomName = generateRandomName();
const randomValuePhone = generateRandomPhoneNumber();
const randomValuePasscode = getRandomInt(2222, 9999);
module.exports = {
    randomValuePhone,
    randomValuePasscode,
    randomName
};
export { randomValuePhone, randomValuePasscode, randomName };

//create a function to generate random email
function generateRandomEmail() {
    const domains = ['example.com', 'test.com', 'demo.com', 'sample.com'];
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
    const randomDomain = domains[getRandomInt(0, domains.length - 1)];
  
    return `${randomString}@${randomDomain}`;
  }
  
const randomEmail = generateRandomEmail();
module.exports = {
    randomEmail
};
export { randomEmail, getRandomInt };

//create a function to generate random text
function generateRandomText(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 ';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result.trim();
}

const randomtext = generateRandomText(20); // Generate random text of length 20
module.exports = {
    randomtext
};
export { randomtext };

//create a function to get current date in mm/dd/yyyy format
function getCurrentDate(): string {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
  
    return `${month}/${day}/${year}`;
  }
  
const currentDate = getCurrentDate();
module.exports = {
    currentDate
};
export { currentDate };

