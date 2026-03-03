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

export default class receivingReportPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        createReceivingReportMenu: "//span[normalize-space(text())='- Create Receiving Report']",
        reportMenu: "//span[normalize-space()='Report']",
        receivingDate: "(//label[normalize-space(text())='Receiving Date']/following::input)[1]",
        shop: "(//label[normalize-space(text())='Shop']/following::input)[2]",
        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",
        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        yearTextInMaterial: "//span[normalize-space(text())='Year To Date']",
        vendorSearch: "(//input[@class='el-input__inner'])[4]",
        searchButton: "//span[normalize-space(text())='Search']",
        okButtonOnVendorSearch: "xpath=//*[@id='app']/div[4]/div[1]/div[3]/div/button[2]",
        vendorCheckBox: "(//span[@class='el-checkbox__inner'])[38]",
        stockNo: "(//input[@class='el-input__inner'])[3]",
        status: "(//i[@class='el-input__icon el-icon-caret-top']/following-sibling::input)[1]",
        costCenter: "(//label[normalize-space(text())='Cost Center']/following::input)[2]",
        matchedStatus: "(//label[normalize-space(text())='Matched Status']/following::input)[2]",
        orderType: "(//label[normalize-space(text())='Order Type']/following::input)[2]",
        headerFieldsCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        itemFieldsCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[4]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        rightArrow1: "(//i[@class='el-icon-arrow-right'])[1]",
        rightArrow2: "(//button[@type='button'])[7]",
        yearDate: "(//span[normalize-space()='Year To Date'])[1]",



    }

    async clickOnReceivingReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.createReceivingReportMenu);
    }
    async selectFiltration(): Promise<void> {
        await this.page.locator(this.Elements.stockNo).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();

        await this.page.locator(this.Elements.vendorSearch).type('000000000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `000000000 - LBCT`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();

        await this.page.locator(this.Elements.status).click();
        await this.page.getByText('Reviewed', { exact: true }).click();
        await this.page.locator(this.Elements.receivingDate).click();
        await this.page.locator(this.Elements.yearDate).click();
        await this.page.locator(this.Elements.costCenter).click();
        await this.page.getByText('1215 - M&R', { exact: true }).click();
        await this.page.mouse.click(0, 0);
        await this.page.locator(this.Elements.matchedStatus).click();
        await this.page.getByText('Not Invoiced', { exact: true }).click();
        await this.page.locator(this.Elements.orderType).click();
        await this.page.getByText('PO', { exact: true }).click();
        await this.page.locator(this.Elements.headerFieldsCheckBox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.rightArrow1).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.itemFieldsCheckBox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.rightArrow2).click();
        await fixture.page.waitForTimeout(500);
    }

    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Receiving Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        const reportName = `Receiving Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }

    async downloadReport(): Promise<string> {
        const downloadPath = 'C:\\Users\\jeena.manuel\\OneDrive - Milestone Technologies Inc\\LBCT - Automation Practice\\Automation Reports\\RAMS Reports';
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.runButton).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'Receiving_Report.xlsx');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        await new Promise(resolve => setTimeout(resolve, 5000));
        return downloadPathWithFileName;
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
