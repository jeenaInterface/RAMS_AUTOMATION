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

export default class tariffDiscrepancyReportPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public NewReportName: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        createTariffDiscrepancyReportMenu: "//span[normalize-space(text())='- Create Tariff Discrepancy Report']",
        reportMenu: "//span[normalize-space()='Report']",
        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",
        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        tariff: "(//label[normalize-space(text())='Tariff:']/following::input)[1]",
        repairDate: "(//label[normalize-space(text())='Repair Date:']/following::input)[1]",
        todayInCalendar: "//td[normalize-space(text())='Today']",

        reportNameSearchBox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[3]/div[1]/div[1]/div[1]/div[1]/input[1]",


    }

    async clickOnTariffDiscrepancyReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.createTariffDiscrepancyReportMenu);
    }
    async selectFiltration(): Promise<void> {
        await this.page.locator(this.Elements.tariff).click();
        await this.page.getByText('ANL_04152025 (2025-Apr-15 To 2025-Jun-27)', { exact: true }).click();
        await this.page.locator(this.Elements.repairDate).click();
        await this.page.locator(this.Elements.todayInCalendar).click();
        await this.page.locator(this.Elements.todayInCalendar).click();
        await fixture.page.waitForTimeout(1000);

    }

    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Tariff Discrepancy Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        this.NewReportName = `Tariff Discrepancy Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(this.NewReportName);
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
        const downloadPathWithFileName = path.join(downloadPath, 'Tariff_Discrepancy_Report.xlsx');
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
    async SearchWithReportName(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportNameSearchBox);
        await this.page.locator(this.Elements.reportNameSearchBox).fill(this.NewReportName);
        //add delay
        await this.page.waitForTimeout(2000);
    }

}
