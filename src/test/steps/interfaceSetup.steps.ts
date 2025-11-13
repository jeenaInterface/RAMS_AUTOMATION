import { Given, When, Then } from "@cucumber/cucumber";
import InterfaceSetupPage from "../../pages/interfaceSetup.page";
import { fixture } from "../../hooks/pageFixture";

let interfacePage: InterfaceSetupPage;

When('the user navigates to the Interface Setup module from the system settings menu', async () => {
  interfacePage = new InterfaceSetupPage(fixture.page);
  await interfacePage.clickOnInterfaceSetupMenu();
});

When('creates and configures a Default Repair Location', async () => {
  await interfacePage.createRepairLocation();
});
When('Edit the created Repair Location', async () => {
  await interfacePage.EditRepairLocation();
});

When('deletes the created Repair Location', async () => {
  await interfacePage.deleteRepairLocation();
});

When('adds a test URL and verifies the test connection functionality', async () => {
  await interfacePage.testConnection();
  // verify that some output was generated in the response textarea
  await interfacePage.verifyTestConnectionOutput();
});

Then('verifies the action log functionality in the Interface Setup module', async () => {
  await interfacePage.verifyActionLog();
});
