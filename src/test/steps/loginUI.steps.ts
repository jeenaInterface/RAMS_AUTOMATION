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

Then('user click on logout button', async function () {
  await login.logOutDropDownlist();
});
