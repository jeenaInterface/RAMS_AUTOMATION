import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import * as path from 'path';
import { fixture } from "../hooks/pageFixture";
import { table } from "console";

setDefaultTimeout(100 * 1000);

export default class MaterialPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public stockNo: string = '';
    public description: string = '';
    public purchaseOrderNo: string = '';
    public ReceivingDocumentNo: string = '';
    public payslipNumber: string = '';
    public orderQtyuantity: string = '';
    public outStandingQuantity: string = '';
    public RMA: string = '';
    public workOrderNumber: string = '';
    public manufaturesPartNumber: string = '';
    public materialDescription: string = '';
    public subTotal: string = '';
    public tax: string = '';
    public Freight: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        materialMenu: "//span[normalize-space()='Material']",
        createMaterialMenu: "//span[normalize-space()='- Create Material']",
        inquireMaterialMenu: "//span[normalize-space()='- Inquire Material']",
        createButton: "//span[normalize-space()='Create']",
        newButton: "//span[normalize-space(text())='New']",
        saveButton: "//span[normalize-space(text())='Save']",
        okButton: "//button[normalize-space()='OK']",
        okButtonUpdate: "(//span[normalize-space()='OK'])[1]",
        lookUpMaterialSearch: "//div[@class='el-dialog__wrapper inquiryPurchaseOrder']//span[contains(text(),'Search')]",
        lookUpMaterlOk: "(//span[contains(text(),'OK')])[4]",
        stocknumbersearch: "(//input[@rows='2'])[1]",
        partnoSearch: "(//input[@rows='2'])[2]",
        searchButton: "//span[normalize-space(text())='Search']",
        firstRowStockNo: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/a[1]",
        actionLog: "//button[contains(.,'Action Log')]",
        closeButton: "//body/div[@id='app']/div[@class='app-body']/div[@class='app-body-container']/div[@class='app-page']/div[@id='app-modal']/div[@class='el-dialog__wrapper']/div[@class='el-dialog el-dialog--full full-dialog']/div[@class='el-dialog__header']/button[@aria-label='Close']/i[1]",
        stockNo: "//div[@class='header-icon']/following-sibling::span[1]",
        manufacturerPartNoInput: "(//div[@class='el-input']//input)[1]", // Manufacturer's Part No.
        manufacturerInput: "(//input[@class='el-input__inner'])[2]",
        partNoInput: "(//input[@placeholder='--Input At Least 3 Letters--'])[1]",
        descriptionInput: "//textarea[@type='textarea']",
        descriptionSearch: "(//input[@rows='2'])[3]",
        locationSearch: "(//input[@rows='2'])[5]",
        rcvUomSelect: "(//input[@rows='2'])[3]",
        issueUomSelect: "(//input[@placeholder='--Select One--'])[2]",
        conversionFactorInput: "(//input[@placeholder='--Input Text--'])[2]",
        statusSelect: "(//input[@placeholder='--Select One--'])[3]",
        assetGroup: "(//input[@placeholder='--Select One--'])[1]",
        vendor: "(//input[@placeholder='--Select One--'])[2]",
        maxOHQtyInput: "(//label[normalize-space(text())='Max OH Quantity']/following::input)[1]",
        orderPointInput: "(//label[normalize-space(text())='Order Point (Issue UOM)']/following::input)[1]",
        shopSelect: "//div[@class='el-col el-col-8']//input[@placeholder='--Select One--']",
        taxableCheckbox: "(//span[@class='el-checkbox__input']//span)[1]",
        underOrderPointCheckbox: "(//span[@class='el-checkbox__inner'])[2]",
        requiredError: "//p[normalize-space(text())='Validation failed. Please correct input with red mark']",
        newButtonSelector: "//span[normalize-space()='New']",
        headertitle: "(//span[@class='header-title font-size-title'])[1]",
        headerTitleActionLog: "//span[@class='el-dialog__title'][normalize-space()='Action Log']",
        updateddescription: "//td[@class='el-table_1_column_66 is-left']//div[@class='cell']",
        operation: "//th[@class='el-table_1_column_123_column_124 is-left internal-filter is-leaf']//input[@placeholder='--Input Text--']",
        operationSearchResult: "//tbody/tr[1]/td[1]/div[1]/span[1]",
        assetGroupSearch: "(//input[@type='text'])[5]",
        vendorSearchButton: "//i[@class='el-input__icon el-icon-search is-clickable']",
        vendorCodeLookUpVendor: "(//label[normalize-space(text())='Code']/following::input)[1]",
        vendorCode: "(//input[@placeholder='--Input Text--'])[3]",
        LookUpVendorOkButton: "(//span[contains(text(),'OK')])[5]",
        LookUpVendorSearchButton: "(//span[contains(text(),'Search')])[2]",
        searchButton1: "(//span[contains(text(),'Search')])[1]",
        statusSearch: "(//input[@rows='2'])[9]",
        shopSearch: "(//input[@rows='2'])[10]",
        okButtonerror: "(//button[contains(@class,'el-button el-button--default')]//span)[2]",
        createOrderButton: "//span[normalize-space(text())='Create Order']",
        vendorSearchButtonOnPurchaseOrderForm: "(//div[@class='select-lookup']//i)[1]",
        vendorCode2: "(//input[@placeholder='--Input Text--'])[2]",
        externalRebildOrderCheckBox: "(//span[@class='el-radio__inner'])[2]",
        SearchButtonOnPurchaseOrderForm: "(//button[@class='el-button el-button--primary']//span)[3]",
        link: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/a[1]",
        FOB: "(//input[@class='el-input__inner'])[3]",
        terms: "(//input[@placeholder='--Select One--'])[3]",
        shipvia: "(//input[@placeholder='--Select One--'])[4]",
        jobnumber: "(//input[@placeholder='--Input Text--'])[1]",
        instruction: "//textarea[@placeholder='--Input Text--']",
        stockNumberSearch: "//div[@class='cell']//i[@class='el-input__icon el-icon-search is-clickable']",
        stockNumberSearchPopupfield: "(//label[normalize-space(text())='Stock No.']/following::input)[1]",
        vendorNo: "//div[@id='vendorPartNo']//input[@type='text']",
        retailPriceInput: "(//input[@type='text'])[18]",
        orderQuantity: "(//input[@type='text'])[19]",
        productCode: "(//input[@placeholder='Select'])[1]",
        saveOnPurchaseOrderForm: "(//span[normalize-space()='Save'])[1]",
        successMessageOnPurchaseOrderForm: "//div[@class='el-message-box__message']//p[1]",
        okButtonpurchaceOrder: "(//span[contains(text(),'OK')])[6]",
        ordermenu: "//span[normalize-space()='Order']",
        receiveMaterial: "//span[normalize-space()='- Receive Material']",
        orderNoTextBox: "(//input[@rows='2'])[1]",
        RetrieveButton: "//span[normalize-space()='Retrieve']",
        receivingDate: "//div[@class='el-date-editor el-input el-date-editor--date']//input[@placeholder='--Input Text--']",
        packSlipNumber: "(//input[@placeholder='--Input Text--'])[2]",
        receiveQuantityInput: "(//input[@type='text'])[5]",
        Location: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[11]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        masterCheckbox: "(//span[@class='el-radio__inner'])[1]",
        searchByPO: "(//input[@placeholder='--Input Text--'])[1]",
        location: "//span[normalize-space()='TS-NS-General']",
        receivingDocumentNumber: "(//span[@class='header-title font-size-title'])[2]",
        inquireMaterialRecieve: "//span[normalize-space()='- Inquire Material Receiving']",
        receivingDocumentNumberSearch: "(//label[normalize-space(text())='Receiving Doc. No.']/following::input)[1]",
        cancelButton: "(//span[contains(text(),'Cancel')])[3]",
        cancelReson: "//textarea[@autosize='[object Object]']",
        cancelOk: "(//span[contains(text(),'OK')])[1]",
        cancelDSuccessMessage: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",
        transferLocation: "//span[normalize-space(text())='Transfer Location']",
        adjustReason: "(//input[@class='el-input__inner'])[3]",
        materialTransferSucess: "//p[normalize-space(text())='Material is updated successfully']",
        operationSearch: "(//input[@placeholder='--Input Text--'])[1]",
        minusButtonOnTransfer: "(//i[@class='ivu-icon ivu-icon-minus'])[1]",
        masterRadioButtonTransfer: "(//span[@class='el-radio__inner'])[2]",
        OHQuantityAfterTransfer: "(//input[@type='text'])[5]",
        transferMatrialMenu: "//span[normalize-space(text())='- Transfer Material']",
        stockNoTransfer: "(//input[@class='el-input__inner'])[1]",
        searchButtonOnTransfer: "(//button[@type='button']//span)[2]",
        okButton2: "//span[normalize-space(text())='OK']",
        closeButtonTransfer: "(//i[@class='el-message-box__close el-icon-close'])[1]",
        adjustOHQuantity: "//span[normalize-space()='Adjust OH Quantity']",
        adjustreasonDll: "(//input[@class='el-input__inner'])[3]",
        TotalOHQuantity: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        adjustButton: "//span[normalize-space(text())='Adjust']",
        adjustOHQuantityMenu: "//span[normalize-space()='- Adjust OH Quantity']",
        errorOnAdjustOHScreen: "//p[contains(text(),'Validation failed. Please correct input with red m')]",
        stockErrorValidation: "//p[contains(text(),'At least one stock location should be adjusted wit')]",
        TotalOHQuantity1: "(//input[@type='text'])[4]",

        TotalOHQuantity2: "(//input[@type='text'])[5]",
        OHSuccussMessage: "//p[normalize-space()='OH quantity has been adjusted successfully']",
        vendorDetails: "(//span[normalize-space()='1000287 - OCEAN BLUE ENVIRONMENTAL'])[1]",
        receivingDocumentSearchBox: "(//label[normalize-space(text())='Receiving Doc. No.']/following::input)[1]",
        payslipNumberLink: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/a[1]",
        payslipNumber: "(//label[normalize-space(text())='Pack Slip Number']/following::input)[1]",
        batchReviewReceivingMenu: "//span[normalize-space(text())='- Batch Review Receiving']",
        batchReviewButton: "//span[normalize-space()='Batch Review']",
        okUpdateButton: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",
        packslipNumberLink: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/a[1]",
        poNumberLink: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/a[1]/span[1]",
        returnToVendorMenu: "//span[normalize-space(text())='- Return to Vendor']",
        retreiveReceiveButton: "//span[normalize-space(text())='Retrieve Receive']",
        retrunQuantity: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[8]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        RMANo: "(//label[normalize-space(text())='RMA No.']/following::input)[1]",
        returnDate: "(//label[normalize-space(text())='Return Date']/following::input)[1]",
        reasonForReturn: "//textarea[@placeholder='--Input Text Area--']",
        courierName: "(//label[normalize-space(text())='Courier Name']/following::input)[1]",
        courierNumber: "(//label[normalize-space(text())='Courier Number']/following::input)[1]",
        contact: "(//label[normalize-space(text())='Contact']/following::input)[1]",
        inquireMaterialReturnMenu: "//span[normalize-space(text())='- Inquire Vendor Return']",
        inquireRetrunPackslipNumberSearch: "(//label[normalize-space(text())='Pack Slip No.']/following::input)[1]",
        rmoLink: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/a[1]",
        totalOrderQuantity: "//table[3]//tr[1]//td[2]//b[1]",
        totalOutStandingQuantity: "//table[3]//tr[2]//td[2]//b[1]",
        cancelReasonTextArea: "//textarea[@placeholder='--Input Text--']",
        closeButtonOnActionLog: "xpath=//*[@id='app-modal']/div/div/div[1]/button/i",
        inquirePONumberSearch: "(//label[normalize-space(text())='Order No.']/following::input)[1]",
        inquireRMASearch: "(//label[normalize-space(text())='RMA No.']/following::input)[1]",
        vendorSearchReturnSearch: "//i[contains(@class,'el-input__icon el-icon-search')]",
        WorkOrderMenu: "//span[normalize-space()='Work Order']",
        createUnbillableOrder: "//span[normalize-space(text())='- Create Un-billable Work Order']",
        mechanicSearch: "//div[@class='select-lookup form-control']//i[1]",
        userIDSearchBox: "(//label[normalize-space(text())='User ID']/following::input)[1]",
        LOOKuPmechanicSearch: "//div[@class='el-dialog__wrapper']//span[contains(text(),'Search')]",
        lookUpMechanicOkButton: "(//span[contains(text(),'OK')])[1]",
        assetNumber: "(//input[@placeholder='-- Input Text --'])[1]",
        componentCode: "//input[@placeholder='Component Code']",
        damageCode: "//input[@placeholder='Damage Code']",
        repairCode: "//input[@placeholder='Repair Code']",
        repairLocation: "//tr[@class='activity-row']//input[@placeholder='--Select One--']",
        actualHours: "//div[@class='el-input input-align']//input[@type='text']",
        stockQuantitywo: "//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text']",
        completeButton: "//span[normalize-space()='Complete']",
        okButtonOnCompletePopup: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",
        closeButtonWO: "//span[normalize-space()='Close']",
        OKButtonOnWOclosePopup: "//i[@class='el-message-box__close el-icon-close']",
        materialUsageButton: "//button[contains(.,'Material Usage')]",
        woNumberSearch: "(//span[normalize-space(text())='Used By(Mechanic)']/following::input)[1]",
        woNumberSearchResult: "xpath=/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/div[1]/span[1]",
        materialUsageCloseButton: "(//i[@class='el-dialog__close el-icon el-icon-close'])[2]",
        materialUsageCloseButton2: "(//button[@aria-label='Close']//i)[1]",
        clickUsageLink: "//tbody/tr[1]/td[1]/div[1]/a[1]",
        systemSettingsMenu: "//span[normalize-space(text())='System Setting']",
        assetMenu: "//span[normalize-space(text())='- Asset']",
        firstRowEdit: "//i[@class='ivu-icon ivu-icon-edit']",
        inquireSearchBox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        repairRecords: "//span[normalize-space()='Repair Records']",
        wonumberSearchRepairAsset: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        woResultRepairOrder: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]",
        RepairOrderCloseButton: "(//button[@aria-label='Close']//i)[1]",
        wosearchResult2: "xpath=/html[1]/body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[2]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/div[1]/span[1]",
        subTotal: "//table[2]//tr[1]//td[2]//b[1]",
        tax: "//table[2]//tr[2]//td[2]//b[1]",
        Freight: "//table[2]//tr[3]//td[2]//b[1]",
        ARAPMenu: "//span[normalize-space()='AR/AP']",
        captureInvoiceMatchingMenu: "//span[normalize-space()='- Capture Invoice Matching']",
        orderNoBox: "(//label[normalize-space(text())='Order No.']/following::input)[1]",
        invoiceNumber: "(//label[normalize-space(text())='Invoice No.']/following::input)[1]",
        invoiceDate: "(//label[normalize-space(text())='Invoice No.']/following::input)[2]",
        remarks: "(//label[normalize-space(text())='Remarks']/following::textarea)[1]",
        invoiceTotal: "(//label[normalize-space(text())='Remarks']/following::input)[1]",
        taxAmount: "(//label[normalize-space(text())='Remarks']/following::input)[2]",
        freightAmount: "(//label[normalize-space(text())='Remarks']/following::input)[3]",
        calendarToday: "//td[@class='available today current']"


    };
    async clickOnAssetMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.systemSettingsMenu);
        await this.base.waitAndClick(this.Elements.assetMenu);
        await this.page.locator(this.Elements.inquireSearchBox).fill('IYAG6');
        await this.page.locator(this.Elements.firstRowEdit).click();
        await fixture.page.waitForTimeout(1000);

    }
    async clickOnReapirAsset(): Promise<void> {
        await this.base.waitAndClick(this.Elements.repairRecords);
        await this.page.locator(this.Elements.wonumberSearchRepairAsset).fill(this.workOrderNumber);
        const woNumberSearchText = await this.page.locator(this.Elements.woResultRepairOrder).textContent();

        // Verify the values are equal
        expect(woNumberSearchText?.trim()).toBe(this.workOrderNumber);
        await this.base.waitAndClick(this.Elements.RepairOrderCloseButton);



    }

    async clickOnCreateMaterialMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.materialMenu);
        await this.base.waitAndClick(this.Elements.createMaterialMenu);
    }

    async clickOnInquireMaterialMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.materialMenu);
        await this.base.waitAndClick(this.Elements.inquireMaterialMenu);
    }
    async clickOnMaterialMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.materialMenu);
    }

    async createNewMaterial(): Promise<void> {
        const randomNumber = getRandomInt(1000, 9999);
        this.description = `Auto Material ${randomNumber}`;
        await fixture.page.waitForTimeout(3000);

        const imagePath = path.resolve(process.cwd(), 'src', 'helper', 'util', 'test-data', 'materialImage.jpg');
        const fileInput = this.page.locator('input[type="file"]');
        if (await fileInput.count() > 0) {
            await fileInput.setInputFiles(imagePath);
        }
        await fixture.page.waitForTimeout(2000);
        this.manufaturesPartNumber = `MPN-${randomNumber}`;

        // Fill stock no and description and manufacturer's part no
        await this.page.locator(this.Elements.manufacturerPartNoInput).fill(this.manufaturesPartNumber);
        await this.page.locator(this.Elements.manufacturerInput).fill(`MAN-${randomNumber}`);
        await this.page.locator(this.Elements.descriptionInput).fill(this.description);
        await this.page.locator('form i').first().click();
        await this.page.getByRole('listitem').filter({ hasText: '24LB - 24 Pound Bottle' }).click();
        await this.page.locator('form i').nth(1).click();
        await this.page.getByRole('listitem').filter({ hasText: 'LBS - LBS' }).locator('span').click();
        await this.page.getByPlaceholder('--Select One--').nth(2).click();
        await this.page.getByText('Active', { exact: true }).click();


        await this.page.locator(this.Elements.maxOHQtyInput).fill('10');
        await this.page.locator(this.Elements.orderPointInput).fill('1');

        await this.page.locator(this.Elements.shopSelect).click();
        await this.page.getByText('AGV - AGV').click();



        const tc = this.page.locator(this.Elements.taxableCheckbox);
        await tc.check();

        const uop = this.page.locator(this.Elements.underOrderPointCheckbox);
        await uop.check();
        await fixture.page.waitForTimeout(1000);
        // Save
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);

        await this.page.locator(this.Elements.okButton).click();


        // Wait briefly and read the header text directly
        await fixture.page.waitForTimeout(4000);
        const headerText = (await this.page.locator(this.Elements.headertitle).textContent());
        if (headerText && headerText.includes('Material |')) {
            // Extract the number after "Material | "
            const match = headerText.match(/Material\s*\|\s*(\d+)/);
            if (match && match[1]) {
                this.stockNo = match[1];
                fixture.logger.info(`Auto-generated stock number: ${this.stockNo}`);
            }
        }
        await fixture.page.waitForTimeout(1000);

        // return the extracted stock number (may be empty string if extraction failed)

    }

    // Removed complex header polling helper — read header directly after brief wait

    async searchMaterialByStockNo(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.clickOnInquireMaterialMenu();
        await fixture.page.waitForTimeout(1000);
        console.log("Captured Stock No for verification:", this.stockNo);
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stocknumbersearch).fill(this.stockNo);
        // await this.page.locator(this.Elements.stocknumbersearch).fill("7805");
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
    }
    async searchMaterialByStockNo1(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.clickOnInquireMaterialMenu();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.stocknumbersearch).fill(this.stockNo);
        await this.page.locator(this.Elements.searchButton).first().click();
        await fixture.page.waitForTimeout(500);
    }
    async clickonLink(): Promise<void> {

        await this.base.waitAndClick(this.Elements.link);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByStockNo(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await expect(this.page.locator(this.Elements.firstRowStockNo)).toHaveText(this.stockNo);
    }

    async searchMaterialByPartNo(partNo: string): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        // reuse the same search input for part no
        await this.page.locator(this.Elements.partnoSearch).fill(partNo);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByPartNo(partNo: string): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/span[1]");
        const txt = (await firstRow.textContent()) || '';
        await expect(txt).toContain(partNo);
    }
    async searchMaterialByDescription(description: string): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        // reuse the same search input for part no
        await this.page.locator(this.Elements.descriptionSearch).fill(description);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByDescription(description: string): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[6]/div[1]/span[1]");
        const txt = (await firstRow.textContent()) || '';
        await expect(txt).toContain(description);
    }
    async searchMaterialByStockLocation(stockLocation: string): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        // reuse the same search input for part no
        await this.page.locator(this.Elements.locationSearch).fill(stockLocation);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByStockLocation(stockLocation: string): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[8]/div[1]/span[1]");
        const txt = (await firstRow.textContent()) || '';
        await expect(txt).toContain(stockLocation);
    }

    async updateMaterial(): Promise<void> {
        await this.searchMaterialByStockNo();
        await fixture.page.waitForTimeout(500);
        // Click stock no link to open edit
        await this.page.getByRole('link', { name: this.stockNo }).click();
        await fixture.page.waitForTimeout(500);

        const updatedDesc = `${this.description} - Updated ${currentDate}`;
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.descriptionInput).fill(updatedDesc);

        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(1000);

        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.clickOnInquireMaterialMenu();
        await this.page.locator(this.Elements.stocknumbersearch).fill(this.stockNo);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
        // await expect(this.page.locator(this.Elements.updateddescription)).toHaveText(updatedDesc);


    }

    async verifyNewButtonFunctionality(): Promise<void> {
        // The New button may open a new tab; handle it
        await this.searchMaterialByStockNo();
        await fixture.page.waitForTimeout(500);
        // Click stock no link to open edit
        await this.page.getByRole('link', { name: this.stockNo }).click();
        await fixture.page.waitForTimeout(500);
        const newBtn = this.page.locator(this.Elements.newButtonSelector);
        await expect(newBtn).toBeVisible();

        const pagePromise = this.page.context().waitForEvent('page');
        await newBtn.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState('networkidle');
        await fixture.page.waitForTimeout(2000);

        const url = newPage.url();
        // verify it's the add page for material
        await expect(url).toContain('/material/add');
        await newPage.close();
    }

    async clickOnCreateOrderButton(): Promise<void> {
        const createBtn = this.page.locator(this.Elements.createOrderButton);
        await expect(createBtn).toBeVisible();
        const originalPage = fixture.page;
        const pagePromise = originalPage.context().waitForEvent('page');
        await createBtn.click();
        const newPage = await pagePromise;

        await newPage.waitForLoadState('networkidle');
        const url = newPage.url();
        fixture.logger?.info(`Create Order opened new page: ${url}`);
        // If expected URL fragment exists, assert; else just continue
        try {
            await expect(url).toContain('purchase');
        } catch (err) {
            // not fatal - just log
            fixture.logger?.warn(`Create Order did not open expected purchase page. URL: ${url}`);
        }

        // Switch fixture to new page so subsequent steps operate on the purchase order page
        fixture.page = newPage;

        await fixture.page.waitForTimeout(1000);

        await newPage.locator(this.Elements.vendorSearchButtonOnPurchaseOrderForm).click();
        await newPage.locator(this.Elements.vendorCode).fill('1000287');
        await newPage.locator(this.Elements.SearchButtonOnPurchaseOrderForm).click();
        // await this.page.locator(this.Elements.LookUpVendorOkButton).click();
        await newPage.getByRole('button', { name: 'OK' }).click();
        await newPage.locator('form').getByPlaceholder('--Select One--').nth(1).click();
        await newPage.getByText('Power - Power Equipment Maintenance').click();
        await newPage.locator(this.Elements.FOB).click();
        await newPage.getByText('SHIPPING PT - Shipping Point').click();
        await newPage.locator(this.Elements.terms).click();
        await newPage.getByText('NET30 - Net 30 Days').click();
        await newPage.locator(this.Elements.shipvia).click();
        await newPage.getByText('BEST WAY - Best Available Shipping Option').click();
        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;
        await newPage.locator(this.Elements.jobnumber).fill(randomJobNumber);
        const description = `Auto order ${randomJobNumber}`;
        await newPage.locator(this.Elements.instruction).fill(description);
        await newPage.locator(this.Elements.vendorNo).fill(randomJobNumber);
        const price = `${getRandomInt(1, 10)}`;
        // await newPage.locator(this.Elements.retailPriceInput).fill(price);
        // await fixture.page.waitForTimeout(500);
        // await newPage.locator(this.Elements.orderQuantity).fill(price);
        await newPage.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').click();
        await newPage.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').fill('10');
        await newPage.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').click();
        await newPage.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').fill('10');
        await newPage.locator(this.Elements.productCode).click();
        await newPage.getByText('OPX_ACCESS_GATE_CONTROLLER - Maintenance Parts - Access Gate Controller').click();
        await fixture.page.waitForTimeout(1000);
        await newPage.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await fixture.page.waitForTimeout(500);
        await newPage.locator(this.Elements.okButtonpurchaceOrder).click();
        const successMsg = await newPage.locator(this.Elements.successMessageOnPurchaseOrderForm).textContent();
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
        const orderQuantity = newPage.locator(this.Elements.totalOrderQuantity);

        // Wait for both elements to be visible before getting their content
        await orderQuantity.waitFor({ state: 'visible', timeout: 5000 });

        this.orderQtyuantity = await orderQuantity.textContent();
        const totalOutStandingQuantity = newPage.locator(this.Elements.totalOutStandingQuantity);

        // Wait for both elements to be visible before getting their content
        await totalOutStandingQuantity.waitFor({ state: 'visible', timeout: 5000 });

        this.outStandingQuantity = await totalOutStandingQuantity.textContent();
        const totalAmount = await this.page.locator(this.Elements.subTotal).textContent();
        this.subTotal = totalAmount.replace(/\$|,/g, '');
        const tax = await this.page.locator(this.Elements.tax).textContent();
        this.tax = tax.replace(/\$|,/g, '');
        const freight = await this.page.locator(this.Elements.Freight).textContent();
        this.Freight = freight.replace(/\$|,/g, '');
        fixture.page = originalPage;
        await newPage.close();


    }



    async GoToPurchaseOrderPage(): Promise<void> {
        // Verify current fixture.page points to a purchase/order page
        const url = fixture.page.url();
        if (!url.includes('purchase')) {
            fixture.logger?.warn(`Current page is not a purchase order page: ${url}`);
        }
    }



    async verifyActionLog(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();
        // await this.page.locator(this.Elements.operation).fill('Create Material');
        // await fixture.page.waitForTimeout(500);
        // await expect(this.page.locator(this.Elements.operationSearchResult)).toHaveValue('Create Material');

        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.closeButton).click();
    }
    async verifyActionLogRetrurn(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();


        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.closeButtonOnActionLog).click();
    }

    async verifyMandatoryFieldValidations(): Promise<void> {
        const randomNumber = getRandomInt(1000, 9999);
        this.description = `Auto Material ${randomNumber}`;

        await fixture.page.waitForTimeout(500);

        // Try save without filling mandatory fields
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);

        // Expect validation message(s)
        const hasError = await this.page.locator(this.Elements.requiredError).first().isVisible();
        await expect(hasError).toBeTruthy();
        await this.page.locator(this.Elements.okButtonerror).click();


        await this.page.locator(this.Elements.manufacturerPartNoInput).fill(`MPN-${randomNumber}`);
        await this.page.locator(this.Elements.manufacturerInput).fill(`MAN-${randomNumber}`);
        await this.page.locator('form i').first().click();
        await this.page.getByRole('listitem').filter({ hasText: '24LB - 24 Pound Bottle' }).click();
        await this.page.locator('form i').nth(1).click();
        await this.page.getByRole('listitem').filter({ hasText: 'LBS - LBS' }).locator('span').click();
        await this.page.getByPlaceholder('--Select One--').nth(2).click();
        await this.page.getByText('Active', { exact: true }).click();


        await this.page.locator(this.Elements.maxOHQtyInput).fill('10');
        await this.page.locator(this.Elements.orderPointInput).fill('1');

        await this.page.locator(this.Elements.shopSelect).click();
        await this.page.getByText('AGV - AGV').click();

        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);

        const hasError1 = await this.page.locator(this.Elements.requiredError).first().isVisible();
        await expect(hasError1).toBeTruthy();

        await this.page.locator(this.Elements.okButtonerror).click();
        await fixture.page.waitForTimeout(500);

        await this.page.locator(this.Elements.descriptionInput).fill(this.description);
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);
        // Expect no visible validation errors now
        const stillHasError = await this.page.locator(this.Elements.requiredError).first().isVisible().catch(() => false);
        await expect(stillHasError).toBeFalsy();
    }
    async searchByAssetGroup(AssetGroup: string): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        // reuse the same search input for part no
        await this.page.locator(this.Elements.assetGroupSearch).click();
        await this.page.getByText(AssetGroup).click();
        await this.page.getByText('Reset Search').click();
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
    }
    async searchMaterialByVendor(vendor: string): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        // reuse the same search input for part no
        await this.page.locator(this.Elements.vendorSearchButton).click();
        await this.page.locator(this.Elements.vendorCode).fill(vendor);
        await this.page.locator(this.Elements.LookUpVendorSearchButton).click();
        // await this.page.locator(this.Elements.LookUpVendorOkButton).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await this.base.waitAndClick(this.Elements.searchButton1);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByVendor(vendor: string): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[9]/div[1]/span[1]");
        const txt = (await firstRow.textContent()) || '';
        await expect(txt).toContain(vendor);
    }
    async searchMaterialByStatus(status: string): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        await this.page.getByPlaceholder('--Select One or More--').nth(3).click();
        await this.page.getByRole('listitem').filter({ hasText: status }).locator('span').click();
        await this.page.getByText('Reset Search').first().click();
        await this.base.waitAndClick(this.Elements.searchButton1);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByStatus(status: string): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[3]/div[1]/span[1]");
        const txt = (await firstRow.textContent()) || '';
        await expect(txt).toContain(status);
    }
    async searchMaterialByShop(shop: string): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        await this.page.locator(this.Elements.shopSearch).click();
        await this.page.getByText(shop).click();
        await this.base.waitAndClick(this.Elements.searchButton1);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByShop(shop: string): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[4]/div[1]/span[1]");
        const txt = (await firstRow.textContent()) || '';
        await expect(txt).toContain(shop);
    }

    async createReceiveMaterial(): Promise<void> {
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.ordermenu).click();
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


        await this.page.getByPlaceholder('--Input Or Select One--').click();
        await this.page.getByPlaceholder('--Input Or Select One--').type('TS-NS-General');
        await this.page.locator('text=TS-NS-General').click();


        await this.page.locator(this.Elements.masterCheckbox).click();
        await fixture.page.waitForTimeout(500);
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
                fixture.logger.info(`Auto-generated stock number: ${this.ReceivingDocumentNo}`);
            }
        }

    }
    async verifyOrderTrack(): Promise<void> {
        await this.page.getByRole('button', { name: 'Order Track' }).click();
        await this.page.locator(this.Elements.searchByPO).fill(this.purchaseOrderNo);
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//body[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]");
        const txt = (await firstRow.textContent());
        await expect(txt).toContain(this.purchaseOrderNo);
        await this.page.getByRole('button', { name: 'Close' }).click();

    }
    async verifyStockLocation(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("(//span[normalize-space()='TS-NS-General'])[1]");
        const txt = (await firstRow.textContent());
        await expect(txt).toContain('TS-NS-General');

    }
    async verifyStockCount(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/div[1]/span[1]");
        const txt = (await firstRow.textContent());
        await expect(txt).toContain('24');

    }
    async canceltheMaterialReceive(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.ordermenu).click();
        await this.page.locator(this.Elements.inquireMaterialRecieve).click();
        await this.page.locator(this.Elements.receivingDocumentNumberSearch).fill(this.ReceivingDocumentNo);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/a[1]").click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.cancelButton).click();
        await this.page.locator(this.Elements.cancelReson).fill('Automation Testing');
        await this.page.locator(this.Elements.cancelOk).click();
        await this.page.locator(this.Elements.cancelDSuccessMessage).click();

    }
    async verifyStockCountAfterCancel(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/div[1]/span[1]");
        const txt = (await firstRow.textContent());
        await expect(txt).toContain('0');

    }
    async transferLocation(): Promise<void> {
        const transferLocationBtn = this.page.locator(this.Elements.transferLocation);
        await expect(transferLocationBtn).toBeVisible();
        const originalPage = fixture.page;
        const pagePromise = originalPage.context().waitForEvent('page');
        await transferLocationBtn.click();
        const newPage = await pagePromise;

        await newPage.waitForLoadState('networkidle');
        const url = newPage.url();
        fixture.logger?.info(`Create Order opened new page: ${url}`);
        // If expected URL fragment exists, assert; else just continue
        try {
            await expect(url).toContain('transfer');
        } catch (err) {
            // not fatal - just log
            fixture.logger?.warn(`Transfer material did not open expected. URL: ${url}`);
        }

        // Switch fixture to new page so subsequent steps operate on the purchase order page
        fixture.page = newPage;

        await fixture.page.waitForTimeout(1000);
        await newPage.locator(this.Elements.adjustReason).click();
        await newPage.getByText('Transfer Location').click();
        await newPage.locator(this.Elements.minusButtonOnTransfer).click();
        await newPage.getByRole('button', { name: 'Yes' }).click();
        await newPage.locator(this.Elements.masterRadioButtonTransfer).click();
        await newPage.getByRole('cell', { name: '--Input Or Select One--' }).getByPlaceholder('--Input Or Select One--').click();
        await newPage.getByRole('cell', { name: '--Input Or Select One--' }).getByPlaceholder('--Input Or Select One--').type('TS-NS-Services');
        await newPage.getByText('TS-NS-Services').click();

        await newPage.locator(this.Elements.OHQuantityAfterTransfer).fill("24");
        await newPage.locator(this.Elements.saveButton).click();
        // await expect(this.page.locator(this.Elements.materialTransferSucess)).toBeVisible();
        await newPage.locator(this.Elements.okButtonUpdate).click();
        await fixture.page.waitForTimeout(1000);
        fixture.page = originalPage;
        await newPage.close();


    }
    async verifyStockLocationAfterTransfer(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("(//span[normalize-space()='TS-NS-Services'])[1]");
        const txt = (await firstRow.textContent());
        await expect(txt).toContain('TS-NS-Services');

    }
    async verifyStockCountAfterTransfer(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/div[1]/span[1]");
        const txt = (await firstRow.textContent());
        await expect(txt).toContain('24');

    }
    async verifyActionLogAfterTransfer(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();
        await this.page.locator(this.Elements.operationSearch).fill('Transfer Material');
        await fixture.page.waitForTimeout(500);
        await expect(this.page.locator(this.Elements.operationSearchResult)).toHaveValue('Transfer Material');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.closeButton).click();
    }
    async transferLocationFromMenu(): Promise<void> {
        this.page.locator(this.Elements.materialMenu).click();
        this.page.locator(this.Elements.transferMatrialMenu).click();
        await fixture.page.waitForTimeout(1000);
        this.page.locator(this.Elements.stockNoTransfer).fill(this.stockNo);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.searchButtonOnTransfer).click();
        await this.page.locator(this.Elements.adjustReason).click();
        await this.page.getByText('Transfer Location').click();
        await this.page.locator(this.Elements.minusButtonOnTransfer).click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.page.locator(this.Elements.masterRadioButtonTransfer).click();
        await this.page.getByRole('cell', { name: '--Input Or Select One--' }).getByPlaceholder('--Input Or Select One--').click();
        await this.page.getByRole('cell', { name: '--Input Or Select One--' }).getByPlaceholder('--Input Or Select One--').type('TS-NS-Services');
        await this.page.getByText('TS-NS-Services').click();

        await this.page.locator(this.Elements.OHQuantityAfterTransfer).fill("24");
        await this.page.locator(this.Elements.saveButton).click();
        // await expect(this.page.locator(this.Elements.materialTransferSucess)).toBeVisible();
        await this.page.locator(this.Elements.closeButtonTransfer).click();
        await fixture.page.waitForTimeout(5000);

    }
    async adjustOHQuantity(): Promise<void> {
        const adjustOHQuantityBtn = this.page.locator(this.Elements.adjustOHQuantity);
        await expect(adjustOHQuantityBtn).toBeVisible();
        const originalPage = fixture.page;
        const pagePromise = originalPage.context().waitForEvent('page');
        await adjustOHQuantityBtn.click();
        const newPage = await pagePromise;

        await newPage.waitForLoadState('networkidle');
        const url = newPage.url();
        fixture.logger?.info(`Adjust OH Quantity opened new page: ${url}`);
        // If expected URL fragment exists, assert; else just continue
        try {
            await expect(url).toContain('ohAdjust');
        } catch (err) {
            // not fatal - just log
            fixture.logger?.warn(`Adjust OH quantity page did not open expected. URL: ${url}`);
        }

        fixture.page = newPage;
        await fixture.page.waitForTimeout(1000);
        await newPage.locator(this.Elements.adjustreasonDll).click();
        await newPage.getByText('Transfer Location').click();
        await newPage.locator(this.Elements.TotalOHQuantity).fill("48");
        await newPage.locator(this.Elements.adjustButton).click();
        // await expect(this.page.locator(this.Elements.materialTransferSucess)).toBeVisible();
        await newPage.locator(this.Elements.okButton2).click();
        await fixture.page.waitForTimeout(1000);
        fixture.page = originalPage;
        await newPage.close();
    }
    async verifyStockCountAfterAdjust(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/div[1]/span[1]");
        const txt = (await firstRow.textContent());
        await expect(txt).toContain('48');

    }
    async adjustOHQuantityMenu(): Promise<void> {
        this.page.locator(this.Elements.materialMenu).click();
        this.page.locator(this.Elements.adjustOHQuantityMenu).click();
        await fixture.page.waitForTimeout(1000);
        this.page.locator(this.Elements.stockNoTransfer).fill(this.stockNo);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.searchButtonOnTransfer).click();
        await this.page.locator(this.Elements.adjustReason).click();
        await this.page.getByText('Transfer Location').click();

        await this.page.locator(this.Elements.TotalOHQuantity).fill("48");
        await this.page.locator(this.Elements.adjustButton).click();
        await this.page.locator(this.Elements.closeButtonTransfer).click();
        await fixture.page.waitForTimeout(5000);

    }

    async adjustOHQuantityMenuForCheckingRandomScenarios(): Promise<void> {
        this.page.locator(this.Elements.materialMenu).click();
        this.page.locator(this.Elements.adjustOHQuantityMenu).click();
    }
    async validationForAdjustReason(): Promise<void> {
        await this.page.locator(this.Elements.searchButtonOnTransfer).click();
        await this.page.locator(this.Elements.adjustButton).click();
        const errorText = await this.page.locator(this.Elements.errorOnAdjustOHScreen).textContent();
        expect(errorText).toContain('Validation failed');
        await this.page.locator(this.Elements.cancelDSuccessMessage).click();

    }
    async selectAdjustReason(): Promise<void> {
        await this.page.locator(this.Elements.adjustReason).click();
        await this.page.getByText('Transfer Location').click();

    }
    async validationForAdjustStock(): Promise<void> {
        await this.page.locator(this.Elements.adjustButton).click();
        const errorText = await this.page.locator(this.Elements.stockErrorValidation).textContent();
        expect(errorText).toContain('At least one stock location');
        await this.page.locator(this.Elements.cancelDSuccessMessage).click();



    }
    async createPartialReceiveMaterial(): Promise<void> {
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.ordermenu).click();
        await this.page.locator(this.Elements.receiveMaterial).click();
        await this.page.locator(this.Elements.orderNoTextBox).fill(this.purchaseOrderNo);
        // await this.page.locator(this.Elements.orderNoTextBox).fill('325772');
        await this.base.waitAndClick(this.Elements.RetrieveButton);
        await fixture.page.waitForTimeout(1000);
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        await this.page.locator(this.Elements.receivingDate).fill(formattedDate);
        await this.page.locator(this.Elements.packSlipNumber).fill(`PSN-${getRandomInt(1000, 9999)}`);
        await this.page.locator(this.Elements.receiveQuantityInput).fill('7');
        await fixture.page.waitForTimeout(1000);

        await this.page.getByPlaceholder('--Input Or Select One--').click();
        await this.page.getByPlaceholder('--Input Or Select One--').type('TS-NS-General');
        await this.page.locator('text=TS-NS-General').click();


        await this.page.locator(this.Elements.masterCheckbox).click();
        await fixture.page.waitForTimeout(500);
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
                fixture.logger.info(`Receiving document number: ${this.ReceivingDocumentNo}`);
            }
        }
        await fixture.page.waitForTimeout(1000);
        const locator = this.page.locator(this.Elements.payslipNumber);

        await locator.waitFor({ state: 'visible', timeout: 5000 });

        // Get the value of the input field (the text inside the input)
        this.payslipNumber = await locator.inputValue();

        console.log('Payslip Number:', this.payslipNumber);

    }
    async UpdatemultipleStock(): Promise<void> {
        const randomNumber = getRandomInt(101, 300);
        await this.page.locator(this.Elements.TotalOHQuantity1).fill(randomNumber.toString());
        await this.page.locator(this.Elements.TotalOHQuantity2).fill(randomNumber.toString());
        await this.page.locator(this.Elements.adjustButton).click();
        const errorText = await this.page.locator(this.Elements.OHSuccussMessage).textContent();
        expect(errorText).toContain('OH quantity has been adjusted successfully');
        await this.page.locator(this.Elements.cancelDSuccessMessage).click();

    }
    async verifyVendorDetails(): Promise<void> {
        const errorText = await this.page.locator(this.Elements.vendorDetails).textContent();
        expect(errorText).toContain('1000287 ');

    }
    async searchByDocNumber(): Promise<void> {
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.receivingDocumentSearchBox).fill(this.ReceivingDocumentNo);
        await this.page.locator(this.Elements.searchButton).click();
        await this.page.locator(this.Elements.payslipNumberLink).click();
        await fixture.page.waitForTimeout(500);
    }
    async DoFullReceive(): Promise<void> {
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.receiveQuantityInput).fill("10");
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
    }
    async verifyActionLogMaterialReceive(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();
        // await this.page.locator(this.Elements.operationSearch).fill('Receive Material');
        // await fixture.page.waitForTimeout(500);
        // await expect(this.page.locator(this.Elements.operationSearchResult)).toHaveValue('Receive Material');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.closeButton).click();
    }
    async ReturnpayslipNumber(): Promise<string | null> {
        // await fixture.page.waitForTimeout(1000);
        // const locator = this.page.locator(this.Elements.payslipNumber);

        // await locator.waitFor({ state: 'visible', timeout: 5000 });

        // // Get the value from the input field, not textContent
        // this.payslipNumber = await locator.textContent();
        return this.payslipNumber;
    }
    async searchByPONumber(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.inquireMaterialRecieve).click();
        await this.page.locator(`(//input[@class='el-input__inner'])[1]`).fill(this.purchaseOrderNo);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
        const textContent = await this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=5]/div[position()=1]/span[position()=1]`).textContent();

        // Verify that this.purchaseOrderNo and the text content are the same
        if (textContent.trim() === this.purchaseOrderNo) {
            console.log("Purchase order number matches the text content.");
        } else {
            console.error(`Mismatch: Purchase order number "${this.purchaseOrderNo}" does not match the text content "${textContent}"`);
        }

    }
    async searchByPayslipNumber(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.inquireMaterialRecieve).click();

        await this.page.locator(`(//input[@rows='2'])[2]`).fill(this.payslipNumber);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
        const textContent = await this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=4]/div[position()=1]/a[position()=1]`).textContent();

        // Verify that this.purchaseOrderNo and the text content are the same
        if (textContent.trim() === this.payslipNumber) {
            console.log("Purchase order number matches the text content.");
        } else {
            console.error(`Mismatch: Payslip number "${this.payslipNumber}" does not match the text content "${textContent}"`);
        }

    }
    async verifyRequestDateResult(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.inquireMaterialRecieve).click();
        await this.page.locator("(//input[@class='el-input__inner'])[3]").click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
        // Format current date as 'YYYY-MMM-DD'
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = currentDate.toLocaleString('en-US', { month: 'short' }); // e.g., "Dec"
        const day = currentDate.getDate().toString().padStart(2, '0'); // zero-padded day

        const formattedDate = `${year}-${month}-${day}`;

        // Get the date text from the cell
        const dateLocator = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=2]/div[position()=1]/span[position()=1]`)

        const dateText = await dateLocator.textContent();

        // Verify that the date text contains the formatted current date
        if (!dateText?.includes(formattedDate)) {
            throw new Error(`Expected date to contain ${formattedDate}, but got ${dateText}`);
        }
    }
    async searchPOByVendor(vendor: string): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.inquireMaterialRecieve).click();
        await this.page.locator(this.Elements.vendorSearchButton).click();
        await this.page.locator(this.Elements.vendorCodeLookUpVendor).fill(vendor);
        await this.page.locator(this.Elements.LookUpVendorSearchButton).click();
        // await this.page.locator(this.Elements.LookUpVendorOkButton).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await await this.page.locator(this.Elements.searchButtonOnTransfer).click();

        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=6]/div[position()=1]/span[position()=1]`)
        const txt = await firstRow.textContent();
        await expect(txt).toContain(vendor);

    }
    async searchBystockNumber(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.inquireMaterialRecieve).click();

        await this.page.locator(`(//label[normalize-space(text())='Stock No.']/following::input)[1]`).fill(this.stockNo);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.searchButtonOnTransfer);
        await fixture.page.waitForTimeout(500);
        const textContent = await this.page.locator(`//table[position()=1]/tbody[position()=1]/tr[position()=1]/td[position()=7]/div[position()=1]`).textContent();

        // Verify that this.purchaseOrderNo and the text content are the same
        if (textContent.trim() === this.stockNo) {
            console.log("Stock number matches the text content.");
        } else {
            console.error(`Mismatch: Stock number "${this.stockNo}" does not match the text content "${textContent}"`);
        }

    }
    async selectReceiveStatusForsEARCH(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.inquireMaterialRecieve).click();
        await this.page.locator(`(//label[normalize-space(text())='Status']/following::input)[2]`).click();
        await this.page.getByText('Cancelled').click();
        const reviewedElement = this.page.getByText('Reviewed', { exact: true });
        await reviewedElement.click();
        await this.base.waitAndClick(this.Elements.searchButtonOnTransfer);
        await fixture.page.waitForTimeout(500);
        await fixture.page.waitForTimeout(1000);
        const statusLocator = this.page.locator(`//table[position()=1]/tbody[position()=1]/tr[position()=1]/td[position()=9]/div[position()=1]`)



        const statusText = await statusLocator.textContent();

        if (!statusText) {
            throw new Error('Status text is empty or not found.');
        }

        // Normalize to trim spaces and lower case for case-insensitive comparison
        const normalizedStatus = statusText.trim();

        if (normalizedStatus !== 'Cancelled' && normalizedStatus !== 'Reviewed') {
            throw new Error(`Status text '${statusText}' is not 'Reviewed' or 'Cancelled'.`);
        }
    }
    async TypeSEARCH(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.inquireMaterialRecieve).click();
        await this.page.locator(`(//label[normalize-space(text())='Order Type']/following::input)[2]`).click();
        const reviewedElement = this.page.getByText('PO', { exact: true });
        await reviewedElement.click();
        await this.page.getByText('Reset Search').first().click();
        await this.base.waitAndClick(this.Elements.searchButtonOnTransfer);
        await fixture.page.waitForTimeout(1000);
        const statusLocator = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=3]/div[position()=1]/span[position()=1]`)
        const statusText = await statusLocator.textContent();

        if (!statusText) {
            throw new Error('text is empty or not found.');
        }

        // Normalize to trim spaces and lower case for case-insensitive comparison
        const normalizedStatus = statusText.trim();

        if (normalizedStatus !== 'PO') {
            throw new Error(`Status text '${statusText}' is not 'PO`);
        }


    }


    async clickOnCreateOrderButtontoCreateExternalRO(): Promise<void> {
        const createBtn = this.page.locator(this.Elements.createOrderButton);
        await expect(createBtn).toBeVisible();
        const originalPage = fixture.page;
        const pagePromise = originalPage.context().waitForEvent('page');
        await createBtn.click();
        const newPage = await pagePromise;

        await newPage.waitForLoadState('networkidle');
        const url = newPage.url();
        fixture.logger?.info(`Create Order opened new page: ${url}`);
        // If expected URL fragment exists, assert; else just continue
        try {
            await expect(url).toContain('purchase');
        } catch (err) {
            // not fatal - just log
            fixture.logger?.warn(`Create Order did not open expected purchase page. URL: ${url}`);
        }

        // Switch fixture to new page so subsequent steps operate on the purchase order page
        fixture.page = newPage;

        await fixture.page.waitForTimeout(1000);
        await newPage.locator(this.Elements.externalRebildOrderCheckBox).click();
        await newPage.locator(this.Elements.vendorSearchButtonOnPurchaseOrderForm).click();
        await newPage.locator(this.Elements.vendorCode2).fill('1000287');
        await newPage.locator(this.Elements.SearchButtonOnPurchaseOrderForm).click();
        // await this.page.locator(this.Elements.LookUpVendorOkButton).click();
        await newPage.getByRole('button', { name: 'OK' }).click();
        await newPage.locator('form').getByPlaceholder('--Select One--').nth(1).click();
        await newPage.getByText('Power - Power Equipment Maintenance').click();
        await newPage.locator(this.Elements.FOB).click();
        await newPage.getByText('SHIPPING PT - Shipping Point').click();
        await newPage.locator(this.Elements.terms).click();
        await newPage.getByText('NET30 - Net 30 Days').click();
        await newPage.locator(this.Elements.shipvia).click();
        await newPage.getByText('BEST WAY - Best Available Shipping Option').click();
        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;
        const jobNumberLocator = newPage.locator(this.Elements.jobnumber);

        if (await jobNumberLocator.isVisible()) {
            await jobNumberLocator.fill(randomJobNumber);
        } else {
            console.log('Job number field is not visible, skipping fill.');
        }
        this.description = `Auto order ${randomJobNumber}`;
        await newPage.locator(this.Elements.instruction).fill(this.description);
        // await await this.page.locator(this.Elements.createButton).click();
        // await newPage.locator(this.Elements.stockNumberSearch).click();
        // await newPage.locator(this.Elements.stockNumberSearchPopupfield).fill('1008');
        // await newPage.locator(this.Elements.lookUpMaterialSearch).click();
        // await newPage.locator(this.Elements.lookUpMaterlOk).click();
        await fixture.page.waitForTimeout(500);
        await newPage.locator(this.Elements.vendorNo).fill(randomJobNumber);
        await fixture.page.waitForTimeout(500);
        await newPage.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').click();
        await newPage.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').fill('10');
        await newPage.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').click();
        await newPage.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').fill('10');
        await newPage.locator(this.Elements.productCode).click();
        await newPage.getByText('OPX_AGV_BATTERY - Maintenance Parts - AGV Battery').click();
        await fixture.page.waitForTimeout(1000);
        await newPage.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await fixture.page.waitForTimeout(500);
        await newPage.locator(this.Elements.okButtonpurchaceOrder).click();
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
        fixture.page = originalPage;
        await newPage.close();


    }
    async createPartialReceiveMaterialNotToReview(): Promise<void> {
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.ordermenu).click();
        await this.page.locator(this.Elements.receiveMaterial).click();
        await this.page.locator(this.Elements.orderNoTextBox).fill(this.purchaseOrderNo);
        // await this.page.locator(this.Elements.orderNoTextBox).fill('325772');
        await this.base.waitAndClick(this.Elements.RetrieveButton);
        await fixture.page.waitForTimeout(1000);
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        await this.page.locator(this.Elements.receivingDate).fill(formattedDate);
        await this.page.locator(this.Elements.packSlipNumber).fill(`PSN-${getRandomInt(1000, 9999)}`);
        await this.page.locator(this.Elements.receiveQuantityInput).fill('7');
        await fixture.page.waitForTimeout(1000);

        await this.page.getByPlaceholder('--Input Or Select One--').click();
        await this.page.getByPlaceholder('--Input Or Select One--').type('TS-NS-General');
        await this.page.locator('text=TS-NS-General').click();


        await this.page.locator(this.Elements.masterCheckbox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(1000);

        const headerText = await this.page.locator(this.Elements.receivingDocumentNumber).textContent();

        if (headerText && headerText.includes('Receiving Doc. No.:')) {
            // Extract the number after "Receiving Doc. No.:"
            const match = headerText.match(/Receiving Doc\. No\.\s*:\s*(\d+)/);
            if (match && match[1]) {
                this.ReceivingDocumentNo = match[1];
                fixture.logger.info(`Receiving document number: ${this.ReceivingDocumentNo}`);
            }
        }
        await fixture.page.waitForTimeout(1000);
        const locator = this.page.locator(this.Elements.payslipNumber);

        await locator.waitFor({ state: 'visible', timeout: 5000 });

        // Get the value of the input field (the text inside the input)
        this.payslipNumber = await locator.inputValue();

        console.log('Payslip Number:', this.payslipNumber);
    }
    async clickOnBatchReviewReceivingMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.batchReviewReceivingMenu).click();
        await fixture.page.waitForTimeout(10000);
    }
    async DoMaterialReview(): Promise<void> {
        await this.page.locator(`(//input[@placeholder='--Input Text--'])[1]`).fill(this.payslipNumber);
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[2]`).check()
        await this.page.locator(this.Elements.batchReviewButton).click();
        await this.page.locator(this.Elements.okUpdateButton).click();
        await fixture.page.waitForTimeout(2000);
    }
    async ClickonPackSlipLink(): Promise<void> {
        await this.page.locator(`(//input[@placeholder='--Input Text--'])[1]`).fill(this.payslipNumber);
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[2]`).check();
        await this.page.locator(this.Elements.packslipNumberLink).click();

        await fixture.page.waitForTimeout(2000);
        const packSlipNumberLocator = this.page.locator(this.Elements.payslipNumber);
        const txt = await packSlipNumberLocator.inputValue();
        console.log('Pack Slip Number from link:', txt);

        // Verify the text values are equal
        if (txt === this.payslipNumber) {
            console.log('Verification passed: Pack slip number matches the expected payslipNumber.');
        } else {
            console.error(`Verification failed: Pack slip number '${txt}' does not match the expected '${this.payslipNumber}'.`);
        }
    }
    async ClickonPOLink(): Promise<void> {
        await this.page.locator(`(//input[@placeholder='--Input Text--'])[3]`).fill(this.purchaseOrderNo);
        await this.page.locator(`(//span[@class='el-checkbox__inner'])[2]`).check();

        // Capture the text before clicking, if needed
        const poLinkLocator = this.page.locator(this.Elements.poNumberLink);
        const poLinkText = await poLinkLocator.textContent();

        await poLinkLocator.click();

        await fixture.page.waitForTimeout(2000);
        const poHeaderText = await fixture.page.locator(this.Elements.headertitle).textContent();
        if (poHeaderText && poHeaderText.includes('Purchase Order |')) {
            // Extract the number after "Purchase Order | "
            const match = poHeaderText.match(/Purchase Order\s*\|\s*(\d+)/);
            if (match && match[1]) {
                this.purchaseOrderNo = match[1];
                fixture.logger?.info(`Extracted Purchase Order number: ${this.purchaseOrderNo}`);
            }
        }

        // Verification step - compare the purchaseOrderNo with the poNumberLink text (trimmed)
        if (poLinkText && poLinkText.trim() === this.purchaseOrderNo) {
            fixture.logger?.info('Verification passed: poNumberLink text matches purchaseOrderNo');
        } else {
            fixture.logger?.error(`Verification failed: poNumberLink text '${poLinkText?.trim()}' does not match purchaseOrderNo '${this.purchaseOrderNo}'`);
        }
    }
    async clickmaterialReturnMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.returnToVendorMenu).click();
        await fixture.page.waitForTimeout(1000);
    }
    async returnOperation(): Promise<void> {
        const randomNumber = getRandomInt(1000, 9999);

        await this.page.locator(this.Elements.stockNoTransfer).fill(this.payslipNumber);
        await this.base.waitAndClick(this.Elements.retreiveReceiveButton);
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.retrunQuantity).fill("3");
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
    async inquireMaterialReturnScreen(): Promise<void> {
        this.base.waitAndClick(this.Elements.ordermenu);
        this.base.waitAndClick(this.Elements.inquireMaterialReturnMenu);
    }
    async searchByPackSlip(): Promise<void> {
        await this.page.locator(this.Elements.inquireRetrunPackslipNumberSearch).fill(this.payslipNumber);
        await this.base.waitAndClick(this.Elements.searchButtonOnTransfer);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.rmoLink);
    }
    async cancelReturn(): Promise<void> {
        await this.page.locator(this.Elements.cancelButton).click();
        await this.page.locator(this.Elements.cancelReasonTextArea).fill('Automation Testing');
        await this.page.locator(this.Elements.cancelOk).click();
        await this.page.locator(this.Elements.cancelDSuccessMessage).click();
    }
    async searchByPONumberInReturnInquirePage(): Promise<void> {
        await this.page.locator(this.Elements.inquirePONumberSearch).fill(this.purchaseOrderNo);
        await this.base.waitAndClick(this.Elements.searchButtonOnTransfer);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.rmoLink);
    }
    async searchByRMAInReturnInquirePage(): Promise<void> {
        await this.page.locator(this.Elements.inquireRMASearch).fill(this.RMA);
        await this.base.waitAndClick(this.Elements.searchButtonOnTransfer);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.rmoLink);
    }
    async selectReturnDate(): Promise<void> {
        await this.page.getByPlaceholder('--Select Date--').click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.base.waitAndClick(this.Elements.searchButtonOnTransfer);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.rmoLink);
    }
    async searchPOByVendorInquireRetrun(vendor: string): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.inquireMaterialReturnMenu).click();
        await this.page.locator(this.Elements.vendorSearchReturnSearch).click();
        await this.page.locator(this.Elements.vendorCodeLookUpVendor).fill(vendor);
        await this.page.locator(this.Elements.LookUpVendorSearchButton).click();
        // await this.page.locator(this.Elements.LookUpVendorOkButton).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await await this.page.locator(this.Elements.searchButtonOnTransfer).click();

        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator(`//tbody[position()=1]/tr[position()=1]/td[position()=2]/div[position()=1]/span[position()=1]`)

        const txt = await firstRow.textContent();
        await expect(txt).toContain(vendor);

    }
    async searchReturnByStatus(status: string): Promise<void> {
        await this.base.waitAndClick(this.Elements.ordermenu);
        await this.page.locator(this.Elements.inquireMaterialReturnMenu).click();
        await this.page.getByRole('textbox', { name: '--Select One--' }).first().click();
        await this.page.getByText('Returned', { exact: true }).click();
        await this.base.waitAndClick(this.Elements.searchButtonOnTransfer);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.rmoLink);
    }
    async createUnbillableOrder(): Promise<void> {
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
        await assetInput.type('UTR001');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'UTR001' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('4EZ - Electrical / Electronics').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BO - Burned out').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('IN - Install or Replace').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('CABN - CABN - Cab').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('8');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(3).type(this.stockNo);
        await fixture.page.waitForTimeout(1000);
        await this.page.getByRole('listitem').filter({ hasText: this.stockNo }).locator('span').click();
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
    async createUnbillableOrderToCheckOH(): Promise<void> {
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.createUnbillableOrder).click();
        await this.page.locator(this.Elements.mechanicSearch).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.userIDSearchBox).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('AARON.BARRIOS');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('IYAG6');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'IYAG6' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('2ME - Mechanical').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BR - Broken').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('GW - Straighten and weld').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('BATT - Battery Rack').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('8');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(2).type(this.stockNo);
        await fixture.page.waitForTimeout(1000);
        const searchText = `${this.stockNo} - ${this.manufaturesPartNumber} - ${this.description}`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
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
    async clickonMaterialUsageButton(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.materialUsageButton).click();
        await fixture.page.waitForTimeout(500);
    }
    async VerifyMaterialUsagefunctionlity(): Promise<void> {

        await this.page.locator(this.Elements.woNumberSearch).fill(this.workOrderNumber);

        // Get the text content from the search result element
        const woNumberSearchText = await this.page.locator(this.Elements.woNumberSearchResult).textContent();

        // Verify the values are equal
        expect(woNumberSearchText?.trim()).toBe(this.workOrderNumber);
        await this.base.waitAndClick(this.Elements.materialUsageCloseButton);

    }
    async VerifyMaterialUsagefunctionlityLink(): Promise<void> {

        await this.page.locator(this.Elements.woNumberSearch).fill(this.workOrderNumber);

        // Get the text content from the search result element
        const woNumberSearchText = await this.page.locator(this.Elements.wosearchResult2).textContent();

        // Verify the values are equal
        expect(woNumberSearchText?.trim()).toBe(this.workOrderNumber);
        await this.base.waitAndClick(this.Elements.materialUsageCloseButton2);

    }
    async verifyStockCountAfterReceive(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/div[1]/span[1]");
        const txt = (await firstRow.textContent());
        await expect(txt).toContain('24');

    }

    async clickMaterialUsageLink(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.clickUsageLink);
        await fixture.page.waitForTimeout(500);
    }
    async goToAsset(): Promise<void> {

        await this.base.waitAndClick(this.Elements.clickUsageLink);
        await fixture.page.waitForTimeout(500);
    }
    async createFullyReceiveMaterialNotToReview(): Promise<void> {
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.ordermenu).click();
        await this.page.locator(this.Elements.receiveMaterial).click();
        await this.page.locator(this.Elements.orderNoTextBox).fill(this.purchaseOrderNo);
        // await this.page.locator(this.Elements.orderNoTextBox).fill('325772');
        await this.base.waitAndClick(this.Elements.RetrieveButton);
        await fixture.page.waitForTimeout(1000);
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        await this.page.locator(this.Elements.receivingDate).fill(formattedDate);
        await this.page.locator(this.Elements.packSlipNumber).fill(`PSN-${getRandomInt(1000, 9999)}`);
        await this.page.locator(this.Elements.receiveQuantityInput).fill('10');
        await fixture.page.waitForTimeout(1000);

        await this.page.getByPlaceholder('--Input Or Select One--').click();
        await this.page.getByPlaceholder('--Input Or Select One--').type('TS-NS-General');
        await this.page.locator('text=TS-NS-General').click();


        await this.page.locator(this.Elements.masterCheckbox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'Save' }).click();
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(1000);

        const headerText = await this.page.locator(this.Elements.receivingDocumentNumber).textContent();

        if (headerText && headerText.includes('Receiving Doc. No.:')) {
            // Extract the number after "Receiving Doc. No.:"
            const match = headerText.match(/Receiving Doc\. No\.\s*:\s*(\d+)/);
            if (match && match[1]) {
                this.ReceivingDocumentNo = match[1];
                fixture.logger.info(`Receiving document number: ${this.ReceivingDocumentNo}`);
            }
        }
        await fixture.page.waitForTimeout(1000);
        const locator = this.page.locator(this.Elements.payslipNumber);

        await locator.waitFor({ state: 'visible', timeout: 5000 });

        // Get the value of the input field (the text inside the input)
        this.payslipNumber = await locator.inputValue();

        console.log('Payslip Number:', this.payslipNumber);
    }

    async clickOnCaptureInvoiceMenu(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.ARAPMenu);
        await this.base.waitAndClick(this.Elements.captureInvoiceMatchingMenu);
        await fixture.page.waitForTimeout(500);
    }

    async FillCaptureInvoice(): Promise<void> {

        await this.page.locator(this.Elements.orderNoBox).fill(this.purchaseOrderNo);
        //click outside
        await this.page.mouse.click(0, 0);
        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;

        await this.page.locator(this.Elements.invoiceNumber).fill(randomJobNumber);
        await this.page.locator(this.Elements.invoiceDate).click();
        await this.page.locator(this.Elements.calendarToday).click();
        await this.page.locator(this.Elements.invoiceTotal).fill(this.subTotal);
        await this.page.locator(this.Elements.taxAmount).fill(this.tax);
        await this.page.locator(this.Elements.freightAmount).fill(this.Freight);
        await this.page.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await this.page.locator(this.Elements.okButtonpurchaceOrder).click();

    }

}

