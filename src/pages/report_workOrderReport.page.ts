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

export default class workOrderReportPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        createWorkOrderReportMenu: "//span[normalize-space()='- Create Work Order Report']",
        reportMenu: "//span[normalize-space()='Report']",
        runButton: "//span[normalize-space()='Run']",
        saveButton: "//span[normalize-space()='Save']",
        saveAsButton: "//button[@type='button']//span[contains(text(),'Save As')]",
        reportName: "(//label[normalize-space(text())='Report Name']/following::textarea)[1]",
        okButton: "//span[text()='OK']",
        secondOkButton: "(//div[@class='el-message-box__btns']//button)[2]",
        workOrderStatus: "(//label[normalize-space(text())='Work Order Status']/following::input)[2]",
        workOrderType: "(//label[normalize-space(text())='Work Order Type']/following::input)[2]",
        assetGroup: "(//label[normalize-space(text())='Asset Group']/following::input)[2]",
        billingParty: "(//label[normalize-space(text())='Billing Party/Asset Owner']/following::input)[2]",
        shop: "(//label[normalize-space(text())='Shop']/following::input)[2]",
        hourType: "(//label[normalize-space(text())='Hour Type']/following::input)[2]",
        mechanic: "(//label[normalize-space(text())='Mechanic']/following::input)[2]",
        stockNumber: "(//label[normalize-space(text())='Stock No.']/following::input)[2]",
        repairDate: "(//label[normalize-space(text())='Repair Date']/following::input)[1]",
        shift: "(//label[normalize-space(text())='Shift']/following::input)[2]",
        DraftDate: "(//label[normalize-space(text())='Draft Date']/following::input)[1]",
        completionDate: "(//label[normalize-space(text())='Completion Date']/following::input)[1]",
        reviewDate: "(//label[normalize-space(text())='Review Date']/following::input)[1]",
        closeDate: "(//label[normalize-space(text())='Close Date']/following::input)[1]",
        headerCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[1]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        ItemFieldCheckBox: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[3]/div[1]/div[2]/div[1]/div[1]/p[2]/label[1]/span[1]/span[1]",
        lastWeek: "(//span[contains(text(),'Last Week')])[5]",
        rebuildStockNumber: "(//label[normalize-space(text())='Rebuild Stock No.']/following::input)[2]",
        rightArrow1: "(//i[@class='el-icon-arrow-right'])[1]",
        rightArrow2: "(//button[@type='button'])[7]",

    }

    async clickOnWorkOrderReportMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reportMenu);
        await this.base.waitAndClick(this.Elements.createWorkOrderReportMenu);
    }
    async selectFiltration(): Promise<void> {
        await this.page.locator(this.Elements.workOrderStatus).click();
        await this.page.getByText('Draft', { exact: true }).click();
        await this.page.locator(this.Elements.workOrderType).click();
        await this.page.getByText('Un-billable', { exact: true }).click();
        await this.page.locator(this.Elements.assetGroup).click();
        await this.page.getByText('AG - AGV', { exact: true }).click();
        await this.page.locator(this.Elements.billingParty).click();
        await this.page.getByText('APL - APL Co. PTE LTD', { exact: true }).click();
        await this.page.locator(this.Elements.shop).click();
        await this.page.getByText('AGV - AGV', { exact: true }).click();
        await this.page.locator(this.Elements.hourType).click();
        await this.page.getByText('Straight Time', { exact: true }).click();
        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.mechanic).type('AARON.BARRIOS');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `AARON.BARRIOS - Aaron Barrios`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();

        await this.page.locator(this.Elements.stockNumber).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();

        await this.page.locator(this.Elements.shift).click();
        await this.page.getByText('2 - Second Shift', { exact: true }).click();

        await this.page.locator(this.Elements.repairDate).click();
        await this.page.locator(this.Elements.lastWeek).click();
        await this.page.locator(this.Elements.DraftDate).click();
        await this.page.locator(this.Elements.lastWeek).click();
        await this.page.locator(this.Elements.completionDate).click();
        await this.page.locator(this.Elements.lastWeek).click();
        await this.page.locator(this.Elements.reviewDate).click();
        await this.page.locator(this.Elements.lastWeek).click();
        await this.page.locator(this.Elements.closeDate).click();
        await this.page.locator(this.Elements.lastWeek).click();

        await this.page.locator(this.Elements.rebuildStockNumber).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText1 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText1 }).locator('span').first().click();


        await this.page.locator(this.Elements.headerCheckBox).click();
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.rightArrow1).click();
        //add delay
        await this.page.waitForTimeout(500);
        await this.page.locator(this.Elements.ItemFieldCheckBox).click();
        await this.page.locator(this.Elements.rightArrow2).click();


    }

    async saveReport(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        const reportName = `Work Order Report-${getRandomInt(1000, 9999)}`;
        await this.page.locator(this.Elements.reportName).fill(reportName);
        await this.page.locator(this.Elements.okButton).click();
        await this.page.locator(this.Elements.secondOkButton).click();

    }
    async saveAsReport(): Promise<void> {
        await this.page.locator(this.Elements.saveAsButton).click();
        const reportName = `Work Order Report-${getRandomInt(1000, 9999)}`;
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
        const downloadPathWithFileName = path.join(downloadPath, 'Work_Order_Report.xlsx');
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
