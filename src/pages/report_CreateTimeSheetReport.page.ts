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

export default class CreateTimesheetReportPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public NewReportName: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        reportMenu: "//span[normalize-space()='Report']",
        TimesheetReportMenu: "//span[normalize-space()='- Create Time Sheet Report']",
        shop: "//input[@name='shop']",
        craft: "//input[@name='craft']",
        shift: "//input[@name='shift']",
        mechanic: "//input[@placeholder='--Input Text or Look up--']",
        workOrderRepairDate: "(//label[normalize-space(text())='Work Order Repair Date']/following::input)[1]",

        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",

        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        yearDate: "(//span[normalize-space()='Year To Date'])[1]",
        reportNameSearchBox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[3]/div[1]/div[1]/div[1]/div[1]/input[1]",




    }

    async clickOnOrderReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.TimesheetReportMenu);
    }
    async selectFiltration(): Promise<void> {

        await this.page.locator(this.Elements.mechanic).type('AARON.BARRIOS');
        await fixture.page.waitForTimeout(1000);
        const searchText = `AARON.BARRIOS - Aaron Barrios`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();

        await this.page.locator(this.Elements.shop).click();
        await this.page.getByText('Power - Power Equipment Maintenance').click();

        await this.page.locator(this.Elements.craft).click();
        await this.page.getByText('2 - LBCT Mech').click();

        await this.page.locator(this.Elements.shift).click();
        await this.page.getByText('2 - Second Shift').click();

        await this.page.locator(this.Elements.workOrderRepairDate).click();
        await this.page.locator(this.Elements.yearDate).click();

    }
    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Timesheet Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        this.NewReportName = `Timesheet Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(this.NewReportName);
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

        const outputFile = path.join(downloadPath, "TimesheetReport.xlsx");
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
    async SearchWithReportName(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportNameSearchBox);
        await this.page.locator(this.Elements.reportNameSearchBox).fill(this.NewReportName);
        //add delay
        await this.page.waitForTimeout(2000);
    }
}
