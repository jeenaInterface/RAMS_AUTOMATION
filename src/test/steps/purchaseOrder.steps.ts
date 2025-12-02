import { Given, When, Then } from "@cucumber/cucumber";
import purchaseOrderPage from "../../pages/purchaseOrder.page";
import { fixture } from "../../hooks/pageFixture";

let purchasePage: purchaseOrderPage;

When('the admin navigates to the order creation menu', async () => {
    purchasePage = new purchaseOrderPage(fixture.page);
    await purchasePage.clickOnCreateOrderMenu();
});

When('enters all the required fields and clicks on the save button', async () => {
    await purchasePage.clickOnCreateOrderButton();
});
Then('the purchase order number is captured', async function (this: any) {
    let po = purchasePage.purchaseOrderNo || '';
    // Fallback: try reading the header directly from the current page
    if (!po) {
        const headerText = (await fixture.page.locator("(//span[@class='header-title font-size-title'])[1]").textContent()) || '';
        po = headerText.match(/\|\s*(\d+)\s*\(/)?.[1] || headerText.match(/(\d+)/)?.[1] || '';
    }
    // Attach PO number to Cucumber report so it appears in HTML report
    if (this && typeof this.attach === 'function') {
        await this.attach(`Purchase Order: ${po}`);
    } else {
        // Fallback logging
        fixture.logger?.info(`Purchase Order: ${po}`);
    }
});
When('the user searches for the newly created order in the inquiry list page', async () => {
    await purchasePage.clickOnInquireOrderMenu();
    await purchasePage.SearchPONumber();
});
When('updates the description, adds one more stock detail, and verifies the update is correct', async () => {
    await purchasePage.updatePurchaseOrder();
});
Then('verifies the value in the receive status field', async function (this: any) {
    let status = await purchasePage.receiveStatusValue() || '';

    if (this && typeof this.attach === 'function') {
        await this.attach(`Receive Status: ${status}`);
    } else {
        fixture.logger?.info(`Receive Status: ${status}`);
    }
});

Then('verifies the print functionality', async () => {
    await purchasePage.printButton();
});
Then('verifies the email functionality', async () => {
    await purchasePage.EmailButton();
});
Then('Verify Cancel functionality', async () => {
    await purchasePage.cancel();
});
Then('verifies the action log in the purchase order', async () => {
    await purchasePage.verifyActionLog();
});
Then('verifies the action log in the external purchase order', async () => {
    await purchasePage.verifyActionLogExternalRebuildOrder();
});
Then('select external rebuild option', async () => {
    await purchasePage.selectExternalRebuildOrder();
    await purchasePage.clickOnCreateExternalOrderButton();
});
Then('updates the description, adds one more stock detail in external rebuild order', async () => {
    await purchasePage.updateExternalPurchaseOrder();
});
Then('verifies the value in the receive status field in PO', async function (this: any) {

    let status = await purchasePage.receiveStatusValuepo() || '';

    if (this && typeof this.attach === 'function') {
        await this.attach(`Receive Status: ${status}`);
    } else {
        fixture.logger?.info(`Receive Status: ${status}`);
    }
});

Then('updates the description and verifies the update is correct', async () => {
    await purchasePage.UpdateInternalRebuildOrder();
});

Then('select internal rebuild option', async () => {
    await purchasePage.selectInternalRebuildOrder();
    await purchasePage.CreateOnInternalRebuildOrder();
});
Then('verifies the value in the receive status field in internal RO', async function (this: any) {
    let status = await purchasePage.receiveStatusValueInternalRO() || '';

    if (this && typeof this.attach === 'function') {
        await this.attach(`Receive Status: ${status}`);
    } else {
        fixture.logger?.info(`Receive Status: ${status}`);
    }
});
Then('verifies the action log in the Internal purchase order', async () => {
    await purchasePage.verifyActionLogInternalRebuildOrder();
});
Then('the admin navigates to the inquire order page', async () => {
    purchasePage = new purchaseOrderPage(fixture.page);
    await purchasePage.clickOnInquireOrderMenu();
});
Then('the admin searches for the orders created on the current date', async () => {
    await purchasePage.selectOrderDate();
});
Then('verifies that the search results display the orders created on the current date', async () => {
    await purchasePage.verifyOrdeDateResult();
});
Then('the admin searches by Order Request Date', async () => {
    await purchasePage.clickOnInquireOrderMenu();
    await purchasePage.selectRequestDate();
});
Then('verifies that the search results display based on the Order Request Date', async () => {
    await purchasePage.verifyRequestDateResult();
});
Then('the admin searches by Order Status', async () => {
    await purchasePage.clickOnInquireOrderMenu();
    await purchasePage.selectStatusForsEARCH();
});
Then('verifies that the search results display based on the Order Status', async () => {
    await purchasePage.VerifyStatusForsEARCH();
});

Then('the admin searches for an existing po by vendor {string}', async (vendor: string) => {
    await purchasePage.clickOnInquireOrderMenu();
    await purchasePage.searchPOByVendor(vendor);
});
Then('verifies that the PO search results display the correct vendor {string}', async (vendor: string) => {
    await purchasePage.verifySearchResultByVendor(vendor);
});

Then('the admin searches by Category', async () => {
    await purchasePage.clickOnInquireOrderMenu();
    await purchasePage.selectCategory();
});
Then('the admin searches by Receive Status', async () => {
    await purchasePage.clickOnInquireOrderMenu();
    await purchasePage.selectReceiveStatusForsEARCH();
});
Then('verifies that the search results display based on the Receive Status', async () => {
    await purchasePage.VerifyReceiveStatusForsEARCH();
});
Then('the admin searches by Matched Status', async () => {
    await purchasePage.clickOnInquireOrderMenu();
    await purchasePage.selectMatchStatusForsEARCH();
});
Then('verifies that the search results display based on the Matched Status', async () => {
    await purchasePage.VerifyMatchStatusForsEARCH();
});
Then('the admin searches by Order Type', async () => {
    await purchasePage.clickOnInquireOrderMenu();
    await purchasePage.TypeEARCH();
});
Then('verifies that the search results display based on the Order Type', async () => {
    await purchasePage.VerifyPOSEARCH();
});
Then('the admin searches by Shop', async () => {
    await purchasePage.clickOnInquireOrderMenu();
    await purchasePage.ShopSEARCH();
});
Then('verifies that the search results display based on the Shop', async () => {
    await purchasePage.VerifyShopSEARCH();
});
Then('enters all the required fields for approval and clicks on the save button', async () => {
    await purchasePage.clickOnCreateOrderHavingApproval();
});
Then('performs batch reject', async () => {
    await purchasePage.clickOnReject();
});
Then('Then verify the status', async function (this: any) {
    let status = await purchasePage.extractStatusFromHeader() || '';

    if (this && typeof this.attach === 'function') {
        await this.attach(`PO Status: ${status}`);
    } else {
        fixture.logger?.info(`PO Status: ${status}`);
    }
});
Then('performs batch approve', async () => {
    await purchasePage.clickOnApprove();
});
