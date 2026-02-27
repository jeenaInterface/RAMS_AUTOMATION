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

export default class InventoryPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        createInventoryReportMenu: "//span[normalize-space()='- Create Inventory Report']",
        reportMenu: "//span[normalize-space()='Report']",
        materialCreationDate: "(//label[normalize-space(text())='Material Creation Date']/following::input)[1]",
        StockNumber: "//input[@placeholder='--Input Text or Look up--']",
        rcvUOM: "(//label[normalize-space(text())='Rcv. UOM']/following::input)[2]",
        issueUOM: "(//label[normalize-space(text())='Issue UOM']/following::input)[2]",
        status: "(//input[@placeholder='--Select One or More--'])[3]",
        shop: "(//input[@placeholder='--Select One or More--'])[4]",
        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",
        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]"

    }

    async clickOnInventoryReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.createInventoryReportMenu);
    }
    async selectFiltration(): Promise<void> {
        await this.page.locator(this.Elements.materialCreationDate).click();
        await this.page.getByText('Year To Date').click();

        await this.page.locator("//input[@placeholder='--Input Text or Look up--']").type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();
        await this.page.locator(this.Elements.rcvUOM).click();
        await this.page.getByText('24LB - 24 Pound Bottle').nth(1).click();
        await this.page.locator(this.Elements.issueUOM).click();
        await this.page.getByText('24LB - 24 Pound Bottle').nth(2).click();
        await this.page.locator(`xpath=//*[@id="app"]/div[2]/div/div/div[1]/div[1]/div[3]/form/div[4]/div[2]/div/div/div/div[2]/input`).click();
        await this.page.getByText('Active', { exact: true }).click();
        await this.page.locator('xpath=//*[@id="app"]/div[2]/div/div/div[1]/div[1]/div[3]/form/div[4]/div[3]/div/div/div/div[2]/input').click();
        await this.page.getByText('AGV - AGV').click();
        await this.page.waitForTimeout(2000);

    }
    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Inventory Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        const reportName = `Inventory Report-${getRandomInt(1000, 9999)}`;
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

        const outputFile = path.join(downloadPath, "Inventory.xlsx");
        await download.saveAs(outputFile);
        //add delay to ensure file is saved before checking existence
        await this.page.waitForTimeout(5000);


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
