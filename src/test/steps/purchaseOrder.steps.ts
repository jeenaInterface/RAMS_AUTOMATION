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

