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
        productCode: "(//input[@placeholder='Select'])[1]",
        saveOnPurchaseOrderForm: "(//span[normalize-space()='Save'])[1]",
        successMessageOnPurchaseOrderForm: "//div[@class='el-message-box__message']//p[1]",
        okButtonpurchaceOrder: "(//span[contains(text(),'OK')])[6]",
        vendorCode: "(//input[@placeholder='--Input Text--'])[3]",
        headertitle: "(//span[@class='header-title font-size-title'])[1]",
        stockNumberSearch: "//div[@class='cell']//i[@class='el-input__icon el-icon-search is-clickable']",
        stockNumberSearchPopupfield: "(//label[normalize-space(text())='Stock No.']/following::input)[1]",
        lookUpMaterialSearch: "//div[@class='el-dialog__wrapper inquiryPurchaseOrder']//span[contains(text(),'Search')]",
        lookUpMaterlOk: "(//span[contains(text(),'OK')])[4]",
        orderNoSearchrESULT: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/div[1]/div[1]/div[1]/a[1]",
        purchaseOrderNoSearch: "(//label[normalize-space(text())='Order No.']/following::input)[1]",
        searchButton: "(//span[contains(text(),'Search')])[1]",
        stocknumberSearch: "(//label[normalize-space(text())='Stock No.']/following::input)[1]",
        stockSearch2: "(//i[@class='el-input__icon el-icon-search is-clickable'])[3]"

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
        await await this.page.locator(this.Elements.jobnumber).fill(randomJobNumber);
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
        await await this.page.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').fill('5');
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
        await await this.page.locator(this.Elements.searchButton).click();
        await await this.page.locator(this.Elements.orderNoSearchrESULT).click();

    }
    async updatePurchaseOrder(): Promise<void> {
        const randomJobNumber = `JOB-${getRandomInt(1000, 9999)}`;
        await fixture.page.waitForTimeout(500);

        const updatedDesc = `${this.description} - Updated ${currentDate}`;

        await this.page.locator(this.Elements.instruction).fill(updatedDesc);
        await await this.page.locator(this.Elements.createButton).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.stockSearch2).click();
        await fixture.page.waitForTimeout(500);
        // Using xpath exact match with escaped quotes
        // const input = this.page.locator(`//input[@placeholder='--Input multiple Stock No. with split";"--']`).first();
        // await input.waitFor({ state: 'visible' });
        // await input.click();
        // await input.fill('1010');
        await await this.page.locator(this.Elements.lookUpMaterialSearch).click();
        await await this.page.locator(this.Elements.lookUpMaterlOk).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.vendorNo).fill(randomJobNumber);
        await await this.page.locator(this.Elements.retailPriceInput).fill("20");
        const price = `${getRandomInt(1, 10)}`;
        // await newPage.locator(this.Elements.retailPriceInput).fill(price);
        // await fixture.page.waitForTimeout(500);
        // await newPage.locator(this.Elements.orderQuantity).fill(price);
        await await this.page.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').click();
        await await this.page.locator('.el-table_1_column_7 > .cell > .el-input > .el-input__inner').fill('10');
        await await this.page.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').click();
        await await this.page.locator('.cell > .lbct-number-wrapper > .el-input > .el-input__inner').fill('5');
        await await this.page.locator(this.Elements.productCode).click();
        await await this.page.getByText('OPX_AGV - Maintenance Parts - AGV').click();
        await fixture.page.waitForTimeout(1000);

        await await this.page.locator(this.Elements.saveOnPurchaseOrderForm).click();
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.okButtonpurchaceOrder).click();

        await this.page.locator(this.Elements.purchaseOrderNoSearch).fill(this.purchaseOrderNo);
        await this.page.locator(this.Elements.stockNumberSearch).fill("1008;1010");
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
        await await this.page.locator(this.Elements.orderNoSearchrESULT).click();

    }

}