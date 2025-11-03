import { Given, When, Then } from "@cucumber/cucumber";
import AddressPage from "../../pages/address.page";
import { fixture } from "../../hooks/pageFixture";

let addressPage: AddressPage;

When('select Address module from the system settings menu', async () => {
  addressPage = new AddressPage(fixture.page);
  await addressPage.clickOnAddressMenu();
});

Then('Edit ship tp addess and bill to address field', async () => {
  await addressPage.editShipAndBillAddresses();
});

When('Revert back the changes and save', async () => {
  await addressPage.revertChangesAndSave();
});

Then('Verify action log functionality in addess module', async () => {
  await addressPage.verifyActionLog();
});
