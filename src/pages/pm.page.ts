import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(100 * 1000);

export default class PMPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public pmNumber: string = '';
    public pmHours: string = '';
    public assetGroupSelected: string = '';
    public pmGroupname: string = '';
    public pmName1: string = '';
    public randomHour: string = '';
    public unbillableOrderNumber: string = '';
    public lastUpdateDate: string = '';
    public pmName2: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        // Menu elements
        pmMenu: "//span[normalize-space()='PM']",
        maintainPMMenu: "//span[normalize-space()='- Maintain PM']",
        batchUpdateAssetUsageMenu: "//span[normalize-space()='- Batch Update Asset Usage']",
        pmSheduleDashboard: "//span[normalize-space()='- PM Schedule Dashboard']",
        assetGroupInDasdhBoard: "(//label[normalize-space(text())='Asset Group']/following::input)[2]",
        searchButton: "(//button[@type='button']/following-sibling::button)[1]",

        // Main buttons
        assetGroupList: "//label[normalize-space(text())='Asset Group']/following::input",
        createPMGroupButton: "//button[@type='button']//span[contains(text(),'Create PM Group')]",
        pmGroupName: "(//label[normalize-space(text())='PM Group Name']/following::input)[1]",
        pmRule: "(//label[normalize-space(text())='PM Rule']/following::input)[1]",
        createPMButton: "(//span[normalize-space()='Create PM'])[1]",
        pmName1: "(//input[@type='text'])[4]",
        hours1: "(//input[@type='text'])[6]",
        activityCode1: "//input[@placeholder='Component Code']",
        damageCode1: "//input[@placeholder='Damage Code']",
        repairCode: "//input[@placeholder='Repair Code']",

        pmName2: "(//input[@type='text'])[10]",
        hours2: "(//input[@type='text'])[12]",
        activityCode2: "(//input[@placeholder='Component Code'])[2]",
        damagecode2: "(//input[@placeholder='Damage Code'])[2]",
        repairCode2: "(//input[@placeholder='Repair Code'])[2]",

        saveButton: "//span[normalize-space()='Save']",
        successOkayButton: "(//span[normalize-space()='OK'])[1]",

        updateButton2: "(//i)[6]",
        deleteButton: "//button[@title='Delete']//span[contains(., 'Delete')]",
        yesButton: "(//span[normalize-space()='Yes'])[1]",
        noButton: "//span[normalize-space()='No']",
        closeButton: "(//i[@class='el-dialog__close el-icon el-icon-close'])[2]",
        actionLogButton: "//button[contains(.,'Action Log')]",
        completeButton: "//span[normalize-space(text())='Complete']",
        downloadButton: "//span[normalize-space()='Download Usage']",
        searchButtonOnDashboard: "//span[normalize-space(text())='Search']",
        WOLINKE: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/a[1]",

        // Form fields
        assetGroupDropdown: "(//input[@placeholder='--Select One--'])[1]",
        pmNameInput: "(//input[@placeholder='--Input Text--'])[1]",
        activityCodeInput: "(//input[@placeholder='--Input Text--'])[2]",
        pmTypeDropdown: "(//input[@placeholder='--Select One--'])[2]",
        usagePerDropdown: "(//input[@placeholder='--Select One--'])[3]",
        pmFrequencyInput: "(//input[@placeholder='--Input Text--'])[3]",
        hoursInput: "(//input[@type='text'])[1]",

        // Table elements
        firstRowPM: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/a[1]",
        firstRowEditButton: "//table[@class='el-table__body']/tbody[1]/tr[1]//button[@title='Update']",
        firstRowDeleteButton: "(//i)[7]",
        firstRowActionLogButton: "(//span[contains(text(),'Action Log')])[1]",
        pmNameInTable: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]",
        pmHoursInTable: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]",

        // Search fields
        pmNameSearchField: "//table[@class='el-table__header']/thead[1]/tr[2]/th[3]/div[1]/div[1]/div[1]/div[1]/input[1]",
        assetGroupSearchField: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",

        // Dialogs
        dialogHeader: "//div[@class='el-dialog__header']//span[1]",
        pmListTable: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/span[1]",

        // Unbillable order elements
        WorkOrderMenu: "//span[normalize-space()='Work Order']",
        createUnbillableOrderMenu: "//span[normalize-space()='- Create Un-billable Work Order']",
        inquireUnbillableOrderMenu: "//span[normalize-space(text())='- Inquire Un-billable Work Order']",
        WONumberSearch: "(//label[normalize-space(text())='Work Order No.']/following::input)[1]",

        // Modal elements
        confirmDeleteMessage: "//div[@class='el-message-box__message']//p[1]",
        operationTextBox: "(//input[@placeholder='--Input Text--'])[1]",
        searchResult: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/div[1]/span[1]",
        actionLogTable: "//div[@class='el-dialog__wrapper']//table[@class='el-table__body']",

        mechanicSearch: "//div[@class='select-lookup form-control']//i[1]",
        userIDSearchBox: "(//span[normalize-space(text())='Lookup Mechanic']/following::input)[1]",
        LOOKuPmechanicSearch: "//div[@class='el-dialog__wrapper']//span[contains(text(),'Search')]",
        lookUpMechanicOkButton: "(//span[contains(text(),'OK')])[1]",
        specialShiftOption: "(//label[normalize-space(text())='Special Shift']/following::input)[1]",
        note: "(//label[normalize-space(text())='Notes']/following::textarea)[1]",
        lbctLeadCheckBox: "(//span[@class='el-checkbox__inner'])[1]",

        assetNumber: "(//input[@placeholder='-- Input Text --'])[1]",
        componentCode: "//input[@placeholder='Component Code']",
        damageCode: "//input[@placeholder='Damage Code']",
        repairCode3: "//input[@placeholder='Repair Code']",
        repairLocation: "//tr[@class='activity-row']//input[@placeholder='--Select One--']",
        actualHours: "//div[@class='el-input input-align']//input[@type='text']",
        stockQuantitywo: "//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text']",
        // completeButton: "//span[normalize-space()='Complete']",
        okButtonOnCompletePopup: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",
        closeButtonWO: "//span[normalize-space()='Close']",
        OKButtonOnWOclosePopup: "//i[@class='el-message-box__close el-icon-close']",
        headertitle: "(//span[@class='header-title font-size-title'])[1]",
        cancelButton1: "//div[@class='work-order-footer']//span[contains(text(),'Cancel')]",
        cancelokButton1: "(//button[contains(@class,'el-button el-button--default el-button--primary')])[1]",


        IsPMCheckBox: "(//span[@class='el-checkbox__inner'])[2]",
        PMGroupList: "(//span[normalize-space(text())='Is Final Repair for PM']/following::input)[1]",
        PMName: "(//label[normalize-space(text())='PM Name']/following::input)[1]",
        PMHours: "(//label[normalize-space(text())='Hours']/following::input)[1]",
        batchUpdateAssetUageMenu: "//span[normalize-space()='- Batch Update Asset Usage']",
        assetNumberSearch: "//table[@class='el-table__header']/thead[1]/tr[2]/th[3]/div[1]/div[1]/div[1]/div[1]/input[1]",
        currentUSageTextBox: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[7]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        woError: "//p[contains(text(),'There exist not cancelled work order that related to this PM Group')]",
        lastUpdateUsage: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/span[1]",

        lastUpdateDate: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[8]/div[1]/span[1]",
        lastUpdateUsageInSchedule: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[9]/div[1]/span[1]",
        nextPMName: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[10]/div[1]",
        nextPMExpectedAt: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[11]/div[1]",
        remaining: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[12]/div[1]/span[1]",
        lastUpdateTimeinBatchUsage: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[6]/div[1]/span[1]",
        assetNumberSearchSchedule: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        pmGroupSearch: "//table[@class='el-table__header']/thead[1]/tr[2]/th[3]/div[1]/div[1]/div[1]/div[1]/input[1]",

    };


    async navigateToMaintainPM(): Promise<void> {
        await this.base.waitAndClick(this.Elements.pmMenu);
        await this.base.waitAndClick(this.Elements.maintainPMMenu);
        await fixture.page.waitForTimeout(1000);
    }

    async selectAssetGroup(): Promise<void> {
        await this.page.locator(this.Elements.assetGroupDropdown).click();
        await this.page.getByText('BC-Bombcart').click();
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.createPMGroupButton);
        await fixture.page.waitForTimeout(500);

        const randomNumber = getRandomInt(1000, 9999);
        this.pmGroupname = `PM Usage ${randomNumber}`;

        // Fill PM details
        await this.page.locator(this.Elements.pmGroupName).fill(this.pmGroupname);
    }
    async selectAssetGroupForDelete(): Promise<void> {
        await this.page.locator(this.Elements.assetGroupDropdown).click();
        await this.page.getByText('BC-Bombcart').click();
        await fixture.page.waitForTimeout(500);
    }


    async createPmPerUsage(): Promise<void> {


        await fixture.page.waitForTimeout(500);

        const randomNumber = getRandomInt(1000, 9999);

        // Fill PM details
        await this.page.locator(this.Elements.createPMButton).click();
        this.pmName1 = `PM Usage ${randomNumber}`;
        await this.page.locator(this.Elements.pmName1).fill(this.pmName1);
        await this.page.locator(this.Elements.hours1).fill('50');
        await this.page.locator(this.Elements.activityCode1).click();
        await this.page.getByText('4EZ - Electrical / Electronics').click();
        await this.page.locator(this.Elements.damageCode1).click();
        await this.page.getByText('BO - Burned out').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('IN - Install or Replace').click();

        await this.page.locator(this.Elements.createPMButton).click();
        await fixture.page.waitForTimeout(1000);

        this.pmName2 = `PM Usage2 ${randomNumber}`;
        await this.page.locator(this.Elements.pmName2).fill(this.pmName2);
        await this.page.locator(this.Elements.hours2).fill('10');
        await this.page.locator(this.Elements.activityCode2).click();
        await this.page.getByText('4MZ - Mechanical Misc').nth(1).click();
        await this.page.locator(this.Elements.damagecode2).click();
        await this.page.getByText('LK - Leak').click();
        await this.page.locator(this.Elements.repairCode2).click();
        await this.page.getByText('GW - Straighten and weld').click();

        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.successOkayButton);
        await fixture.page.waitForTimeout(1000);
    }


    async createPmPerCalendar(): Promise<void> {

        await this.base.waitAndClick(this.Elements.pmRule);
        await this.page.getByText('Per Calendar').nth(2).click();
        this.createPmPerUsage();
    }

    async updatePm(): Promise<void> {
        await fixture.page.waitForTimeout(500);

        await this.base.waitAndClick(this.Elements.updateButton2);
        await fixture.page.waitForTimeout(500);

        const updatedName = `PM Updated ${getRandomInt(1000, 9999)}`;

        const pmGroup = this.page.locator(this.Elements.pmGroupName);
        await pmGroup.clear();
        await pmGroup.fill(updatedName);

        this.pmNumber = updatedName;

        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.successOkayButton);
        await fixture.page.waitForTimeout(1000);
    }


    async verifyActionLog(): Promise<void> {

        await this.base.waitAndClick(this.Elements.firstRowActionLogButton);
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.operationTextBox).click();
        await this.page.locator(this.Elements.operationTextBox).fill("Create PM Group")

        //verify the search result contains the text Create PM Group
        const searchLocator = this.page.locator(this.Elements.searchResult);
        await expect(searchLocator).toBeVisible();
        const searchText = await searchLocator.textContent();
        expect(searchText).toContain('Create PM Group');


        // Close action log dialog
        await this.base.waitAndClick(this.Elements.closeButton);
        await fixture.page.waitForTimeout(500);
    }


    async verifyDeleteFunctionality(): Promise<void> {

        // Click delete button
        await this.base.waitAndClick(this.Elements.firstRowDeleteButton);
        await fixture.page.waitForTimeout(500);

        // Confirm delete
        await this.base.waitAndClick(this.Elements.yesButton);
        await fixture.page.waitForTimeout(500);

        // Verify success message
        await this.base.waitAndClick(this.Elements.cancelokButton1);
        await fixture.page.waitForTimeout(1000);
    }
    async verifyDeleteFunctionalityToverifyMessage(): Promise<void> {

        // Click delete button
        await this.base.waitAndClick(this.Elements.firstRowDeleteButton);
        await fixture.page.waitForTimeout(500);

        // Confirm delete
        await this.base.waitAndClick(this.Elements.yesButton);
        await fixture.page.waitForTimeout(500);

        // Verify success message
        await this.base.waitAndClick(this.Elements.successOkayButton);
        await fixture.page.waitForTimeout(1000);
    }
    async clickOnCreateUnbillableOrderMenu(): Promise<void> {
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.createUnbillableOrderMenu).click();
    }
    async CreateNewOrderForFirstShift(specialShift: string): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('ADRIAN.LOPEZ');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.specialShiftOption).click();
        await this.page.getByText(specialShift).click();//select special shift from dropdown
        const notesInput = this.page.locator(this.Elements.note);
        await notesInput.fill('Automation test notes ' + getRandomInt(1000, 9999).toString());
        await this.page.locator(this.Elements.lbctLeadCheckBox).check();
        await fixture.page.waitForTimeout(1000);
    }
    async bombCartasstDetails(): Promise<void> {
        //Asset 1
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('BC001');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByText('BC001', { exact: true });
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('4MZ - Mechanical Misc').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('LK - Leak').click();
        await this.page.locator(this.Elements.repairCode3).click();
        await this.page.getByText('GS - Straighten').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('FRRT - FRRT - Front Right').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('8');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(2).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.IsPMCheckBox).check();
        await this.page.locator(this.Elements.PMGroupList).click();
        if (!this.pmGroupname) {
            throw new Error('pmGroupname is empty. Ensure a PM group was created before selecting PM details.');
        }
        await this.page.getByText(this.pmGroupname).click();
        await this.page.locator(this.Elements.PMName).click();
        if (!this.pmName1) {
            throw new Error('pmName1 is empty. Ensure a PM was created before selecting PM details.');
        }
        await this.page.getByText(this.pmName1).click();
        const pmHoursText = await this.page.locator(this.Elements.PMHours).textContent();
        this.randomHour = pmHoursText ? pmHoursText.trim() : '';
        await fixture.page.waitForTimeout(1000);
    }
    async goToBatchUpdateAssetUsageScreen(): Promise<void> {

        await this.base.waitAndClick(this.Elements.pmMenu);
        await this.base.waitAndClick(this.Elements.batchUpdateAssetUsageMenu);
        await fixture.page.waitForTimeout(1000);
    }
    /**
 * Verify last update usage of the asset
 */
    async verifyLastUpdateUsage(): Promise<void> {

        // Search for the asset
        await this.page.locator(this.Elements.assetNumberSearch).fill('BC001');
        await fixture.page.waitForTimeout(1000);
    }

    async currentusage(): Promise<void> {

        const lastUpdateUsageText = await this.page.locator(this.Elements.lastUpdateUsage).textContent();
        if (!lastUpdateUsageText?.trim()) {
            throw new Error('Could not read last update usage');
        }
        const lastUpdateUsageText1 = parseInt(lastUpdateUsageText.trim(), 10);

        // Generate random number greater than currentUsage (e.g., between currentUsage+1 and currentUsage+100)
        function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        this.randomHour = getRandomInt(lastUpdateUsageText1 + 1, lastUpdateUsageText1 + 100);

        await this.page.locator(this.Elements.currentUSageTextBox).fill(this.randomHour.toString());
        await fixture.page.waitForTimeout(2000);
        const dateTimeStr = await this.page.locator(this.Elements.lastUpdateTimeinBatchUsage).textContent();
        if (!dateTimeStr) {
            throw new Error('Could not read last update time from batch usage');
        }
        // dateTimeStr is like "2026-Feb-13 10:28:05"
        this.lastUpdateDate = dateTimeStr.split(' ')[0];
        // or alternatively:
        // this.lastUpdateDate = dateTimeStr.substring(0, 11);

        console.log(this.lastUpdateDate); // Should log: 2026-Feb-13

        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.successOkayButton).click();
        await fixture.page.waitForTimeout(2000);



    }
    async bombCartasstDetailsVerifypmHours(): Promise<void> {
        //Asset 1
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('BC001');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);

        const suggestion = this.page.getByText('BC001', { exact: true });
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('4MZ - Mechanical Misc').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('LK - Leak').click();
        await this.page.locator(this.Elements.repairCode3).click();
        await this.page.getByText('GS - Straighten').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('FRRT - FRRT - Front Right').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('8');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(2).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.IsPMCheckBox).check();
        await fixture.page.waitForTimeout(1000);
        // await this.page.locator(this.Elements.PMGroupList).click();

        // await this.page.getByText(this.pmGroupname).click();
        // await this.page.locator(this.Elements.PMName).click();
        // await this.page.getByText(this.pmName1).click();
        await fixture.page.waitForTimeout(2000);


        const pmhours = await this.page.locator(this.Elements.PMHours).inputValue();
        await expect(Number(pmhours.replace(/[^\d.-]/g, ''))).toBe(Number(this.randomHour));


        await fixture.page.waitForTimeout(1000);
    }
    async clickOnInquireUnbillableOrderMenu(): Promise<void> {
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.inquireUnbillableOrderMenu).click();
    }
    async searchbyWONumber(): Promise<void> {
        await this.page.locator(this.Elements.WONumberSearch).fill(this.unbillableOrderNumber);
        await this.page.locator(this.Elements.searchButton).first().click();
        await this.page.locator(this.Elements.WOLINKE).click();
        await fixture.page.waitForTimeout(4000);

    }
    async clickOnCompleteButtonNoStatus(): Promise<void> {

        await this.page.locator(this.Elements.completeButton).click();
        await this.page.locator(this.Elements.okButtonOnCompletePopup).click();
        await this.page.waitForLoadState('networkidle');
        this.captureUnbillableOrderNumber();

        //add delay
        await fixture.page.waitForTimeout(5000);
    }
    async captureUnbillableOrderNumber(): Promise<void> {
        const element = await fixture.page.locator(this.Elements.headertitle).textContent();
        const text = element ? element.toString() : '';

        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            if (match && match[1]) {
                this.unbillableOrderNumber = match[1];
                console.log(this.unbillableOrderNumber);
                // Use workOrderNumber as needed
            }
        }
    }
    async clickOnCloseButtonNoStatus(): Promise<void> {
        await fixture.page.waitForTimeout(5000);
        await this.page.locator(this.Elements.closeButtonWO).click();
        await this.page.locator(this.Elements.OKButtonOnWOclosePopup).click();
        await this.page.waitForLoadState('networkidle');

    }
    async clickOnCancelButton(): Promise<void> {
        await fixture.page.waitForTimeout(10000);
        await this.page.locator(this.Elements.cancelButton1).click();
        await this.page.waitForSelector(this.Elements.cancelokButton1);
        await this.page.locator(this.Elements.cancelokButton1).click();
        await this.page.waitForLoadState('networkidle');

    }


    async verifywoexistsMessage(): Promise<void> {

        const randomUsage = getRandomInt(100, 500);

        const errorMessage = await this.page.locator(this.Elements.woError).textContent();
        await expect(errorMessage).toContain("There exist not cancelled work order that related to this PM Group, you cannot delete this PM Group.");


        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.successOkayButton).click();
        await fixture.page.waitForTimeout(500);

    }


    async downloadReport(): Promise<string> {
        // const downloadPath = path.resolve(__dirname, 'downloads');
        const downloadPath = 'C:\\Users\\jeena.manuel\\OneDrive - Milestone Technologies Inc\\LBCT - Automation Practice\\RAMS Reports\\DownLoadUsage.xlsx';

        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.downloadButton).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'DownLoadUsage.xlsx');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
        // Add a delay to ensure file is fully downloaded
        await fixture.page.waitForTimeout(5000);
        return downloadPathWithFileName;
    }

    clearDownloadFolder(downloadPath: string): void {
        fs.readdir(downloadPath, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                fs.unlink(path.join(downloadPath, file), err => {
                    if (err) throw err;
                });
            }
        });
    }
    async createPmPerUsageTocheckinSchedule(): Promise<void> {


        await fixture.page.waitForTimeout(500);

        const randomNumber = getRandomInt(1000, 9999);

        // Fill PM details
        await this.page.locator(this.Elements.createPMButton).click();
        this.pmName1 = `PM Usage ${randomNumber}`;
        await this.page.locator(this.Elements.pmName1).fill(this.pmName1);
        await this.page.locator(this.Elements.hours1).fill('100');
        await this.page.locator(this.Elements.activityCode1).click();
        await this.page.getByText('4EZ - Electrical / Electronics').click();
        await this.page.locator(this.Elements.damageCode1).click();
        await this.page.getByText('BO - Burned out').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('IN - Install or Replace').click();
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.successOkayButton);
        await fixture.page.waitForTimeout(1000);
    }
    async goToPMSchedule(): Promise<void> {
        await this.base.waitAndClick(this.Elements.pmMenu);
        await this.base.waitAndClick(this.Elements.pmSheduleDashboard);
        await fixture.page.waitForTimeout(1000);
    }
    async selectAssetGroupInDasboard(): Promise<void> {
        await this.base.waitAndClick(this.Elements.assetGroupInDasdhBoard);
        await this.page.getByText('BC-Bombcart').click();
        await this.base.waitAndClick(this.Elements.searchButtonOnDashboard);
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.assetNumberSearchSchedule).fill("BC001");
        await this.page.locator(this.Elements.pmGroupSearch).fill(this.pmGroupname);
    }
    async verifyUsageDataOnDashBoard(): Promise<void> {
        //last update date is equal to this.lastUpdateDate
        const dateTimeStr = await this.page.locator(this.Elements.lastUpdateDate).textContent();
        expect(dateTimeStr).toContain(this.lastUpdateDate);
        const lastupdateUsage = await this.page.locator(this.Elements.lastUpdateUsageInSchedule).textContent();
        expect(lastupdateUsage).toContain(this.randomHour.toString());
        const nextPM = await this.page.locator(this.Elements.nextPMName).textContent();
        expect(nextPM).toContain(this.pmName2);

    }
    async verifyUsageDataOnDashBoardPerCalendar(): Promise<void> {
        const nextPM = await this.page.locator(this.Elements.nextPMName).textContent();
        expect(nextPM).toContain(this.pmName2);
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const lastUpdate = new Date(this.lastUpdateDate);
        const expectedDate = new Date(lastUpdate);
        expectedDate.setDate(lastUpdate.getDate() + 9);

        const year = expectedDate.getFullYear();
        const month = months[expectedDate.getMonth()];
        const day = String(expectedDate.getDate()).padStart(2, '0');

        const formattedExpectedDate = `${year}-${month}-${day}`;

        const nextPMExpectedAt = await this.page.locator(this.Elements.nextPMExpectedAt).textContent();

        expect(nextPMExpectedAt).toContain(formattedExpectedDate);


    }
}
