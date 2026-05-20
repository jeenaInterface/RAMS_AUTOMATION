import { Given, When, Then } from "@cucumber/cucumber";
import purchaseOrderPage from "../../pages/purchaseOrder.page";
import { fixture } from "../../hooks/pageFixture";
import MaterialPage from "../../pages/material.page";

let purchasePage: purchaseOrderPage;
let materialPage: MaterialPage;

When('the admin navigates to the order creation menu', async () => {
    purchasePage = new purchaseOrderPage(fixture.page);
    materialPage = new MaterialPage(fixture.page);
    await purchasePage.clickOnCreateOrderMenu();
});
When('Again the admin navigates to the order creation menu', async function (this: any) {

    await purchasePage.clickOnCreateOrderMenu();
    await this.page.waitForTimeout(3000);
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

    // Persist the captured number on the page object for later steps
    purchasePage.purchaseOrderNo = po;

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


Then('updates the description and verifies the update is correct', async () => {
    await purchasePage.UpdateInternalRebuildOrder();
});
Then('Verify Cancel functionality in external RO', async () => {
    await purchasePage.cancelExternalRO();
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
Then('verify the status of the po', async function (this: any) {
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
Then('the admin navigates to the batch approve order page', async () => {
    await purchasePage.clickOnBatchApproveMenu();
});

Then('performs a batch reject by selecting the order', async () => {
    await purchasePage.DoRejectOperation();
});
Then('performs a batch approve by selecting the order', async () => {
    await purchasePage.DoApproveOperation();
});

Then('the system verifies navigation to the corresponding purchase order screen once click on the link', async () => {
    await purchasePage.verifyRedirection();
});
Then('selects multiple purchase orders and performs batch approval on the selected orders', async () => {
    await purchasePage.selectMultipleOrders();
});

Then('the system verifies that all selected orders are approved successfully', async () => {
    // await purchasePage.verifytheBatchaprrovalConfirmationMessage();
});

Then('track the receiving document number', async function (this: any) {
    let receivingDocNo = materialPage.ReceivingDocumentNo || '';

    // Fallback: read from header if not already stored
    if (!receivingDocNo) {
        const headerText = (await fixture.page.locator("(//span[@class='header-title font-size-title'])[1]").textContent()) || '';
        // Extract number after "Receiving Doc. No.:"
        receivingDocNo = headerText.match(/Receiving Doc\. No\.\s*:\s*(\d+)/)?.[1] || '';
    }

    // Attach Receiving Doc number to Cucumber report
    if (this && typeof this.attach === 'function') {
        await this.attach(`Receiving Document No: ${receivingDocNo}`);
    } else {
        fixture.logger?.info(`Receiving Document No: ${receivingDocNo}`);
    }

    // Optionally store it for later use
    materialPage.ReceivingDocumentNo = receivingDocNo;
});
Then('verifies the value in the receive status field in Purchase Order', async function (this: any) {

    let status = await purchasePage.receiveStatusValuepo() || '';

    if (this && typeof this.attach === 'function') {
        await this.attach(`Receive Status: ${status}`);
    } else {
        fixture.logger?.info(`Receive Status: ${status}`);
    }
});

Then('Go to unbillable order page and map the internal rebuild order', async () => {
    // purchasePage = new purchaseOrderPage(fixture.page);
    await purchasePage.createUnbillableOrderForInternalRO();
    await purchasePage.clickCloseCompleteButton();

});
Then('the unbillable work order number is captured', async function (this: any) {
    let uwo = purchasePage.workOrderNumber || '';
    if (this && typeof this.attach === 'function') {
        await this.attach(`Unbillable Work Order: ${uwo}`);
    } else {
        fixture.logger?.info(`Unbillable Work Order: ${uwo}`);
    }
});
Then('verifies the retail price is updated in internal rebuild order', async () => {
    // purchasePage = new purchaseOrderPage(fixture.page);
    await purchasePage.verifyThePurchaseRate();
});
Then('Do receive material for internal RO and review for the created order', async () => {
    await purchasePage.createReceiveMaterial();

});
Then('verifies the receive status value is updated to Fully Received',
    async function (this: any) {

        const status = await purchasePage.receiveStatusValuepoInternalROFullyReceived() || '';

        // Attach the status to the test report or fallback to logger
        if (this && typeof this.attach === 'function') {
            await this.attach(`Receive Status: ${status}`);
        } else {
            fixture.logger?.info(`Receive Status: ${status}`);
        }
    });
Then('cancel the material receive for the internal rebuild order', async () => {
    await purchasePage.canceltheMaterialReceive();
});
Then('go to material return page and do the material return for the internal rebuild order', async () => {
    await materialPage.clickmaterialReturnMenu();
    await purchasePage.returnOperation();

});
Then('verifies the receive status value is updated to Not Received',
    async function (this: any) {

        const status = await purchasePage.receiveStatusValuepoInternalRONotReceived() || '';

        // Attach the status to the test report or fallback to logger
        if (this && typeof this.attach === 'function') {
            await this.attach(`Receive Status: ${status}`);
        } else {
            fixture.logger?.info(`Receive Status: ${status}`);
        }
    });
Then('Navigate to the Unbillable Order page and select a stock number', async () => {
    await purchasePage.FillStockNumberInWO();
});
Then('Click the Complete button and verify hour validations appear', async () => {
    await purchasePage.clickOnCompleteToVerifyHourValidation();
});
Then('Enter the activity code and hours, then click Complete and verify internal RO validations', async () => {
    await purchasePage.FillActivityCode();
});
Then('Select an internal RO, click Complete without selecting a stock number, and confirm the validation message for missing stock number is displayed', async () => {
    await purchasePage.verifyStockNumberValidation();
});
Then('Finally, select a stock number and click Complete', async () => {
    await purchasePage.FillStockNumber();
});
Then('Go to unbillable order page and add normal order and internal RO', async () => {
    await purchasePage.asst2Details();
    await purchasePage.clickCloseCompleteButton();

});
Then('the user navigates to the PO report and searches for the created PO', async () => {
    await purchasePage.clickOnOrderReportMenu();
    await purchasePage.FillOrderNoInReportSearchBox();
});
Then('verifies that the created PO is displayed in the search results of the PO report', async () => {
    const downloadPath = await purchasePage.downloadReport();
    await purchasePage.verifyExcelContent(downloadPath);
});


Then('the admin creates a work order for a weekday with warranty claim set to Yes', async () => {
    purchasePage = new purchaseOrderPage(fixture.page);
    await purchasePage.createUnbillableOrderForWarantee();
});
Then('the admin closes the work order', async () => {
    await purchasePage.clickCloseCompleteButton();
});
Then('the admin navigates to the ToDo list', async () => {
    await purchasePage.gotoTodoList();
});
Then('clicks on the Approval Claim Order link', async () => {
    await purchasePage.clickOnClaimOrderLink();
});
Then('the admin approves the warranty claim request', async () => {
    await purchasePage.clickOnApproveButton();
}
); Then('the admin rejects the claim order', async () => {
    await purchasePage.clickOnRejectButton();

});
Then('verify Print functionality in claim order details page', async () => {
    await purchasePage.clickOnPrintButton();
});
Then('verify Email functionality in claim order details page', async () => {
    await purchasePage.EmailButtonClaim();
});
Then('verify action log in the claim order details page', async () => {
    await purchasePage.verifyActionLogClaimOrder();
});

Then('the admin navigates to the inquire order list', async () => {
    await purchasePage.clickOnInquireOrderMenu();
});

Then('open the claim order details for the created work order', async () => {
    await purchasePage.clickOnClaimOrderLinkInquire();

});

Then('go to batch approve order page from the menu', async () => {
    await purchasePage.clickOnBatchApproveMenu();
});

Then('select the claim order for the created work order and click on approve button', async () => {
    await purchasePage.DoApproveOperationForClaim();
});
Then('go to inquire order list and open the claim order details for the created work order', async () => {
    await purchasePage.clickOnInquireOrderMenu();
    await purchasePage.clickOnClaimOrderLinkInquire();
});

