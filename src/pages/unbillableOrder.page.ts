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
        inquireUnbillableOrderMenu: "//span[normalize-space(text())='- Inquire Un-billable Work Order']",
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
        closeButtonActionLog: "(//i[@class='el-dialog__close el-icon el-icon-close'])[1]",
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
        okPopupButton1: "//div[position()=8]/div[position()=1]/div[position()=3]/button[position()=2]",
        headertitle: "(//span[@class='header-title font-size-title'])[1]",
        saveOkButton: "(//span[contains(text(),'OK')])[4]",
        specialShiftOption: "(//label[normalize-space(text())='Special Shift']/following::input)[1]",
        WOLINKE: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/a[1]",
        agvHours: "(//label[normalize-space(text())='AGV Hours']/following::input)[1]",
        note: "(//label[normalize-space(text())='Notes']/following::textarea)[1]",
        lbctLeadCheckBox: "(//span[@class='el-checkbox__inner'])[1]",

        PlusButtonAddAsset1: "(//i[@class='ivu-icon ivu-icon-plus'])[3]",
        assetNumber2: "(//input[@placeholder='-- Input Text --'])[2]",
        componentCode2: "(//input[@placeholder='Component Code'])[2]",
        damageCode2: "(//input[@placeholder='Damage Code'])[2]",
        repairCode2: "(//input[@placeholder='Repair Code'])[2]",
        repairLocation2: "(//tr[@class='activity-row'])[2]//input[@placeholder='--Select One--']",
        actualHours2: "(//div[@class='el-input input-align']//input[@type='text'])[2]",
        stockQuantitywo2: "(//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text'])[2]",

        plusButtonAddAsset2: "(//i[@class='ivu-icon ivu-icon-plus'])[5]",
        assetNumber3: "(//input[@placeholder='-- Input Text --'])[3]",
        componentCode3: "(//input[@placeholder='Component Code'])[3]",
        damageCode3: "(//input[@placeholder='Damage Code'])[3]",
        repairCode3: "(//input[@placeholder='Repair Code'])[3]",
        repairLocation3: "(//tr[@class='activity-row'])[3]//input[@placeholder='--Select One--']",
        actualHours3: "(//div[@class='el-input input-align']//input[@type='text'])[3]",
        stockQuantitywo3: "(//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text'])[3]",

        plusButtonAddAsset3: "(//i[@class='ivu-icon ivu-icon-plus'])[7]",
        assetNumber4: "(//input[@placeholder='-- Input Text --'])[4]",
        componentCode4: "(//input[@placeholder='Component Code'])[4]",
        damageCode4: "(//input[@placeholder='Damage Code'])[4]",
        repairCode4: "(//input[@placeholder='Repair Code'])[4]",
        repairLocation4: "(//tr[@class='activity-row'])[4]//input[@placeholder='--Select One--']",
        actualHours4: "(//div[@class='el-input input-align']//input[@type='text'])[4]",
        stockQuantitywo4: "(//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text'])[4]",

        plusButtonAddAsset4: "(//i[@class='ivu-icon ivu-icon-plus'])[9]",
        assetNumber5: "(//input[@placeholder='-- Input Text --'])[5]",
        componentCode5: "(//input[@placeholder='Component Code'])[5]",
        damageCode5: "(//input[@placeholder='Damage Code'])[5]",
        repairCode5: "(//input[@placeholder='Repair Code'])[5]",
        repairLocation5: "(//tr[@class='activity-row'])[5]//input[@placeholder='--Select One--']",
        actualHours5: "(//div[@class='el-input input-align']//input[@type='text'])[5]",
        stockQuantitywo5: "(//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text'])[5]",

        plusButtonAddAsset5: "(//i[@class='ivu-icon ivu-icon-plus'])[11]",
        assetNumber6: "(//input[@placeholder='-- Input Text --'])[6]",
        componentCode6: "(//input[@placeholder='Component Code'])[6]",
        damageCode6: "(//input[@placeholder='Damage Code'])[6]",
        repairCode6: "(//input[@placeholder='Repair Code'])[6]",
        repairLocation6: "(//tr[@class='activity-row'])[6]//input[@placeholder='--Select One--']",
        actualHours6: "(//div[@class='el-input input-align']//input[@type='text'])[6]",
        stockQuantitywo6: "(//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text'])[6]",

        plusButtonAddAsset6: "(//i[@class='ivu-icon ivu-icon-plus'])[13]",
        assetNumber7: "(//input[@placeholder='-- Input Text --'])[7]",
        componentCode7: "(//input[@placeholder='Component Code'])[7]",
        damageCode7: "(//input[@placeholder='Damage Code'])[7]",
        repairCode7: "(//input[@placeholder='Repair Code'])[7]",
        repairLocation7: "(//tr[@class='activity-row'])[7]//input[@placeholder='--Select One--']",
        actualHours7: "(//div[@class='el-input input-align']//input[@type='text'])[7]",
        stockQuantitywo7: "(//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text'])[7]",


        hourValidation: "//p[normalize-space()='Total work order hours must add up to 8']",
        hourValidation5: "//p[normalize-space()='Total work order hours must add up to 5']",
        hourValidation4: "//p[normalize-space()='Total work order hours must add up to 1 or 4.']",
        hourValidation4pmaTraining: "//p[normalize-space()='Total work order hours must add up to 4.']"






    };

    async clickOnCreateUnbillableOrderMenu(): Promise<void> {
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.createUnbillableOrderMenu).click();
    }

    async clickOnInquireUnbillableOrderMenu(): Promise<void> {
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.inquireUnbillableOrderMenu).click();
    }
    async searchbyWONumber(): Promise<void> {
        await this.page.locator(this.Elements.WONumberSearch).fill(this.unbillableOrderNumber);
        await this.page.locator(this.Elements.searchButton).click();
        await this.page.locator(this.Elements.WOLINKE).click();

    }
    async verifytheWONumber(): Promise<void> {
        //get the work order number from the header
        await fixture.page.waitForTimeout(5000);
        const headerText = await this.page.locator(this.Elements.headertitle).textContent();
        expect(headerText).toContain(this.unbillableOrderNumber);

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
        await fixture.page.waitForTimeout(4000);
        // Wait for the header to update with the new status
        await this.page.locator(this.Elements.headerTitle).locator('xpath=.').waitFor({ state: 'visible' });
        await fixture.page.waitForTimeout(1000);
        await this.captureUnbillableOrderNumber();
        await this.captureUnbillableOrderStatus();
        //verify the status is Completed
        const status = this.unbillableOrderStatus;
        expect(status).toBe('Completed');
    }
    async clickOnCompleteButtonNoStatus(): Promise<void> {
        await this.page.locator(this.Elements.completeButton).click();
        await this.page.locator(this.Elements.okButtonOnCompletePopup).click();
        await this.page.waitForLoadState('networkidle');
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
        await fixture.page.waitForTimeout(4000);
        // Wait for the header to update with the new status
        await this.page.locator(this.Elements.headerTitle).locator('xpath=.').waitFor({ state: 'visible' });
        await fixture.page.waitForTimeout(1000);
        await this.captureUnbillableOrderStatus();
        //verify the status is Closed
        const status = this.unbillableOrderStatus;
        expect(status).toBe('Closed');
    }

    async clickOnCloseButtonNoStatus(): Promise<void> {
        await fixture.page.waitForTimeout(4000);
        await this.page.locator(this.Elements.closeButtonWO).click();
        await this.page.locator(this.Elements.OKButtonOnWOclosePopup).click();
        await this.page.waitForLoadState('networkidle');

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
        expect(headerTitle).toContain('Create Un-billable Work Order');
    }

    async searchUnbillableOrderByNumber(woNumber: string): Promise<void> {
        await this.base.fill(this.Elements.WONumberSearch, woNumber);
        await this.base.click(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await this.base.click(this.Elements.WONumberLink);
        await this.page.waitForLoadState('networkidle');
    }

    async createNewUnbillableOrderWithSpecialShift(specialShift: string): Promise<void> {
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
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('AGV001');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'AGV001' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.agvHours).click();
        await this.page.locator(this.Elements.agvHours).fill('19578');

        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('3BA - Battery').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BR - Broken').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('IP - Inspect and report').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('BATT - Battery Rack').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('4');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(2).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');


    }
    async CreateNewOrderWithFiveAssets(specialShift: string): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('CHARLES.BRADFORD');
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
    async asst1Details(): Promise<void> {
        //Asset 1
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('AGV005');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'AGV005' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.agvHours).click();
        await this.page.locator(this.Elements.agvHours).fill('21436');

        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('3BA - Battery').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BR - Broken').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('IP - Inspect and report').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('BATT - Battery Rack').click();
        await this.page.locator(this.Elements.actualHours).click();
        await this.page.locator(this.Elements.actualHours).fill('2');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(2).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');
    }

    //Asset 2
    async asst2Details(): Promise<void> {
        await this.page.locator(this.Elements.PlusButtonAddAsset1).click();
        await fixture.page.waitForTimeout(2000);
        const assetInput2 = this.page.locator(this.Elements.assetNumber2);
        await assetInput2.type('AGVOVR');
        await fixture.page.waitForTimeout(1000);
        const suggestion2 = this.page.getByRole('listitem').filter({ hasText: 'AGVOVR' }).first();
        await suggestion2.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion2.click();
        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.componentCode2).click();
        await this.page.getByText('3BA - Battery').nth(1).click();
        await this.page.locator(this.Elements.damageCode2).click();
        await this.page.getByText('BR - Broken').nth(1).click();
        await this.page.locator(this.Elements.repairCode2).click();
        await this.page.getByText('IP - Inspect and report').nth(1).click();
        await this.page.locator(this.Elements.repairLocation2).click();
        await this.page.getByText('BATT - Battery Rack').nth(1).click();
        await this.page.locator(this.Elements.actualHours2).click();
        await this.page.locator(this.Elements.actualHours2).fill('2');
        await fixture.page.waitForTimeout(1000);
        await this.page.locator("(//input[@placeholder='--Input Text or Look up--'])[3]").type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText1 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText1 }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo2).click();
        await this.page.locator(this.Elements.stockQuantitywo2).fill('1');
    }
    //Asset 3
    async asst3Details(): Promise<void> {
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.plusButtonAddAsset2).click();
        await fixture.page.waitForTimeout(2000);
        const assetInput3 = this.page.locator(this.Elements.assetNumber3);
        await assetInput3.type('ASC34W');
        await fixture.page.waitForTimeout(1000);
        const suggestion3 = this.page.getByRole('listitem').filter({ hasText: 'ASC34W' }).first();
        await suggestion3.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion3.click();
        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.componentCode3).click();
        await this.page.getByText('2EL - Electrical').click();
        await this.page.locator(this.Elements.damageCode3).click();
        await this.page.getByText('DZ - Damaged (other)').click();
        await this.page.locator(this.Elements.repairCode3).click();
        await this.page.getByText('CT - Calibration - TPS').click();
        await this.page.locator(this.Elements.repairLocation3).click();
        await this.page.getByText('HBLK - HEADBLOCK').click();
        await this.page.locator(this.Elements.actualHours3).click();
        await this.page.locator(this.Elements.actualHours3).fill('1');
        await fixture.page.waitForTimeout(1000);
        await this.page.locator("(//input[@placeholder='--Input Text or Look up--'])[4]").type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo3).click();
        await this.page.locator(this.Elements.stockQuantitywo3).fill('1');
    }
    //Asset 4
    async asst4Details(): Promise<void> {
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.plusButtonAddAsset3).click();
        await fixture.page.waitForTimeout(2000);
        const assetInput3 = this.page.locator(this.Elements.assetNumber4);
        await assetInput3.type('ASC01L');
        await fixture.page.waitForTimeout(1000);
        const suggestion3 = this.page.getByRole('listitem').filter({ hasText: 'ASC01L' }).first();
        await suggestion3.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion3.click();
        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.componentCode4).click();
        await this.page.getByText('2TR - Tracker Repairs').nth(1).click();
        await this.page.locator(this.Elements.damageCode4).click();
        await this.page.getByText('MA - Misaligned').nth(1).click();
        await this.page.locator(this.Elements.repairCode4).click();
        await this.page.getByText('MD - Modifications, miscellaneous').nth(1).click();
        await this.page.locator(this.Elements.repairLocation4).click();
        await this.page.getByText('ZZZZ - ZZZZ - Entire Vehicle').nth(1).click();
        await this.page.locator(this.Elements.actualHours4).click();
        await this.page.locator(this.Elements.actualHours4).fill('1');
        await fixture.page.waitForTimeout(1000);
        await this.page.locator("(//input[@placeholder='--Input Text or Look up--'])[5]").type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo4).click();
        await this.page.locator(this.Elements.stockQuantitywo4).fill('1');
    }
    async asst5Details(): Promise<void> {
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.plusButtonAddAsset4).click();
        await fixture.page.waitForTimeout(2000);
        const assetInput3 = this.page.locator(this.Elements.assetNumber5);
        await assetInput3.type('BC001');
        await fixture.page.waitForTimeout(1000);
        const suggestion3 = this.page.getByRole('listitem').filter({ hasText: 'BC001' }).first();
        await suggestion3.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion3.click();
        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.componentCode5).click();
        await this.page.getByText('4MZ - Mechanical Misc').click();
        await this.page.locator(this.Elements.damageCode5).click();
        await this.page.getByText('LK - Leak').click();
        await this.page.locator(this.Elements.repairCode5).click();
        await this.page.getByText('GS - Straighten').nth(1).click();
        await this.page.locator(this.Elements.repairLocation5).click();
        await this.page.getByText('FRRT - FRRT - Front Right').click();
        await this.page.locator(this.Elements.actualHours5).click();
        await this.page.locator(this.Elements.actualHours5).fill('2');
        await fixture.page.waitForTimeout(1000);
        await this.page.locator("(//input[@placeholder='--Input Text or Look up--'])[6]").type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText2 = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText2 }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo5).click();
        await this.page.locator(this.Elements.stockQuantitywo5).fill('1');
    }


    async clickOnSaveButtonAfterDraft(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.saveOkButton).click();
        await this.page.waitForLoadState('networkidle');
        await fixture.page.waitForTimeout(2000);
        await this.captureUnbillableOrderStatus();
        await this.captureUnbillableOrderNumber();
    }

    async clickOnDraftButton1(): Promise<void> {
        await this.page.locator(this.Elements.draftButton).click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.okDraftButton).click();
        await this.page.waitForLoadState('networkidle');
        await this.captureUnbillableOrderNumber();
        await this.captureUnbillableOrderStatus();
    }
    async verifyHourValidationMessageFor8hour(): Promise<void> {
        const validationMessage = await this.page.locator(this.Elements.hourValidation).textContent();
        //Total work order hours must add up to 8 . verify this message is present
        expect(validationMessage).toContain('Total work order hours must add up to 8');
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
    async CreateNewOrderForThirdShift(specialShift: string): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('ARNULFO.LOPEZ');
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
    async verifyHourValidationMessageFor5hour(): Promise<void> {
        const validationMessage = await this.page.locator(this.Elements.hourValidation5).textContent();
        //Total work order hours must add up to 5 . verify this message is present
        expect(validationMessage).toContain('Total work order hours must add up to 5');
    }
    async verifyHourValidationMessageFor4hour(): Promise<void> {
        const validationMessage = await this.page.locator(this.Elements.hourValidation4).textContent();
        //Total work order hours must add up to 4 . verify this message is present
        expect(validationMessage).toContain('Total work order hours must add up to 1 or 4.');
    }
    async verifyHourValidationMessageFor4(): Promise<void> {
        const validationMessage = await this.page.locator(this.Elements.hourValidation4pmaTraining).textContent();
        //Total work order hours must add up to 4 . verify this message is present
        expect(validationMessage).toContain('Total work order hours must add up to 4.');
    }


}