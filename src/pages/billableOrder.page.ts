import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";

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
        searchButtonLookUpwo: "//div[@class='el-dialog__wrapper inquiryPurchaseOrder']//span[contains(text(),'Search')]",
        okButtonLookUpwo: "(//span[contains(text(),'OK')])[2]",
        stockQuantitywo: "//div[@class='el-input el-input-group el-input-group--append input-align']//input[@type='text']",
        saveButton: "(//span[normalize-space()='Save'])[1]",
        draftButton: "(//span[normalize-space()='Draft'])[1]",
        completeButton: "//span[normalize-space()='Complete']",
        closeButton: "(//span[normalize-space()='Close'])[1]",
        okCloseButton: "(//span[contains(text(),'OK')])[7]",
        reviewButton: "//span[normalize-space()='Review']",
        okButtonReview: "(//span[contains(text(),'OK')])[6]",
        headerTitle: "(//span[@class='header-title font-size-title'])[1]",

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
  await this.page.getByRole('cell', { name: 'Stock No. --Input Text or Look up-- ' }).getByRole('textbox', { name: '--Input Text or Look up--' }).fill('1008');
  await this.page.getByText('1008 - 1000X20RCP - tire flexi van recap 10.00x20').click();
        await fixture.page.waitForTimeout(2000);
        await this.page.locator(this.Elements.stockQuantitywo).click();
        await this.page.locator(this.Elements.stockQuantitywo).fill('1');

    }

    async clickOnDraftButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.draftButton);
        await this.page.waitForTimeout(1000);

        // Handle success message if present
        this.page.locator(`//div[3]/button[2]/span`).click();
        await this.page.waitForTimeout(500);
        await this.page.waitForLoadState('networkidle');
        await fixture.page.waitForTimeout(2000);
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

    }

    // async clickOnCompleteButton(): Promise<void> {
    //     await this.base.waitAndClick(this.Elements.completeButton);
    //     await this.page.waitForTimeout(1000);
    //     // Handle success message if present
    //     const okButton = this.page.locator(this.Elements.okButton);
    //     const okCount = await okButton.count();
    //     if (okCount > 0) {
    //         await this.base.waitAndClick(this.Elements.okButton);
    //         await this.page.waitForTimeout(500);
    //     }
    //     await this.page.waitForLoadState('networkidle');
    // }

    // async clickOnCloseButton(): Promise<void> {
    //     await this.base.waitAndClick(this.Elements.closeButton);
    //     await this.page.waitForTimeout(1000);
    //     // Handle success message if present
    //     const okButton = this.page.locator(this.Elements.okButton);
    //     const okCount = await okButton.count();
    //     if (okCount > 0) {
    //         await this.base.waitAndClick(this.Elements.okButton);
    //         await this.page.waitForTimeout(500);
    //     }
    //     await this.page.waitForLoadState('networkidle');
    // }

    // async captureBillableOrderNumber(): Promise<void> {
    //     try {
    //         const headerText = await this.page.locator(this.Elements.headerTitle).textContent();
    //         if (headerText) {
    //             // Extract the number from header (format: "Number | BWO#12345")
    //             const match = headerText.match(/(\d+)/);
    //             if (match && match[1]) {
    //                 this.billableOrderNumber = match[1];
    //                 fixture.logger?.info(`Billable Order Number captured: ${this.billableOrderNumber}`);
    //             }
    //         }
    //     } catch (error) {
    //         fixture.logger?.error(`Error capturing billable order number: ${error}`);
    //         throw error;
    //     }
    // }

    // async verifyBillableOrderStatus(expectedStatus: string): Promise<void> {
    //     try {
    //         // Try to get status from the status field
    //         const statusLocator = this.page.locator(this.Elements.statusLabel);
    //         const statusCount = await statusLocator.count();

    //         let actualStatus = '';
    //         if (statusCount > 0) {
    //             actualStatus = (await statusLocator.inputValue()).trim();
    //         } else {
    //             // Alternative: try to get status from the status display field
    //             const statusDisplay = this.page.locator(this.Elements.statusField);
    //             const displayCount = await statusDisplay.count();
    //             if (displayCount > 0) {
    //                 actualStatus = (await statusDisplay.textContent() || '').trim();
    //             }
    //         }

    //         fixture.logger?.info(`Expected Status: ${expectedStatus}, Actual Status: ${actualStatus}`);
    //         expect(actualStatus).toContain(expectedStatus);
    //         this.billableOrderStatus = actualStatus;
    //     } catch (error) {
    //         fixture.logger?.error(`Error verifying billable order status: ${error}`);
    //         throw error;
    //     }
    // }

    // async searchBillableOrderByNumber(bwoNumber: string): Promise<void> {
    //     try {
    //         const searchInput = this.page.locator(this.Elements.billableOrderNumberSearch);
    //         const searchCount = await searchInput.count();
    //         if (searchCount > 0) {
    //             await searchInput.fill(bwoNumber);
    //             await this.base.waitAndClick(this.Elements.searchButton);
    //             await this.page.waitForLoadState('networkidle');
    //         }
    //     } catch (error) {
    //         fixture.logger?.error(`Error searching billable order: ${error}`);
    //         throw error;
    //     }
    // }

    // async searchBillableOrderByStatus(status: string): Promise<void> {
    //     try {
    //         const statusInput = this.page.locator(this.Elements.statusSearch);
    //         const statusCount = await statusInput.count();
    //         if (statusCount > 0) {
    //             await statusInput.fill(status);
    //             await this.base.waitAndClick(this.Elements.searchButton);
    //             await this.page.waitForLoadState('networkidle');
    //         }
    //     } catch (error) {
    //         fixture.logger?.error(`Error searching by status: ${error}`);
    //         throw error;
    //     }
    // }

    // async verifySearchResultByBWONumber(): Promise<void> {
    //     try {
    //         const firstRowLocator = this.page.locator(this.Elements.firstRowBWONumber);
    //         const rowCount = await firstRowLocator.count();
    //         expect(rowCount).toBeGreaterThan(0);
    //         fixture.logger?.info(`Billable Order found in search results`);
    //     } catch (error) {
    //         fixture.logger?.error(`Error verifying search result: ${error}`);
    //         throw error;
    //     }
    // }

    // async clickOnFirstBillableOrder(): Promise<void> {
    //     try {
    //         await this.base.waitAndClick(this.Elements.firstRowBWONumber);
    //         await this.page.waitForLoadState('networkidle');
    //     } catch (error) {
    //         fixture.logger?.error(`Error clicking on billable order: ${error}`);
    //         throw error;
    //     }
    // }

    // async verifyMandatoryFieldValidations(): Promise<void> {
    //     try {
    //         // Click Draft without filling any fields to trigger validation
    //         await this.base.waitAndClick(this.Elements.draftButton);
    //         await this.page.waitForTimeout(500);

    //         const validationError = this.page.locator(this.Elements.validationError);
    //         const errorCount = await validationError.count();
    //         expect(errorCount).toBeGreaterThan(0);
    //         fixture.logger?.info(`Validation error displayed for mandatory fields`);

    //         // Close the error dialog
    //         const okButton = this.page.locator(this.Elements.okButton);
    //         const okCount = await okButton.count();
    //         if (okCount > 0) {
    //             await this.base.waitAndClick(this.Elements.okButton);
    //             await this.page.waitForTimeout(300);
    //         }
    //     } catch (error) {
    //         fixture.logger?.error(`Error verifying mandatory field validations: ${error}`);
    //         throw error;
    //     }
    // }

    // async verifyActionLog(): Promise<void> {
    //     try {
    //         await this.base.waitAndClick(this.Elements.actionLog);
    //         await this.page.waitForTimeout(500);

    //         const actionLogTitle = this.page.locator(this.Elements.headerTitleActionLog);
    //         const titleCount = await actionLogTitle.count();
    //         expect(titleCount).toBeGreaterThan(0);
    //         fixture.logger?.info(`Action Log verified`);

    //         // Close the action log
    //         const closeButton = this.page.locator(this.Elements.closeDialogButton);
    //         const closeCount = await closeButton.count();
    //         if (closeCount > 0) {
    //             await closeButton.click();
    //             await this.page.waitForTimeout(300);
    //         }
    //     } catch (error) {
    //         fixture.logger?.error(`Error verifying action log: ${error}`);
    //         throw error;
    //     }
    // }
}
