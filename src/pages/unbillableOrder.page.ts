import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class UnbillableOrderPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public unbillableOrderNumber: string = '';
    public unbillableOrderStatus: string = '';


    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        WorkOrderMenu: "//span[normalize-space()='Work Order']",
        createUnbillableOrderMenu: "//span[normalize-space()='- Create Un-billable Work Order']",
        inquireUnbillableOrderMenu: "//span[normalize-space()='- Inquire Unbillable Work Order']",
        assetNo: "(//label[normalize-space(text())='Asset No.']/following::input)[1]",
        assetSearchIcon: "//div[@class='select-lookup form-control']//i[1]",
        assetSearchBox: "(//span[normalize-space(text())='Lookup Asset']/following::input)[1]",
        assetSearchButton: "//div[@class='el-dialog__wrapper']//span[contains(text(),'Search')]",
        assetOkButton: "(//span[contains(text(),'OK')])[1]",
        notes: "(//label[normalize-space(text())='Notes']/following::textarea)[1]",
        saveButton: "(//span[normalize-space()='Save'])[1]",
        draftButton: "(//span[normalize-space()='Draft'])[1]",
        okDraftButton: "(//span[contains(text(),'OK')])[3]",
        closeButton: "(//span[normalize-space()='Close'])[1]",
        closeButtonActionLog: "(//i[@class='el-dialog__close el-icon el-icon-close'])[2]",
        okCompleteButton: "(//span[contains(text(),'OK')])[8]",
        okCloseButton: "(//span[contains(text(),'OK')])[8]",
        cancelButton: "(//span[normalize-space()='Cancel'])[1]",
        cancelOkButton: "(//span[contains(text(),'OK')])[4]",
        headerTitle: "//span[@class='header-title font-size-title']",
        WONumberSearch: "(//label[normalize-space(text())='Work Order No.']/following::input)[1]",
        WONumberLink: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/a[1]",
        actionLog: "(//span[contains(text(),'Action Log')])[1]",
        headerTitleActionLog: "//span[@class='el-dialog__title'][normalize-space()='Action Log']",
        operationSearch: "(//input[@placeholder='--Input Text--'])[3]",
        newButton: "//span[normalize-space()='New']",
        searchButton: "(//span[normalize-space()='Search'])[1]",
        woNumberLink: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/a[1]",
        hoursInput: "(//input[@type='text'])[20]",
        specialShiftField: "(//label[normalize-space(text())='Special Shift']/following::input)[1]",
        specialShiftDropdown: "//div[@class='el-select-dropdown el-popper']",
        addAssetButton: "//span[normalize-space()='Add Asset']",
        assetTable: "//table[@class='el-table__body']",
        mechanicSearch: "//div[@class='select-lookup form-control']//i[1]",
        userIDSearchBox: "(//span[normalize-space(text())='Lookup Mechanic']/following::input)[1]",
        LOOKuPmechanicSearch: "//div[@class='el-dialog__wrapper']//span[contains(text(),'Search')]",
        lookUpMechanicOkButton: "(//span[contains(text(),'OK')])[1]",
        assetNumber: "(//input[@placeholder='-- Input Text --'])[1]",
        componentCode: "//input[@placeholder='Component Code']",
        damageCode: "//input[@placeholder='Damage Code']",
        repairCode: "//input[@placeholder='Repair Code']",
        repairLocation: "//tr[@class='activity-row']//input[@placeholder='--Select One--']",
        actualHours: "//div[@class='el-input input-align']//input[@type='text']",
        stockQuantitywo: "//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text']",
        completeButton: "//span[normalize-space()='Complete']",
        okButtonOnCompletePopup: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",
        closeButtonWO: "//span[normalize-space()='Close']",
        OKButtonOnWOclosePopup: "//i[@class='el-message-box__close el-icon-close']",
        headertitle: "(//span[@class='header-title font-size-title'])[1]",
        saveOkButton:"(//span[contains(text(),'OK')])[4]"
    };

    async clickOnCreateUnbillableOrderMenu(): Promise<void> {
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.createUnbillableOrderMenu).click();
    }

    async clickOnInquireUnbillableOrderMenu(): Promise<void> {
        await this.page.locator(this.Elements.inquireUnbillableOrderMenu).click();
    }

    async createNewUnbillableOrder(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('ADRIAN.LOPEZ');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('UTR001');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'UTR001' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('4MZ - Mechanical Misc').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BR - Broken').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('GS - Straighten').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('CABN - CABN - Ca').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('8');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(2).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');



    }


    async clickOnDraftButton(): Promise<void> {
        await this.page.locator(this.Elements.draftButton).click();
        await this.page.locator(this.Elements.okDraftButton).click();
        await this.page.waitForLoadState('networkidle');
//add delay
        await fixture.page.waitForTimeout(5000);
        await this.captureUnbillableOrderNumber();
        await this.captureUnbillableOrderStatus();
        //verify the status is Draft

        const status = this.unbillableOrderStatus;
        expect(status).toBe('Draft'); // add soft assertion

    }

    async clickOnCompleteButton(): Promise<void> {
        await this.page.locator(this.Elements.completeButton).click();
        await this.page.locator(this.Elements.okButtonOnCompletePopup).click();
        await this.page.waitForLoadState('networkidle');
        //add delay
        await fixture.page.waitForTimeout(2000);
        // Wait for the header to update with the new status
        await this.page.locator(this.Elements.headerTitle).locator('xpath=.').waitFor({ state: 'visible' });
        await fixture.page.waitForTimeout(1000);
       await this.captureUnbillableOrderNumber();
        await this.captureUnbillableOrderStatus();
        //verify the status is Completed
        const status = this.unbillableOrderStatus;
        expect(status).toBe('Completed');
    }

        async clickOnSaveButton(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.saveOkButton).click();
        await this.page.waitForLoadState('networkidle');
        await fixture.page.waitForTimeout(2000);
        await this.captureUnbillableOrderStatus();
        //verify the status is Completed
        const status = this.unbillableOrderStatus;
        expect(status).toBe('Completed');
    }

    async clickOnCloseButton(): Promise<void> {
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.closeButtonWO).click();
        await this.page.locator(this.Elements.OKButtonOnWOclosePopup).click();
        await this.page.waitForLoadState('networkidle');
                //add delay
        await fixture.page.waitForTimeout(2000);
        // Wait for the header to update with the new status
        await this.page.locator(this.Elements.headerTitle).locator('xpath=.').waitFor({ state: 'visible' });
        await fixture.page.waitForTimeout(1000);
        await this.captureUnbillableOrderStatus();
        //verify the status is Closed
        const status = this.unbillableOrderStatus;
        expect(status).toBe('Closed');
    }

    async clickOnCancelButton(): Promise<void> {
        await this.page.locator(this.Elements.cancelButton).click();
        await this.page.waitForSelector(this.Elements.cancelOkButton);
        await this.page.locator(this.Elements.cancelOkButton).click();
        await this.page.waitForLoadState('networkidle');
                //add delay
        await fixture.page.waitForTimeout(2000);
        // Wait for the header to update with the new status
        await this.page.locator(this.Elements.headerTitle).locator('xpath=.').waitFor({ state: 'visible' });
        await fixture.page.waitForTimeout(1000);
        await this.captureUnbillableOrderStatus();
        //verify the status is cancelled
        const status = this.unbillableOrderStatus;
        expect(status.toLowerCase()).toBe('cancelled');
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

    async captureUnbillableOrderStatus(): Promise<void> {
        // Status is typically shown in the header or in a status field
        const headerText = await this.page.locator(this.Elements.headerTitle).textContent();
        if (headerText) {
            // Extract status from header (e.g., Un-billable Work Order | AG397226 (Closed))
            const statusMatch = headerText.match(/\(([^)]+)\)$/);
            this.unbillableOrderStatus = statusMatch ? statusMatch[1].trim() : '';
            console.log('Captured status from header:', this.unbillableOrderStatus);
            console.log('Full header text:', headerText);
        }
    }

    async verifyActionLog(): Promise<void> {
        await this.page.locator(this.Elements.actionLog).click();
        await this.page.waitForSelector(this.Elements.headerTitleActionLog);
        const actionLogTitle = await this.page.locator(this.Elements.headerTitleActionLog).isVisible();
        expect(actionLogTitle).toBeTruthy();
        await this.page.locator(this.Elements.closeButtonActionLog).click();
    }

    async clickNewButton(): Promise<void> {
        await this.page.locator(this.Elements.newButton).click();
        await this.page.waitForLoadState('networkidle');
        //add delay
        await fixture.page.waitForTimeout(2000);
        // Verify that we are back on the Create Unbillable Work Order page
        const headerTitle = await this.page.locator(this.Elements.headerTitle).textContent();
        expect(headerTitle).toContain(' Create Un-billable Work Order');
    }

    async searchUnbillableOrderByNumber(woNumber: string): Promise<void> {
        await this.base.fill(this.Elements.WONumberSearch, woNumber);
        await this.base.click(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await this.base.click(this.Elements.WONumberLink);
        await this.page.waitForLoadState('networkidle');
    }
}
