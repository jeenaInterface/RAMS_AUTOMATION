import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import TaxRatePage from '../../pages/systemSettings_taxRate.page';
import { fixture } from '../../hooks/pageFixture';

let taxRate: TaxRatePage;


When('the user navigates to the tax rate module from the system settings menu', async function () {
    taxRate = new TaxRatePage(fixture.page);
    await taxRate.navigateToTaxRateModule();
});

When('verify search functionalities in tax rate module', async function () {
    await taxRate.Search();
});
When('verify RESET functionalities in tax rate module', async function () {
    await taxRate.clickResetAndVerifyFieldsEmpty();
});

Then('create a new tax rate and verify it is displayed in the grid', async function () {
    await taxRate.clickCreate();
    await taxRate.enterTaxRateDetails();

});

Then('delete the created tax rate and verify it is removed from the grid', async function () {
    await taxRate.deleteTaxRate();
});

Then('verifies the action log functionality in the tax rate module', async function () {
    await taxRate.navigateToActionLog();
});