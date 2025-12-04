import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import * as path from 'path';
import { fixture } from "../hooks/pageFixture";
import { table } from "console";

setDefaultTimeout(100 * 1000);

export default class PurchaseOrderPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public stockNo: string = '';
    public description: string = '';
    public purchaseOrderNo: string = '';
    public ReceivingDocumentNo: string = '';
    public receiveStatus: string = '    ;'

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }
    private Elements = {
        orderMenu: "//span[normalize-space()='Order']",
        createOrderMenu: "//span[normalize-space()='- Create Order']",
        inquireOrderMenu: "//span[normalize-space()='- Inquire Order']",
        BatchApproveOrder: "//span[normalize-space()='- Batch Approve Order']",
        createButton: "//span[normalize-space()='Create']",
        newButton: "//span[normalize-space(text())='New']",
        vendorSearchButtonOnPurchaseOrderForm: "(//div[@class='select-lookup']//i)[1]",
        SearchButtonOnPurchaseOrderForm: "(//button[@class='el-button el-button--primary']//span)[3]",
        link: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/a[1]",
        FOB: "(//input[@class='el-input__inner'])[3]",
        terms: "(//input[@placeholder='--Select One--'])[3]",
        shipvia: "(//input[@placeholder='--Select One--'])[4]",
        jobnumber: "(//input[@placeholder='--Input Text--'])[1]",
        instruction: "//textarea[@placeholder='--Input Text--']",
        vendorNo: "//div[@id='vendorPartNo']//input[@type='text']",
        retailPriceInput: "(//input[@type='text'])[18]",
        orderQuantity: "(//input[@type='text'])[19]",
        retailPriceInput2: "(//input[@type='text'])[30]",
        orderQuantity2: "(//input[@type='text'])[31]",
        retailPriceInput3: "(//input[@type='text'])[17]",
        orderQuantity3: "(//input[@type='text'])[18]",
        retailPriceInput4: "(//input[@type='text'])[29]",
        orderQuantity4: "(//input[@type='text'])[30]",
        productCode: "(//input[@placeholder='Select'])[1]",
        saveOnPurchaseOrderForm: "(//span[normalize-space()='Save'])[1]",
        successMessageOnPurchaseOrderForm: "//div[@class='el-message-box__message']//p[1]",
        okButtonpurchaceOrder: "(//span[contains(text(),'OK')])[6]",
        vendorCode: "(//input[@placeholder='--Input Text--'])[3]",
        LookUpVendorSearchButton: "(//span[contains(text(),'Search')])[2]",
        searchButton1: "(//span[contains(text(),'Search')])[1]",
        vendorSearchButton: "//i[@class='el-input__icon el-icon-search is-clickable']",
        vendorCode2: "(//input[@placeholder='--Input Text--'])[2]",
        headertitle: "(//span[@class='header-title font-size-title'])[1]",
        stockNumberSearch: "//div[@class='cell']//i[@class='el-input__icon el-icon-search is-clickable']",
        stockNumberSearchPopupfield: "(//label[normalize-space(text())='Stock No.']/following::input)[1]",
        lookUpMaterialSearch: "//div[@class='el-dialog__wrapper inquiryPurchaseOrder']//span[contains(text(),'Search')]",
        lookUpMaterlOk: "(//span[contains(text(),'OK')])[4]",
        lookUpMaterlOk1: "(//span[contains(text(),'OK')])[5]",
        orderNoSearchrESULT: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/div[1]/div[1]/div[1]/a[1]",
        purchaseOrderNoSearch: "(//label[normalize-space(text())='Order No.']/following::input)[1]",
        searchButton: "(//span[contains(text(),'Search')])[1]",
        stocknumberSearch: "(//label[normalize-space(text())='Stock No.']/following::input)[1]",
        stockSearch2: "(//i[@class='el-input__icon el-icon-search is-clickable'])[3]",
        searchButton2MaterialLookUp: "(//span[normalize-space()='Search'])[1]",
        stockDescription: "//table[@class='el-table__body']/tbody[1]/tr[2]/td[2]/div[1]/div[1]/input[1]",
        receiveStatusField: "(//input[@type='text'])[9]",
        receiveStatusiNTERNALroField: "//div[@class='el-form-item']//div[@class='el-input is-disabled']//input[@type='text']",
        receiveStatusPO: "(//input[@type='text'])[10]",
        printButton: "//span[normalize-space()='Print']",
        withCheckBox: "//span[@class='el-checkbox__inner']",
        printButtonOnPopUp: "//button[@class='el-button el-button--primary']//span[contains(text(),'Print')]",
        emailButton: "//div[@class='app-footer']//button[2]",
        emailButtonOnPopUp: "//div[@class='el-dialog el-dialog--small']//div[@class='el-dialog__body']//div//button[@type='button']",
        emailValidation: "//p[normalize-space()='Email is sent successfully']",
        cancelButton: "//div[@class='app-footer']//div//span[contains(text(),'Cancel')]",
        cancelReson: "(//textarea[@class='el-textarea__inner'])[2]",
        okCancel: "//div[@class='el-dialog el-dialog--small']//span[contains(text(),'OK')]",
        cancelMessage: "//p[contains(text(),'Cancel Order successfully and Order status is Canc')]",
        okUpdateButton: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",
        actionLog: "//button[contains(.,'Action Log')]",
        externalRebildOrderCheckBox: "(//span[@class='el-radio__inner'])[2]",
        operationSearch: "(//label[normalize-space(text())='Special Instructions']/following::input)[1]",
        operationSearchResult: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/div[1]/span[1]",
        headerTitleActionLog: "//span[@class='el-dialog__title'][normalize-space()='Action Log']",
        closeButton: "//body/div[@id='app']/div[@class='app-body']/div[@class='app-body-container']/div[@class='app-page']/div[@id='app-modal']/div[@class='el-dialog__wrapper']/div[@class='el-dialog el-dialog--full full-dialog']/div[@class='el-dialog__header']/button[@aria-label='Close']/i[1]",
        stockLocation2: "//table[@class='el-table__body']/tbody[1]/tr[2]/td[2]/div[1]/div[1]/input[1]",
        vendorPartNo: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[5]/div[3]/table[1]/tbody[1]/tr[2]/td[3]/div[1]/div[1]/input[1]",
        totalOrderQuantity: "//b[normalize-space()='10']",
        internalRebildOrderCheckBox: "(//span[@class='el-radio__inner'])[3]",
        shop: "(//input[@placeholder='--Select One--'])[1]",
        orderDate: "(//input[@placeholder='-- Select Date Range--'])[1]",
        vendorCodeLookUpVendor: "(//label[normalize-space(text())='Code']/following::input)[1]",
        OkButtonOnApproval: `//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]`,
        rejectButton: "//span[normalize-space(text())='Reject']",
        approveButton: "//span[normalize-space(text())='Approve']",
        rejectReason: "(//textarea[@rows='2'])[1]",
        rejectOKButton: "(//button[@class='el-button el-button--primary']//span)[1]",
        batchApproveMenu: "//span[normalize-space(text())='- Batch Approve Order']",
        batchRejectButton: "//span[normalize-space(text())='Batch Reject']",
        batchApproveButton: "//span[normalize-space()='Batch Approve']",
        RejectOkButton1: "//button[contains(@class,'el-button el-button--default el-button--primary')]",
        confirmButton: "//span[normalize-space()='Confirm']",
        receiveMaterial: "//span[normalize-space()='- Receive Material']",
        orderNoTextBox: "(//input[@rows='2'])[1]",
        RetrieveButton: "//span[normalize-space()='Retrieve']",
        receivingDate: "//div[@class='el-date-editor el-input el-date-editor--date']//input[@placeholder='--Input Text--']",
        packSlipNumber: "(//input[@placeholder='--Input Text--'])[2]",
        receiveQuantityInput: "(//input[@type='text'])[5]",
        masterCheckbox: "(//span[@class='el-radio__inner'])[1]",
        receivingDocumentNumber: "(//span[@class='header-title font-size-title'])[2]",
        totalOrderQuantoty: "//table[3]//tr[1]//td[2]//b[1]",
        totalOutStandingQuantity: "//table[3]//tr[2]//td[2]//b[1]",
        inquireMaterialReceive: "//span[normalize-space(text())='- Inquire Material Receiving']",
        receivingDocumentSearchBox: "(//label[normalize-space(text())='Receiving Doc. No.']/following::input)[1]",




    }
    async clickOnCreateOrderMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.orderMenu);
        await this.base.waitAndClick(this.Elements.createOrderMenu);
    }

    async clickOnInquireOrderMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.orderMenu);
        await this.base.waitAndClick(this.Elements.inquireOrderMenu);
    }
    async clickOnCreateOrderButton(): Promise<void> {

        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.vendorSearchButtonOnPurchaseOrderForm).click();
        await this.page.locator(this.Elements.vendorCode).fill('1000287');
        await this.page.locator(this.Elements.SearchButtonOnPurchaseOrderForm).click();
        // await this.page.locator(this.Elements.LookUpVendorOkButton).click();
        await await this.page.getByRole('button', { name: 'OK' }).click();
        await await this.page.locator('form').getByPlaceholder('--Select One--').nth(1).click();
        await await this.page.getByText('Power - Power Equipment Maintenance').click();
        await await this.page.locator(this.Elements.FOB).click();
        await await this.page.getByText('SHIPPING PT - Shipping Point').click();
        await await this.page.locator(this.Elements.terms).click();
        await await this.page.getByText('NET30 - Net 30 Days').click();
        await await this.page.locator(this.Elements.shipvia).click();
        await await this.page.getByText('BEST WAY - Best Available Shipping Option').click();
        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;
        const jobNumberLocator = this.page.locator(this.Elements.jobnumber);

        if (await jobNumberLocator.isVisible()) {
            await jobNumberLocator.fill(randomJobNumber);
        } else {
            console.log('Job number field is not visible, skipping fill.');
        }
        this.description = `Auto order ${randomJobNumber}`;
        await await this.page.locator(this.Elements.instruction).fill(this.description);
        // await await this.page.locator(this.Elements.createButton).click();
        await await this.page.locator(this.Elements.stockNumberSearch).click();
        await this.page.locator(this.Elements.stockNumberSearchPopupfield).fill('1008');
        await await this.page.locator(this.Elements.lookUpMaterialSearch).click();
        await await this.page.locator(this.Elements.lookUpMaterlOk).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.vendorNo).fill(randomJobNumber);
        await await this.page.locator(this.Elements.retailPriceInput).fill("10");
        const price = `${getRandomInt(1, 10)}`;
        // await newPage.locator(this.Elements.retailPriceInput).fill(price);
        // await fixture.page.waitForTimeout(500);
        // await newPage.locator(this.Elements.orderQuantity).fill(price);
        await await this.page.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').click();
        await await this.page.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').fill('10');
        await await this.page.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').click();
        await await this.page.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').fill('10');
        await await this.page.locator(this.Elements.productCode).click();
        await await this.page.getByText('OPX_AGV - Maintenance Parts - AGV').click();
        await fixture.page.waitForTimeout(1000);
        await await this.page.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.okButtonpurchaceOrder).click();
        const successMsg = await await this.page.locator(this.Elements.successMessageOnPurchaseOrderForm).textContent();
        fixture.logger?.info(`Purchase Order creation success message: ${successMsg}`);

        // Wait briefly and read the header text directly (same pattern as stockNo)
        await fixture.page.waitForTimeout(2000);
        const poHeaderText = (await fixture.page.locator(this.Elements.headertitle).textContent());
        if (poHeaderText && poHeaderText.includes('Purchase Order |')) {
            // Extract the number after "Purchase Order | "
            const match = poHeaderText.match(/Purchase Order\s*\|\s*(\d+)/);
            if (match && match[1]) {
                this.purchaseOrderNo = match[1];
                fixture.logger?.info(`Extracted Purchase Order number: ${this.purchaseOrderNo}`);
            }
        }

    }
    async SearchPONumber(): Promise<void> {
        await this.page.locator(this.Elements.purchaseOrderNoSearch).fill(this.purchaseOrderNo);
        // await this.page.locator(this.Elements.purchaseOrderNoSearch).fill("325865");
        await await this.page.locator(this.Elements.searchButton).click();
        await await this.page.locator(this.Elements.orderNoSearchrESULT).click();
        await fixture.page.waitForTimeout(1000);

    }
    async selectExternalRebuildOrder(): Promise<void> {
        await await this.page.locator(this.Elements.externalRebildOrderCheckBox).click();

    }
    async selectInternalRebuildOrder(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.internalRebildOrderCheckBox).click();

    }
    async updatePurchaseOrder(): Promise<void> {
        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;
        await fixture.page.waitForTimeout(500);

        const updatedDesc = `${this.description} - Updated ${currentDate}`;

        await this.page.locator(this.Elements.instruction).fill(updatedDesc);
        await await this.page.locator(this.Elements.createButton).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.stockDescription).fill(this.description);
        await this.page.getByRole('row', { name: '--Input Text or Look up--   --Select One--  --Select One--  Select  Select  Select  Select $0.00 0 ' }).locator('#vendorPartNo').getByRole('textbox').click();
        await this.page.getByRole('row', { name: '--Input Text or Look up--   --Select One--  --Select One--  Select  Select  Select  Select $0.00 0 ' }).locator('#vendorPartNo').getByRole('textbox').fill(this.description);
        await await this.page.locator(this.Elements.retailPriceInput2).click();
        await await this.page.locator(this.Elements.retailPriceInput2).fill("15");
        await await this.page.locator(this.Elements.orderQuantity2).click();
        await await this.page.locator(this.Elements.orderQuantity2).fill("5");
        await this.page.getByRole('row', { name: '--Input Text or Look up--   --Select One--  --Select One--  Select  Select  Select  Select $0.00 0 ' }).getByPlaceholder('Select', { exact: true }).first().click();
        await this.page.getByRole('listitem').filter({ hasText: 'OPX_BATTERY_EXCHANGE_STATION - Maintenance Parts - Battery Exchange Station' }).locator('span').click();

        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.okUpdateButton).click();


    }
    async receiveStatusValue(): Promise<string | null> {
        const locator = this.page.locator(this.Elements.receiveStatusField);

        await locator.waitFor({ state: 'visible', timeout: 5000 });

        // Get the value from the input field, not textContent
        this.receiveStatus = await locator.inputValue();
        return this.receiveStatus;
    }
    async receiveStatusValueInternalRO(): Promise<string | null> {
        const locator = this.page.locator(this.Elements.receiveStatusiNTERNALroField);

        await locator.waitFor({ state: 'visible', timeout: 5000 });

        // Get the value from the input field, not textContent
        this.receiveStatus = await locator.inputValue();
        return this.receiveStatus;
    }
    async totalOrderQuantity(): Promise<string | null> {
        const orderQuantity = this.page.locator(this.Elements.totalOrderQuantity);
        const totalOutStandingQuantity = this.page.locator(this.Elements.totalOutStandingQuantity);

        // Wait for both elements to be visible before getting their content
        await orderQuantity.waitFor({ state: 'visible', timeout: 5000 });
        await totalOutStandingQuantity.waitFor({ state: 'visible', timeout: 5000 });

        const orderQty = await orderQuantity.textContent();
        const outStandingQty = await totalOutStandingQuantity.textContent();

        fixture.logger?.info(`Total Order Quantity: ${orderQty}`);
        fixture.logger?.info(`Total Outstanding Quantity: ${outStandingQty}`);

        // You can add a check here if you want to log or handle the zero state explicitly
        if (outStandingQty === '0' || outStandingQty === '0.0' || outStandingQty?.trim() === '0') {
            fixture.logger?.info('Full quantity received; outstanding quantity is zero.');
        }

        // Return the outstanding quantity as fetched
        return outStandingQty;
    }
    async receiveStatusValuepo(): Promise<string | null> {
        await fixture.page.waitForTimeout(500);
        const locator = this.page.locator(this.Elements.receiveStatusPO);

        await locator.waitFor({ state: 'visible', timeout: 5000 });

        // Get the value from the input field, not textContent
        this.receiveStatus = await locator.inputValue();
        return this.receiveStatus;
    }
    async printButton(): Promise<void> {
        // Click initial print button
        await this.page.locator(this.Elements.printButton).click();
        await this.page.locator(this.Elements.withCheckBox).click();

        // Wait for the new page (tab) to open upon clicking the print button on popup
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.locator(this.Elements.printButtonOnPopUp).click(),
        ]);

        await newPage.waitForLoadState();

        // Verify URL contains 'pdf/view'
        if (!newPage.url().includes('pdf/view')) {
            throw new Error(`Unexpected URL opened: ${newPage.url()}`);
        }

        // Optionally: Close the new tab or keep it open for further checks
        await newPage.close();
    }
    async EmailButton(): Promise<void> {
        // Click the initial email button
        await this.page.locator(this.Elements.emailButton).click();

        // Click the email button on the popup
        await this.page.locator(this.Elements.emailButtonOnPopUp).click();

        // Capture the email validation message
        const emailMessage = await this.page.locator(this.Elements.emailValidation).textContent();

        // Verify the message contains the expected success text
        if (!emailMessage || !emailMessage.includes('Email is sent successfully')) {
            throw new Error(`Email success message not found. Actual message: "${emailMessage}"`);
        }

        // Optionally, you can log success or continue your flow
        console.log('Email sent confirmation message verified.');
        await await this.page.locator(this.Elements.okUpdateButton).click();
    }
    async cancel(): Promise<void> {
        await this.page.locator(this.Elements.cancelButton).click();
        await this.page.locator('form').filter({ hasText: 'Cancel Reason' }).getByPlaceholder('--Input Text--').click();
        await this.page.locator('form').filter({ hasText: 'Cancel Reason' }).getByPlaceholder('--Input Text--').fill('cancel');
        // await this.page.locator(this.Elements.cancelReson).fill(this.description);
        await await this.page.locator(this.Elements.okCancel).click();
        // Capture the email validation message
        const cancelMessage = await this.page.locator(this.Elements.cancelMessage).textContent();

        // Verify the message contains the expected success text
        if (!cancelMessage || !cancelMessage.includes('Cancel Order successfully and Order status is Cancelled.')) {
            throw new Error(`success message not found. Actual message: "${cancelMessage}"`);
        }

        // Optionally, you can log success or continue your flow
        console.log('Confirmation message verified.');
        await this.page.getByRole('button', { name: 'OK' }).click();

    }
    async verifyActionLog(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.operationSearch).fill('Cancel Purchase Order');
        await fixture.page.waitForTimeout(500);
        const errorText = await this.page.locator(this.Elements.operationSearchResult).textContent();
        expect(errorText).toContain('Cancel Purchase Order');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.closeButton).click();
    }
    async verifyActionLogExternalRebuildOrder(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.operationSearch).fill('Cancel External Rebuild Order');
        await fixture.page.waitForTimeout(500);
        const errorText = await this.page.locator(this.Elements.operationSearchResult).textContent();
        expect(errorText).toContain('Cancel External Rebuild Order');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.closeButton).click();
    }
    async clickOnCreateExternalOrderButton(): Promise<void> {

        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.vendorSearchButtonOnPurchaseOrderForm).click();
        await this.page.locator(this.Elements.vendorCode2).fill('1000287');
        await this.page.locator(this.Elements.SearchButtonOnPurchaseOrderForm).click();
        // await this.page.locator(this.Elements.LookUpVendorOkButton).click();
        await await this.page.getByRole('button', { name: 'OK' }).click();
        await await this.page.locator('form').getByPlaceholder('--Select One--').nth(1).click();
        await await this.page.getByText('Power - Power Equipment Maintenance').click();
        await await this.page.locator(this.Elements.FOB).click();
        await await this.page.getByText('SHIPPING PT - Shipping Point').click();
        await await this.page.locator(this.Elements.terms).click();
        await await this.page.getByText('NET30 - Net 30 Days').click();
        await await this.page.locator(this.Elements.shipvia).click();
        await await this.page.getByText('BEST WAY - Best Available Shipping Option').click();
        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;
        const jobNumberLocator = this.page.locator(this.Elements.jobnumber);

        if (await jobNumberLocator.isVisible()) {
            await jobNumberLocator.fill(randomJobNumber);
        } else {
            console.log('Job number field is not visible, skipping fill.');
        }
        this.description = `Auto order ${randomJobNumber}`;
        await await this.page.locator(this.Elements.instruction).fill(this.description);
        // await await this.page.locator(this.Elements.createButton).click();
        await await this.page.locator(this.Elements.stockNumberSearch).click();
        await this.page.locator(this.Elements.stockNumberSearchPopupfield).fill('1008');
        await await this.page.locator(this.Elements.lookUpMaterialSearch).click();
        await await this.page.locator(this.Elements.lookUpMaterlOk).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.vendorNo).fill(randomJobNumber);
        await fixture.page.waitForTimeout(500);
        await this.page.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').click();
        await this.page.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').fill('5');
        await this.page.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').click();
        await this.page.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').fill('5');
        await await this.page.locator(this.Elements.productCode).click();
        await await this.page.getByText('OPX_AGV - Maintenance Parts - AGV').click();
        await fixture.page.waitForTimeout(1000);
        await await this.page.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.okButtonpurchaceOrder).click();
        const successMsg = await await this.page.locator(this.Elements.successMessageOnPurchaseOrderForm).textContent();
        fixture.logger?.info(`Purchase Order creation success message: ${successMsg}`);

        // Wait briefly and read the header text directly (same pattern as stockNo)
        await fixture.page.waitForTimeout(2000);
        const poHeaderText = (await fixture.page.locator(this.Elements.headertitle).textContent());
        if (poHeaderText && poHeaderText.includes('External Rebuild Order |')) {
            // Extract the number after "Purchase Order | "
            const match = poHeaderText.match(/External Rebuild Order\s*\|\s*(\d+)/);
            if (match && match[1]) {
                this.purchaseOrderNo = match[1];
                fixture.logger?.info(`Extracted  External Rebuild Order number: ${this.purchaseOrderNo}`);
            }
        }

    }
    async updateExternalPurchaseOrder(): Promise<void> {
        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;
        await fixture.page.waitForTimeout(500);

        const updatedDesc = `${this.description} - Updated ${currentDate}`;

        await this.page.locator(this.Elements.instruction).fill(updatedDesc);
        await await this.page.locator(this.Elements.createButton).click();
        await fixture.page.waitForTimeout(1000);
        await await this.page.locator(this.Elements.stockLocation2).click()
        await await this.page.locator(this.Elements.stockLocation2).fill(updatedDesc);
        await await this.page.locator(this.Elements.vendorPartNo).click();
        await await this.page.locator(this.Elements.vendorPartNo).fill(updatedDesc);
        // await this.page.getByRole('row', { name: '--Input Text or Look up--   --Select One--  --Select One--  Select  Select  Select  Select $0.00 0 ' }).locator('#vendorPartNo').getByRole('textbox').click();
        // await this.page.getByRole('row', { name: '--Input Text or Look up--   --Select One--  --Select One--  Select  Select  Select  Select $0.00 0 ' }).locator('#vendorPartNo').getByRole('textbox').fill(this.description);
        await await this.page.locator(this.Elements.retailPriceInput4).click();
        await await this.page.locator(this.Elements.retailPriceInput4).fill("15");
        await await this.page.locator(this.Elements.orderQuantity4).click();
        await await this.page.locator(this.Elements.orderQuantity4).fill("5");
        await this.page.getByRole('row', { name: '--Input Text or Look up--   --Select One--  --Select One--  Select  Select  Select  Select $0.00 0 ' }).getByPlaceholder('Select', { exact: true }).first().click();
        await this.page.getByRole('listitem').filter({ hasText: 'OPX_BATTERY_EXCHANGE_STATION - Maintenance Parts - Battery Exchange Station' }).locator('span').click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.okUpdateButton).click();


    }
    async CalculateTotalQuantity(): Promise<void> {
        // Get text content for quantities
        const Quantity1Text = (await this.page.locator(this.Elements.orderQuantity4).textContent())?.trim() || '0';
        const orderQuantity2Text = (await this.page.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').textContent())?.trim() || '0';

        // Convert to numbers safely
        const Quantity1 = parseFloat(Quantity1Text) || 0;
        const orderQuantity2 = parseFloat(orderQuantity2Text) || 0;

        // Calculate total
        const TotalQuantity = Quantity1 + orderQuantity2;

        // Get current total order quantity text on page
        const TotalOrderQuantityText = (await this.page.locator(this.Elements.totalOrderQuantity).textContent())?.trim() || '0';
        const TotalOrderQuantity = parseFloat(TotalOrderQuantityText) || 0;

        // Verify that they are equal
        if (TotalQuantity !== TotalOrderQuantity) {
            throw new Error(`Total quantity mismatch: Calculated ${TotalQuantity} but displayed ${TotalOrderQuantity}`);
        }

        // Optional: log success
        console.log(`Total quantity verified: ${TotalQuantity}`);
    }
    async CreateOnInternalRebuildOrder(): Promise<void> {

        await fixture.page.waitForTimeout(1000);

        await await this.page.locator(this.Elements.shop).click();
        await await this.page.getByText('Power - Power Equipment Maintenance').click();

        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;

        this.description = `Auto order ${randomJobNumber}`;
        this.description = `Auto order ${randomJobNumber}`;
        await await this.page.locator(this.Elements.instruction).fill(this.description);
        await await this.page.locator(this.Elements.stockNumberSearch).click();
        await this.page.locator(this.Elements.stockNumberSearchPopupfield).fill('1008');
        await await this.page.locator(this.Elements.lookUpMaterialSearch).click();
        await await this.page.locator(this.Elements.lookUpMaterlOk1).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.vendorNo).fill(randomJobNumber);
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.productCode).click();
        await await this.page.getByText('OPX_AGV - Maintenance Parts - AGV').click();
        await fixture.page.waitForTimeout(1000);
        await await this.page.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.okUpdateButton).click();
        const successMsg = await await this.page.locator(this.Elements.successMessageOnPurchaseOrderForm).textContent();
        fixture.logger?.info(`Purchase Order creation success message: ${successMsg}`);

        // Wait briefly and read the header text directly (same pattern as stockNo)
        await fixture.page.waitForTimeout(2000);
        const poHeaderText = (await fixture.page.locator(this.Elements.headertitle).textContent());
        if (poHeaderText && poHeaderText.includes('Internal Rebuild Order |')) {
            // Extract the number after "Purchase Order | "
            const match = poHeaderText.match(/Internal Rebuild Order\s*\|\s*(\d+)/);
            if (match && match[1]) {
                this.purchaseOrderNo = match[1];
                fixture.logger?.info(`Extracted Purchase Order number: ${this.purchaseOrderNo}`);
            }
        }

    }
    async UpdateInternalRebuildOrder(): Promise<void> {

        await fixture.page.waitForTimeout(1000);


        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;

        this.description = `Auto order ${randomJobNumber}`;
        await await this.page.locator(this.Elements.instruction).fill(this.description);
        await await this.page.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.okUpdateButton).click();
        const successMsg = await await this.page.locator(this.Elements.successMessageOnPurchaseOrderForm).textContent();
        fixture.logger?.info(`Purchase Order creation success message: ${successMsg}`);

        // Wait briefly and read the header text directly (same pattern as stockNo)

    }
    async verifyActionLogInternalRebuildOrder(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.operationSearch).fill('Cancel Internal Rebuild Order');
        await fixture.page.waitForTimeout(500);
        const errorText = await this.page.locator(this.Elements.operationSearchResult).textContent();
        expect(errorText).toContain('Cancel Internal Rebuild Order');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.closeButton).click();
    }
    async selectOrderDate(): Promise<void> {
        await this.page.getByPlaceholder('-- Select Date Range--').first().click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await await this.page.locator(this.Elements.searchButton).click();
    }

    async verifyOrdeDateResult(): Promise<void> {
        // Format current date as 'YYYY-MMM-DD'
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString('en-US', { month: 'short' }); // e.g., "Dec"
        const day = currentDate.getDate().toString().padStart(2, '0'); // zero-padded day

        const formattedDate = `${year}-${month}-${day}`;

        // Get the date text from the cell
        const dateLocator = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=8]/div[position()=1]/span[position()=1]`);
        const dateText = await dateLocator.textContent();

        // Verify that the date text contains the formatted current date
        if (!dateText?.includes(formattedDate)) {
            throw new Error(`Expected date to contain ${formattedDate}, but got ${dateText}`);
        }
    }
    async selectRequestDate(): Promise<void> {
        await this.page.getByPlaceholder('-- Select Date Range--').nth(1).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await await this.page.locator(this.Elements.searchButton).click();
    }
    async verifyRequestDateResult(): Promise<void> {
        // Format current date as 'YYYY-MMM-DD'
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString('en-US', { month: 'short' }); // e.g., "Dec"
        const day = currentDate.getDate().toString().padStart(2, '0'); // zero-padded day

        const formattedDate = `${year}-${month}-${day}`;

        // Get the date text from the cell
        const dateLocator = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=9]/div[position()=1]/span[position()=1]`)


        const dateText = await dateLocator.textContent();

        // Verify that the date text contains the formatted current date
        if (!dateText?.includes(formattedDate)) {
            throw new Error(`Expected date to contain ${formattedDate}, but got ${dateText}`);
        }
    }
    async selectStatusForsEARCH(): Promise<void> {
        await this.page.locator('div:nth-child(2) > .el-input__inner').first().click();
        await this.page.getByText('Cancelled').click();
        await this.page.getByRole('listitem').filter({ hasText: 'Firm Order' }).click();
        await this.page.getByText('Reset Search').click();
        await await this.page.locator(this.Elements.searchButton).click();
    }

    async VerifyStatusForsEARCH(): Promise<void> {
        const statusLocator = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=5]/div[position()=1]/span[position()=1]`);

        const statusText = await statusLocator.textContent();

        if (!statusText) {
            throw new Error('Status text is empty or not found.');
        }

        // Normalize to trim spaces and lower case for case-insensitive comparison
        const normalizedStatus = statusText.trim().toLowerCase();

        if (normalizedStatus !== 'cancelled' && normalizedStatus !== 'firm order') {
            throw new Error(`Status text '${statusText}' is not 'cancelled' or 'Firm Order'.`);
        }


    }
    async searchPOByVendor(vendor: string): Promise<void> {

        await this.page.locator(this.Elements.vendorSearchButton).click();
        await this.page.locator(this.Elements.vendorCodeLookUpVendor).fill(vendor);
        await this.page.locator(this.Elements.LookUpVendorSearchButton).click();
        // await this.page.locator(this.Elements.LookUpVendorOkButton).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await await this.page.locator(this.Elements.searchButton).click();

        await fixture.page.waitForTimeout(500);
    }
    async verifySearchResultByVendor(vendor: string): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=10]/div[position()=1]/span[position()=1]`)
        const txt = await firstRow.textContent();
        await expect(txt).toContain(vendor);
    }
    async selectCategory(): Promise<void> {
        await this.page.locator('div:nth-child(6) > .el-form-item > .el-form-item__content > .el-select > .el-input > .el-input__inner').click();
        await this.page.getByText('Inventory', { exact: true }).click();
        // await this.page.getByText('Reset Search').nth(1).click();
        await await this.page.locator(this.Elements.searchButton).click();
    }
    async selectReceiveStatusForsEARCH(): Promise<void> {
        await this.page.locator('div:nth-child(2) > div > .el-form-item > .el-form-item__content > .el-select > .el-input > .el-input__inner').first().click();
        await this.page.getByText('Partial Received').click();
        await this.page.getByText('Fully Received').click();
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(1000);
    }

    async VerifyReceiveStatusForsEARCH(): Promise<void> {
        const statusLocator = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=6]/div[position()=1]/span[position()=1]`)

        const statusText = await statusLocator.textContent();

        if (!statusText) {
            throw new Error('Status text is empty or not found.');
        }

        // Normalize to trim spaces and lower case for case-insensitive comparison
        const normalizedStatus = statusText.trim();

        if (normalizedStatus !== 'Partial Received' && normalizedStatus !== 'Fully Received') {
            throw new Error(`Status text '${statusText}' is not 'Partial Received' or 'Fully Received'.`);
        }


    }
    async selectMatchStatusForsEARCH(): Promise<void> {
        await this.page.locator('div:nth-child(2) > .el-form-item > .el-form-item__content > .el-select > .el-input > .el-input__inner').click();
        await this.page.getByText('Not Invoiced').click();
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(1000);
    }

    async VerifyMatchStatusForsEARCH(): Promise<void> {
        const statusLocator = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=19]/div[position()=1]/span[position()=1]`)

        const statusText = await statusLocator.textContent();

        if (!statusText) {
            throw new Error('Status text is empty or not found.');
        }

        // Normalize to trim spaces and lower case for case-insensitive comparison
        const normalizedStatus = statusText.trim();

        if (normalizedStatus !== 'Not Invoiced') {
            throw new Error(`Status text '${statusText}' is not 'Not Invoiced`);
        }


    }
    async TypeEARCH(): Promise<void> {
        await this.page.locator('div:nth-child(3) > .el-form-item > .el-form-item__content > .el-select > .el-input > .el-input__inner').first().click();
        await this.page.getByRole('listitem').filter({ hasText: 'External RO' }).click();
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(1000);
    }
    async VerifyPOSEARCH(): Promise<void> {
        const statusLocator = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=2]/div[position()=1]/span[position()=1]`)

        const statusText = await statusLocator.textContent();

        if (!statusText) {
            throw new Error('text is empty or not found.');
        }

        // Normalize to trim spaces and lower case for case-insensitive comparison
        const normalizedStatus = statusText.trim();

        if (normalizedStatus !== 'External RO') {
            throw new Error(`Status text '${statusText}' is not 'External RO`);
        }


    }
    async ShopSEARCH(): Promise<void> {
        await this.page.locator('div:nth-child(2) > div:nth-child(4) > .el-form-item > .el-form-item__content > .el-select > .el-input > .el-input__inner').click();
        await this.page.getByText('AGV - AGV').click();
        await this.page.getByText('Reset Search').first().click();
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(1000);
    }
    async VerifyShopSEARCH(): Promise<void> {
        const statusLocator = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=4]/div[position()=1]/span[position()=1]`)


        const statusText = await statusLocator.textContent();

        if (!statusText) {
            throw new Error('text is empty or not found.');
        }

        // Normalize to trim spaces and lower case for case-insensitive comparison
        const normalizedStatus = statusText.trim();

        if (normalizedStatus !== 'AGV - AGV') {
            throw new Error(`Status text '${statusText}' is not 'AGV - AGV`);
        }


    }
    async clickOnCreateOrderHavingApproval(): Promise<void> {

        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.vendorSearchButtonOnPurchaseOrderForm).click();
        await this.page.locator(this.Elements.vendorCode).fill('1000287');
        await this.page.locator(this.Elements.SearchButtonOnPurchaseOrderForm).click();
        // await this.page.locator(this.Elements.LookUpVendorOkButton).click();
        await await this.page.getByRole('button', { name: 'OK' }).click();
        await await this.page.locator('form').getByPlaceholder('--Select One--').nth(1).click();
        await await this.page.getByText('Power - Power Equipment Maintenance').click();
        await await this.page.locator(this.Elements.FOB).click();
        await await this.page.getByText('SHIPPING PT - Shipping Point').click();
        await await this.page.locator(this.Elements.terms).click();
        await await this.page.getByText('NET30 - Net 30 Days').click();
        await await this.page.locator(this.Elements.shipvia).click();
        await await this.page.getByText('BEST WAY - Best Available Shipping Option').click();
        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;
        const jobNumberLocator = this.page.locator(this.Elements.jobnumber);

        if (await jobNumberLocator.isVisible()) {
            await jobNumberLocator.fill(randomJobNumber);
        } else {
            console.log('Job number field is not visible, skipping fill.');
        }
        this.description = `Auto order ${randomJobNumber}`;
        await await this.page.locator(this.Elements.instruction).fill(this.description);
        // await await this.page.locator(this.Elements.createButton).click();
        await await this.page.locator(this.Elements.stockNumberSearch).click();
        await this.page.locator(this.Elements.stockNumberSearchPopupfield).fill('1008');
        await await this.page.locator(this.Elements.lookUpMaterialSearch).click();
        await await this.page.locator(this.Elements.lookUpMaterlOk).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.vendorNo).fill(randomJobNumber);
        await await this.page.locator(this.Elements.retailPriceInput).fill("9000");
        const price = `${getRandomInt(1, 10)}`;
        // await newPage.locator(this.Elements.retailPriceInput).fill(price);
        // await fixture.page.waitForTimeout(500);
        // await newPage.locator(this.Elements.orderQuantity).fill(price);
        await await this.page.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').click();
        await await this.page.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').fill('9000');
        await await this.page.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').click();
        await await this.page.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').fill('8');
        await await this.page.locator(this.Elements.productCode).click();
        await await this.page.getByText('OPX_AGV - Maintenance Parts - AGV').click();
        await fixture.page.waitForTimeout(1000);
        await await this.page.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.OkButtonOnApproval).click();
        const successMsg = await await this.page.locator(this.Elements.successMessageOnPurchaseOrderForm).textContent();
        fixture.logger?.info(`Purchase Order creation success message: ${successMsg}`);

        // Wait briefly and read the header text directly (same pattern as stockNo)
        await fixture.page.waitForTimeout(2000);
        const poHeaderText = (await fixture.page.locator(this.Elements.headertitle).textContent());
        if (poHeaderText && poHeaderText.includes('Purchase Order |')) {
            // Extract the number after "Purchase Order | "
            const match = poHeaderText.match(/Purchase Order\s*\|\s*(\d+)/);
            if (match && match[1]) {
                this.purchaseOrderNo = match[1];
                fixture.logger?.info(`Extracted Purchase Order number: ${this.purchaseOrderNo}`);
            }
        }

    }
    async clickOnReject(): Promise<void> {
        await this.page.locator(this.Elements.rejectButton).click();
        await this.page.locator(`//form[position()=1]/div[position()=1]/div[position()=1]/div[position()=1]/textarea[position()=1]`).fill("Rejected");
        await this.page.locator(this.Elements.rejectOKButton).click();
        await fixture.page.waitForTimeout(2000);
    }

    async extractStatusFromHeader(): Promise<string | null> {
        await fixture.page.waitForSelector(this.Elements.headertitle, { state: 'visible' });
        await fixture.page.waitForTimeout(1000);
        const poHeaderText = await fixture.page.locator(this.Elements.headertitle).textContent();

        if (poHeaderText && poHeaderText.includes('Purchase Order |')) {
            const match = poHeaderText.match(/Purchase Order\s*\|\s*(\d+)\s*\(([^)]+)\)/);
            if (match && match[2]) {
                // Return the status text (e.g. "Rejected")
                return match[2];
            }
        }
        // Return null if status not found
        return null;

    }
    async clickOnApprove(): Promise<void> {
        await this.page.locator(this.Elements.approveButton).click();
        await this.page.locator(`//div[position()=3]/div[position()=1]/div[position()=3]/button[position()=2]/span[position()=1]`).click();
        await fixture.page.waitForTimeout(2000);
    }
    async clickOnBatchApproveMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.orderMenu);
        await this.page.locator(this.Elements.batchApproveMenu).click();
        await fixture.page.waitForTimeout(2000);
    }
    async DoRejectOperation(): Promise<void> {

        await this.page.locator(`(//input[@placeholder='--Input Text--'])[2]`).fill(this.purchaseOrderNo);
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[9]`).check()
        await this.page.locator(this.Elements.batchRejectButton).click();
        await this.page.locator(`//form[position()=1]/div[position()=1]/div[position()=1]/div[position()=1]/textarea[position()=1]`).fill("Rejected")
        await this.page.locator(this.Elements.rejectOKButton).click();
        await this.page.locator(this.Elements.RejectOkButton1).click();
        await fixture.page.waitForTimeout(2000);
    }
    async DoApproveOperation(): Promise<void> {
        await this.page.locator(`(//input[@placeholder='--Input Text--'])[2]`).fill(this.purchaseOrderNo);
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[9]`).check()
        await this.page.locator(this.Elements.batchApproveButton).click();
        await this.page.locator(this.Elements.confirmButton).click();
        await this.page.locator(this.Elements.okUpdateButton).click();
        await fixture.page.waitForTimeout(2000);
    }
    async verifyRedirection(): Promise<void> {
        await this.page.locator(`(//input[@placeholder='--Input Text--'])[2]`).fill(this.purchaseOrderNo);
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[9]`).check()
        const poLinkText = await this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=3]/div[position()=1]/a[position()=1]`).textContent();
        await this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=3]/div[position()=1]/a[position()=1]`).click();

        await fixture.page.waitForTimeout(2000);
        const poHeaderText = (await fixture.page.locator(this.Elements.headertitle).textContent());
        if (poHeaderText && poHeaderText.includes('Purchase Order |')) {
            // Extract the number after "Purchase Order | "
            const match = poHeaderText.match(/Purchase Order\s*\|\s*(\d+)/);
            if (match && match[1]) {
                this.purchaseOrderNo = match[1];
                fixture.logger?.info(`Extracted Purchase Order number: ${this.purchaseOrderNo}`);
            }
        }

        const normalizedLinkText = poLinkText.trim();
        const normalizedPurchaseOrderNo = this.purchaseOrderNo.trim();

        if (normalizedLinkText !== normalizedPurchaseOrderNo) {
            throw new Error(`Mismatch: Link text '${normalizedLinkText}' does not match purchaseOrderNo '${normalizedPurchaseOrderNo}'`);
        } else {
            fixture.logger?.info(`Purchase order link text matches purchaseOrderNo: ${normalizedPurchaseOrderNo}`);
        }

    }
    async selectMultipleOrders(): Promise<void> {
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[9]`).check()
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[10]`).check()
        await this.page.locator(this.Elements.batchApproveButton).click();
        await this.page.locator(this.Elements.confirmButton).click();
        await this.page.locator(this.Elements.okUpdateButton).click();
        await fixture.page.waitForTimeout(2000);
    }
    async verifytheBatchaprrovalConfirmationMessage(): Promise<void> {

        const successMessage = this.page.locator(`//div[position()=1]/div[position()=2]/div[position()=2]/div[position()=1]/div[position()=1]`)


        // Wait for the confirmation message to appear and be visible (timeout optional)
        await successMessage.waitFor({ state: 'visible', timeout: 5000 });

        const isVisible = await successMessage.isVisible();

        if (!isVisible) {
            throw new Error("Batch approval confirmation message not found or not visible.");
        }

        // Optional: log success
        console.log("Batch approval confirmation message is displayed.");
    }

    async inquireMaterialReceiveScreen(): Promise<void> {
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.orderMenu).click();
        await this.page.locator(this.Elements.inquireMaterialReceive).click();
    }


}