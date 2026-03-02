import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";
// import * as fs from 'fs';
import * as path from 'path';

import * as fs from 'fs-extra';
// import path from 'path';


setDefaultTimeout(100 * 1000);

export default class PurchaseOrderReportPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        reportMenu: "//span[normalize-space()='Report']",
        OrderReportMenu: "//span[normalize-space(text())='- Create Order Report']",
        stockNo: "(//input[@class='el-input__inner'])[2]",
        FOB: "(//label[normalize-space(text())='FOB']/following::input)[2]",
        orderStatus: "(//label[normalize-space(text())='Order status']/following::input)[2]",
        receiveStatus: "(//label[normalize-space(text())='Receive Status']/following::input)[2]",
        shop: "(//input[@placeholder='--Select One or More--'])[1]",
        terms: "(//label[normalize-space(text())='Terms']/following::input)[2]",
        vendorSearch: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/form[1]/div[4]/div[4]/div[1]/div[1]/div[1]/i[1]",
        searchButton: "(//span[contains(text(),'Search')])[1]",
        okButtonOnVendorSearch: "(//span[contains(text(),'OK')])[3]",
        shipVia: "(//label[normalize-space(text())='Ship Via']/following::input)[2]",
        category: "(//label[normalize-space(text())='Category']/following::input)[2]",
        costCenter: "(//label[normalize-space(text())='Cost Center']/following::input)[2]",
        matchedStatus: "(//label[normalize-space(text())='Matched Status']/following::input)[2]",
        orderType: "(//label[normalize-space(text())='Order Type']/following::input)[2]",
        orderCaptureDate: "(//label[normalize-space(text())='Order Capture Date']/following::input)[1]",
        orderDate: "(//label[normalize-space(text())='Order Date']/following::input)[1]",
        orderRequestDate: "(//label[normalize-space(text())='Order Request Date']/following::input)[1]",
        headerFieldsCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        itemFieldsCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[4]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",

        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",

        rightArrow1: "(//i[@class='el-icon-arrow-right'])[1]",
        rightArrow2: "(//button[@type='button'])[7]",
        today: "//td[normalize-space(text())='Today']",
        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        yearDate: "(//span[contains(text(),'Year To Date')])[3]",
        vendorCheckList:"//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]",


    }

    async clickOnOrderReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.OrderReportMenu);
    }
    async selectFiltration(): Promise<void> {
        await this.page.locator(this.Elements.stockNo).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();
        await this.page.locator(this.Elements.shop).click();
        await this.page.getByText('AGV - AGV').click();
        await this.page.locator(this.Elements.terms).click();
        await this.page.getByText('NET30 - Net 30 Days').click();
        await this.page.locator(this.Elements.FOB).click();
        await this.page.getByText('DESTINATION - Destination').click();
        await this.page.locator(this.Elements.orderStatus).click();
        await this.page.getByText('Firm Order').click();
        await this.page.locator(this.Elements.receiveStatus).click();
        await this.page.getByText('Fully Received').click();
        await this.page.locator(this.Elements.vendorSearch).click();
        await this.page.locator(this.Elements.searchButton).click();
        await this.page.locator(this.Elements.vendorCheckList).click();
        await this.page.locator(this.Elements.okButtonOnVendorSearch).click();
        await this.page.locator(this.Elements.shipVia).click();
        await this.page.getByText('BEST WAY - Best Available Shipping Option').click();
        await this.page.locator(this.Elements.category).click();
        await this.page.getByText('Inventory', { exact: true }).click();
        await this.page.locator(this.Elements.costCenter).click();
        await this.page.getByText('1216 - M&R Facility').click();
        await this.page.locator(this.Elements.matchedStatus).click();
        await this.page.getByText('Not Invoiced').click();
        await this.page.locator(this.Elements.orderType).click();
        await this.page.getByText('PO' , { exact: true }).click();
        await this.page.locator(this.Elements.orderCaptureDate).click();
        await this.page.locator(this.Elements.yearDate).click();
        await this.page.locator(this.Elements.orderDate).click();
        await this.page.locator(this.Elements.yearDate).click();
        await this.page.locator(this.Elements.orderRequestDate).click();
        await this.page.locator(this.Elements.yearDate).click();
        await this.page.locator(this.Elements.headerFieldsCheckBox).click();

        //add delay
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.rightArrow1).click();
        await this.page.locator(this.Elements.headerFieldsCheckBox).click();
        //add delay
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.itemFieldsCheckBox).click();
        await this.page.locator(this.Elements.rightArrow2).click();

    }
    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Order Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        const reportName = `Order Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

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

}
