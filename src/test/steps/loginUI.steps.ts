import { Given, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import loginPage from "../../pages/login.page";

function getEnv(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Environment variable ${name} is required`);
  }
  return value;
}

let login: loginPage;

Given('User logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(getEnv('userEmail'));
  await login.enterPassword(getEnv('userPassword'));
  await login.clickLoginButton();
});
Given('the admin user is logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(getEnv('userEmail'));
  await login.enterPassword(getEnv('userPassword'));
  await login.clickLoginButton();
});
Given('the admin is logged into the application', async function () {
  await login.navigateToLoginPage();
  await login.enterUserName(getEnv('userEmail'));
  await login.enterPassword(getEnv('userPassword'));
  await login.clickLoginButton();
});

Then('user click on logout button', async function () {
  await login.logOutDropDownlist();
});
When('the assigned user logs into the application', async () => {
  await login.enterUserName(getEnv('mechEmail'));
  await login.enterPassword(getEnv('mechPassword'));
  await login.clickLoginButtonMechanic();
});
When('the admin logs back into the application', async () => {
  await login.enterUserName(getEnv('userEmail'));
  await login.enterPassword(getEnv('userPassword'));
  await login.clickLoginButton();
});
When('the lead mechanic user logs into the application', async () => {
    login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(getEnv('mechEmail'));
  await login.enterPassword(getEnv('mechPassword'));
  await login.clickLoginButtonMechanic();
});
When('the mechanic user logs into the application', async () => {
    login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(getEnv('mechEmail'));
  await login.enterPassword(getEnv('mechPassword'));
  await login.clickLoginButtonMechanic1();
});
Given('Logged in as MNR admin user', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(getEnv('mnrEmail'));
  await login.enterPassword(getEnv('mnrPassword'));
  await login.clickLoginButton();
});