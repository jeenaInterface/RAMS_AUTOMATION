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

export default class CreatePayrollReportPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        reportMenu: "//span[normalize-space()='Report']",
        PayrollReportMenu: "//span[normalize-space()='- Create Payroll Report']",
        shop:"//input[@name='shop']",
        craft:"//input[@name='craft']",
        shift:"//input[@name='shift']",
        mechanic:"(//label[normalize-space(text())='Mechanic']/following::input)[2]",
        reviewDate:"(//label[normalize-space(text())='Review Date']/following::input)[1]",
        reviewedBy:"(//label[normalize-space(text())='Reviewed By']/following::input)[2]",
        ApproveDate:"(//label[normalize-space(text())='Approve Date']/following::input)[1]",
        approvedBy:"(//label[normalize-space(text())='Approved By']/following::input)[2]",
        workOrderRepairDate:"(//label[normalize-space(text())='Work Order Repair Date']/following::input)[1]",


        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",

        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        yearDate: "(//span[contains(text(),'Year To Date')])[3]",
        exceptionRemarks:"(//label[normalize-space(text())='Exception Remarks']/following::input)[1]",



    }

    async clickOnPayrollReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.PayrollReportMenu);
    }
    async selectFiltration(): Promise<void> {
        await this.page.locator(this.Elements.shop).click();
        await this.page.getByText('Power - Power Equipment Maintenance').click();
                
        await this.page.locator(this.Elements.shift).click();
        await this.page.getByText('2 - Second Shift').click();

        await this.page.locator(this.Elements.mechanic).type('AARON.BARRIOS');
        await fixture.page.waitForTimeout(1000);
        const searchText = `AARON.BARRIOS - Aaron Barrios`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();

        await this.page.locator(this.Elements.reviewDate).click();
        await this.page.locator(this.Elements.yearDate).click();   
        
        await this.page.locator(this.Elements.reviewedBy).type('AMINE.NEBRI');
        await fixture.page.waitForTimeout(1000);
        const searchText1 = `AMINE.NEBRI - Amine Nebri`;
        await this.page.getByRole('listitem').filter({ hasText: searchText1 }).locator('span').first().click();

        await this.page.locator(this.Elements.ApproveDate).click();
        await this.page.locator(this.Elements.yearDate).click();   

        await this.page.locator(this.Elements.approvedBy).type('AMINE.NEBRI');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `AMINE.NEBRI - Amine Nebri`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();

        await this.page.locator(this.Elements.workOrderRepairDate).click();
        await this.page.locator(this.Elements.yearDate).click(); 

        await this.page.locator(this.Elements.exceptionRemarks).click();
        await this.page.getByText('4 and Go').click();

    }
    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Payroll Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        const reportName = `Payroll Report-${getRandomInt(1000, 9999)}`;
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

        const outputFile = path.join(downloadPath, "PayrollReport.xlsx");
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
