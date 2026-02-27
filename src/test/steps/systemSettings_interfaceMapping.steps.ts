import { Given, When, Then } from "@cucumber/cucumber";
import interfaceMappingPage from "../../pages/systemSettings_interfaceMapping.page";
import { fixture } from "../../hooks/pageFixture";

let InterfacePage: interfaceMappingPage;

When('select  Interface Mapping module from the system settings menu', async () => {
  InterfacePage = new interfaceMappingPage(fixture.page);
  await InterfacePage.clickOninterfaceMenu();
});

Then('Select AR tab and click on create button to create new Interface Mapping and save', async () => {
  await InterfacePage.CreateAR();
});

When('verify created Interface Mapping is displayed in the grid', async () => {
  await InterfacePage.searchCode();
  // await InterfacePage.verifySearchResult();
});


Then('verify the edit functionality by selecting the created Interface Mapping', async () => {
  await InterfacePage.verifyEditFunctionality();
});

Then('verify the delete functionality by selecting the created Interface Mapping', async () => {
  await InterfacePage.verifyDeleteFunctionality();
});
Then('Verify action log functionality in Interface Mapping module - AR', async () => {
  await InterfacePage.verifyActionLog();
});

 Then('Select AP tab and click on create button to create new Interface Mapping and save', async () => {
  await InterfacePage.CreateAP();
});

When('verify created Interface Mapping is displayed in the grid -AP', async () => {
  await InterfacePage.searchCodeAP();
  // await InterfacePage.verifySearchResult();
});


Then('verify the edit functionality by selecting the created Interface Mapping - AP', async () => {
  await InterfacePage.verifyEditFunctionalityAP();
});

Then('verify the delete functionality by selecting the created Interface Mapping -AP', async () => {
  await InterfacePage.verifyDeleteFunctionalityAP();
});
Then('Verify action log functionality in Interface Mapping module - AP', async () => {
  await InterfacePage.verifyActionLogAP();
});