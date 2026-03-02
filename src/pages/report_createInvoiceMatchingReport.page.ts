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

export default class CreateInvoiceMatchingReportPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        reportMenu: "//span[normalize-space()='Report']",
        createInvoiceMatchingMenu: "//span[normalize-space(text())='- Create Invoice Matching Report']",
        matchingStatus: "(//label[normalize-space(text())='Matching Status']/following::input)[2]",
        invoiceDate: "(//label[normalize-space(text())='Invoice Date']/following::input)[1]",
        captureDate:"(//label[normalize-space(text())='Capture Date']/following::input)[1]",
        closeDate: "(//label[normalize-space(text())='Close Date']/following::input)[1]",
        approveDate:"(//label[normalize-space(text())='Approve Date']/following::input)[1]",
        paymentRequestDate:"(//label[normalize-space(text())='Payment Request Date']/following::input)[1]",
        cancelDate:"(//label[normalize-space(text())='Cancel Date']/following::input)[1]",

        headerFieldsCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[1]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        itemFieldsCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[2]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",

        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",

        rightArrow1: "(//i[@class='el-icon-arrow-right'])[1]",
        rightArrow2: "(//button[@type='button'])[7]",

        today: "//td[normalize-space(text())='Today']",
        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        yearDate: "(//span[contains(text(),'Year To Date')])[5]",

    }

    async clickOnInvoiceMatchingReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.createInvoiceMatchingMenu);
    }
    async selectFiltration(): Promise<void> {
        await this.page.locator(this.Elements.matchingStatus).click();
        await this.page.getByText('Unmatched', { exact: true }).click();
        await this.page.locator(this.Elements.invoiceDate).click();
        await this.page.locator(this.Elements.yearDate).click();
        await this.page.locator(this.Elements.captureDate).click();
        await this.page.locator(this.Elements.yearDate).click();
        await this.page.locator(this.Elements.approveDate).click();
        await this.page.locator(this.Elements.yearDate).click();
        await this.page.locator(this.Elements.paymentRequestDate).click();
        await this.page.locator(this.Elements.yearDate).click();
        await this.page.locator(this.Elements.cancelDate).click();
        await this.page.locator(this.Elements.yearDate).click();
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
        const reportName = `Create invoice matching Report -${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        const reportName = `Create Invoice matching Report-${getRandomInt(1000, 9999)}`;
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

        const outputFile = path.join(downloadPath, "Create Invoice matching Report.xlsx");
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
