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

export default class MaterialReportPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public NewReportName: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        createMaterialReportMenu: "//span[normalize-space()='- Create Material Report']",
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
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        poDate: "(//label[normalize-space(text())='PO Date']/following::input)[1]",
        receiveDate: "(//label[normalize-space(text())='Receive Date']/following::input)[1]",
        woDate: "(//label[normalize-space(text())='WO Repair Date']/following::input)[1]",
        materialFieldsCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[1]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        summaryFieldsCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[2]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        rightArrow1: "(//i[@class='el-icon-arrow-right'])[1]",
        rightArrow2: "(//button[@type='button'])[7]",
        dateRange: "(//label[normalize-space(text())='Summary Statistic Date Range']/following::input)[1]",
        yearTextInMaterial: "(//span[contains(text(),'Year To Date')])[4]",
        today: "//td[normalize-space(text())='Today']",

        myReportTemplateMenu: "//span[normalize-space(text())='- My Report Template']",
        reportNameSearchBox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[3]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchIcon: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/button[1]/span[1]/i[1]",
        downloadIcon: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/button[2]/span[1]/i[1]",
        scheduleIcon: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/button[3]/span[1]/i[1]",
        deleteIcon: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/button[4]/span[1]/i[1]",
        reportHeader: "//span[@class='header-title font-size-title']",
        scheduleddl: "(//label[normalize-space(text())='Schedule:']/following::input)[1]",
        time: "//label[normalize-space(text())='Time:']/following::input[1]",
        to: "(//div[@class='el-textarea']//textarea)[1]",
        saveButtonInSchedule: "//span[normalize-space(text())='Save']",
        okButtonInSchedule: "xpath=/html/body/div[4]/div/div[3]/button[2]/span",
        yesButton: "//span[normalize-space(text())='Yes']",
        deleteOkButton: "xpath=/html/body/div[3]/div/div[3]/button[2]/span"

    }

    async clickOnMaterialReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.createMaterialReportMenu);
    }

    async selectFiltrationStockNumber(): Promise<void> {

        await this.page.locator("//input[@placeholder='--Input Text or Look up--']").first().type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();
        await this.page.locator(this.Elements.materialFieldsCheckBox).click();
        //add delay
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.rightArrow1).click();
        await this.page.locator(this.Elements.summaryFieldsCheckBox).click();
        //add delay
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.rightArrow2).click();
        await this.page.locator(this.Elements.dateRange).click();
        await this.page.locator(this.Elements.today).click();
        await this.page.locator(this.Elements.today).click();
    }
    async selectFiltration(): Promise<void> {


        await this.page.locator("//input[@placeholder='--Input Text or Look up--']").first().type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();
        await this.page.locator(this.Elements.materialCreationDate).click();
        await this.page.locator(this.Elements.yearTextInMaterial).click();
        await this.page.locator(this.Elements.rcvUOM).click();
        await this.page.getByText('24LB - 24 Pound Bottle').nth(1).click();
        await this.page.locator(this.Elements.issueUOM).click();
        await this.page.getByText('24LB - 24 Pound Bottle').nth(2).click();
        await this.page.locator(this.Elements.poDate).click();
        await this.page.locator(this.Elements.yearTextInMaterial).click();
        await this.page.locator(this.Elements.receiveDate).click();
        await this.page.locator(this.Elements.yearTextInMaterial).click();
        await this.page.locator(this.Elements.woDate).click();
        await this.page.locator(this.Elements.yearTextInMaterial).click();
        await this.page.locator(`xpath=//*[@id="app"]/div[2]/div/div/div[1]/div[1]/div[3]/form/div[3]/div[3]/div/div/div/div[2]/input`).click();
        await this.page.getByText('Active', { exact: true }).click();
        await this.page.locator('xpath=//*[@id="app"]/div[2]/div/div/div[1]/div[1]/div[3]/form/div[5]/div[3]/div/div/div/div[2]/input').click();
        await this.page.getByText('AGV - AGV').click();
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.materialFieldsCheckBox).click();
        //add delay
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.rightArrow1).click();
        await this.page.locator(this.Elements.summaryFieldsCheckBox).click();
        //add delay
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.rightArrow2).click();
        await this.page.locator(this.Elements.dateRange).click();
        await this.page.locator(this.Elements.today).click();
        await this.page.locator(this.Elements.today).click();

    }
    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Material Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        this.NewReportName = `Material Report-${getRandomInt(1000, 9999)}`;
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

        const outputFile = path.join(downloadPath, "Material.xlsx");
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

        const stockNumberCellTitle = worksheet['A7']; // 7th row, 1st column
        const stockNumberValue = worksheet['A8']; // 8th row, 1st column

        // Extract cell values safely (checking for undefined)
        const StockNumberValue = stockNumberCellTitle ? stockNumberCellTitle.v : undefined;
        const StockNumberRealValue = stockNumberValue ? stockNumberValue.v : undefined;

        console.log('Stock Number cell (A7):', StockNumberValue);
        console.log('Stock Real Value cell (A8):', StockNumberRealValue);

        // Verify the cells contain the expected values
        if (StockNumberValue !== 'Stock No.') {
            throw new Error(`Expected "Stock No." in cell A7, but found "${StockNumberValue}"`);
        }

        if (String(StockNumberRealValue).trim() !== '1000') {
            throw new Error(`Expected "1000" in cell A8, but found "${StockNumberRealValue}"`);
        }

        console.log('Verification passed: Both Stock No. and 1000 found in expected cells.');
    }

    
        async SearchWithReportName(): Promise<void> {
            await this.base.waitAndClick(this.Elements.reportNameSearchBox);
            await this.page.locator(this.Elements.reportNameSearchBox).fill(this.NewReportName);
            //add delay
            await this.page.waitForTimeout(2000);
        }
       
}
