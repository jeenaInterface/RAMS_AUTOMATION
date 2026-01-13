import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";
import { ok } from "assert";

setDefaultTimeout(100 * 1000);

export default class BillableOrderPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public billableOrderNumber: string = '';
    public billableOrderStatus: string = '';

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
        componentCode: "//input[@placeholder='Component Code']",
        damageCode: "//input[@placeholder='Damage Code']",
        repairCode: "//input[@placeholder='Repair Code']",
        repairLocation: "//tr[@class='activity-row']//input[@placeholder='--Select One--']",
        actualHours: "//div[@class='el-input input-align']//input[@type='text']",
        stockNumberSearchwo: "//div[@placeholder='--Input Text or Look up--']//i[@class='el-input__icon el-icon-search is-clickable']",
        stockNumberSearchBoxwo: "(//label[normalize-space(text())='Stock No.']/following::input)[1]",
        searchButtonLookUpwo: "//span[normalize-space(text())='Search']",
        okButtonLookUpwo: "(//span[contains(text(),'OK')])[2]",
        stockQuantitywo: "//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text']",
        saveButton: "(//span[normalize-space()='Save'])[1]",
        draftButton: "(//span[normalize-space()='Draft'])[1]",
        completeButton: "//span[normalize-space()='Complete']",
        closeButton: "(//span[normalize-space()='Close'])[1]",
        okCloseButton: "(//span[contains(text(),'OK')])[7]",
        reviewButton: "//span[normalize-space()='Review']",
        okButtonReview: "(//span[contains(text(),'OK')])[6]",
        headerTitle: "//span[@class='header-title font-size-title']",
        WONumberSearch: "(//label[normalize-space(text())='Work Order No.']/following::input)[1]",
        WONumberLink: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/a[1]",
        copyButton: "//span[normalize-space(text())='Copy']",
        YesButton: "//span[normalize-space(text())='Yes']",
        okButton: "/(//span[contains(text(),'OK')])[10]",
        reviewOkButton: "(//button[contains(@class,'el-button el-button--default el-button--primary')])[1]",
        returnToCompleteButton: "(//span[contains(text(),'Return to Complete')])[1]",
        returnToCCompleteOKButton:"(//span[contains(text(),'OK')])[20]",
        cancelButton: "(//span[normalize-space()='Cancel'])[1]",
        cancelOkButton:"(//span[contains(text(),'OK')])[23]",



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
        await this.page.getByText('KAA - Gladhand seal').click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.damageCode).click();
        await this.page.getByText('BR - Broken').click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.repairCode).click();
        await this.page.getByText('RE - Resecure').click();
        // await this.page.locator(this.Elements.repairLocation).click();
        // await this.page.getByText('EROM - Electrical Room').click();
        await this.page.locator(this.Elements.actualHours).nth(0).click();
        await this.page.locator(this.Elements.actualHours).nth(0).fill('8');
        await this.page.getByRole('cell', { name: 'Stock No. --Input Text or Look up-- ' }).getByRole('textbox', { name: '--Input Text or Look up--' }).click();
        await this.page.getByRole('cell', { name: 'Stock No. --Input Text or Look up-- ' }).getByRole('textbox', { name: '--Input Text or Look up--' }).fill('3452');
        await this.page.getByText('3452 - M190FR - lamp 2" red flange LED').click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');

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
        await this.base.waitAndClick(this.Elements.okButton);
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

}