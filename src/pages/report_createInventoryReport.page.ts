import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";
// import * as fs from 'fs';
import * as path from 'path';

import * as fs from 'fs-extra';
import * as XLSX from 'xlsx';

// import path from 'path';

setDefaultTimeout(100 * 1000);

export default class InventoryPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public NewReportName: string = '';

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
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        myReportTemplateMenu: "//span[normalize-space(text())='- My Report Template']",
        reportNameSearchBox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[3]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchIcon: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/div[1]/button[1]",
        downloadIcon: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/button[2]/span[1]/i[1]",
        scheduleIcon: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/button[3]/span[1]/i[1]",
        deleteIcon: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/button[4]/span[1]/i[1]",
        reportHeader: "//span[@class='header-title font-size-title']",
        scheduleddl:"(//label[normalize-space(text())='Schedule:']/following::input)[1]",
        time:"//label[normalize-space(text())='Time:']/following::input[1]",
        to:"(//div[@class='el-textarea']//textarea)[1]",
        saveButtonInSchedule:"//span[normalize-space(text())='Save']",
        okButtonInSchedule:"xpath=/html/body/div[4]/div/div[3]/button[2]/span",
        yesButton:"//span[normalize-space(text())='Yes']",
        deleteOkButton:"xpath=/html/body/div[3]/div/div[3]/button[2]/span",
        MonCheckBox:"(//span[@class='el-checkbox__input']//span)[2]",
        TueCheckBox:"(//span[@class='el-checkbox__input']//span)[3]",
        WedCheckBox:"(//span[@class='el-checkbox__input']//span)[4]",
        endOfTheMonthCheckBox:"//span[@class='el-checkbox__input']//span[1]",



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
    async selectFiltrationWithStockNumber(): Promise<void> {

        await this.page.locator("//input[@placeholder='--Input Text or Look up--']").type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();

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
       this.NewReportName = `Inventory Report-${getRandomInt(1000, 9999)}`;
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

        if (StockNumberRealValue !== '1000') {
            throw new Error(`Expected "1000" in cell A8, but found "${StockNumberRealValue}"`);
        }

        console.log('Verification passed: Both Stock No. and 1000 found in expected cells.');
    }
        async clickOnmyReportTemplateMenu(): Promise<void> {
            await this.page.setViewportSize({ width: 1600, height: 1000 });
            await this.base.waitAndClick(this.Elements.reportMenu);
            await this.base.waitAndClick(this.Elements.myReportTemplateMenu);
        }
    
        async SearchWithReportName(): Promise<void> {
            await this.base.waitAndClick(this.Elements.reportNameSearchBox);
            await this.page.locator(this.Elements.reportNameSearchBox).fill(this.NewReportName);
            //add delay
            await this.page.waitForTimeout(2000);
        }
        async VerifySearchFunctionality(): Promise<void> {
            await this.base.waitAndClick(this.Elements.searchIcon);
    
            //add delay
            await this.page.waitForTimeout(2000);
            //verify reportheader contains report name
            const headerText = await this.page.locator(this.Elements.reportHeader).textContent();
            console.log('Report Header Text:', headerText);
            if (!headerText || !headerText.includes(this.NewReportName)) {
                throw new Error(`Expected report header to contain "${this.NewReportName}", but got "${headerText}"`);
            }
        }
        async verifyDownloadFunctionality(): Promise<string> {
            const downloadPath = 'C:\\Users\\jeena.manuel\\OneDrive - Milestone Technologies Inc\\LBCT - Automation Practice\\Automation Reports\\RAMS Reports';
    
            // Creates folder only if it does NOT exist – no EEXIST error
            await fs.ensureDir(downloadPath);
    
            // Clean folder safely
            await this.clearDownloadFolder(downloadPath);
    
            // Wait for the download event
            const [download] = await Promise.all([
                this.page.waitForEvent("download", { timeout: 60000 }),
                this.page.locator(this.Elements.downloadIcon).click({ timeout: 60000 }),
            ]);
    
            const outputFile = path.join(downloadPath, "Asset.xlsx");
            await download.saveAs(outputFile);
    
            console.log(`File downloaded to: ${outputFile}`);
    
            expect(fs.existsSync(outputFile)).toBeTruthy();
            await new Promise(resolve => setTimeout(resolve, 5000));
            return outputFile;
        }
    
        async verifyScheduleFunctionality(): Promise<void> {
            await this.base.waitAndClick(this.Elements.scheduleIcon);
            await this.page.locator(this.Elements.scheduleddl).click();
            await this.page.getByText('Run Later').click();
            await this.page.locator(this.Elements.to).fill('jeena.manuel@milstone.tech');
            await this.page.locator(this.Elements.saveButtonInSchedule).click();
            await this.page.locator(this.Elements.okButtonInSchedule).click();
    
            //add delay
            await this.page.waitForTimeout(1000);
            await this.base.waitAndClick(this.Elements.scheduleIcon);
            await this.page.locator(this.Elements.scheduleddl).click();
            await this.page.getByText('Daily').click();
            await this.page.locator(this.Elements.time).click();
            await this.page.locator(this.Elements.time).fill('00:01:01');
            await this.page.locator(this.Elements.saveButtonInSchedule).click();
            await this.page.locator(this.Elements.okButtonInSchedule).click();

            await this.page.waitForTimeout(1000);
            await this.base.waitAndClick(this.Elements.scheduleIcon);
            await this.page.locator(this.Elements.scheduleddl).click();
            await this.page.getByText('Weekly').click();
            await this.page.locator(this.Elements.time).fill('00:01:01');
            await this.page.locator(this.Elements.MonCheckBox).click();
            await this.page.locator(this.Elements.TueCheckBox).click();
            await this.page.locator(this.Elements.WedCheckBox).click();
            await this.page.locator(this.Elements.saveButtonInSchedule).click();
            await this.page.locator(this.Elements.okButtonInSchedule).click();

            await this.page.waitForTimeout(500);
            await this.base.waitAndClick(this.Elements.scheduleIcon);
            await this.page.locator(this.Elements.scheduleddl).click();
            await this.page.getByText('Monthly').click();
            await this.page.waitForTimeout(2000);
            await this.page.locator(this.Elements.endOfTheMonthCheckBox).nth(0).click();
            await this.page.locator(this.Elements.saveButtonInSchedule).click();
            await this.page.locator(this.Elements.okButtonInSchedule).click();
        }
    
        
        async verifyDeleteFuctionlity(): Promise<void> {
            await this.base.waitAndClick(this.Elements.deleteIcon);
            await this.page.locator(this.Elements.yesButton).click();
            await this.page.locator(this.Elements.deleteOkButton).click();
    
    
        }

}
