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

export default class userReportPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        userReportMenu: "//span[normalize-space(text())='- Create User Report']",
        reportMenu: "//span[normalize-space()='Report']",
        userField: "(//label[normalize-space(text())='User']/following::input)[2]",
        role: "(//input[@class='el-input__inner'])[2]",
        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",
        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        headerFieldsCheckBox: "//div[@class='el-transfer']//div[1]//p[2]//label[1]//span[1]//span[1]",
        rightArrow1: "(//i[@class='el-icon-arrow-right'])[1]",
        craft:"(//label[normalize-space(text())='Craft']/following::input)[2]",
        shop:"(//label[normalize-space(text())='Shop']/following::input)[2]",
        shift:"(//label[normalize-space(text())='Shift']/following::input)[2]",
        status:"(//label[normalize-space(text())='Status']/following::input)[2]",
        authority:"(//label[normalize-space(text())='Authority']/following::input)[2]",





    }

    async clickOnUserReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.userReportMenu);
    }
    async selectFiltration(): Promise<void> {
        await this.page.locator(this.Elements.userField).type('AARON.BARRIOS');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `AARON.BARRIOS - Aaron Barrios`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();

        await this.page.locator(this.Elements.role).click();
        await this.page.getByText('Mechanic', { exact: true }).click();
        await this.page.locator(this.Elements.craft).click();
        await this.page.getByText('2 - LBCT Mech', { exact: true }).click();
        await this.page.mouse.click(0, 0);
        await this.page.locator(this.Elements.shop).click();
        await this.page.getByText('Power - Power Equipment Maintenance', { exact: true }).click();
        await this.page.locator(this.Elements.shift).click();
        await this.page.getByText('2 - Second Shift', { exact: true }).click();
        await this.page.locator(this.Elements.status).click();
        await this.page.getByText('Active', { exact: true }).click();
        await this.page.locator(this.Elements.authority).click();
        await this.page.getByText('Draft Un-billable Work Order', { exact: true }).click();
        await this.page.locator(this.Elements.headerFieldsCheckBox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.rightArrow1).click();
    }

    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Create User Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        const reportName = `Create User Report-${getRandomInt(1000, 9999)}`;
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
        const downloadPathWithFileName = path.join(downloadPath, 'Create_User_Report.xlsx');
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
