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

export default class MaterialAdjustmentReportPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        createMaterialAdjustmentReportMenu: "//span[normalize-space(text())='- Create Material Adjustment Report']",
        reportMenu: "//span[normalize-space()='Report']",
        actionDate: "(//label[normalize-space(text())='Action Date']/following::input)[1]",
        StockNumber: "//input[@placeholder='--Input Text or Look up--']",
        adjustmentType:"(//label[normalize-space(text())='Adjust Type']/following::input)[2]",
        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",
        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        yearTextInMaterial: "//span[normalize-space(text())='Year To Date']",
        

    }

    async clickOnMaterialAdjustmentReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.createMaterialAdjustmentReportMenu);
    }
    async selectFiltration(): Promise<void> {


        await this.page.locator("//input[@placeholder='--Input Text or Look up--']").first().type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();
        await this.page.mouse.click(0, 0);
        await this.page.locator(this.Elements.adjustmentType).click();
        await this.page.getByText('Adjust OH Qty').click();
        await this.page.locator("(//label[normalize-space(text())='Action By']/following::input)[2]").type('JEENA.MANUEL');
        await fixture.page.waitForTimeout(1000);
        const searchText = 'JEENA.MANUEL - JEENA.MANUEL';
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
        await this.page.locator(this.Elements.actionDate).click();
        await this.page.locator(this.Elements.yearTextInMaterial).click();


    }
    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Material Adjustment Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        const reportName = `Material Adjustment Report-${getRandomInt(1000, 9999)}`;
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
        const downloadPathWithFileName = path.join(downloadPath, 'Material_Adjustment_Report.xlsx');
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
