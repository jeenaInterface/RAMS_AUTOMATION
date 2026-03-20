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

export default class MaterialBalanceReportPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public NewReportName: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        createMaterialBalanceReportMenu: "//span[normalize-space(text())='- Create Material Balance Report']",
        reportMenu: "//span[normalize-space()='Report']",
        BaseDate: "(//label[normalize-space(text())='Base Date']/following::input)[1]",
        shop:"(//label[normalize-space(text())='Shop']/following::input)[2]",
        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",
        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        yearTextInMaterial: "//span[normalize-space(text())='Year To Date']",
        
          myReportTemplateMenu: "//span[normalize-space(text())='- My Report Template']",
        reportNameSearchBox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[3]/div[1]/div[1]/div[1]/div[1]/input[1]",
        searchIcon: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/button[1]/span[1]/i[1]",
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
        deleteOkButton:"xpath=/html/body/div[3]/div/div[3]/button[2]/span"

        

    }

    async clickOnMaterialBalanceReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.createMaterialBalanceReportMenu);
    }
    async selectFiltration(): Promise<void> {

        await this.page.locator(this.Elements.BaseDate).click();
        await this.page.locator(this.Elements.yearTextInMaterial).click();
        await this.page.locator(this.Elements.shop).click();
        await this.page.getByText('AGV - AGV').click();
        await this.page.mouse.click(0, 0);
    }

    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Material Balance Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        this.NewReportName = `Material Balance Report-${getRandomInt(1000, 9999)}`;
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
        const downloadPathWithFileName = path.join(downloadPath, 'Material_Balance_Report.xlsx');
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
                await this.page.waitForTimeout(2000);
            }
        
            
            async verifyDeleteFuctionlity(): Promise<void> {
                await this.base.waitAndClick(this.Elements.deleteIcon);
                await this.page.locator(this.Elements.yesButton).click();
                await this.page.locator(this.Elements.deleteOkButton).click();
        
        
            }

}
