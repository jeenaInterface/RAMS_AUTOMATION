import { Given, Then, When } from "@cucumber/cucumber";
import { fixture } from "../../hooks/pageFixture";
import loginPage from "../../pages/login.page";

let login: loginPage;

Given('User logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(process.env.userEmail);
  await login.enterPassword(process.env.userPassword);
  await login.clickLoginButton();
});
Given('the admin user is logged into the application', async function () {
  login = new loginPage(fixture.page);
  await login.navigateToLoginPage();
  await login.enterUserName(process.env.userEmail);
  await login.enterPassword(process.env.userPassword);
  await login.clickLoginButton();
});

Then('user click on logout button', async function () {
  await login.logOutDropDownlist();
});
When('the assigned user logs into the application', async () => {
  await login.enterUserName(process.env.mechEmail);
  await login.enterPassword(process.env.mechPassword);
  await login.clickLoginButtonMechanic();
});
When('the admin logs back into the application', async () => {
  await login.enterUserName(process.env.userEmail);
  await login.enterPassword(process.env.userPassword);
  await login.clickLoginButton();
});
