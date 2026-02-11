import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class PMPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public pmNumber: string = '';
    public pmHours: string = '';
    public assetGroupSelected: string = '';
    public pmGroupname:string ='';
    public pmName1:string ='';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        // Menu elements
        pmMenu: "//span[normalize-space()='PM']",
        maintainPMMenu: "//span[normalize-space()='- Maintain PM']",
        batchUpdateAssetUsageMenu: "//span[normalize-space()='- Batch Update Asset Usage']",


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
        downloadButton: "//span[normalize-space(text())='Download']",
        searchButton: "//span[normalize-space(text())='Search']",

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
        pmListTable: "//table[@class='el-table__body']",

        // Unbillable order elements
        unbillableOrderMenu: "//span[normalize-space()='- Unbillable Order']",
        currentUsageInput: "(//input[@type='text'])[1]",
        assetSearchInBatchUpdate: "(//input[@placeholder='--Input Text--'])[1]",
        pmHoursCheckInBatchUpdate: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]",

        // Modal elements
        confirmDeleteMessage: "//div[@class='el-message-box__message']//p[1]",
        operationTextBox: "(//input[@placeholder='--Input Text--'])[1]",
        searchResult: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/div[1]/span[1]",
        actionLogTable: "//div[@class='el-dialog__wrapper']//table[@class='el-table__body']",
    };


    async navigateToMaintainPM(): Promise<void> {
        fixture.logger.info("Navigating to Maintain PM screen");
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

        const PMName2 = `PM Usage2 ${randomNumber}`;
        await this.page.locator(this.Elements.pmName2).fill(PMName2);
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
        fixture.logger.info("Updating PM entry");
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
        fixture.logger.info("Verifying action log");

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
        fixture.logger.info("Verifying delete functionality");

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

//     /**
//      * Create an unbillable order with PM
//      */
//     async createUnbillableOrderWithPm(): Promise<void> {
//         fixture.logger.info("Creating unbillable order with PM");

//         // This assumes we're already on unbillable order screen
//         await this.base.waitAndClick(this.Elements.createButton);
//         await fixture.page.waitForTimeout(500);

//         // Fill in required fields and associate PM
//         // Implementation details depend on actual unbillable order form

//         await this.base.waitAndClick(this.Elements.saveButton);
//         await fixture.page.waitForTimeout(1000);
//     }

//     /**
//      * Copy PM hours from unbillable order
//      */
//     async copyPmHours(): Promise<void> {
//         fixture.logger.info("Copying PM hours");

//         // Click on first PM entry
//         await this.base.waitAndClick(this.Elements.firstRowPM);
//         await fixture.page.waitForTimeout(500);

//         // Get PM hours value
//         const hoursText = await this.page.locator(this.Elements.pmHoursInTable).textContent();
//         this.pmHours = hoursText?.trim().split('\n')[0] || '';

//         fixture.logger.info(`PM hours captured: ${this.pmHours}`);
//     }

//     /**
//      * Go to Batch Update Asset Usage screen
//      */
//     async goToBatchUpdateAssetUsageScreen(): Promise<void> {
//         fixture.logger.info("Navigating to Batch Update Asset Usage screen");

//         await this.base.waitAndClick(this.Elements.assetMenu);
//         await this.base.waitAndClick(this.Elements.batchUpdateAssetUsageMenu);
//         await fixture.page.waitForTimeout(1000);
//     }

//     /**
//      * Verify last update usage of the asset
//      */
//     async verifyLastUpdateUsage(): Promise<void> {
//         fixture.logger.info("Verifying last update usage of asset");

//         // Search for the asset
//         await this.page.locator(this.Elements.assetSearchInBatchUpdate).fill(this.assetGroupSelected);
//         await this.base.waitAndClick(this.Elements.searchButton);
//         await fixture.page.waitForTimeout(500);

//         // Verify result is displayed
//         const resultTable = this.page.locator(this.Elements.pmListTable);
//         await expect(resultTable).toBeVisible();
//     }

//     /**
//      * Verify PM hours matching between unbillable order and batch update asset usage
//      */
//     async verifyPmHoursMatching(): Promise<void> {
//         fixture.logger.info("Verifying PM hours matching");

//         // Get PM hours from batch update screen
//         const batchUpdateHours = await this.page.locator(this.Elements.pmHoursCheckInBatchUpdate).textContent();

//         // Verify it matches the captured hours
//         expect(batchUpdateHours?.trim()).toContain(this.pmHours);

//         fixture.logger.info(`PM hours verified: ${this.pmHours}`);
//     }

//     /**
//      * Update current usage in batch update screen
//      */
//     async updateCurrentUsage(): Promise<void> {
//         fixture.logger.info("Updating current usage");

//         const randomUsage = getRandomInt(100, 500);

//         await this.page.locator(this.Elements.currentUsageInput).fill(randomUsage.toString());
//         await fixture.page.waitForTimeout(500);
//     }



//     /**
//      * Verify download usage functionality
//      */
//     async verifyDownloadUsage(): Promise<void> {
//         fixture.logger.info("Verifying download usage functionality");

//         // Click download button
//         await this.base.waitAndClick(this.Elements.downloadButton);
//         await fixture.page.waitForTimeout(1000);

//         fixture.logger.info("Download initiated successfully");
//     }
}
