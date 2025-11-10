import { Given, When, Then } from "@cucumber/cucumber";
import InvoiceMatchingTolerancePage from "../../pages/invoiceMatchingTolerance.page";
import { fixture } from "../../hooks/pageFixture";

let invoicePage: InvoiceMatchingTolerancePage;

When('select  Invoice Matching Tolerance module from the system settings menu', async () => {
  invoicePage = new InvoiceMatchingTolerancePage(fixture.page);
  await invoicePage.clickOnInvoiceMatchingMenu();
});

Then('Edit Freight Max Limitation and click on save', async () => {
  await invoicePage.editFreightMaxLimitation();
});

When('Reset Freight Max Limitation to previous value - 10000 and save', async () => {
  await invoicePage.resetFreightMaxLimitationTo('10000');
});


Then('verify all the fields are empty on clicking reset button', async () => {
  await invoicePage.clickResetAndVerifyFieldsEmpty();
});

Then('Verify action log functionality in Invoice Matching Tolerance module', async () => {
  await invoicePage.verifyActionLog();
});
