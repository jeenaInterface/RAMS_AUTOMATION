
import { getRandomInt } from './randomGenerator';


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
// No CommonJS export here
export { randomValuePhone, randomValuePasscode, randomName };

//create a function to generate random email
function generateRandomEmail() {
    const domains = ['example.com', 'test.com', 'demo.com', 'sample.com'];
    const randomString = Math.random().toString(36).substring(2, 10); // Generate a random string
    const randomDomain = domains[getRandomInt(0, domains.length - 1)];
  
    return `${randomString}@${randomDomain}`;
  }
  
const randomEmail = generateRandomEmail();
// No CommonJS export here
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
// No CommonJS export here
export { randomtext };

// create a function to generate random website URLs
function generateRandomWebsite(): string {
  const domains = ['example.com', 'test.com', 'demo.com', 'sample.com', 'vendor.io', 'suppliers.net'];
  const name = Math.random().toString(36).substring(2, 9);
  const domain = domains[getRandomInt(0, domains.length - 1)];
  // return a full URL with protocol
  return `https://${name}.${domain}`;
}

const randomWebsite = generateRandomWebsite();
export { randomWebsite };

// create a function to get current date in format YYYY-Mmm-DD e.g., 2025-Oct-16
function getCurrentDate(): string {
    const date = new Date();
    const year = date.getFullYear();
    const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    const monthName = months[date.getMonth()];
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${monthName}-${day}`;
}

export { getCurrentDate as currentDate };
