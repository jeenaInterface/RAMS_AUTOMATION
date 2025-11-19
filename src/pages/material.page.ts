import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomtext, currentDate } from "../helper/util/test-data/randomdata";
import * as path from 'path';
import { fixture } from "../hooks/pageFixture";

setDefaultTimeout(100 * 1000);

export default class MaterialPage {
    private base: PlaywrightWrapper;
    private page: Page;
    public stockNo: string = '';
    public description: string = '';

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        materialMenu: "//span[normalize-space()='Material']",
        createMaterialMenu: "//span[normalize-space()='- Create Material']",
        inquireMaterialMenu: "//span[normalize-space()='- Inquire Material']",
        createButton: "//span[normalize-space()='Create']",
        newButton: "//span[normalize-space(text())='New']",
        saveButton: "//span[normalize-space(text())='Save']",
        okButton: "//button[normalize-space()='OK']",
        stocknumbersearch: "(//input[@rows='2'])[1]",
        partnoSearch: "(//input[@rows='2'])[2]",
        searchButton: "//span[normalize-space(text())='Search']",
        firstRowStockNo: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/a[1]",
        actionLog: "//button[contains(.,'Action Log')]",
        closeButton: "//body/div[@id='app']/div[@class='app-body']/div[@class='app-body-container']/div[@class='app-page']/div[@id='app-modal']/div[@class='el-dialog__wrapper']/div[@class='el-dialog el-dialog--full full-dialog']/div[@class='el-dialog__header']/button[@aria-label='Close']/i[1]",
        stockNo: "//div[@class='header-icon']/following-sibling::span[1]",
        manufacturerPartNoInput: "(//div[@class='el-input']//input)[1]", // Manufacturer's Part No.
        manufacturerInput: "(//input[@class='el-input__inner'])[2]",
        partNoInput: "(//input[@placeholder='--Input At Least 3 Letters--'])[1]",
        descriptionInput: "//textarea[@type='textarea']",
        descriptionSearch: "(//input[@rows='2'])[3]",
        locationSearch: "(//input[@rows='2'])[5]",
        rcvUomSelect: "(//input[@rows='2'])[3]",
        issueUomSelect: "(//input[@placeholder='--Select One--'])[2]",
        conversionFactorInput: "(//input[@placeholder='--Input Text--'])[2]",
        statusSelect: "(//input[@placeholder='--Select One--'])[3]",
        assetGroup: "(//input[@placeholder='--Select One--'])[1]",
        vendor: "(//input[@placeholder='--Select One--'])[2]",
        maxOHQtyInput: "(//label[normalize-space(text())='Max OH Quantity']/following::input)[1]",
        orderPointInput: "(//label[normalize-space(text())='Order Point (Issue UOM)']/following::input)[1]",
        shopSelect: "//div[@class='el-col el-col-8']//input[@placeholder='--Select One--']",
        taxableCheckbox: "(//span[@class='el-checkbox__input']//span)[1]",
        underOrderPointCheckbox: "(//span[@class='el-checkbox__inner'])[2]",
        requiredError: "//span[contains(text(),'Required') or contains(text(), 'This field is required')]",
        newButtonSelector: "//span[normalize-space()='New']",
        headertitle: "(//span[@class='header-title font-size-title'])[1]",
        headerTitleActionLog: "//span[@class='el-dialog__title'][normalize-space()='Action Log']",
        updateddescription: "//td[@class='el-table_1_column_66 is-left']//div[@class='cell']",
        operation: "//th[@class='el-table_1_column_123_column_124 is-left internal-filter is-leaf']//input[@placeholder='--Input Text--']",
        operationSearchResult: "td[class='el-table_1_column_123_column_124 is-left internal-filter'] span"


    };

    async clickOnCreateMaterialMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.materialMenu);
        await this.base.waitAndClick(this.Elements.createMaterialMenu);
    }

    async clickOnInquireMaterialMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.materialMenu);
        await this.base.waitAndClick(this.Elements.inquireMaterialMenu);
    }

    async createNewMaterial(): Promise<void> {
        const randomNumber = getRandomInt(1000, 9999);
        this.description = `Auto Material ${randomNumber}`;
        await fixture.page.waitForTimeout(1000);

        const imagePath = path.resolve(process.cwd(), 'src', 'helper', 'util', 'test-data', 'materialImage.jpg');
        const fileInput = this.page.locator('input[type="file"]');
        if (await fileInput.count() > 0) {
            await fileInput.setInputFiles(imagePath);
        }
        await fixture.page.waitForTimeout(500);

        // Fill stock no and description and manufacturer's part no
        await this.page.locator(this.Elements.manufacturerPartNoInput).fill(`MPN-${randomNumber}`);
        await this.page.locator(this.Elements.manufacturerInput).fill(`MAN-${randomNumber}`);
        await this.page.locator(this.Elements.descriptionInput).fill(this.description);
        await this.page.locator('form i').first().click();
        await this.page.getByRole('listitem').filter({ hasText: '24LB - 24 Pound Bottle' }).click();
        await this.page.locator('form i').nth(1).click();
        await this.page.getByRole('listitem').filter({ hasText: 'LBS - LBS' }).locator('span').click();
        await this.page.getByPlaceholder('--Select One--').nth(2).click();
        await this.page.getByText('Active', { exact: true }).click();

        // await this.page.locator(this.Elements.statusSelect).click();
        // await this.page.getByRole('listitem').filter({ hasText: 'Active' }).click();



        await this.page.locator(this.Elements.maxOHQtyInput).fill('10');
        await this.page.locator(this.Elements.orderPointInput).fill('1');

        await this.page.locator(this.Elements.shopSelect).click();
        await this.page.getByText('AGV - AGV').click();



        const tc = this.page.locator(this.Elements.taxableCheckbox);
        await tc.check();

        const uop = this.page.locator(this.Elements.underOrderPointCheckbox);
        await uop.check();
        await fixture.page.waitForTimeout(1000);
        // Save
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);

        await this.page.locator(this.Elements.okButton).click();


        // Wait for page to load and extract auto-generated stock number from header
        await fixture.page.waitForTimeout(1000);
        const headerText = await this.page.locator(this.Elements.headertitle).textContent();
        if (headerText && headerText.includes('Material |')) {
            // Extract the number after "Material | "
            const match = headerText.match(/Material\s*\|\s*(\d+)/);
            if (match && match[1]) {
                this.stockNo = match[1];
                fixture.logger.info(`Auto-generated stock number: ${this.stockNo}`);
            }
        }
    }

    async searchMaterialByStockNo(): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.stocknumbersearch).fill(this.stockNo);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByStockNo(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await expect(this.page.locator(this.Elements.firstRowStockNo)).toHaveText(this.stockNo);
    }

    async searchMaterialByPartNo(partNo: string): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        // reuse the same search input for part no
        await this.page.locator(this.Elements.partnoSearch).fill(partNo);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByPartNo(partNo: string): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/span[1]");
        const txt = (await firstRow.textContent()) || '';
        await expect(txt).toContain(partNo);
    }
    async searchMaterialByDescription(description: string): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        // reuse the same search input for part no
        await this.page.locator(this.Elements.descriptionSearch).fill(description);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByDescription(description: string): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//table[@class='el-table__body']/tbody[1]/tr[1]/td[6]/div[1]/span[1]");
        const txt = (await firstRow.textContent()) || '';
        await expect(txt).toContain(description);
    }
    async searchMaterialByStockLocation(stockLocation: string): Promise<void> {
        await this.clickOnInquireMaterialMenu();
        // reuse the same search input for part no
        await this.page.locator(this.Elements.locationSearch).fill(stockLocation);
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
    }

    async verifySearchResultByStockLocation(stockLocation: string): Promise<void> {
        await fixture.page.waitForTimeout(500);
        const firstRow = this.page.locator("//body[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[3]/div[2]/div[1]/div[3]/table[1]/tbody[1]/tr[1]/td[8]/div[1]/span[1]");
        const txt = (await firstRow.textContent()) || '';
        await expect(txt).toContain(stockLocation);
    }

    async updateMaterial(): Promise<void> {
        await this.searchMaterialByStockNo();
        await fixture.page.waitForTimeout(500);
        // Click stock no link to open edit
        await this.page.getByRole('link', { name: this.stockNo }).click();
        await fixture.page.waitForTimeout(500);

        const updatedDesc = `${this.description} - Updated ${currentDate}`;
        await this.page.locator(this.Elements.descriptionInput).fill(updatedDesc);

        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);

        await this.page.locator(this.Elements.okButton).click();
        await this.clickOnInquireMaterialMenu();
        await this.page.locator(this.Elements.stocknumbersearch).fill(this.stockNo);
        await this.base.waitAndClick(this.Elements.searchButton);
        await fixture.page.waitForTimeout(500);
        await expect(this.page.locator(this.Elements.updateddescription)).toHaveText(updatedDesc);


    }

    async verifyNewButtonFunctionality(): Promise<void> {
        // The New button may open a new tab; handle it
        await this.searchMaterialByStockNo();
        await fixture.page.waitForTimeout(500);
        // Click stock no link to open edit
        await this.page.getByRole('link', { name: this.stockNo }).click();
        await fixture.page.waitForTimeout(500);
        const newBtn = this.page.locator(this.Elements.newButtonSelector);
        await expect(newBtn).toBeVisible();

        const pagePromise = this.page.context().waitForEvent('page');
        await newBtn.click();
        const newPage = await pagePromise;
        await newPage.waitForLoadState('networkidle');
        await fixture.page.waitForTimeout(500);

        const url = newPage.url();
        // verify it's the add page for material
        await expect(url).toContain('/material/add');
        await newPage.close();
    }

    async verifyActionLog(): Promise<void> {
        await this.base.waitAndClick(this.Elements.actionLog);
        await expect(this.page.locator(this.Elements.headerTitleActionLog)).toBeVisible();
        await this.page.locator(this.Elements.operation).fill('Create Material');
        await expect(this.page.locator(this.Elements.operationSearchResult)).toHaveValue('Create Material');
        await this.page.locator(this.Elements.closeButton).click();
    }

    async verifyMandatoryFieldValidations(): Promise<void> {
        // Open create page
        await this.base.waitAndClick(this.Elements.createButton);
        await fixture.page.waitForTimeout(500);

        // Try save without filling mandatory fields
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);

        // Expect validation message(s)
        const hasError = await this.page.locator(this.Elements.requiredError).first().isVisible();
        await expect(hasError).toBeTruthy();

        // Fill mandatory fields one by one and verify errors disappear
        try {
            // fill required fields seen in the UI
            await this.page.locator(this.Elements.manufacturerPartNoInput).fill(`MPN-REQ`);
            await fixture.page.waitForTimeout(150);
            await this.page.locator(this.Elements.rcvUomSelect).click();
            await this.page.getByRole('listitem').first().click();
            await fixture.page.waitForTimeout(150);
            await this.page.locator(this.Elements.issueUomSelect).click();
            await this.page.getByRole('listitem').first().click();
            await fixture.page.waitForTimeout(150);
            await this.page.locator(this.Elements.conversionFactorInput).fill('1');
            await this.page.locator(this.Elements.descriptionInput).fill('Desc');
            await fixture.page.waitForTimeout(250);
        } catch (err) {
            // ignore
        }

        // Try save again
        await this.base.waitAndClick(this.Elements.saveButton);
        await fixture.page.waitForTimeout(500);

        // Expect no visible validation errors now
        const stillHasError = await this.page.locator(this.Elements.requiredError).first().isVisible().catch(() => false);
        await expect(stillHasError).toBeFalsy();
    }
}
