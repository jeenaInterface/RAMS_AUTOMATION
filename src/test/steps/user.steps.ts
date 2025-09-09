import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import UserPage from '../../pages/user.page';
import { fixture } from "../../hooks/pageFixture";


let user: UserPage;
When('select user from the system settings menu', async () => {
  user = new UserPage(fixture.page);
  await user.clickOnUserMenu();
});


When('Click on the add button', async () => {
  await user.clickOnCreateButton();
});
When('Enter all the fields', async () => {
  await user.fillUserForm();
});

When('Click on the save button', async () => {
  await user.submit();
});
Then('Verify the user is created in the user list', async () => {
  await user.searchUserId();

});
Then('Verify edit functioanlity', async () => {
  await user.ClickOneditButton();

});
Then('Verify action Log', async () => {
  await user.verifyActionlog();

});
