import { Given, When, Then } from "@cucumber/cucumber";
import inventoryCountPage from "../../pages/inventoryCount.page";
import { fixture } from "../../hooks/pageFixture";
import * as fs from 'fs';

let inventoryCount: inventoryCountPage;

Given('the user selects the inventory count menu under material', async () => {
    inventoryCount = new inventoryCountPage(fixture.page);
    await inventoryCount.clickOnInventoryCountMenu();
});


When('clicks on the create button and fills in the warehouse and inventory count name', async () => {
    await inventoryCount.CreateInventoryCount();
});


Then('clicks on the inventory count ID', async () => {
    await inventoryCount.ClickinventoryCountID();
});
Then('the user verifies the search functionality using Stock No.', async () => {
    await inventoryCount.verifySearchResult();
});

Then('fills in the counting quantity and click on save', async () => {
    await inventoryCount.saveTheQuantity();
});
Then('verifies the transfer of material using the location under inventory count', async () => {
    await inventoryCount.VerifyCannotProceedValidation();
});
Then('verifies the adjust OH Quantity of material under inventory count', async () => {
    await inventoryCount.adjustOHQuantityMenuAfterSave();
});
Then('the user clicks on complete', async () => {
    await inventoryCount.clickOnComplete();
});
Then('verifies adjust OH Quantity after complete', async () => {
    await inventoryCount.adjustOHQuantityMenuAfterComplete();
});
Then('the user click on close button', async () => {
    await inventoryCount.clickOncloseButton();
});

Then('the user verifies the cancel functionality', async () => {
    await inventoryCount.clickOnInventoryCountMenu();
    await inventoryCount.CreateInventoryCount();
    await inventoryCount.ClickinventoryCountID();
    await inventoryCount.clickOnCancelButton();
});
Then('verifies the inventory count download functionality', async function () {
    const filePath = await inventoryCount.downloadReport();

    // Attach a clickable text or path to the report for users to access manually
    if (this.attach) {
        // Attach as plain text or as HTML link if supported
        const sharedFilePathText = `Report available at shared location: ${filePath}`;
        await this.attach(sharedFilePathText, 'text/plain');
    }
});

