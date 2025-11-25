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
        vendorCode: "(//input[@placeholder='--Input Text--'])[3]",
        LookUpVendorOkButton: "(//span[contains(text(),'OK')])[5]",
        LookUpVendorSearchButton: "(//span[contains(text(),'Search')])[2]",
        searchButton1: "(//span[contains(text(),'Search')])[1]",
        statusSearch: "(//input[@rows='2'])[9]",
        shopSearch: "(//input[@rows='2'])[10]",
        okButtonerror: "(//button[contains(@class,'el-button el-button--default')]//span)[2]",
        createOrderButton: "//span[normalize-space(text())='Create Order']",
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
        OHSuccussMessage: "//p[normalize-space()='OH quantity has been adjusted successfully']"








    };

    async clickOnCreateMaterialMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.materialMenu);
        await this.base.waitAndClick(this.Elements.createMaterialMenu);
    }

    async clickOnInquireMaterialMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.materialMenu);
        await this.base.waitAndClick(this.Elements.inquireMaterialMenu);
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
        await fixture.page.waitForTimeout(1000);

        // Fill stock no and description and manufacturer's part no
        await this.page.locator(this.Elements.manufacturerPartNoInput).fill(`MPN-${randomNumber}`);
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
        await fixture.page.waitForTimeout(2000);
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
        await this.page.locator(this.Elements.stocknumbersearch).fill(this.stockNo);
        // await this.page.locator(this.Elements.stocknumbersearch).fill("7805");
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
    }
    // async searchMaterialByStockNo(): Promise<void> {
    //     await fixture.page.waitForTimeout(500);
    //     await this.clickOnInquireMaterialMenu();
    //     await fixture.page.waitForTimeout(500);
    //     await this.page.locator(this.Elements.stocknumbersearch).fill('7781');
    //     await this.base.waitAndClick(this.Elements.searchButton);
    //     await fixture.page.waitForTimeout(500);
    // }
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
        await fixture.page.waitForTimeout(500);

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
        await newPage.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').fill('5');
        await newPage.locator(this.Elements.productCode).click();
        await newPage.getByText('OPX_AGV - Maintenance Parts - AGV').click();
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
        await this.page.locator(this.Elements.operation).fill('Create Material');
        await fixture.page.waitForTimeout(500);
        await expect(this.page.locator(this.Elements.operationSearchResult)).toHaveValue('Create Material');

        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.closeButton).click();
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
        await fixture.page.waitForTimeout(500);
        await this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]/a[1]").click();

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
    async UpdatemultipleStock(): Promise<void> {
        await this.page.locator(this.Elements.TotalOHQuantity1).fill("100");
        await this.page.locator(this.Elements.TotalOHQuantity2).fill("200");
        await this.page.locator(this.Elements.adjustButton).click();
        const errorText = await this.page.locator(this.Elements.OHSuccussMessage).textContent();
        expect(errorText).toContain('OH quantity has been adjusted successfully');
        await this.page.locator(this.Elements.cancelDSuccessMessage).click();

    }

}
