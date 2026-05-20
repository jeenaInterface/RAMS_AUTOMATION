import test, { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import * as path from 'path';
import { fixture } from "../hooks/pageFixture";
import { table } from "console";
import { ok } from "assert";

import * as fs from 'fs-extra';
import * as XLSX from 'xlsx';

setDefaultTimeout(100 * 1000);

export default class PurchaseOrderPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public stockNo: string = '';
    public description: string = '';
    public purchaseOrderNo: string = '';
    public ReceivingDocumentNo: string = '';
    public receiveStatus: string = '    ;'
    public orderQtyuantity: string = '';
    public outStandingQuantity: string = '';
    public workOrderNumber: string = '';
    public receiveStatusInternalRO: string = '';
    public payslipNumber: string = '';
    public RMA: string = '';
    public subTotal: string = '';
    public tax: string = '';
    public Freight: string = '';


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
        payslipNumber: "(//label[normalize-space(text())='Pack Slip Number']/following::input)[1]",
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
        totalOrderQuantity: "//table[3]//tr[1]//td[2]//b[1]",
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
        receiveQuantityInput: "//tbody/tr[1]/td[10]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        masterCheckbox: "(//span[@class='el-radio__inner'])[1]",
        receivingDocumentNumber: "(//span[@class='header-title font-size-title'])[2]",
        totalOrderQuantoty: "//table[3]//tr[1]//td[2]//b[1]",
        totalOutStandingQuantity: "//table[3]//tr[2]//td[2]//b[1]",
        inquireMaterialReceive: "//span[normalize-space(text())='- Inquire Material Receiving']",
        receivingDocumentSearchBox: "(//label[normalize-space(text())='Receiving Doc. No.']/following::input)[1]",
        okButtonOncancelPopup: "//html/body/div[3]/div/div[3]/button[2]/span",
        createUnbillableOrder: "//span[normalize-space(text())='- Create Un-billable Work Order']",
        mechanicSearch: "//div[@class='select-lookup form-control']//i[1]",
        userIDSearchBox: "(//label[normalize-space(text())='User ID']/following::input)[1]",
        LOOKuPmechanicSearch: "//div[@class='el-dialog__wrapper']//span[contains(text(),'Search')]",
        lookUpMechanicOkButton: "(//span[contains(text(),'OK')])[1]",
        assetNumber: "(//input[@placeholder='-- Input Text --'])[1]",
        rebuildStockNumberSearch: "//div[@placeholder='-- Input Text or Look up --']//i[@class='el-input__icon el-icon-search is-clickable']",
        LookUpStockNumberSearchBox: "(//span[normalize-space(text())='Lookup Material']/following::input)[1]",
        lookUpStockNumberSearchButton: "(//span[contains(text(),'Search')])[2]",
        lookUpStockNumberOkButton: "(//span[contains(text(),'OK')])[2]",
        internalRONumber: "(//input[@placeholder='--Select One--'])[5]",
        componentCode: "//input[@placeholder='Component Code']",
        damageCode: "//input[@placeholder='Damage Code']",
        repairCode: "//input[@placeholder='Repair Code']",
        repairLocation: "//tr[@class='activity-row']//input[@placeholder='--Select One--']",
        actualHours: "//div[@class='el-input input-align']//input[@type='text']",
        stockNumberSearchwo: "//div[@placeholder='--Input Text or Look up--']//i[@class='el-input__icon el-icon-search is-clickable']",
        stockNumberSearchBoxwo: "(//label[normalize-space(text())='Stock No.']/following::input)[1]",
        searchButtonLookUpwo: "//div[@class='el-dialog__wrapper inquiryPurchaseOrder']//span[contains(text(),'Search')]",
        okButtonLookUpwo: "(//span[contains(text(),'OK')])[3]",
        stockQuantitywo: "//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text']",
        completeButton: "//span[normalize-space()='Complete']",
        okButtonOnCompletePopup: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",
        closeButtonWO: "//span[normalize-space()='Close']",
        OKButtonOnWOclosePopup: "//i[@class='el-message-box__close el-icon-close']",
        WorkOrderMenu: "//span[normalize-space()='Work Order']",
        WOOrderRate: "//tbody[position()=1]/tr[position()=1]/td[position()=7]/div[position()=1]/span[position()=1]",
        receiveStatusInternalRO: "(//label[normalize-space(text())='Receive Status:']/following::input)[1]",
        inquireMaterialRecieve: "//span[normalize-space()='- Inquire Material Receiving']",
        receivingDocumentNumberSearch: "(//label[normalize-space(text())='Receiving Doc. No.']/following::input)[1]",
        cancelButtonMaterialReturn: "(//span[contains(text(),'Cancel')])[3]",
        cancelResonMaterialReturn: "//textarea[@autosize='[object Object]']",
        cancelOk: "(//span[contains(text(),'OK')])[1]",
        cancelDSuccessMessage: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",
        retrunQuantity: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[8]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        RMANo: "(//label[normalize-space(text())='RMA No.']/following::input)[1]",
        returnDate: "(//label[normalize-space(text())='Return Date']/following::input)[1]",
        reasonForReturn: "//textarea[@placeholder='--Input Text Area--']",
        courierName: "(//label[normalize-space(text())='Courier Name']/following::input)[1]",
        courierNumber: "(//label[normalize-space(text())='Courier Number']/following::input)[1]",
        contact: "(//label[normalize-space(text())='Contact']/following::input)[1]",
        retreiveReceiveButton: "//span[normalize-space(text())='Retrieve Receive']",
        stockNoTransfer: "(//input[@class='el-input__inner'])[1]",
        saveButton: "//span[normalize-space(text())='Save']",
        hourValidationMessage: "(//div[@class='el-message-box__content'])[1]",
        internalROValidation: "(//p[normalize-space()='Please check Internal RO Number.'])[1]",
        stockNumberValidationMessage: "//p[contains(text(),'There is a Rebuild Stock Number entry without any ')]",
        hourValidationOkayButton: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",

        PlusButtonAddAsset1: "(//i[@class='ivu-icon ivu-icon-plus'])[3]",
        assetNumber2: "(//input[@placeholder='-- Input Text --'])[2]",
        componentCode2: "(//input[@placeholder='Component Code'])[2]",
        damageCode2: "(//input[@placeholder='Damage Code'])[2]",
        repairCode2: "(//input[@placeholder='Repair Code'])[2]",
        repairLocation2: "(//tr[@class='activity-row'])[2]//input[@placeholder='--Select One--']",
        actualHours2: "(//div[@class='el-input input-align']//input[@type='text'])[2]",
        stockQuantitywo2: "(//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text'])[2]",

        subTotal: "//table[2]//tr[1]//td[2]//b[1]",
        tax: "//table[2]//tr[2]//td[2]//b[1]",
        Freight: "//table[2]//tr[3]//td[2]//b[1]",

        reportMenu: "//span[normalize-space()='Report']",
        OrderReportMenu: "//span[normalize-space(text())='- Create Order Report']",
        orderNoInReportSearchBox: "(//label[normalize-space(text())='Order No.']/following::input)[1]",
        runButton: "//span[normalize-space()='Run']",
        rightArrow1: "(//i[@class='el-icon-arrow-right'])[1]",
        rightArrow2: "(//button[@type='button'])[7]",
        headerFieldsCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        itemFieldsCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[4]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",

        agvHours: "(//label[normalize-space(text())='AGV Hours']/following::input)[1]",
        underWarantee: "(//label[normalize-space(text())='Under Warranty']/following::input)[1]",

        UserNameIcon: "//i[contains(@class,'menu-icon ivu-icon')]/following-sibling::span[1]",
        todiListMenu: "//div[@class='ivu-menu-item select-item']//span[contains(text(),'To-Do List')]",
        approveClaimOrderMenu: "//div[normalize-space(text())='Approve Claim Order']",
        approveButtonClaim: "//span[normalize-space()='Approve']",
        apoproveOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        RejectButton: "//span[normalize-space()='Reject']",
        rejectReasonClaim: "(//label[normalize-space(text())='Reject Reason']/following::textarea)[1]",
        rejectPopupOkButton: "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div/div[3]/div/button[2]/span",
        rejectOkbutton: "xpath=/html/body/div[4]/div/div[3]/button[2]/span",
        printButtonClaim: "//span[normalize-space()='Print']",
        secondPrintButtonClaim: "(//span[contains(text(),'Print')])[2]",

        emailButtonClaim: "(//span[normalize-space()='Email'])[1]",
        EmailTo: "(//span[normalize-space(text())='Email Order']/following::input)[1]",
        secondEmailButton: "//button[@class='el-button el-button--primary']//span[contains(text(),'Email')]",
        emailOkButton: "xpath=/html/body/div[4]/div/div[3]/button[2]",
        actionLogButton: "//button[@type='button']//span[contains(text(),'Action Log')]",
        actionLogHeader: "//span[@class='el-dialog__title'][normalize-space()='Action Log']",
        operationSearchClaim: "(//input[@placeholder='--Input Text--'])[2]"


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
        await await this.page.getByText('OPX_AGV_BATTERY - Maintenance Parts - AGV Battery').click();
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
        await fixture.page.waitForTimeout(2000);

    }
    async selectExternalRebuildOrder(): Promise<void> {
        await await this.page.locator(this.Elements.externalRebildOrderCheckBox).click();

    }
    async selectInternalRebuildOrder(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await await this.page.locator(this.Elements.internalRebildOrderCheckBox).click();

    }
    async updatePurchaseOrder(): Promise<void> {
        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;
        await fixture.page.waitForTimeout(8000);

        const updatedDesc = `${this.description} - Updated ${currentDate}`;
        await fixture.page.waitForTimeout(4000);
        await this.page.locator(this.Elements.instruction).fill(updatedDesc);
        await fixture.page.waitForTimeout(1000);
        await await this.page.locator(this.Elements.createButton).click();
        await fixture.page.waitForTimeout(1000);
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

        // Wait for both elements to be visible before getting their content
        await orderQuantity.waitFor({ state: 'visible', timeout: 5000 });

        this.orderQtyuantity = await orderQuantity.textContent() || '';
        return this.orderQtyuantity;
    }
    async totaloutStandingQuantity(): Promise<string | null> {
        const totalOutStandingQuantity = this.page.locator(this.Elements.totalOutStandingQuantity);

        // Wait for both elements to be visible before getting their content
        await totalOutStandingQuantity.waitFor({ state: 'visible', timeout: 5000 });

        this.outStandingQuantity = await totalOutStandingQuantity.textContent() || '';
        return this.outStandingQuantity;

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
    async cancelExternalRO(): Promise<void> {
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
        // await this.page.getByRole('button', { name: 'OK' }).click();
        await await this.page.locator(this.Elements.okButtonOncancelPopup).click();

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
        await await this.page.getByText('OPX_AGV_BATTERY - Maintenance Parts - AGV Battery').click();
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
        await fixture.page.waitForTimeout(10000);

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

        await fixture.page.waitForTimeout(2000);

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
        await await this.page.getByText('OPX_AGV_BATTERY - Maintenance Parts - AGV Battery').click();
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
                console.log(`Extracted Internal Rebuild Order number: ${this.purchaseOrderNo}`);
                fixture.logger?.info(`Extracted Purchase Order number: ${this.purchaseOrderNo}`);
            }
        }

    }
    async UpdateInternalRebuildOrder(): Promise<void> {

        await fixture.page.waitForTimeout(4000);


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
        await await this.page.getByText('OPX_AGV_BATTERY - Maintenance Parts - AGV Battery').click();
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
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[8]`).check()
        await this.page.locator(this.Elements.batchRejectButton).click();
        await this.page.locator(`//form[position()=1]/div[position()=1]/div[position()=1]/div[position()=1]/textarea[position()=1]`).fill("Rejected")
        await this.page.locator(this.Elements.rejectOKButton).click();
        await this.page.locator(this.Elements.RejectOkButton1).click();
        await fixture.page.waitForTimeout(2000);
    }
    async DoApproveOperation(): Promise<void> {
        await this.page.locator(`(//input[@placeholder='--Input Text--'])[2]`).fill(this.purchaseOrderNo);
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[8]`).check()
        await this.page.locator(this.Elements.batchApproveButton).click();
        await this.page.locator(this.Elements.confirmButton).click();
        await this.page.locator(this.Elements.okUpdateButton).click();
        await fixture.page.waitForTimeout(2000);
    }
    async verifyRedirection(): Promise<void> {
        await this.page.locator(`(//input[@placeholder='--Input Text--'])[2]`).fill(this.purchaseOrderNo);
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[8]`).check()
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

        if (!poLinkText) {
            throw new Error('Link text not found');
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
    async createUnbillableOrderForInternalRO(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.createUnbillableOrder).click();
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('AARON.BARRIOS');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('ASCRB');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'ASCRB' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('2EL - Electrical').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BO - Burned out').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('CA - Calibration - ALL').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('EROM - Electrical Room').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('8');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(3).type('1008');
        await fixture.page.waitForTimeout(1000);
        await this.page.getByRole('listitem').filter({ hasText: '1008 - 1000X20RCP - tire flexi van recap 10.00x20' }).first().locator('span').click();

        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');

        await fixture.page.waitForTimeout(2000);
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(1).type('1008');
        await fixture.page.waitForTimeout(1000);
        await this.page.locator("(//span[contains(text(),'1008 - 1000X20RCP - tire flexi van recap 10.00x20')])[2]").click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.internalRONumber).click();
        await fixture.page.waitForTimeout(3000);

        // Ensure we have a valid Internal Rebuild Order number to map
        if (!this.purchaseOrderNo) {
            const headerText = (await fixture.page.locator(this.Elements.headertitle).textContent()) || '';
            const match = headerText.match(/Internal Rebuild Order\s*\|\s*(\d+)/);
            if (match && match[1]) {
                this.purchaseOrderNo = match[1];
                fixture.logger?.info(`Recovered Internal Rebuild Order number from header: ${this.purchaseOrderNo}`);
            }
        }

        if (!this.purchaseOrderNo) {
            throw new Error('Internal Rebuild Order number is not set; cannot map it in unbillable order.');
        }

        console.log(`Purchase Order Number: ${this.purchaseOrderNo}`);
        await this.page.locator(this.Elements.internalRONumber).fill(this.purchaseOrderNo);
        await this.page.waitForSelector(`text=${this.purchaseOrderNo}`);
        await this.page.getByText(this.purchaseOrderNo).click();
        await fixture.page.waitForTimeout(1000);


    }
    async clickCloseCompleteButton(): Promise<void> {
        await this.page.locator(this.Elements.completeButton).click();
        await this.page.locator(this.Elements.okButtonOnCompletePopup).click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.closeButtonWO).click();
        await this.page.locator(this.Elements.OKButtonOnWOclosePopup).click();
        await fixture.page.waitForTimeout(2000);
        const element = await fixture.page.locator(this.Elements.headertitle).textContent();
        const text = element ? element.toString() : '';

        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            if (match && match[1]) {
                this.workOrderNumber = match[1];
                console.log(this.workOrderNumber);
                // Use workOrderNumber as needed
            }
        }

    }
    async verifyThePurchaseRate(): Promise<void> {
        await fixture.page.waitForTimeout(15000);
        const locator = this.page.locator(this.Elements.WOOrderRate);
        await locator.waitFor({ state: 'visible', timeout: 5000 });
        const text = (await locator.textContent())?.trim() || '';
        if (!text) {
            throw new Error('Purchase rate field is empty.');
        }
        fixture.logger?.info(`Purchase rate value: ${text}`);


    }
    async createReceiveMaterial(): Promise<void> {
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.orderMenu).click();
        await this.page.locator(this.Elements.receiveMaterial).click();
        await this.page.locator(this.Elements.orderNoTextBox).fill(this.purchaseOrderNo);
        // await this.page.locator(this.Elements.orderNoTextBox).fill('325772');
        await this.base.waitAndClick(this.Elements.RetrieveButton);
        await fixture.page.waitForTimeout(500);
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        await this.page.locator(this.Elements.receivingDate).fill(formattedDate);
        await this.page.locator(this.Elements.packSlipNumber).fill(`PSN-${getRandomInt(1000, 9999)}`);
        await this.page.locator(this.Elements.receiveQuantityInput).fill('1');
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'Review' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(2000);
        const headerText = await this.page.locator(this.Elements.receivingDocumentNumber).textContent();

        if (headerText && headerText.includes('Receiving Doc. No.:')) {
            // Extract the number after "Receiving Doc. No.:"
            const match = headerText.match(/Receiving Doc\. No\.\s*:\s*(\d+)/);
            if (match && match[1]) {
                this.ReceivingDocumentNo = match[1];
            }
        }
        await fixture.page.waitForTimeout(1000);
        const locator = this.page.locator(this.Elements.payslipNumber);

        await locator.waitFor({ state: 'visible', timeout: 5000 });

        // Get the value of the input field (the text inside the input)
        this.payslipNumber = await locator.inputValue();

        console.log('Payslip Number:', this.payslipNumber);

    }
    async receiveStatusValuepoInternalROFullyReceived(): Promise<string | null> {
        await this.page.locator(this.Elements.orderMenu).click();
        await this.page.locator(this.Elements.inquireOrderMenu).click();
        await this.page.locator(this.Elements.purchaseOrderNoSearch).fill(this.purchaseOrderNo);
        await this.page.locator(this.Elements.searchButton).click();
        await this.page.locator(this.Elements.orderNoSearchrESULT).click();
        await this.page.waitForTimeout(15000);

        const locator = this.page.locator(this.Elements.receiveStatusInternalRO);
        await locator.waitFor({ state: 'visible', timeout: 5000 });

        this.receiveStatusInternalRO = await locator.inputValue();

        // Assertion to verify the status is "Fully Received"
        expect(this.receiveStatusInternalRO).toBe('Fully Received');
        return this.receiveStatusInternalRO;
    }
    async receiveStatusValuepoInternalRONotReceived(): Promise<string | null> {
        await this.page.locator(this.Elements.orderMenu).click();
        await this.page.locator(this.Elements.inquireOrderMenu).click();
        await this.page.locator(this.Elements.purchaseOrderNoSearch).fill(this.purchaseOrderNo);
        await this.page.locator(this.Elements.searchButton).click();
        await this.page.locator(this.Elements.orderNoSearchrESULT).click();
        await this.page.waitForTimeout(5000);

        const locator = this.page.locator(this.Elements.receiveStatusInternalRO);
        await locator.waitFor({ state: 'visible', timeout: 5000 });

        this.receiveStatusInternalRO = await locator.inputValue();

        // Assertion to verify the status is "Not Received"
        expect(this.receiveStatusInternalRO).toBe('Not Received');
        return this.receiveStatusInternalRO;
    }
    async canceltheMaterialReceive(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.orderMenu).click();
        await this.page.locator(this.Elements.inquireMaterialRecieve).click();
        await this.page.locator(this.Elements.receivingDocumentNumberSearch).fill(this.ReceivingDocumentNo);
        // await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.locator("(//span[normalize-space()='Search'])[1]").click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/a[1]").click();
        await this.page.locator(this.Elements.cancelButtonMaterialReturn).click();
        await this.page.locator(this.Elements.cancelResonMaterialReturn).fill('Automation Testing');
        await this.page.locator(this.Elements.cancelOk).click();
        await this.page.locator(this.Elements.cancelDSuccessMessage).click();

    }
    async returnOperation(): Promise<void> {
        const randomNumber = getRandomInt(1000, 9999);

        await this.page.locator(this.Elements.stockNoTransfer).fill(this.payslipNumber);
        await this.base.waitAndClick(this.Elements.retreiveReceiveButton);
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.retrunQuantity).fill("1");
        const rmaNoLocator = this.page.locator(this.Elements.RMANo);
        const rmaValue = `RMA-${getRandomInt(1000, 9999)}`;
        await rmaNoLocator.fill(rmaValue);
        this.RMA = rmaValue;
        await fixture.page.waitForTimeout(1000);
        const returnDateLocator = this.page.locator(this.Elements.returnDate);
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        await returnDateLocator.fill(formattedDate);
        const description = `Damaged ${randomNumber}`;

        await this.page.locator(this.Elements.reasonForReturn).fill(description);
        await this.page.locator(this.Elements.courierName).fill(`Courier ${randomNumber}`);
        await this.page.locator(this.Elements.courierNumber).fill(`CN-${randomNumber}`);
        await this.page.locator(this.Elements.contact).fill(`Contact ${randomNumber}`);
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.cancelDSuccessMessage).click();
        await fixture.page.waitForTimeout(2000);


    }
    async FillStockNumberInWO(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.createUnbillableOrder).click();
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('AARON.BARRIOS');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('ASCRB');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);

        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'ASCRB' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(1).type('1008');
        await fixture.page.waitForTimeout(1000);
        await this.page.getByText('1008 - 1000X20RCP - tire flexi van recap 10.00x20').click();
        await fixture.page.waitForTimeout(1000);


    }
    async clickOnCompleteToVerifyHourValidation(): Promise<void> {
        await this.page.locator(this.Elements.completeButton).click();
        const errorMessageLocator = this.page.locator(this.Elements.hourValidationMessage);

        // Wait for the error message to appear and be visible (timeout optional)
        await errorMessageLocator.waitFor({ state: 'visible', timeout: 5000 });
        const isVisible = await errorMessageLocator.isVisible();

        if (!isVisible) {
            throw new Error("Hour validation error message not found or not visible.");
        }
        await this.page.locator(this.Elements.hourValidationOkayButton).click();

    }
    async FillActivityCode(): Promise<void> {
        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('2EL - Electrical').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BO - Burned out').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('CA - Calibration - ALL').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('EROM - Electrical Room').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('8');
        await this.page.locator(this.Elements.completeButton).click();
        //verify internal RO field is mandatory
        const errorMessageLocator = this.page.locator(this.Elements.internalROValidation);
        // Wait for the error message to appear and be visible (timeout optional)
        await errorMessageLocator.waitFor({ state: 'visible', timeout: 5000 });
        const isVisible = await errorMessageLocator.isVisible();
        if (!isVisible) {
            throw new Error("Internal RO validation error message not found or not visible.");
        }

        await this.page.locator(this.Elements.hourValidationOkayButton).click();
    }
    async verifyStockNumberValidation(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.internalRONumber).click();
        await this.page.locator(this.Elements.internalRONumber).fill(this.purchaseOrderNo);
        // await this.page.locator(this.Elements.internalRONumber).fill("325871");
        await this.page.getByText(this.purchaseOrderNo).click();
        // await this.page.getByText("325871").click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.completeButton).click();
        const errorMessageLocator = this.page.locator(this.Elements.stockNumberValidationMessage);
        // Wait for the error message to appear and be visible (timeout optional)
        await errorMessageLocator.waitFor({ state: 'visible', timeout: 5000 });
        const isVisible = await errorMessageLocator.isVisible();
        if (!isVisible) {
            throw new Error("Stock number validation error message not found or not visible.");
        }
        await this.page.locator(this.Elements.hourValidationOkayButton).click();
    }
    async FillStockNumber(): Promise<void> {
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(3).type('1008');
        await fixture.page.waitForTimeout(1000);
        await this.page.getByRole('listitem').filter({ hasText: '1008 - 1000X20RCP - tire flexi van recap 10.00x20' }).locator('span').click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');
        await this.page.locator(this.Elements.completeButton).click();
        await this.page.locator(this.Elements.okButtonOnCompletePopup).click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.closeButtonWO).click();
        await this.page.locator(this.Elements.OKButtonOnWOclosePopup).click();
        await fixture.page.waitForTimeout(2000);
        const element = await fixture.page.locator(this.Elements.headertitle).textContent();
        const text = element ? element.toString() : '';

        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            if (match && match[1]) {
                this.workOrderNumber = match[1];
                console.log(this.workOrderNumber);
                // Use workOrderNumber as needed
            }
        }

    }
    async asst2Details(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.createUnbillableOrder).click();
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('AARON.BARRIOS');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('ASCRB');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'ASCRB' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(1).type('1008');
        await fixture.page.waitForTimeout(1000);
        await this.page.getByText('1008 - 1000X20RCP - tire flexi van recap 10.00x20').click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.internalRONumber).click();
        await this.page.locator(this.Elements.internalRONumber).fill(this.purchaseOrderNo);
        // await this.page.locator(this.Elements.internalRONumber).fill("325871");
        await this.page.getByText(this.purchaseOrderNo).click();
        // await this.page.getByText("325871").click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('2EL - Electrical').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BO - Burned out').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('CA - Calibration - ALL').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('EROM - Electrical Room').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('3');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(3).type('1008');
        await fixture.page.waitForTimeout(1000);
        await this.page.getByRole('listitem').filter({ hasText: '1008 - 1000X20RCP - tire flexi van recap 10.00x20' }).locator('span').click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');


        await this.page.locator(this.Elements.PlusButtonAddAsset1).click();
        await fixture.page.waitForTimeout(2000);
        const assetInput2 = this.page.locator(this.Elements.assetNumber2);
        await assetInput2.type('AGVOVR');
        await fixture.page.waitForTimeout(1000);
        const suggestion2 = this.page.getByRole('listitem').filter({ hasText: 'AGVOVR' }).first();
        await suggestion2.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion2.click();
        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.componentCode2).click();
        await this.page.getByText('3BA - Battery').click();
        await this.page.locator(this.Elements.damageCode2).click();
        await this.page.getByText('BR - Broken').nth(1).click();
        await this.page.locator(this.Elements.repairCode2).click();
        await this.page.getByText('IP - Inspect and report').nth(1).click();
        await this.page.locator(this.Elements.repairLocation2).click();
        await this.page.getByText('BATT - Battery Rack').click();
        await this.page.locator(this.Elements.actualHours2).click();
        await this.page.locator(this.Elements.actualHours2).fill('5');
        await fixture.page.waitForTimeout(1000);
    }
    async clickOnOrderReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.OrderReportMenu);
    }
    async FillOrderNoInReportSearchBox(): Promise<void> {
        await this.page.locator(this.Elements.orderNoInReportSearchBox).fill(this.purchaseOrderNo);
        await this.page.locator(this.Elements.headerFieldsCheckBox).click();

        //add delay
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.rightArrow1).click();
        //add delay
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.itemFieldsCheckBox).click();
        await this.page.locator(this.Elements.rightArrow2).click();
    }
    async downloadReport(): Promise<string> {
        const downloadPath = 'C:\\Users\\jeena.manuel\\OneDrive - Milestone Technologies Inc\\LBCT - Automation Practice\\Automation Reports\\RAMS Reports';

        // Creates folder only if it does NOT exist – no EEXIST error
        await fs.ensureDir(downloadPath);

        // Clean folder safely
        await this.clearDownloadFolder(downloadPath);

        // Wait for the download event
        const [download] = await Promise.all([
            this.page.waitForEvent("download", { timeout: 60000 }),
            this.page.locator(this.Elements.runButton).click({ timeout: 60000 }),
        ]);

        const outputFile = path.join(downloadPath, "PurchaseOrderReport.xlsx");
        await download.saveAs(outputFile);

        console.log(`File downloaded to: ${outputFile}`);

        expect(fs.existsSync(outputFile)).toBeTruthy();
        await new Promise(resolve => setTimeout(resolve, 5000));
        return outputFile;
    }

    clearDownloadFolder(downloadDir: string): void {
        fs.readdir(downloadDir, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(downloadDir, file), err => {
                    if (err) throw err;
                });
            }
        });
    }
    async verifyExcelContent(filePath: string): Promise<void> {
        // Read the workbook
        const workbook = XLSX.readFile(filePath);

        // Get the first sheet name
        const sheetName = workbook.SheetNames[0];

        // Get worksheet
        const worksheet = workbook.Sheets[sheetName];

        const OrderNumberCellTitle = worksheet['A6']; // 7th row, 1st column
        const OrderNumberValue = worksheet['A7']; // 8th row, 1st column

        // Extract cell values safely (checking for undefined)
        const orderNumberValue = OrderNumberCellTitle ? OrderNumberCellTitle.v : undefined;
        const OrderNumberRealValue = OrderNumberValue ? OrderNumberValue.v : undefined;

        console.log('Order Number cell (A6):', orderNumberValue);
        console.log('Order Real Value cell (A7):', OrderNumberRealValue);

        // Verify the cells contain the expected values
        if (orderNumberValue !== 'Order No.') {
            throw new Error(`Expected "Order No." in cell A6, but found "${orderNumberValue}"`);
        }

        if (OrderNumberRealValue !== this.purchaseOrderNo) {
            throw new Error(`Order number verification failed: "${OrderNumberRealValue}" does not match expected purchase order number "${this.purchaseOrderNo}"`);
        }

        console.log('Verification passed: Both Order No. and purchase order number found in expected cells.');
    }

    async createUnbillableOrderForWarantee(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.createUnbillableOrder).click();
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('AARON.BARRIOS');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('AGV005');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'AGV005' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.underWarantee).click();
        await this.page.getByText('Yes').click();
        await this.page.locator(this.Elements.agvHours).click();
        await this.page.locator(this.Elements.agvHours).fill('21436');
        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('3BA - Battery').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BR - Broken').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('IP - Inspect and report').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('BATT - Battery Rack').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('8');
        await fixture.page.waitForTimeout(2000);
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(2).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');


    }
    async gotoTodoList(): Promise<void> {
        await this.base.waitAndClick(this.Elements.UserNameIcon);
        await this.base.waitAndClick(this.Elements.todiListMenu);
        await this.base.waitAndClick(this.Elements.approveClaimOrderMenu);
    }
    async clickOnClaimOrderLink(): Promise<void> {
        await this.page.getByRole('link', { name: this.workOrderNumber }).click();
    }
    async clickOnApproveButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.approveButtonClaim);
        await this.base.waitAndClick(this.Elements.apoproveOkButton);
        //add a delay
        await fixture.page.waitForTimeout(2000);
    }
    async clickOnRejectButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.RejectButton);
        await this.page.locator(this.Elements.rejectReasonClaim).fill('Test reject reason');
        await this.base.waitAndClick(this.Elements.rejectPopupOkButton);
        await this.base.waitAndClick(this.Elements.rejectOkbutton);
        //add a delay
        await fixture.page.waitForTimeout(2000);
    }

    async clickOnPrintButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.printButtonClaim);



        // Wait for the new page (tab) to open upon clicking the print button on popup
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.page.locator(this.Elements.secondPrintButtonClaim).click(),
        ]);

        await newPage.waitForLoadState();

        // Verify URL contains 'pdf/view'
        if (!newPage.url().includes('pdf/view')) {
            throw new Error(`Unexpected URL opened: ${newPage.url()}`);
        }

        // Optionally: Close the new tab or keep it open for further checks
        await newPage.close();
        //add delay
        await fixture.page.waitForTimeout(2000);

    }
    async EmailButtonClaim(): Promise<void> {
        // Click the initial email button
        await this.page.locator(this.Elements.emailButtonClaim).click();

        // Click the email button on the popup
        await this.page.locator(this.Elements.EmailTo).fill('jeena.manuel@milestone.tech');
        await this.page.locator(this.Elements.secondEmailButton).click();
        await this.page.locator(this.Elements.emailOkButton).click();

    }

    async verifyActionLogClaimOrder(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLogButton);
        const actionLogHeader = this.page.locator(this.Elements.actionLogHeader);
        await actionLogHeader.waitFor({ state: 'visible', timeout: 5000 });
        const headerText = await actionLogHeader.textContent();
        if (!headerText || !headerText.includes('Action Log')) {
            throw new Error('Action Log header not found or does not contain expected text.');
        }
        await this.page.locator(this.Elements.operationSearchClaim).fill('Email Purchase Order');
        await fixture.page.waitForTimeout(500);
        const errorText = await this.page.locator(this.Elements.operationSearchResult).textContent();
        expect(errorText).toContain('Email Purchase Order');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.closeButton).click();
    }
    async clickOnClaimOrderLinkInquire(): Promise<void> {
        await this.page.locator(this.Elements.purchaseOrderNoSearch).fill(this.workOrderNumber);
        await this.page.locator(this.Elements.searchButton).click();
        await this.page.locator(this.Elements.orderNoSearchrESULT).click();

    }

}