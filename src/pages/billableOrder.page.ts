import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";
import { ok } from "assert";
import { th } from "date-fns/locale";
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(100 * 1000);

export default class BillableOrderPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public billableOrderNumber: string = '';
    public billableOrderStatus: string = '';
    public mnrInvoiceNumber: string = '';
    public mnrCreditNumber: string = '';
    public creditStatus: string = '';
    public postStatusOriginal: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        billableOrderMenu: "//span[normalize-space()='Work Order']",
        createBillableOrderMenu: "//span[normalize-space()='- Create Billable Work Order']",
        inquireBillableOrderMenu: "//span[normalize-space()='- Inquire Billable Work Order']",
        assetNo: "(//label[normalize-space(text())='Asset No.']/following::input)[1]",
        mechanicSearch: "//div[@class='select-lookup form-control']//i[1]",
        userIDSearchBox: "(//span[normalize-space(text())='Lookup Mechanic']/following::input)[1]",
        LOOKuPmechanicSearch: "//div[@class='el-dialog__wrapper']//span[contains(text(),'Search')]",
        lookUpMechanicOkButton: "(//span[contains(text(),'OK')])[1]",
        notes: "(//label[normalize-space(text())='Notes']/following::textarea)[1]",
        componentCode: "(//input[@placeholder='Component Code'])[1]",
        componentCode2: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/table[1]/tbody[1]/tr[4]/td[1]/div[1]/div[1]/div[1]/input[1]",
        damageCode: "(//input[@placeholder='Damage Code'])[1]",
        damageCode2: "(//input[@placeholder='Damage Code'])[2]",
        repairCode: "(//input[@placeholder='Repair Code'])[1]",
        repairCode2: "(//input[@placeholder='Repair Code'])[2]",
        actualHours: "(//input[@type='text'])[23]",
        stockNumberSearchwo: "//div[@placeholder='--Input Text or Look up--']//i[@class='el-input__icon el-icon-search is-clickable']",
        stockNumberSearchBoxwo: "(//label[normalize-space(text())='Stock No.']/following::input)[1]",
        searchButtonLookUpwo: "//span[normalize-space(text())='Search']",
        okButtonLookUpwo: "(//span[contains(text(),'OK')])[2]",
        stockQuantitywo: "(//input[@type='text'])[27]",
        saveButton: "(//span[normalize-space()='Save'])[1]",
        draftButton: "(//span[normalize-space()='Draft'])[1]",
        completeButton: "//span[normalize-space()='Complete']",
        closeButton: "(//span[normalize-space()='Close'])[1]",
        closeButtonActionLog: "(//i[@class='el-dialog__close el-icon el-icon-close'])[2]",
        okCloseButton: "(//span[contains(text(),'OK')])[8]",
        reviewButton: "//span[normalize-space()='Review']",
        okButtonReview: "(//span[contains(text(),'OK')])[6]",
        headerTitle: "//span[@class='header-title font-size-title']",
        WONumberSearch: "(//label[normalize-space(text())='Work Order No.']/following::input)[1]",
        WONumberLink: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/a[1]",
        copyButton: "//span[normalize-space(text())='Copy']",
        YesButton: "//span[normalize-space(text())='Yes']",
        okButton: "(//span[contains(text(),'OK')])[10]",
        reviewOkButton: "(//button[contains(@class,'el-button el-button--default el-button--primary')])[1]",
        returnToCompleteButton: "(//span[contains(text(),'Return to Complete')])[1]",
        returnToCCompleteOKButton: "(//span[contains(text(),'OK')])[8]",
        cancelButton: "(//span[normalize-space()='Cancel'])[1]",
        cancelOkButton: "(//span[contains(text(),'OK')])[8]",
        okCompleteButton: "(//span[contains(text(),'OK')])[8]",
        printDraftInvoiceButton: "//span[normalize-space()='Print Draft Invoice']",
        emailDraftInvoiceButton: "(//span[contains(text(),'Email Draft Invoice')])[2]",
        ToField: "(//label[normalize-space(text())='To:']/following::input)[1]",
        emailButton: "//span[normalize-space(text())='Email']",
        actionLog: "(//span[contains(text(),'Action Log')])[1]",
        headerTitleActionLog: "//span[@class='el-dialog__title'][normalize-space()='Action Log']",
        operationSearch: "(//input[@placeholder='--Input Text--'])[3]",
        operationSearchResult: "//div[@class='cell']//span[contains(text(),'Email Draft Invoice')]",
        saveButtonOkButton: "(//span[contains(text(),'OK')])[25]",
        newButton: "//span[normalize-space()='New']",
        batchReviewBillableWorkOrderMenu: "//span[normalize-space(text())='- Batch Review Billable Work Order']",
        batchWONumberSearch: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        batchWONumberCheckbox: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/label[1]/span[1]/span[1]",
        batchReviewButton: "//span[normalize-space(text())='Batch Review']",
        batchReviewOkButton: "(//span[contains(text(),'OK')])[8]",
        searchButton: "(//span[normalize-space()='Search'])[1]",
        woNumberLink: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/a[1]",
        batchCloseBillableWOMenu: "//span[normalize-space()='- Batch Close Billable Work Order']",
        batchCloseBillableWOSearch: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        batchCloseWONumberCheckbox: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/label[1]/span[1]/span[1]",
        batchCloseButton: "//span[normalize-space(text())='Batch Close']",
        batchCloseOkButton: "(//span[contains(text(),'OK')])[11]",
        damageLength: "(//input[@placeholder='--Input Number--'])[1]",
        damageLength2: "(//input[@placeholder='--Input Number--'])[3]",
        damageWidth: "(//input[@placeholder='--Input Number--'])[2]",
        damageWidth2: "(//input[@placeholder='--Input Number--'])[4]",
        repairLocation: "(//input[@placeholder='--Select One--'])[6]",
        repairLocation2: "(//input[@placeholder='--Select One--'])[8]",
        completeOkButton: "(//span[contains(text(),'OK')])[15]",
        actualHours2: "(//input[@type='text'])[36]",
        stockQuantitywo2: "(//input[@type='text'])[40]",
        mnrInvoiceLabel: "//span[normalize-space()='MNR Invoice']",
        draftInvoiceNumber: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[4]/div[1]",
        // Search filter locators
        assetSearchField: "(//label[normalize-space(text())='Asset No.']/following::input)[1]",
        billableAssetDescriptionField: "(//label[normalize-space(text())='Asset Description']/following::input)[1]",
        assetGroupField: "(//label[normalize-space(text())='Asset Group']/following::input)[2]",
        billingPartyField: "(//label[normalize-space(text())='Billing Party']/following::input)[2]",
        workOrderStatusField: "(//label[normalize-space(text())='Work Order Status']/following::input)[2]",
        shopField: "(//label[normalize-space(text())='Shop']/following::input)[2]",
        shiftField: "(//label[normalize-space(text())='Shift']/following::input)[2]",
        repairStartDateField: "(//label[normalize-space(text())='Repair Date']/following::input)[1]",
        assetNosearchResultRow: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[3]/div[1]/span[1]",
        assetDescriptionResult: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[4]/div[1]/span[1]",
        assetGroupResult: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[5]/div[1]/span[1]",
        searchBillingPartyResultRow: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[6]/div[1]/span[1]",
        StatussearchResultRow: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[2]/div[1]/span[1]",
        shopSearchResult: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[8]/div[1]/span[1]",
        shiftSearchResult: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[10]/div[1]/span[1]",
        dateSearchResult: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[9]/div[1]/span[1]",
        inquireInvoceCreditMenu: "//a[@href='#/desktop/ARAP/inquireInvoice']//div[@class='ivu-menu-item select-item']",
        ARAPMenu: "(//div[@class='menu-icon']//img)[2]",
        WONumberSearchInvoice: "(//label[normalize-space(text())='Work Order No.']/following::input)[1]",
        draftInvoiceNumberLink: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/a[1]",
        wonumberLabel: "(//input[@class='el-input__inner'])[1]",
        createMNRCreditMenu: "//span[normalize-space()='- Create MNR Invoice/Credit']",
        woNumberMNRCreditSearch: "(//div[@class='el-input']//input)[1]",
        RetrieveButton: "//span[normalize-space()='Retrieve']",
        changedQuantityInput: "//tbody/tr[2]/td[4]/div[1]/div[1]/input[1]",
        draftButtonmnrcredit: "(//span[normalize-space()='Draft'])[1]",
        okButtonMNRCreditDraft: "(//span[contains(text(),'OK')])[8]",
        closeButtonmnrcredit: "(//span[normalize-space()='Close'])[1]",
        okCloseButtonmnrcredit: "(//span[contains(text(),'OK')])[8]",

        headerTitleMNRCredit: "//span[@class='header-title font-size-title']",
        credeitNumberWO: "//table[@class='el-table__body']/tbody[1]/tr[2]/td[4]/div[1]/span[1]",
        saveButtonmnrcredit: "//span[normalize-space()='Save']",
        cancelCreditButton: "(//span[contains(text(),'Cancel')])[1]",
        operationSearchCredit: "(//input[@placeholder='--Input Text--'])[3]",
        draftInvoiceNumberSearch: "(//label[normalize-space(text())='Draft Invoice No.']/following::input)[1]",
        operaionSearchResultCredit: "//span[normalize-space()='Cancel MNR Invoice/Credit']",
        BatchCloseCreditMenu: "//span[normalize-space()='- Batch Close Invoice/Credit']",
        draftInvoiceNoSearchBatchClose: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        checkBoxDraftInvoiceBatchClose: "(//span[@class='el-checkbox__inner'])[2]",
        batchCloseButtonCredit: "//span[normalize-space(text())='Batch Close']",
        batchCloseOkButtonCredit: "//button[contains(@class,'el-button el-button--default el-button--primary')]//span[contains(text(),'OK')]",
        userIcon: "//i[@class='menu-icon ivu-icon ivu-icon-person']",
        todoListMenu: "//div[@class='ivu-menu-item select-item']//span[contains(text(),'To-Do List')]",
        batchCloseTabSectionDashboard: "//div[normalize-space(text())='Close AR Invoice/Credit']",
        batchReviewTabSectionDashboard: "//div[normalize-space()='Review Billable Work Order']",
        CloseBillableOrderTabSectionDashboard: "//div[normalize-space(text())='Close Billable Work Order']",

        batchPostInvoiceCreditMenu: "//span[normalize-space()='- Batch Post Invoice/Credit']",
        batchPostInvoiceCreditSearch: "//table[@class='el-table__header']/thead[1]/tr[2]/th[2]/div[1]/div[1]/div[1]/div[1]/input[1]",
        checkBoxBatchPostInvoiceCredit: "(//span[@class='el-checkbox__inner'])[2]",
        batchpostButton: "//span[normalize-space()='Batch Post']",
        // batchPostOkButton:"(//span[contains(text(),'OK')])[11]",
        checkPostResultMenu: "//span[normalize-space()='- Check Post Result']",
        draftInvoiceSearchCheckPost: "//table[@class='el-table__header']/thead[1]/tr[2]/th[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        postStaus: "//tbody/tr[1]/td[4]/div[1]/span[1]",
        xmlFile: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[10]/div[1]/button[1]/span[1]/i[1]",
        woNumberLinkCreditList: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[6]/div[1]/span[1]/a[1]",
        batchCloseInvoiceNumber: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/a[1]",
        batchCloseWONumber: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/span[1]/a[1]",
        batchPostInvoiceNumber: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/span[1]/a[1]",
        batchPostWONumber: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/span[1]/a[1]",

        openInvoiceCreditMenu: "//span[normalize-space(text())='- Create Open Invoice/Credit']",
        billingPartyList: "(//label[normalize-space(text())='Billing Party']/following::input)[1]",
        ARGLCode: "(//label[normalize-space(text())='AR GL Code / AR Profit Center / AR Product Code']/following::input)[1]",
        note: "(//label[normalize-space(text())='Notes']/following::textarea)[1]",
        plusButton: "(//button[@shape='circle']//i)[1]",
        itemDescription1: "//tbody/tr[1]/td[1]/div[1]/input[1]",
        itemDescription2: "//tbody/tr[2]/td[1]/div[1]/input[1]",
        openInvoiceDraftButton: "//button[contains(.,'Draft')]",
        rate1: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[4]/div[1]/div[1]/input[1]",
        rate2: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/table[1]/tbody[1]/tr[2]/td[4]/div[1]/div[1]/input[1]",
        openDraftOKButton: "(//span[normalize-space()='OK'])[1]",
        operationSearchActionLog: "(//input[@placeholder='--Input Text--'])[6]",
        opeartionSearchResultOPenCredit: "//body[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[1]/div[1]",
        actionLogCloseButton: "(//i[@class='el-dialog__close el-icon el-icon-close'])[1]",
        openInvoice: "(//label[normalize-space(text())='Invoice Type']/following::input)[1]",















    };
    async clickOnCreateBillableOrderMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.billableOrderMenu);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.createBillableOrderMenu);
        await this.page.waitForLoadState('networkidle');
    }

    async clickOnInquireBillableOrderMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.billableOrderMenu);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.inquireBillableOrderMenu);
        await this.page.waitForLoadState('networkidle');
    }

    async searchBillableOrderByNumber(bwoNumber: string): Promise<void> {
        const searchInput = this.page.locator(this.Elements.WONumberSearch);
        await searchInput.fill(bwoNumber);
        await this.base.waitAndClick(this.Elements.searchButtonLookUpwo);
        await this.page.waitForLoadState('networkidle');
        await this.base.waitAndClick(this.Elements.WONumberLink);
        await this.page.waitForLoadState('networkidle');

    }

    async clickOnCopyButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.copyButton);
        await this.page.waitForTimeout(500);

    }
    async EnterDetailsAfterCopy(): Promise<void> {
        const notesInput = this.page.locator(this.Elements.notes);
        await notesInput.fill('Automation test notes ' + getRandomInt(1000, 9999).toString());
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('cell', { name: 'Stock No. --Input Text or Look up-- ' }).getByRole('textbox', { name: '--Input Text or Look up--' }).click();
        await this.page.getByRole('cell', { name: 'Stock No. --Input Text or Look up-- ' }).getByRole('textbox', { name: '--Input Text or Look up--' }).fill('3452');
        await this.page.getByText('3452 - M190FR - lamp 2" red flange LED').click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');

    }

    async createNewBillableOrder(): Promise<void> {
        const assetInput = this.page.locator(this.Elements.assetNo);
        await assetInput.type('GACZ401537');
        //await assetInput.press('Enter');
        await fixture.page.waitForTimeout(1000);
        //press outside to close any dropdown
        await this.page.mouse.click(10, 10);
        await fixture.page.waitForTimeout(1000);
        //select mechanic
        await this.page.locator(this.Elements.mechanicSearch).click();
        await this.page.locator(this.Elements.userIDSearchBox).fill('AARON.BARRIOS');
        await this.page.getByRole('button', { name: 'Search' }).click();
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(500);
        //enter notes
        const notesInput = this.page.locator(this.Elements.notes);
        await notesInput.fill('Automation test notes ' + getRandomInt(1000, 9999).toString());
        await fixture.page.waitForTimeout(500);
        //enter labor details
        await this.page.locator(this.Elements.componentCode).click();
        await this.page.getByText('KAA - Gladhand seal').first().click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BR - Broken').first().click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('RP - Replace').first().click();
        await this.page.locator(this.Elements.actualHours).nth(0).click();
        await this.page.locator(this.Elements.actualHours).nth(0).fill('8');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.damageLength).fill('2');
        await this.page.locator(this.Elements.damageWidth).fill('3');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.repairLocation).click();
        await this.page.getByText('CF9N - FRONT').first().click();
        //enter parts details
        await this.page.getByRole('cell', { name: 'Stock No. --Input Text or Look up-- ' }).getByRole('textbox', { name: '--Input Text or Look up--' }).click();
        await this.page.getByRole('cell', { name: 'Stock No. --Input Text or Look up-- ' }).getByRole('textbox', { name: '--Input Text or Look up--' }).fill('1020');
        await this.page.getByText('1020 - GT-2600 - grommet gladhand seal').first().click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');

        // ---- IGNORE ---
        await fixture.page.waitForTimeout(500);
        await this.page.locator(`//tr[@class='activity-row']//i[@class='ivu-icon ivu-icon-plus']`).click();
        await fixture.page.waitForTimeout(500)
        await this.page.locator(this.Elements.componentCode2).click();
        await this.page.getByText('KAA - Gladhand seal').nth(1).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.damageCode2).click();
        await this.page.getByText('CU - Cut').nth(1).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.repairCode2).click();
        await this.page.getByText('RP - Replace').nth(1).click();
        await this.page.locator(this.Elements.actualHours2).click();
        await this.page.locator(this.Elements.actualHours2).fill('8');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.damageLength2).fill('2');
        await this.page.locator(this.Elements.damageWidth2).fill('3');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.repairLocation2).click();
        await this.page.getByText('CF9N - FRONT').nth(1).click();
        //enter parts details
        await this.page.getByRole('cell', { name: 'Stock No. --Input Text or Look up-- ' }).getByRole('textbox', { name: '--Input Text or Look up--' }).nth(1).click();
        await this.page.getByRole('cell', { name: 'Stock No. --Input Text or Look up-- ' }).getByRole('textbox', { name: '--Input Text or Look up--' }).nth(1).fill('1020');
        await this.page.getByText('1020 - GT-2600 - grommet gladhand seal').nth(1).click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo2).click();
        await this.page.locator(this.Elements.stockQuantitywo2).fill('1');



    }

    async clickOnDraftButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.draftButton);
        await this.page.waitForTimeout(1000);
        this.page.locator(`//div[3]/button[2]/span`).click();
        //once click on above button, header gets updated with BWO number and status
        await fixture.page.waitForTimeout(3000);
        const element = await fixture.page.locator(this.Elements.headerTitle).textContent();
        const text = element ? element.toString() : '';

        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            if (match && match[1]) {
                this.billableOrderNumber = match[1];
                console.log(this.billableOrderNumber);
                // Use billableOrderNumber as needed


            }
            // Extract status from parentheses: "(Draft)", "(Complete)", etc.
            const statusMatch = text.match(/\(([^)]+)\)$/);
            if (statusMatch && statusMatch[1]) {
                this.billableOrderStatus = statusMatch[1];
                console.log('Status:', this.billableOrderStatus);
            }
        }
        //verify the status is drafted
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText('(Draft)');
        await fixture.page.waitForTimeout(3000);
    }

    async clickOnCompleteButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.completeButton);
        await this.page.waitForTimeout(1000);
        // await this.page.locator(this.Elements.YesButton).click();
        await this.base.waitAndClick(this.Elements.okCompleteButton);
        await fixture.page.waitForTimeout(3000);
        const element = await fixture.page.locator(this.Elements.headerTitle).textContent();
        const text = element ? element.toString() : '';
        if (text) {

            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            if (match && match[1]) {
                this.billableOrderNumber = match[1];
                console.log(this.billableOrderNumber);
                // Use billableOrderNumber as needed
            }

            // Extract status from parentheses: "(Draft)", "(Complete)", etc.
            const statusMatch = text.match(/\(([^)]+)\)$/);
            if (statusMatch && statusMatch[1]) {
                this.billableOrderStatus = statusMatch[1];
                console.log('Status:', this.billableOrderStatus);
            }
        }
        //verify the status is completed
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText('(Completed)');

        await fixture.page.waitForTimeout(3000);
    }
    async clickOnCompleteButtonAfterDraft(): Promise<void> {
        await this.base.waitAndClick(this.Elements.completeButton);
        await this.page.waitForTimeout(1000);
        // await this.page.locator(this.Elements.YesButton).click();
        // await this.base.waitAndClick(this.Elements.completeOkButton);


        await this.page.locator(`//div[3]/button[2]/span`).click();
        await fixture.page.waitForTimeout(3000);
        const element = await fixture.page.locator(this.Elements.headerTitle).textContent();
        const text = element ? element.toString() : '';
        if (text) {

            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            if (match && match[1]) {
                this.billableOrderNumber = match[1];
                console.log(this.billableOrderNumber);
                // Use billableOrderNumber as needed
            }

            // Extract status from parentheses: "(Draft)", "(Complete)", etc.
            const statusMatch = text.match(/\(([^)]+)\)$/);
            if (statusMatch && statusMatch[1]) {
                this.billableOrderStatus = statusMatch[1];
                console.log('Status:', this.billableOrderStatus);
            }
        }
        //verify the status is completed
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText('(Completed)');

        await fixture.page.waitForTimeout(3000);
    }
    async clickOnReviewButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.reviewButton);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.reviewOkButton);
        await fixture.page.waitForTimeout(3000);
        const element = await fixture.page.locator(this.Elements.headerTitle).textContent();
        const text = element ? element.toString() : '';
        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            // Extract status from parentheses: "(Draft)", "(Complete)", etc.
            const statusMatch = text.match(/\(([^)]+)\)$/);
            if (statusMatch && statusMatch[1]) {
                this.billableOrderStatus = statusMatch[1];
                console.log('Status:', this.billableOrderStatus);
            }
        }
        //verify the status is reviewed
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText('(Reviewed)');
        await fixture.page.waitForTimeout(3000);
    }
    async clickOnReturnToCompleteButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.returnToCompleteButton);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.returnToCCompleteOKButton);
        await fixture.page.waitForTimeout(3000);
        const element = await fixture.page.locator(this.Elements.headerTitle).textContent();
        const text = element ? element.toString() : '';
        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            // Extract status from parentheses: "(Draft)", "(Complete)", etc.
            const statusMatch = text.match(/\(([^)]+)\)$/);
            if (statusMatch && statusMatch[1]) {
                this.billableOrderStatus = statusMatch[1];
                console.log('Status:', this.billableOrderStatus);
            }
        }
        //verify the status is Completed
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText('(Completed)');
        await fixture.page.waitForTimeout(3000);
    }
    async clickOnCloseButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.closeButton);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.okCloseButton);
        await fixture.page.waitForTimeout(3000);
        const element = await fixture.page.locator(this.Elements.headerTitle).textContent();
        const text = element ? element.toString() : '';
        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            // Extract status from parentheses: "(Draft)", "(Complete)", etc.
            const statusMatch = text.match(/\(([^)]+)\)$/);
            if (statusMatch && statusMatch[1]) {
                this.billableOrderStatus = statusMatch[1];
                console.log('Status:', this.billableOrderStatus);
            }
        }
        //verify the status is reviewed
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText('(Closed)');
        await fixture.page.waitForTimeout(3000);
    }
    async clickOnCancelButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.cancelButton);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.cancelOkButton);
        await fixture.page.waitForTimeout(3000);
        const element = await fixture.page.locator(this.Elements.headerTitle).textContent();
        const text = element ? element.toString() : '';
        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            // Extract status from parentheses: "(Draft)", "(Complete)", etc.
            const statusMatch = text.match(/\(([^)]+)\)$/);
            if (statusMatch && statusMatch[1]) {
                this.billableOrderStatus = statusMatch[1];
                console.log('Status:', this.billableOrderStatus);
            }
        }
        //verify the status is cancelled
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText('(Cancelled)');
    }
    async clickOnPrintDraftInvoiceButton(): Promise<void> {

        await this.page.locator(this.Elements.printDraftInvoiceButton).click();

        // Wait for the new page (tab) to open upon clicking the print button on popup
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
        ]);

        await newPage.waitForLoadState();

        // Verify URL contains 'pdf/view'
        if (!newPage.url().includes('pdf/view')) {
            throw new Error(`Unexpected URL opened: ${newPage.url()}`);
        }

        // Optionally: Close the new tab or keep it open for further checks
        await newPage.close();

    }
    async clickOnEmailInvoiceButton(): Promise<void> {

        await this.page.locator(this.Elements.emailDraftInvoiceButton).click();

        const toField = this.page.locator(this.Elements.ToField);
        await toField.fill('jeena.manuel@milestone.tech');
        await this.page.locator(this.Elements.emailButton).click();

        // Optionally, you can add a wait or verification step to ensure the email was sent
        await this.page.waitForTimeout(2000);
        await this.base.waitAndClick(this.Elements.cancelOkButton);

    }
    async verifyActionLog(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.operationSearch).fill('Email Draft Invoice');
        await fixture.page.waitForTimeout(500);
        const errorText = await this.page.locator(this.Elements.operationSearchResult).textContent();
        expect(errorText).toContain('Email Draft Invoice');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.closeButtonActionLog).click();
    }
    async clickSaveButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.saveButtonOkButton);
        await fixture.page.waitForTimeout(3000);
    }

    async clickNewButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.newButton);
        //verify the header title is  Create Billable Work Order  
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText('Create Billable Work Order');
        await fixture.page.waitForTimeout(3000);

    }
    async doBatchReview(): Promise<void> {
        await this.base.waitAndClick(this.Elements.billableOrderMenu);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.batchReviewBillableWorkOrderMenu);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchWONumberSearch).fill(this.billableOrderNumber);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchWONumberCheckbox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchReviewButton).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchReviewOkButton).click();
        await fixture.page.waitForTimeout(1000);
    }
    async searchWO(): Promise<void> {
        await this.page.locator(this.Elements.WONumberSearch).fill(this.billableOrderNumber);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.searchButton).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.woNumberLink).click();
        await fixture.page.waitForTimeout(500);
        //verify the status is reviewed
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText('(Reviewed)');
        await fixture.page.waitForTimeout(3000);

    }
    async doBatchClose(): Promise<void> {
        await this.base.waitAndClick(this.Elements.billableOrderMenu);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.batchCloseBillableWOMenu);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchCloseBillableWOSearch).fill(this.billableOrderNumber);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchCloseWONumberCheckbox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchCloseButton).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchCloseOkButton).click();
        await fixture.page.waitForTimeout(1000);
    }
    async searchWOAfterClose(): Promise<void> {
        await this.page.locator(this.Elements.WONumberSearch).fill(this.billableOrderNumber);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.searchButton).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.woNumberLink).click();
        await fixture.page.waitForTimeout(500);
        //verify the status is reviewed
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText('(Closed)');
        await fixture.page.waitForTimeout(3000);

    }
    async doBatchReviewAfterCompletion(): Promise<void> {
        await this.base.waitAndClick(this.Elements.billableOrderMenu);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.batchReviewBillableWorkOrderMenu);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchWONumberSearch).fill(this.billableOrderNumber);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchWONumberCheckbox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchReviewButton).click();
        await fixture.page.waitForTimeout(500);
        // await this.page.locator(this.Elements.batchReviewOkButtonAfterCompletion).click();
        await this.page.locator(`//div[position()=3]/div[position()=1]/div[position()=3]/button[position()=2]`).click()

        await fixture.page.waitForTimeout(1000);
    }
    async doBatchCloseAfterEwview(): Promise<void> {
        await this.base.waitAndClick(this.Elements.billableOrderMenu);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.batchCloseBillableWOMenu);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchCloseBillableWOSearch).fill(this.billableOrderNumber);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchCloseWONumberCheckbox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchCloseButton).click();
        await fixture.page.waitForTimeout(500);
        // await this.page.locator(this.Elements.batchCloseOkButton).click();
        await this.page.locator(`//div[position()=3]/div[position()=1]/div[position()=3]/button[position()=2]/span[position()=1]`).click();
        await fixture.page.waitForTimeout(1000);
    }

    async mnrInvoice(): Promise<void> {
        //verify MNR Invoice label is present
        await expect.soft(this.page.locator(this.Elements.mnrInvoiceLabel)).toBeVisible();
        this.mnrInvoiceNumber = await this.page.locator(this.Elements.draftInvoiceNumber).textContent();
        ok(this.mnrInvoiceNumber && this.mnrInvoiceNumber.trim() !== '', 'Draft Invoice Number is empty');
        console.log('Draft Invoice Number:', this.mnrInvoiceNumber?.trim());

    }

    // Search methods for inquiry page
    async searchByAsset(asset: string): Promise<void> {
        const searchInput = this.page.locator(this.Elements.assetSearchField);
        await searchInput.fill(asset);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await expect.soft(this.page.locator(this.Elements.assetNosearchResultRow)).toBeVisible();
        //verify the asset number in search result
        await expect.soft(this.page.locator(this.Elements.assetNosearchResultRow)).toContainText(asset);
    }

    async searchByBillableAssetDescription(description: string): Promise<void> {
        const searchInput = this.page.locator(this.Elements.billableAssetDescriptionField);
        await searchInput.fill(description);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await expect.soft(this.page.locator(this.Elements.assetDescriptionResult)).toBeVisible();
        //verify the asset number in search result
        await expect.soft(this.page.locator(this.Elements.assetDescriptionResult)).toContainText(description);

    }

    async searchByAssetGroup(assetGroup: string): Promise<void> {
        await this.page.locator(this.Elements.assetGroupField).click();
        await this.page.getByText(assetGroup).click();
        //click outside to close any dropdown
        await this.page.mouse.click(10, 10);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await expect.soft(this.page.locator(this.Elements.assetGroupResult)).toBeVisible();
        //verify the asset number in search result
        await expect.soft(this.page.locator(this.Elements.assetGroupResult)).toContainText(assetGroup);
    }

    async searchByBillingParty(billingParty: string): Promise<void> {
        await this.page.locator(this.Elements.billingPartyField).click();
        await this.page.getByText(billingParty).click();
        //click outside to close any dropdown
        await this.page.mouse.click(10, 10);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await expect.soft(this.page.locator(this.Elements.searchBillingPartyResultRow)).toBeVisible();
        //verify the asset number in search result
        await expect.soft(this.page.locator(this.Elements.searchBillingPartyResultRow)).toContainText(billingParty);
    }

    async searchByWorkOrderStatus(status: string): Promise<void> {
        await this.page.locator(this.Elements.workOrderStatusField).click();
        await this.page.getByText(status, { exact: true }).click();
        await this.page.mouse.click(10, 10);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await expect.soft(this.page.locator(this.Elements.StatussearchResultRow)).toBeVisible();
        //verify the asset number in search result
        await expect.soft(this.page.locator(this.Elements.StatussearchResultRow)).toContainText(status);
    }

    async searchByShop(shop: string): Promise<void> {
        await this.page.locator(this.Elements.shopField).click();
        await this.page.getByText(shop).click();
        //click outside to close any dropdown
        await this.page.mouse.click(10, 10);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await expect.soft(this.page.locator(this.Elements.shopSearchResult)).toBeVisible();
        //verify the asset number in search result
        await expect.soft(this.page.locator(this.Elements.shopSearchResult)).toContainText(shop);
    }

    async searchByShift(shift: string): Promise<void> {
        await this.page.locator(this.Elements.shiftField).click();
        await this.page.getByText(shift).click();
        //click outside to close any dropdown
        await this.page.mouse.click(10, 10);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await expect.soft(this.page.locator(this.Elements.shiftSearchResult)).toBeVisible();
        //verify the asset number in search result
        await expect.soft(this.page.locator(this.Elements.shiftSearchResult)).toContainText(shift);
    }

    async searchByRepairDateRange(): Promise<void> {
        await this.page.locator(this.Elements.repairStartDateField).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.page.getByRole('cell', { name: 'Today' }).click();
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await expect.soft(this.page.locator(this.Elements.dateSearchResult)).toBeVisible();
        //verify the asset number in search result
        const now = new Date();

        const year = now.getFullYear();
        const monthShort = now.toLocaleString('en-US', { month: 'short' }); // Jan, Feb, etc.
        const day = String(now.getDate()).padStart(2, '0'); // 2-digit day with leading zero

        const date = `${year}-${monthShort}-${day}`; // e.g. "2026-Jan-14"

        // Then verify:
        await expect.soft(this.page.locator(this.Elements.dateSearchResult)).toContainText(date);
        // await expect.soft(this.page.locator(this.Elements.searchResultRow)).toBeVisible();
    }
    async verifyMNRInvoice(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.inquireInvoceCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.WONumberSearchInvoice).fill(this.billableOrderNumber);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await this.base.waitAndClick(this.Elements.draftInvoiceNumberLink);
        await this.page.waitForLoadState('networkidle');
        //verify the wonumber label text is equal to this.billableOrderNumber  
        await fixture.page.waitForTimeout(2000);
        const eonumberValue = await this.page.locator(this.Elements.wonumberLabel).inputValue();
        expect(eonumberValue).toContain(this.billableOrderNumber);
    }
    async createMNRCredit(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.createMNRCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.woNumberMNRCreditSearch).fill(this.billableOrderNumber);
        await this.base.waitAndClick(this.Elements.RetrieveButton);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.changedQuantityInput).click();
        await this.page.locator(this.Elements.changedQuantityInput).fill('1');
        await this.base.waitAndClick(this.Elements.draftButtonmnrcredit);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.okButtonMNRCreditDraft);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.closeButtonmnrcredit);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.okCloseButtonmnrcredit);
        await this.page.waitForTimeout(2000);

        const element = await fixture.page.locator(this.Elements.headerTitleMNRCredit).textContent();
        const text = element ? element.toString() : '';
        if (text) {

            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            if (match && match[1]) {
                this.mnrCreditNumber = match[1];
                console.log('MNR Credit Number:', this.mnrCreditNumber);
                // Use billableOrderNumber as needed
            }


        }
    }

    async verifyCreditNumberINWO(): Promise<void> {
        await this.base.waitAndClick(this.Elements.billableOrderMenu);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.inquireBillableOrderMenu);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.WONumberSearch).fill(this.billableOrderNumber);
        await this.base.waitAndClick(this.Elements.searchButtonLookUpwo);
        await this.page.waitForLoadState('networkidle');
        await this.base.waitAndClick(this.Elements.WONumberLink);
        await this.page.waitForLoadState('networkidle');
        //verify this.mnrCreditNumber is present in WO page
        await expect.soft(this.page.locator(this.Elements.credeitNumberWO)).toContainText(this.mnrCreditNumber || '');

    }
    async verifySaveCredit(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.createMNRCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.woNumberMNRCreditSearch).fill(this.billableOrderNumber);
        await this.base.waitAndClick(this.Elements.RetrieveButton);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.changedQuantityInput).click();
        await this.page.locator(this.Elements.changedQuantityInput).fill('1');
        await this.base.waitAndClick(this.Elements.draftButtonmnrcredit);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.okButtonMNRCreditDraft);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.saveButtonmnrcredit);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.okButtonMNRCreditDraft);

        const element = await fixture.page.locator(this.Elements.headerTitleMNRCredit).textContent();
        const text = element ? element.toString() : '';
        if (text) {

            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            if (match && match[1]) {
                this.mnrCreditNumber = match[1];
                console.log('MNR Credit Number:', this.mnrCreditNumber);
                // Use billableOrderNumber as needed
            }


        }
    }
    async verifyCancelCredit(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.inquireInvoceCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.draftInvoiceNumberSearch).fill(this.mnrCreditNumber);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await this.base.waitAndClick(this.Elements.draftInvoiceNumberLink);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.cancelCreditButton);
        await this.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.okButtonMNRCreditDraft);
        await this.page.waitForTimeout(1000);
    }
    async verifyActionLogCredit(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.operationSearchCredit).fill('Cancel MNR Invoice/Credit');
        await fixture.page.waitForTimeout(500);
        const errorText = await this.page.locator(this.Elements.operaionSearchResultCredit).textContent();
        expect(errorText).toContain('Cancel MNR Invoice/Credit');
        await fixture.page.waitForTimeout(500);
    }
    async BatchCloseCredit(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.BatchCloseCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.draftInvoiceNoSearchBatchClose).fill(this.mnrCreditNumber);
        await this.base.waitAndClick(this.Elements.checkBoxDraftInvoiceBatchClose);
        await this.page.waitForLoadState('networkidle');
        await this.base.waitAndClick(this.Elements.batchCloseButtonCredit);
        await this.base.waitAndClick(this.Elements.batchCloseOkButtonCredit);
        await this.page.waitForTimeout(1000);

    }
    async BatchCloseCreditAfterSelectBatchCloseFromDashBoard(): Promise<void> {
        await this.page.locator(this.Elements.userIcon).click();
        await this.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.todoListMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.base.waitAndClick(this.Elements.batchCloseTabSectionDashboard);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.draftInvoiceNoSearchBatchClose).fill(this.mnrCreditNumber);
        await this.base.waitAndClick(this.Elements.checkBoxDraftInvoiceBatchClose);
        await this.page.waitForLoadState('networkidle');
        await this.base.waitAndClick(this.Elements.batchCloseButtonCredit);
        await this.base.waitAndClick(this.Elements.batchCloseOkButtonCredit);
        await this.page.waitForTimeout(1000);

    }
    async verifyBatchCloseStatus(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.inquireInvoceCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.draftInvoiceNumberSearch).fill(this.mnrCreditNumber);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await this.base.waitAndClick(this.Elements.draftInvoiceNumberLink);
        await this.page.waitForTimeout(1000);
        //verify the status is Closed
        const element = await fixture.page.locator(this.Elements.headerTitleMNRCredit).textContent();
        const text = element ? element.toString() : '';

        if (text) {
            // Example text: "MNR Invoice/Credit | 00101886(Draft)"
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(([^)]+)\)/i);

            if (match && match[1] && match[2]) {
                this.mnrCreditNumber = match[1];  // e.g., "00101886"
                this.creditStatus = match[2];            // e.g., "Draft"
                console.log('MNR Credit Number:', this.mnrCreditNumber);
                console.log('Status:', this.creditStatus);
            }
        }
        //verify the status is Closed
        await expect.soft(this.page.locator(this.Elements.headerTitleMNRCredit)).toContainText('(Closed)');
        await fixture.page.waitForTimeout(3000);

    }
    async doBatchReviewAfterSelectFromDashboard(): Promise<void> {
        await this.base.waitAndClick(this.Elements.userIcon);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.todoListMenu);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.batchReviewTabSectionDashboard);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchWONumberSearch).fill(this.billableOrderNumber);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchWONumberCheckbox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchReviewButton).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchReviewOkButton).click();
        await fixture.page.waitForTimeout(1000);
    }
    async doBatchCloseFromDashboard(): Promise<void> {
        await this.base.waitAndClick(this.Elements.userIcon);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.todoListMenu);
        await this.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.CloseBillableOrderTabSectionDashboard);
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchCloseBillableWOSearch).fill(this.billableOrderNumber);
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchCloseWONumberCheckbox).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchCloseButton).click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.batchCloseOkButton).click();
        await fixture.page.waitForTimeout(1000);
    }
    async BatchPost(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.batchPostInvoiceCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchPostInvoiceCreditSearch).fill(this.mnrCreditNumber);
        await this.base.waitAndClick(this.Elements.checkBoxBatchPostInvoiceCredit);
        await this.page.waitForLoadState('networkidle');
        await this.base.waitAndClick(this.Elements.batchpostButton);
        await this.base.waitAndClick(this.Elements.batchCloseOkButtonCredit);
        await this.page.waitForTimeout(1000);

    }
    async postStatus(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.checkPostResultMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.draftInvoiceSearchCheckPost).fill(this.mnrCreditNumber);
        this.postStatusOriginal = await this.page.locator(this.Elements.postStaus).textContent();

        try {
            expect(this.postStatusOriginal).toContain('Posted');
            console.log('Status is Posted as expected.');
        } catch (error) {
            console.warn('Soft assertion failed: Status does not contain "Posted".', error);
            // You can log the error but continue execution
        }



    }
    async downloadReport(): Promise<string> {
        // const downloadPath = path.resolve(__dirname, 'downloads');
        const downloadPath = 'C:\\Users\\jeena.manuel\\OneDrive - Milestone Technologies Inc\\LBCT - Automation Practice\\RAMS Reports\\xmlFile.xml';

        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.locator(this.Elements.xmlFile).click()
        ]);
        const downloadPathWithFileName = path.join(downloadPath, 'xmlFile.xml');
        await download.saveAs(downloadPathWithFileName);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
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


    async verifyDraftInvoiceNumberLink(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.inquireInvoceCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.searchButton).click();
        await fixture.page.waitForTimeout(1000);
        const Text = await this.page.locator(this.Elements.draftInvoiceNumberLink).textContent();
        await this.page.locator(this.Elements.draftInvoiceNumberLink).click();
        const element = await fixture.page.locator(this.Elements.headerTitleMNRCredit).textContent();
        const text = element ? element.toString() : '';

        if (text) {
            // Example text: "MNR Invoice/Credit | 00101886(Draft)"
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(([^)]+)\)/i);

            if (match && match[1] && match[2]) {
                this.mnrCreditNumber = match[1];  // e.g., "00101886"
                this.creditStatus = match[2];            // e.g., "Draft"
                console.log('MNR Credit Number:', this.mnrCreditNumber);
                console.log('Status:', this.creditStatus);
            }
        }
        //verify the status is Closed
        await expect.soft(this.page.locator(this.Elements.headerTitleMNRCredit)).toContainText(Text);
        await fixture.page.waitForTimeout(3000);
    }

    async verifyWONumberLink(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.inquireInvoceCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.searchButton).click();
        await fixture.page.waitForTimeout(1000);
        await this.page.locator(this.Elements.woNumberLinkCreditList).click();
        const element = await fixture.page.locator(this.Elements.headerTitle).textContent();
        const text = element ? element.toString() : '';

        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            if (match && match[1]) {
                this.billableOrderNumber = match[1];
                console.log(this.billableOrderNumber);
                // Use billableOrderNumber as needed


            }
            // Extract status from parentheses: "(Draft)", "(Complete)", etc.
            const statusMatch = text.match(/\(([^)]+)\)$/);
            if (statusMatch && statusMatch[1]) {
                this.billableOrderStatus = statusMatch[1];
                console.log('Status:', this.billableOrderStatus);
            }
        }
        //verify the status is drafted
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText(this.billableOrderNumber);
        await fixture.page.waitForTimeout(3000);
    }
    async BatchCloseCreditInvoiceNumberVerifyLinks(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.BatchCloseCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchCloseInvoiceNumber).click();
        const element = await fixture.page.locator(this.Elements.headerTitleMNRCredit).textContent();
        const text = element ? element.toString() : '';
        if (text) {
            // Example text: "MNR Invoice/Credit | 00101886(Draft)"
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(([^)]+)\)/i);
            if (match && match[1] && match[2]) {
                this.mnrCreditNumber = match[1];
                this.creditStatus = match[2];
                console.log('MNR Credit Number:', this.mnrCreditNumber);
                console.log('Status:', this.creditStatus);
            }
        }
        //verify the status is Closed
        await expect.soft(this.page.locator(this.Elements.headerTitleMNRCredit)).toContainText(this.mnrCreditNumber);
        await this.page.waitForTimeout(1000);

    }
    async BatchCloseWONumberLink(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.BatchCloseCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchCloseWONumber).click();
        const element = await fixture.page.locator(this.Elements.headerTitle).textContent();
        const text = element ? element.toString() : '';
        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);

            if (match && match[1]) {
                this.billableOrderNumber = match[1];
                console.log(this.billableOrderNumber);
            }
        }
        //verify the status is drafted
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText(this.billableOrderNumber);
        await this.page.waitForTimeout(1000);
    }
    async BatchPostInvoiceVerifyLinks(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.batchPostInvoiceCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchPostInvoiceNumber).click();
        const element = await fixture.page.locator(this.Elements.headerTitleMNRCredit).textContent();
        const text = element ? element.toString() : '';
        if (text) {
            // Example text: "MNR Invoice/Credit | 00101886(Draft)"
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(([^)]+)\)/i);
            if (match && match[1] && match[2]) {
                this.mnrCreditNumber = match[1];
                this.creditStatus = match[2];
                console.log('MNR Credit Number:', this.mnrCreditNumber);
                console.log('Status:', this.creditStatus);
            }
        }
        //verify the status is Closed
        await expect.soft(this.page.locator(this.Elements.headerTitleMNRCredit)).toContainText(this.mnrCreditNumber);
        await this.page.waitForTimeout(1000);
    }
    async BatchPostWorkOrderVerifyLinks(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.batchPostInvoiceCreditMenu).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.locator(this.Elements.batchPostWONumber).click();
        const element = await fixture.page.locator(this.Elements.headerTitle).textContent();
        const text = element ? element.toString() : '';
        if (text) {
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(/i);
            if (match && match[1]) {
                this.billableOrderNumber = match[1];
                console.log(this.billableOrderNumber);
            }
        }
        //verify the status is drafted
        await expect.soft(this.page.locator(this.Elements.headerTitle)).toContainText(this.billableOrderNumber);
        await this.page.waitForTimeout(1000);
    }

    async OpenCreditMenu(): Promise<void> {
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.openInvoiceCreditMenu).click();
    }

    async createOpenCredit(): Promise<void> {
        await this, this.page.locator(this.Elements.billingPartyList).click();
        await this.page.getByText('CMA - CMA CGM').click();
        const notesInput = this.page.locator(this.Elements.note);
        await notesInput.fill('Automation test notes ' + getRandomInt(1000, 9999).toString());
        await fixture.page.waitForTimeout(500);
        await this, this.page.locator(this.Elements.ARGLCode).click();
        await this.page.getByText('400300 / 1215 / MNR_CONTAINER_REPAIR').click();
        const item1 = this.page.locator(this.Elements.itemDescription1);
        await item1.fill('Item 1' + getRandomInt(1000, 9999).toString());
        await this.page.locator(this.Elements.rate1).fill(getRandomInt(10, 100).toString());
        const item2 = this.page.locator(this.Elements.itemDescription2);
        await this, this.page.locator(this.Elements.plusButton).click();
        await item2.fill('Item 2' + getRandomInt(1000, 9999).toString());
        await this.page.locator(this.Elements.rate2).fill(getRandomInt(10, 100).toString());
        await this, this.page.locator(this.Elements.openInvoiceDraftButton).click();
        await this, this.page.locator(this.Elements.openDraftOKButton).click();
        await fixture.page.waitForTimeout(2000);
        const element = await fixture.page.locator(this.Elements.headerTitleMNRCredit).textContent();
        const text = element ? element.toString() : '';
        if (text) {
            // Example text: "MNR Invoice/Credit | 00101886(Draft)"
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(([^)]+)\)/i);
            if (match && match[1] && match[2]) {
                this.mnrCreditNumber = match[1];
                this.creditStatus = match[2];
                console.log('MNR Credit Number:', this.mnrCreditNumber);
                console.log('Status:', this.creditStatus);
            }
        }


    }
    async VerifyOpenCreditInInquirePage(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.ARAPMenu).click();
        await this.page.locator(this.Elements.inquireInvoceCreditMenu).click();
        await this.page.locator(this.Elements.draftInvoiceNumberSearch).fill(this.mnrCreditNumber);
        await this.base.waitAndClick(this.Elements.searchButton);
        await this.page.waitForLoadState('networkidle');
        await this.base.waitAndClick(this.Elements.draftInvoiceNumberLink);
        await this.page.waitForTimeout(1000);

    }
    async OpenCreditSaveButtonFunctionality(): Promise<void> {
        await this.page.locator(this.Elements.saveButton).click();
        await this.page.locator(this.Elements.openDraftOKButton).click();
    }
    async OpenCreditCloseButtonFunctionality(): Promise<void> {
        await this.page.locator(this.Elements.closeButton).click();
        await this.page.locator(this.Elements.reviewOkButton).click();
    }
    async OpenCreditCancelButtonFunctionality(): Promise<void> {
        await this.page.locator(this.Elements.cancelCreditButton).click();
        await this.page.locator(this.Elements.openDraftOKButton).click();
    }
    async verifyActionLogOpenCredit(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.operationSearchActionLog).fill('Cancel Open Invoice/Credit');
        await fixture.page.waitForTimeout(500);
        const errorText = await this.page.locator(this.Elements.opeartionSearchResultOPenCredit).textContent();
        expect(errorText).toContain('Cancel Open Invoice/Credit');
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.actionLogCloseButton).click();
    }
    async createOpenInvoice(): Promise<void> {
        await this, this.page.locator(this.Elements.billingPartyList).click();
        await this.page.getByText('CMA - CMA CGM').click();
        await this, this.page.locator(this.Elements.openInvoice).click();
        await this.page.getByText('Open Invoice').nth(1).click();
        const notesInput = this.page.locator(this.Elements.note);
        await notesInput.fill('Automation test notes ' + getRandomInt(1000, 9999).toString());
        await fixture.page.waitForTimeout(500);
        await this, this.page.locator(this.Elements.ARGLCode).click();
        await this.page.getByText('400300 / 1215 / MNR_CONTAINER_REPAIR').click();
        const item1 = this.page.locator(this.Elements.itemDescription1);
        await item1.fill('Item 1' + getRandomInt(1000, 9999).toString());
        await this.page.locator(this.Elements.rate1).fill(getRandomInt(10, 100).toString());
        const item2 = this.page.locator(this.Elements.itemDescription2);
        await this, this.page.locator(this.Elements.plusButton).click();
        await item2.fill('Item 2' + getRandomInt(1000, 9999).toString());
        await this.page.locator(this.Elements.rate2).fill(getRandomInt(10, 100).toString());
        await this, this.page.locator(this.Elements.openInvoiceDraftButton).click();
        await this, this.page.locator(this.Elements.openDraftOKButton).click();
        await fixture.page.waitForTimeout(2000);
        const element = await fixture.page.locator(this.Elements.headerTitleMNRCredit).textContent();
        const text = element ? element.toString() : '';
        if (text) {
            // Example text: "MNR Invoice/Credit | 00101886(Draft)"
            const match = text.match(/\|\s*([A-Z0-9]+)\s*\(([^)]+)\)/i);
            if (match && match[1] && match[2]) {
                this.mnrCreditNumber = match[1];
                this.creditStatus = match[2];
                console.log('Open Invoice Number:', this.mnrCreditNumber);
                console.log('Status:', this.creditStatus);
            }
        }


    }
}