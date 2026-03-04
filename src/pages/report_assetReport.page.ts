import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";
// import * as fs from 'fs';
import * as path from 'path';

import * as fs from 'fs-extra';
import * as XLSX from 'xlsx';




setDefaultTimeout(100 * 1000);

export default class AssetReportPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        assetGroup: "(//label[normalize-space(text())='Asset Group']/following::input)[2]",
        assetStatus: "(//label[normalize-space(text())='Asset Status']/following::input)[2]",
        assetFields: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        summaryFields: "(//span[@class='el-checkbox__inner'])[25]",
        dateRange: "//label[normalize-space(text())='Summary Statistic Date Range (Repair Date)']/following::input",
        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",
        reportMenu: "//span[normalize-space()='Report']",
        AssetReportMenu: "(//span[normalize-space()='- Create Asset Report'])[1]",
        rightArrow1: "(//i[@class='el-icon-arrow-right'])[1]",
        rightArrow2: "(//button[@type='button'])[7]",
        today: "//td[normalize-space(text())='Today']",
        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        assetNumber:"(//label[normalize-space(text())='Asset No.']/following::input)[1]",

    }

    async clickOnAssetReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.AssetReportMenu);
    }
    async selectFiltration(): Promise<void> {
        await this.page.locator(this.Elements.assetGroup).click();
        await this.page.getByText('AG - AGV').click();
        await this.page.locator(this.Elements.assetStatus).click();
        await this.page.getByText('In Use').click();
        await this.page.locator(this.Elements.assetFields).click();
        //add delay
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.rightArrow1).click();
        await this.page.locator(this.Elements.summaryFields).click();
        //add delay
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.rightArrow2).click();
        await this.page.locator(this.Elements.dateRange).click();
        await this.page.locator(this.Elements.today).click();
        await this.page.locator(this.Elements.today).click();



    }
        async selectAssetNumberFiltration(): Promise<void> {
        await this.page.locator(this.Elements.assetNumber).fill('IYAG1');
        await this.page.locator(this.Elements.assetFields).click();
        //add delay
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.rightArrow1).click();
        await this.page.locator(this.Elements.summaryFields).click();
        //add delay
        await this.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.rightArrow2).click();
        await this.page.locator(this.Elements.dateRange).click();
        await this.page.locator(this.Elements.today).click();
        await this.page.locator(this.Elements.today).click();



    }
    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Asset Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        const reportName = `Asset Report-${getRandomInt(1000, 9999)}`;
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

    const outputFile = path.join(downloadPath, "Asset.xlsx");
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
       async verifyExcelContent(filePath: string): Promise<void> {
            // Read the workbook
            const workbook = XLSX.readFile(filePath);
    
            // Get the first sheet name
            const sheetName = workbook.SheetNames[0];
    
            // Get worksheet
            const worksheet = workbook.Sheets[sheetName];
    
            const AssetNumberTitleCell = worksheet['A6']; // 6th row, 1st column
            const AssetRealValueCell = worksheet['A7']; // 7th row, 1st column
    
            // Extract cell values safely (checking for undefined)
            const AssetNumberValue = AssetNumberTitleCell ? AssetNumberTitleCell.v : undefined;
            const AssetRealValue = AssetRealValueCell ? AssetRealValueCell.v : undefined;
    
            console.log('Asset Number cell (A6):', AssetNumberValue);
            console.log('Asset Real Value cell (A7):', AssetRealValue);
    
            // Verify the cells contain the expected values
            if (AssetNumberValue !== 'Asset No.') {
                throw new Error(`Expected "Asset No." in cell A6, but found "${AssetNumberValue}"`);
            }
    
            if (AssetRealValue !== 'IYAG1') {
                throw new Error(`Expected "IYAG1" in cell A7, but found "${AssetRealValue}"`);
            }
    
            console.log('Verification passed: Both Asset No. and IYAG1 found in expected cells.');
        }

}
