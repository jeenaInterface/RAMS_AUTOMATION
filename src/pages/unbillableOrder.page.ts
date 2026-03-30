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
    public ST: string | null = '';
    public OT: string | null = '';


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
        hourValidation4pmaTraining: "//p[normalize-space()='Total work order hours must add up to 4.']",

        IsPMCheckBox: "(//span[@class='el-checkbox__inner'])[2]",
        PMGroupList: "(//span[normalize-space(text())='Is Final Repair for PM']/following::input)[1]",
        PMName: "(//label[normalize-space(text())='PM Name']/following::input)[1]",
        PMHours: "(//label[normalize-space(text())='Hours']/following::input)[1]",

        batchCloseMenu: "//span[normalize-space()='- Batch Close Un-billable Work Order']",
        WONumberSearchBatchClose: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        BatchCloseCheckBox: "//tr[@class='el-table__row current-row']//span[@class='el-checkbox__inner']",
        BatchCloseButton: "//span[normalize-space()='Batch Close']",
        BatchCloseOkButton: "(//span[contains(text(),'OK')])[4]",

        userIcon: "//i[@class='menu-icon ivu-icon ivu-icon-person']",
        todoListMenu: "//div[@class='ivu-menu-item select-item']//span[contains(text(),'To-Do List')]",
        batchCloseTabSectionDashboard: "//div[normalize-space()='Close Un-billable Work order']",

        assetNumberSearch: "(//label[normalize-space(text())='Asset No.']/following::input)[1]",
        assetSearchResult: "//tbody/tr[1]/td[3]/div[1]/span[1]",
        assetDescriptionSearch: "(//label[normalize-space(text())='Asset Description']/following::input)[1]",
        assetDescriptionSearchResult: "//tbody/tr[1]/td[4]/div[1]/span[1]",
        assetGroupSearch: "(//label[normalize-space(text())='Asset Group']/following::input)[1]",
        assetGroupSearchResult: "//tbody/tr[1]/td[5]/div[1]/span[1]",
        workOrderStatusSearch: "(//label[normalize-space(text())='Work Order Status']/following::input)[2]",
        workOrderStatusSearchResult: "//tbody/tr[1]/td[2]/div[1]/span[1]",
        mechanicSearchField: "(//label[normalize-space(text())='Mechanic']/following::input)[1]",
        mechanicSearchResult: "//tbody/tr[1]/td[7]/div[1]/span[1]",
        repairStartDateField: "(//label[normalize-space(text())='Repair Date']/following::input)[1]",
        repairDateSearchResult: "//tbody/tr[1]/td[9]/div[1]/span[1]",
        shopsearch: "(//label[normalize-space(text())='Shop']/following::input)[2]",
        shopSearchResult: "//tbody/tr[1]/td[8]/div[1]/span[1]",
        shiftSearch: "(//label[normalize-space(text())='Shift']/following::input)[1]",
        shiftSearchResult: "//tbody/tr[1]/td[10]/div[1]/span[1]",
        stockNumberSearch: "(//label[normalize-space(text())='Stock No.']/following::input)[1]",
        stockNumberSearchResult: "//tbody/tr[1]/td[12]/div[1]/span[1]",
        assetManufacture: "(//label[normalize-space(text())='Asset Manufacturer']/following::input)[1]",
        assetManufactureSearchResult: "//tbody/tr[1]/td[16]/div[1]/span[1]",
        assetManufactureClaimType: "(//label[normalize-space(text())='Asset Manufacturer Claim Type']/following::input)[2]",
        assetManufactureClaimTypeSearchResult: "//tbody/tr[1]/td[17]/div[1]/span[1]",

        payrollMenu: "//span[normalize-space()='Payroll']",
        reviewPayrollMenu: "//span[normalize-space()='- Review Payroll Records']",
        shopPayrollScreenHeader: "(//label[normalize-space(text())='Shop:']/following::input)[1]",
        ShiftListPayrollScreen: "(//label[normalize-space(text())='Shift:']/following::input)[1]",

        xpathofMechanic: "//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']",
        st: "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[5]",
        ot: "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[6]",
        IsConsistantWithWO: "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[7]",
        IsConsistantWithWOApprovePayroll: "//table/tbody/tr[td[4][normalize-space()='ANDY.REYES']]/td[10]",
        showWODetails: "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[8]/div/div/div/div/button/span/i",
        WOLinkOnPopUp: "(//div[@class='cell']//a)[1]",
        refreshButton: "//span[normalize-space()='Refresh']",
        cancelokButton1: "(//button[contains(@class,'el-button el-button--default el-button--primary')])[1]",
        cancelButton1: "//div[@class='work-order-footer']//span[contains(text(),'Cancel')]",
        hourType: "(//label[normalize-space(text())='Hour Type']/following::input)[1]",
        IsConsistantWithWO2ndUser: "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[7]",
        IsConsistantWithWO2ndUserApprove: "//table/tbody/tr[td[4][normalize-space()='BRAD.WILLIAMS']]/td[10]",

        showWODetails2ndUser: "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[8]/div/div/div/div/button/span/i",

        IsConsistantWithWThirdUser: "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[7]",
        IsConsistantWithWThirdUserApproveScreen: "//table/tbody/tr[td[4][normalize-space()='ARNULFO.LOPEZ']]/td[10]",

        showWODetailsThirdUser: "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[8]/div/div/div/div/button/span/i",

        repairDate: "(//label[normalize-space(text())='Repair Date']/following::input)[1]",
        repairDatePayroll: "(//label[normalize-space(text())='Repair Date:']/following::input)[1]",

        saftyTalkSubject: "(//label[normalize-space(text())='Safety Talk Subject:']/following::input)[1]",
        reviewButton: "//span[normalize-space()='Review']",
        reviewSuccessMessage: "//p[contains(normalize-space(), 'payrolls have been reviewed successfully.')]",
        reviewOkayButton: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",
        approvePayrollMenu: "//span[normalize-space()='- Approve Payroll Records']",
        firstShiftCheckBox: "//label[contains(.,'1 - First Shift')]",
        secondShiftCheckBox: "//span[normalize-space()='2 - Second Shift']",
        ThirdShiftCheckBox: "//span[normalize-space()='3 - Third Shift']",
        ApproveButton: "//span[normalize-space(text())='Approve']",
        ApproveOkayButton: "xpath=/html/body/div[5]/div/div[3]/button[2]/span",
        approveMessage: "//div[@class='el-message-box__message']//p[1]",


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
        await fixture.page.waitForTimeout(5000);

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
        await fixture.page.waitForTimeout(10000);
        await this.captureUnbillableOrderNumber();
        await this.captureUnbillableOrderStatus();
        //verify the status is Draft

        const status = this.unbillableOrderStatus;
        // expect(status).toBe('Draft'); // add soft assertion

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
        // expect(status).toBe('Completed');
    }
    async clickOnCompleteButtonNoStatus(): Promise<void> {

        await this.page.locator(this.Elements.completeButton).click();
        await this.page.locator(this.Elements.okButtonOnCompletePopup).click();
        await this.page.waitForLoadState('networkidle');
        this.captureUnbillableOrderNumber();
        this.captureUnbillableOrderStatus();
        //add delay
        await fixture.page.waitForTimeout(5000);
    }
    async clickOnCompleteButtonNoStatusOT(): Promise<void> {
        await this.page.locator(this.Elements.hourType).click();
        await this.page.getByText('Over Time').click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.completeButton).click();
        await this.page.locator(this.Elements.okButtonOnCompletePopup).click();
        await this.page.waitForLoadState('networkidle');
        this.captureUnbillableOrderNumber();
        this.captureUnbillableOrderStatus();
        //add delay
        await fixture.page.waitForTimeout(5000);
    }

    async clickOnSaveButton(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.saveOkButton).click();
        await this.page.waitForLoadState('networkidle');
        await fixture.page.waitForTimeout(2000);
        await this.captureUnbillableOrderStatus();
        //verify the status is Completed
        const status = this.unbillableOrderStatus;
        // expect(status).toBe('Completed');
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
        // expect(status).toBe('Closed');
    }

    async clickOnCloseButtonNoStatus(): Promise<void> {
        await fixture.page.waitForTimeout(5000);
        await this.page.locator(this.Elements.closeButtonWO).click();
        await this.page.locator(this.Elements.OKButtonOnWOclosePopup).click();
        await this.page.waitForLoadState('networkidle');

    }
    async clickOnCloseButtonNoStatusOT(): Promise<void> {
        await this.page.locator(this.Elements.hourType).click();
        await this.page.getByText('Over Time').click();
        await fixture.page.waitForTimeout(1000);
        await fixture.page.waitForTimeout(5000);
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
        // expect(status.toLowerCase()).toBe('cancelled');
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
        await fixture.page.waitForTimeout(8000);
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
    async asst6Details(): Promise<void> {
        //Asset 1
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('UTR001');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'UTR001' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.IsPMCheckBox).check();
        await this.page.locator(this.Elements.PMGroupList).click();
        await this.page.getByText('Hourly PMs').click();
        await this.page.locator(this.Elements.PMName).click();
        await this.page.getByText('1500 Hour').click();
        await this.page.locator(this.Elements.PMHours).click();
        await this.page.locator(this.Elements.PMHours).fill('2');

        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('4EZ - Electrical / Electronics').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BR - Broken').click();
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('IP - Inspect and report').click();
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('CABN - CABN - Cab').click();
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
    async batchCloseMenuClick(): Promise<void> {
        await this.page.locator(this.Elements.WorkOrderMenu).click();
        await this.page.locator(this.Elements.batchCloseMenu).click();
        await this.page.locator(this.Elements.WONumberSearchBatchClose).fill(this.unbillableOrderNumber);
        await this.page.locator(this.Elements.BatchCloseCheckBox).click();
        await this.page.locator(this.Elements.BatchCloseButton).click();
        //add delay
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.BatchCloseOkButton).click();
    }
    async verifyUnbillableOrderClosedStatus(): Promise<void> {
        await this.captureUnbillableOrderStatus();
        //verify the status is Closed
        const status = this.unbillableOrderStatus;
        expect(status).toBe('Closed');
    }
    async doBatchReviewAfterSelectFromDashboard(): Promise<void> {
        await this.base.waitAndClick(this.Elements.userIcon);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.todoListMenu);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.batchCloseTabSectionDashboard);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.WONumberSearchBatchClose).fill(this.unbillableOrderNumber);
        await this.page.locator(this.Elements.BatchCloseCheckBox).click();
        await this.page.locator(this.Elements.BatchCloseButton).click();
        //add delay
        await fixture.page.waitForTimeout(3000);
        await this.page.locator(this.Elements.BatchCloseOkButton).click();
    }
    async assetSearchAndSelect(assetNumber: string): Promise<void> {
        const assetInput = this.page.locator(this.Elements.assetNumberSearch);
        await assetInput.type(assetNumber);
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(1000);
        //verify search result contains asset number
        const searchResultText = await this.page.locator(this.Elements.assetSearchResult).textContent();
        expect(searchResultText).toContain(assetNumber);


    }
    async assetDescriptionSearchAndSelect(assetDescription: string): Promise<void> {
        const assetInput = this.page.locator(this.Elements.assetDescriptionSearch);
        await assetInput.type(assetDescription);
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(1000);
        //verify search result contains asset description
        const searchResultText = await this.page.locator(this.Elements.assetDescriptionSearchResult).textContent();
        expect(searchResultText).toContain(assetDescription);
    }
    async assetGroupSearchAndSelect(assetGroup: string): Promise<void> {

        await this.page.locator(this.Elements.assetGroupSearch).click();
        await this.page.getByText(assetGroup, { exact: true }).click();
        await this.page.mouse.click(10, 10);
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(1000);
        //verify search result contains asset group
        const searchResultText = await this.page.locator(this.Elements.assetGroupSearchResult).textContent();
        expect(searchResultText).toContain(assetGroup);
    }
    async wostatusSearchAndSelect(woStatus: string): Promise<void> {

        await this.page.locator(this.Elements.workOrderStatusSearch).click();
        await this.page.getByText(woStatus, { exact: true }).click();
        await this.page.mouse.click(10, 10);
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(1000);
        //verify search result contains work order status
        const searchResultText = await this.page.locator(this.Elements.workOrderStatusSearchResult).textContent();
        expect(searchResultText).toContain(woStatus);
    }
    async mechanicSearchAndSelect(mechanicID: string): Promise<void> {
        const mechanicSearchField = this.page.locator(this.Elements.mechanicSearchField);
        await mechanicSearchField.type(mechanicID);
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: mechanicID }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(1000);
        //verify search result contains mechanic ID
        const searchResultText = await this.page.locator(this.Elements.mechanicSearchResult).textContent();
        expect(searchResultText).toContain(mechanicID);

    }
    async searchByRepairDateRange(): Promise<void> {
        await this.page.locator(this.Elements.repairStartDateField).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await expect.soft(this.page.locator(this.Elements.repairDateSearchResult)).toBeVisible();
        //verify the asset number in search result
        const now = new Date();

        const year = now.getFullYear();
        const monthShort = now.toLocaleString('en-US', { month: 'short' }); // Jan, Feb, etc.
        const day = String(now.getDate()).padStart(2, '0'); // 2-digit day with leading zero

        const date = `${year}-${monthShort}-${day}`; // e.g. "2026-Jan-14"

        // Then verify:
        await expect.soft(this.page.locator(this.Elements.repairDateSearchResult)).toContainText(date);
        // await expect.soft(this.page.locator(this.Elements.searchResultRow)).toBeVisible();
    }
    async shopSearchAndSelect(shop: string): Promise<void> {

        await this.page.locator(this.Elements.shopsearch).click();
        await this.page.getByText(shop, { exact: true }).click();
        await this.page.mouse.click(10, 10);
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(1000);
        //verify search result contains shop
        const searchResultText = await this.page.locator(this.Elements.shopSearchResult).textContent();
        expect(searchResultText).toContain(shop);
    }
    async shiftSearchAndSelect(shift: string): Promise<void> {
        await this.page.locator(this.Elements.shiftSearch).click();
        await this.page.getByText(shift, { exact: true }).click();
        await this.page.mouse.click(10, 10);
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(1000);
        //verify search result contains shift
        const searchResultText = await this.page.locator(this.Elements.shiftSearchResult).textContent();
        expect(searchResultText).toContain(shift);
    }
    async stockSearchAndSelect(stock: string): Promise<void> {
        const stockInput = this.page.locator(this.Elements.stockNumberSearch);
        await stockInput.type(stock);
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(1000);
        //verify search result contains stock number
        const searchResultText = await this.page.locator(this.Elements.stockNumberSearchResult).textContent();
        expect(searchResultText).toContain(stock);


    }
    async AssetManufactureSearchAndSelect(AssetManufacture: string): Promise<void> {
        const AssetManufactureSearchField = this.page.locator(this.Elements.assetManufacture);
        await AssetManufactureSearchField.type(AssetManufacture);
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: AssetManufacture }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(1000);
        //verify search result contains Asset Manufacture
        const searchResultText = await this.page.locator(this.Elements.assetManufactureSearchResult).textContent();
        expect(searchResultText).toContain(AssetManufacture);

    }
    async ClaimeTypeSearchAndSelect(ClaimeTypeSearchAndSelect: string): Promise<void> {
        await this.page.locator(this.Elements.assetManufactureClaimType).click();
        await this.page.getByText(ClaimeTypeSearchAndSelect, { exact: true }).click();
        await this.page.mouse.click(10, 10);
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(1000);
        //verify search result contains claim type
        const searchResultText = await this.page.locator(this.Elements.assetManufactureClaimTypeSearchResult).textContent();
        expect(searchResultText).toContain(ClaimeTypeSearchAndSelect);
    }
    async CreateNewOrderForFirstShiftToVerifyPayroll(specialShift: string): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('ANDY.REYES');
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
    async CreateNewOrderForFirstShiftToVerifyPayrollVesselSail(specialShift: string): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('GABRIEL.ALEPE');
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
    async asst8Details(): Promise<void> {
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
        await this.page.locator(this.Elements.actualHours).fill('8');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(2).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');
    }
    async navigateToPayrollReviewScreen(): Promise<void> {
        await this.page.locator(this.Elements.payrollMenu).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.reviewPayrollMenu).click();
        await this.page.waitForLoadState('networkidle');
    }

    async verifyShopInPayrollScreen(): Promise<void> {
        await this.page.locator(this.Elements.shopPayrollScreenHeader).click();
        await this.page.getByText('Container - Container Maintenance').click();
        await this.page.locator(this.Elements.shopPayrollScreenHeader).click();
        await this.page.getByText('Crane - Crane Maintenance').click();
        await this.page.locator(this.Elements.refreshButton).click();
        await this.page.locator(this.Elements.shopPayrollScreenHeader).click();
        await this.page.getByText('Crane - Crane Maintenance').click();
        await fixture.page.waitForTimeout(1000);
    }

    async verifyShiftInPayrollScreen(Shift: string): Promise<void> {
        await this.page.locator(this.Elements.ShiftListPayrollScreen).click();
        await this.page.getByText(Shift).click();
        await this.page.locator(this.Elements.refreshButton).click();
        await fixture.page.waitForTimeout(3000);


    }
    async STandOT(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWO).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('8.00');
        expect(this.OT).toBe('2.00');
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTApprovePayroll(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "//table/tbody/tr[td[4][normalize-space()='ANDY.REYES']]/td[8]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "//table/tbody/tr[td[4][normalize-space()='ANDY.REYES']]/td[9]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWOApprovePayroll).textContent();
        const errors = [];

        // try {
        //     expect(IsConsistantWithWO).toBe('YES');
        // } catch (e) {
        //     errors.push(e);
        // }

        try {
            expect(this.ST).toBe('8.00');
        } catch (e) {
            errors.push(e);
        }

        try {
            expect(this.OT).toBe('2.00');
        } catch (e) {
            errors.push(e);
        }

        if (errors.length > 0) {
            const errorMessages = errors.map(err => err.message).join('\n');
            throw new Error(`Soft assertion failures:\n${errorMessages}`);
        }
        await fixture.page.waitForTimeout(1000);
    }
    async clickonWObUttonInPayrollScreen(): Promise<void> {
        await this.page.locator(this.Elements.showWODetails).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.WOLinkOnPopUp).click();
        //add delay
        await fixture.page.waitForTimeout(8000);

    }
    async clickonWObUttonInPayrollScreenSecondShiftNormal(): Promise<void> {
        await this.page.locator(this.Elements.showWODetails2ndUser).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.WOLinkOnPopUp).click();
        //add delay
        await fixture.page.waitForTimeout(3000);

    }
    async clickonWObUttonInPayrollScreenThirdShiftNormal(): Promise<void> {
        await this.page.locator(this.Elements.showWODetailsThirdUser).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.WOLinkOnPopUp).click();
        //add delay
        await fixture.page.waitForTimeout(3000);

    }
    async clickonWObUttonInPayrollScreenThirdShiftNormalApproveScreen(): Promise<void> {
        await this.page.locator(this.Elements.showWODetailsThirdUser).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.WOLinkOnPopUp).click();
        //add delay
        await fixture.page.waitForTimeout(3000);

    }
    async clickOnCancelButtonAfterVerifyPayroll(): Promise<void> {
        await fixture.page.waitForTimeout(5000);
        await this.page.locator(this.Elements.cancelButton1).click();
        await this.page.waitForSelector(this.Elements.cancelokButton1);
        await this.page.locator(this.Elements.cancelokButton1).click();
        await this.page.waitForLoadState('networkidle');
        //add delay
        await fixture.page.waitForTimeout(2000);
        // Wait for the header to update with the new status
        await this.page.locator(this.Elements.headerTitle).locator('xpath=.').waitFor({ state: 'visible' });
        await fixture.page.waitForTimeout(1000);
        await this.captureUnbillableOrderStatus();
        //verify the status is cancelled
        const status = this.unbillableOrderStatus;
        // expect(status.toLowerCase()).toBe('cancelled');
    }
    async STandOTAfterCancel(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWO).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('0.00');
        expect(this.OT).toBe('0.00');
        await fixture.page.waitForTimeout(1000);
    }
    async CreateNewOrderForFirstShiftToVerifyPayrollOT(specialShift: string): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('ANDY.REYES');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.specialShiftOption).click();
        await this.page.getByText(specialShift).click();//select special shift from dropdown
        const notesInput = this.page.locator(this.Elements.note);
        await notesInput.fill('Automation test notes ' + getRandomInt(1000, 9999).toString());
        await this.page.locator(this.Elements.hourType).click();
        await this.page.getByText('Over Time').click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.lbctLeadCheckBox).check();
        await fixture.page.waitForTimeout(1000);
    }
    //secondshift
    async CreateNewOrderForFirstShiftToVerifyPayrollSecondShift(specialShift: string): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('BRAD.WILLIAMS');
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
    async STandOTSecondShiftNormal(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWO2ndUser).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('8.00');
        expect(this.OT).toBe('2.00');
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTSecondShiftNormalApprovePayroll(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "//table/tbody/tr[td[4][normalize-space()='BRAD.WILLIAMS']]/td[8]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "//table/tbody/tr[td[4][normalize-space()='BRAD.WILLIAMS']]/td[9]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWO2ndUserApprove).textContent();
        // expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('8.00');
        expect(this.OT).toBe('2.00');
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTAfterCancelSecondShiftNormal(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWO2ndUser).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('0.00');
        expect(this.OT).toBe('0.00');
        await fixture.page.waitForTimeout(1000);
    }

    async CreateNewOrderForFirstShiftToVerifyPayrollThirdShift(specialShift: string): Promise<void> {
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
    async STandOTThirdShiftNormal(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWThirdUser).textContent();
        // expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('5.00');
        expect(this.OT).toBe('1.00');
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTThirdShiftNormalApproveScreen(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "//table/tbody/tr[td[4][normalize-space()='ARNULFO.LOPEZ']]/td[8]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "//table/tbody/tr[td[4][normalize-space()='ARNULFO.LOPEZ']]/td[9]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWThirdUserApproveScreen).textContent();
        // expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('5.00');
        expect(this.OT).toBe('1.00');
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTAfterCancelThirdShiftNormal(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWThirdUser).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('0.00');
        expect(this.OT).toBe('0.00');
        await fixture.page.waitForTimeout(1000);
    }
    async asst8DetailsForThirdShift(): Promise<void> {
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
        await this.page.locator(this.Elements.actualHours).fill('5');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(2).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');
    }
    async CreateNewOrderToVerifyPayrollSecondShiftOT(specialShift: string): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('BRAD.WILLIAMS');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.specialShiftOption).click();
        await this.page.getByText(specialShift).click();//select special shift from dropdown
        const notesInput = this.page.locator(this.Elements.note);
        await notesInput.fill('Automation test notes ' + getRandomInt(1000, 9999).toString());
        await this.page.locator(this.Elements.hourType).click();
        await this.page.getByText('Over Time').click();
        await this.page.locator(this.Elements.lbctLeadCheckBox).check();
        await fixture.page.waitForTimeout(1000);
    }
    async CreateNewOrderForVerifyPayrollThirdShiftOT(specialShift: string): Promise<void> {
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
        await this.page.locator(this.Elements.hourType).click();
        await this.page.getByText('Over Time').click();
        await this.page.locator(this.Elements.lbctLeadCheckBox).check();
        await fixture.page.waitForTimeout(1000);
    }
    async asst8DetailsForVesselSail(): Promise<void> {
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
        await this.page.locator(this.Elements.actualHours).fill('4');
        await this.page.getByPlaceholder('--Input Text or Look up--').nth(2).type('1000');
        await fixture.page.waitForTimeout(1000);
        const searchText = `1000 - ST 47 RB - Lamp Tail Light - Red`;
        await this.page.getByRole('listitem').filter({ hasText: searchText }).locator('span').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');
    }
    async STandOTForVessel(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='GABRIEL.ALEPE']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='GABRIEL.ALEPE']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator("xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='GABRIEL.ALEPE']/td[7]").textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('4.00');
        expect(this.OT).toBe('0.00');
        await fixture.page.waitForTimeout(1000);
    }
        async STandOTForVessel1(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator("xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='GABRIEL.ALEPE']/td[7]").textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('4.00');
        expect(this.OT).toBe('0.00');
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTSecondShiftForVessel(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWO2ndUser).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('4.00');
        expect(this.OT).toBe('0.00');
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTThirdShiftForVessel(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWThirdUser).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('4.00');
        expect(this.OT).toBe('0.00');
        await fixture.page.waitForTimeout(1000);
    }

    async CreateNewOrderForFirstShiftWeekEnd(specialShift: string): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('ANDY.REYES');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.specialShiftOption).click();
        await this.page.getByText(specialShift).click();//select special shift from dropdown
        const notesInput = this.page.locator(this.Elements.note);
        await notesInput.fill('Automation test notes ' + getRandomInt(1000, 9999).toString());
        // await this.page.locator(this.Elements.repairDate).click();
        // Calculate last Sunday's date
        await this.page.locator(this.Elements.repairDate).click();
        const today = new Date();
        const lastSunday = new Date(today);
        lastSunday.setDate(today.getDate() - today.getDay());

        const year = lastSunday.getFullYear();
        const month = lastSunday.toLocaleString('default', { month: 'short' }); // e.g., "Feb"
        const day = String(lastSunday.getDate());


        //click on the calculated date in the calendar
        await this.page.locator(`//td[contains(@class, 'available') and normalize-space(text())='${day}']`).click();

        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.lbctLeadCheckBox).check();
        await fixture.page.waitForTimeout(1000);
    }

    async datePayrollScreen(): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.repairDatePayroll).click();
        const today = new Date();
        const lastSunday = new Date(today);
        lastSunday.setDate(today.getDate() - today.getDay());

        const year = lastSunday.getFullYear();
        const month = lastSunday.toLocaleString('default', { month: 'short' }); // e.g., "Feb"
        const day = String(lastSunday.getDate());


        //click on the calculated date in the calendar
        await this.page.locator(`//td[contains(@class, 'available') and normalize-space(text())='${day}']`).click();
        await fixture.page.waitForTimeout(3000);

    }
    async STandOTForWeekend(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWO).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('0.00');
        expect(this.OT).toBe('10.00');
        await fixture.page.waitForTimeout(1000);
    }
    async CreateNewOrderToVerifyPayrollSecondShiftOTWeekEnd(specialShift: string): Promise<void> {
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('BRAD.WILLIAMS');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.specialShiftOption).click();
        await this.page.getByText(specialShift).click();//select special shift from dropdown
        const notesInput = this.page.locator(this.Elements.note);
        await notesInput.fill('Automation test notes ' + getRandomInt(1000, 9999).toString());
        // await this.page.locator(this.Elements.repairDate).click();
        // Calculate last Sunday's date
        await this.page.locator(this.Elements.repairDate).click();
        const today = new Date();
        const lastSunday = new Date(today);
        lastSunday.setDate(today.getDate() - today.getDay());

        const year = lastSunday.getFullYear();
        const month = lastSunday.toLocaleString('default', { month: 'short' }); // e.g., "Feb"
        const day = String(lastSunday.getDate());


        //click on the calculated date in the calendar
        await this.page.locator(`//td[contains(@class, 'available') and normalize-space(text())='${day}']`).click();

        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.lbctLeadCheckBox).check();
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTSecondShiftForWeekEndNormal(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWO2ndUser).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('0.00');
        expect(this.OT).toBe('10.00');
        await fixture.page.waitForTimeout(1000);
    }
    async CreateNewOrderToVerifyPayrollThridShiftOTWeekEnd(specialShift: string): Promise<void> {
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
        // await this.page.locator(this.Elements.repairDate).click();
        // Calculate last Sunday's date
        await this.page.locator(this.Elements.repairDate).click();
        const today = new Date();
        const lastSunday = new Date(today);
        lastSunday.setDate(today.getDate() - today.getDay());

        const year = lastSunday.getFullYear();
        const month = lastSunday.toLocaleString('default', { month: 'short' }); // e.g., "Feb"
        const day = String(lastSunday.getDate());


        //click on the calculated date in the calendar
        await this.page.locator(`//td[contains(@class, 'available') and normalize-space(text())='${day}']`).click();

        await fixture.page.waitForTimeout(1000);

        await this.page.locator(this.Elements.lbctLeadCheckBox).check();
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTThirdShiftForWeekEndNormal(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWThirdUser).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('0.00');
        expect(this.OT).toBe('6.00');
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTForWeekendForVesselSailFirstShift(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ANDY.REYES']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWO).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('0.00');
        expect(this.OT).toBe('4.00');
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTSecondShiftForWeekEndVesselSAIL(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='BRAD.WILLIAMS']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWO2ndUser).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('0.00');
        expect(this.OT).toBe('4.00');
        await fixture.page.waitForTimeout(1000);
    }
    async STandOTThirdShiftForWeekEndVesselSAIL(): Promise<void> {
        //verify ST=8 and OT=2

        this.ST = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[5]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "xpath=//*[@id='app']/div[2]/div/div/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table/tbody/tr[td[1]='ARNULFO.LOPEZ']/td[6]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator(this.Elements.IsConsistantWithWThirdUser).textContent();
        expect(IsConsistantWithWO).toBe('YES');
        expect(this.ST).toBe('0.00');
        expect(this.OT).toBe('4.00');
        await fixture.page.waitForTimeout(1000);
    }
    async verifyLeadManCheckBox(): Promise<void> {
        const isChecked = await this.page.locator(this.Elements.lbctLeadCheckBox).isChecked();

        if (!isChecked) {
            throw new Error('Lead Mechanic checkbox is not checked as expected');
        }
    }
    async verifyLeadManCheckBoxNotChecked(): Promise<void> {
        const isChecked = await this.page.locator(this.Elements.lbctLeadCheckBox).isChecked();

        if (isChecked) {
            throw new Error('Lead Mechanic checkbox is checked but expected to be unchecked');
        }
        // Checkbox is unchecked; no further action needed
    }
    async bombCartasstDetails(): Promise<void> {
        //Asset 1
        const assetInput = this.page.locator(this.Elements.assetNumber);
        await assetInput.type('BC001');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);


        const suggestion = this.page.getByRole('listitem').filter({ hasText: 'BC001' }).first();
        await suggestion.waitFor({ state: 'visible', timeout: 1500 });
        await suggestion.click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.IsPMCheckBox).check();
        await this.page.locator(this.Elements.PMGroupList).click();
        await this.page.getByText('General PM').click();
        await this.page.locator(this.Elements.PMName).click();
        await this.page.getByText('3M PM').click();
        // await this.page.locator(this.Elements.PMHours).click();
        // await this.page.locator(this.Elements.PMHours).fill('2');

        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('4MZ - Mechanical Misc').click();
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('LK - Leak').click();
        await this.page.locator(this.Elements.repairCode).click();
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
    }
    async saftyTalkSubject(): Promise<void> {
        await this.page.locator(this.Elements.saftyTalkSubject).click();
        await this.page.getByText('Automation').click();
    }

    async ClickReviewButton(): Promise<void> {
        await this.page.locator(this.Elements.reviewButton).click();

        // Verify that the review success message appears
        await this.page.locator(this.Elements.reviewSuccessMessage).waitFor({ state: 'visible' });

        await this.page.locator(this.Elements.reviewOkayButton).click();

    }
    async approvePayrollMenuWeekDay(): Promise<void> {
        await this.page.locator(this.Elements.payrollMenu).click();
        await this.page.locator(this.Elements.approvePayrollMenu).click();
        //Tick the checkBox that having current date eg. //span[normalize-space()='2026-Feb-09']
        // Function to get current date in 'yyyy-MMM-dd' format (e.g., 2026-Feb-09)
        function getCurrentFormattedDate() {
            const date = new Date();
            const year = date.getFullYear();
            const month = date.toLocaleString('en-US', { month: 'short' });
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }

        const currentDate = getCurrentFormattedDate();

        // XPath to locate checkbox related to current date span
        const checkboxLocator = `//span[normalize-space()='${currentDate}']`;

        // Tick the checkbox for the current date
        await this.page.locator(checkboxLocator).check();

    }
    async firstShiftCheckBox(): Promise<void> {
        await this.page.locator(this.Elements.firstShiftCheckBox).click();
        await fixture.page.waitForTimeout(1000);

    }
    async secondShiftCheckBox(): Promise<void> {
        await this.page.locator(this.Elements.secondShiftCheckBox).click();
        await fixture.page.waitForTimeout(1000);

    }
    async thirdShiftCheckBox(): Promise<void> {
        await this.page.locator(this.Elements.ThirdShiftCheckBox).click();
        await fixture.page.waitForTimeout(1000);

    }
    async clickonWObUttonInPayrollScreenApprovePayroll(): Promise<void> {
        await this.page.locator("//table/tbody/tr[td[4][normalize-space()='ANDY.REYES']]/td[11]/div/div/div/div/button/span/i").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.WOLinkOnPopUp).click();
        //add delay
        await fixture.page.waitForTimeout(3000);

    }
    async clickonWObUttonInPayroll_second_ScreenApprovePayroll(): Promise<void> {
        await this.page.locator("//table/tbody/tr[td[4][normalize-space()='BRAD.WILLIAMS']]/td[11]/div/div/div/div/button/span/i").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.WOLinkOnPopUp).click();
        //add delay
        await fixture.page.waitForTimeout(3000);

    }
    async clickonWObUttonInPayroll_Third_ScreenApprovePayroll(): Promise<void> {
        await this.page.locator("//table/tbody/tr[td[4][normalize-space()='ARNULFO.LOPEZ']]/td[11]/div/div/div/div/button/span/i").click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.WOLinkOnPopUp).click();
        //add delay
        await fixture.page.waitForTimeout(3000);

    }
    async STandOTForVesselApprovePayroll(): Promise<void> {

        //verify ST=4 and OT=0

        this.ST = await this.page.locator(
            "//table/tbody/tr[td[4][normalize-space()='GABRIEL.ALEPE']]/td[8]//input"
        ).inputValue();
        this.OT = await this.page.locator(
            "//table/tbody/tr[td[4][normalize-space()='GABRIEL.ALEPE']]/td[9]//input"
        ).inputValue();
        const IsConsistantWithWO = await this.page.locator("//table/tbody/tr[td[4][normalize-space()='GABRIEL.ALEPE']]/td[10]").textContent();
        const errors = [];

        // try {
        //     expect(IsConsistantWithWO).toBe('YES');
        // } catch (e) {
        //     errors.push(e);
        // }

        try {
            expect(this.ST).toBe('4.00');
        } catch (e) {
            errors.push(e);
        }

        try {
            expect(this.OT).toBe('0.00');
        } catch (e) {
            errors.push(e);
        }

        if (errors.length > 0) {
            const errorMessages = errors.map(err => err.message).join('\n');
            throw new Error(`Soft assertion failures:\n${errorMessages}`);
        }
        await fixture.page.waitForTimeout(1000);
    }
    async clickOnApproveButton(): Promise<void> {
        await this.page.locator(this.Elements.ApproveButton).click();
        await fixture.page.waitForTimeout(1000);
        // Verify that the approval success message appears
        await this.page.locator(this.Elements.approveMessage).waitFor({ state: 'visible' });
        await this.page.locator(this.Elements.ApproveOkayButton).click();




    }
}