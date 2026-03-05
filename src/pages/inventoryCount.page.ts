import { expect, Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { getRandomInt, randomName, randomtext, currentDate, UOM_PIECES, UOM_BOX50 } from "../helper/util/test-data/randomdata";
import { fixture } from "../hooks/pageFixture";
import * as fs from 'fs';
import * as path from 'path';

setDefaultTimeout(100 * 1000);

export default class inventoryCountPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        materialMenu: "//span[normalize-space()='Material']",
        inventoryCountMenu: "//span[normalize-space(text())='- Inventory Count']",
        create: "//span[normalize-space(text())='Create']",
        save: "//span[normalize-space(text())='Save']",
        wareHouse: "(//input[@placeholder='--Select One--'])[3]",
        inventoryCountName: "(//input[@placeholder='--Input Text--'])[3]",
        firstRowEdit: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/button[1]/span[1]/i[1]",
        actionTypeTextbox: "//table[@class='el-table__header']/thead[1]/tr[2]/th[4]/div[1]/div[1]/div[1]/div[1]/input[1]",
        firstrowdelete: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/button[2]/span[1]/i[1]",
        okButton: "//button[normalize-space()='OK']",
        yesButton: "//span[normalize-space()='Yes']",
        rightSideMoveButton: "(//i[@class='el-icon-arrow-left'])[1]",
        actionLog: "//button[contains(.,'Action Log')]",
        headerTitle: "//div[@class='el-dialog__header']//span[1]",
        closeButton: "//span[normalize-space(text())='Close']",
        inventoryCountID: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[2]/div[1]/a[1]",
        countingQty: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[6]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        completebutton: "//span[normalize-space(text())='Complete']",
        stockSearch: "//table[@class='el-table__header']/thead[1]/tr[2]/th[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        stockSearchResult: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[1]/div[1]/span[1]",
        transferMatrialMenu: "//span[normalize-space(text())='- Transfer Material']",
        stockNoTransfer: "(//input[@class='el-input__inner'])[1]",
        searchButtonOnTransfer: "(//button[@type='button']//span)[2]",
        adjustReason: "(//input[@class='el-input__inner'])[3]",
        minusButtonOnTransfer: "(//i[@class='ivu-icon ivu-icon-minus'])[1]",
        masterRadioButtonTransfer: "(//span[@class='el-radio__inner'])[2]",
        OHQuantityAfterTransfer: "(//input[@type='text'])[5]",
        saveButton: "//span[normalize-space(text())='Save']",
        erroValidationOnTransfer: "//p[normalize-space(text())='Warehouse FD-1-1 is under inventory count, you cannot proceed this operation against it.']",
        messageAfterComplete: "//div[@class='el-message-box__message']//p[1]",
        closeButtonTransfer: "(//i[@class='el-message-box__close el-icon-close'])[1]",
        adjustOHQuantityMenu: "//span[normalize-space()='- Adjust OH Quantity']",
        adjustButton: "//span[normalize-space(text())='Adjust']",
        cancelButton: "(//span[contains(text(),'Cancel')])[1]",
        statusList: "(//input[@placeholder='--Select One--'])[2]",
        OHQuantityAvailable: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[3]/div[1]/div[1]/span[1]",
        TotalOHQuantity: "//table[@class='el-table__body']/tbody[1]/tr[1]/td[5]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/input[1]",
        downloadButton: "//span[normalize-space(text())='Download Inventory Count']"
    };

    async clickOnInventoryCountMenu(): Promise<void> {
        await this.base.waitAndClick(this.Elements.materialMenu);
        await this.base.waitAndClick(this.Elements.inventoryCountMenu);
    }

    async CreateInventoryCount(): Promise<void> {
        fixture.logger.info("Waiting for 1 seconds")
        await fixture.page.waitForTimeout(1000);
        await this.base.waitAndClick(this.Elements.create);
        await this.base.waitAndClick(this.Elements.wareHouse);
        await this.page.getByText('FD - Fuel Dock').click();
        const randomNumber = getRandomInt(1000, 9999);
        const description = `Inventory ${randomNumber}`;
        await this.page.locator(this.Elements.inventoryCountName).fill(description);
        await this.base.waitAndClick(this.Elements.save);
        await fixture.page.waitForTimeout(500);
        await this.page.getByRole('button', { name: 'OK' }).click();


    }
    async ClickinventoryCountID(): Promise<void> {
        await this.base.waitAndClick(this.Elements.inventoryCountID);
        await fixture.page.waitForTimeout(1000);

    }

    async verifySearchResult(): Promise<void> {
        await this.page.locator(this.Elements.stockSearch).fill("FD-1-1");
        const Text = await this.page.locator(this.Elements.stockSearchResult).textContent();
        expect(Text).toContain('FD-1-1');

    }

    async saveTheQuantity(): Promise<void> {

        await this.page.locator(this.Elements.countingQty).fill("10");
        await this.base.waitAndClick(this.Elements.save);
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(1000);

    }
    async VerifyCannotProceedValidation(): Promise<void> {
        this.page.locator(this.Elements.materialMenu).click();
        this.page.locator(this.Elements.transferMatrialMenu).click();
        await fixture.page.waitForTimeout(1000);
        this.page.locator(this.Elements.stockNoTransfer).fill("1003");
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.searchButtonOnTransfer).click();
        await this.page.locator(this.Elements.adjustReason).click();
        await this.page.getByText('Transfer Location').click();
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.minusButtonOnTransfer).click();
        await this.page.getByRole('button', { name: 'Yes' }).click();
        await this.page.locator(this.Elements.masterRadioButtonTransfer).click();
        await this.page.getByRole('cell', { name: '--Input Or Select One--' }).getByPlaceholder('--Input Or Select One--').click();
        await this.page.getByRole('cell', { name: '--Input Or Select One--' }).getByPlaceholder('--Input Or Select One--').type('FD-1-1');
        await this.page.getByText('FD-1-1').click();
        const ohQuantity = await this.page.locator(this.Elements.OHQuantityAvailable).textContent();


        await this.page.locator(this.Elements.OHQuantityAfterTransfer).fill(ohQuantity);
        await this.page.locator(this.Elements.saveButton).click();
        const Text = await this.page.locator(this.Elements.erroValidationOnTransfer).textContent();
        expect(Text).toContain('Warehouse FD-1-1 is under inventory count');
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(1000);


    }
    async clickOnComplete(): Promise<void> {
        await this.base.waitAndClick(this.Elements.materialMenu);
        await this.base.waitAndClick(this.Elements.inventoryCountMenu);
        await this.base.waitAndClick(this.Elements.inventoryCountID);
        await this.base.waitAndClick(this.Elements.completebutton);
        await fixture.page.waitForTimeout(500);
        const Text = await this.page.locator(this.Elements.messageAfterComplete).textContent();
        expect(Text).toContain('but you can Adjust OH Quantity and Transfer Material now');
        await this.page.getByRole('button', { name: 'OK' }).click();

    }

    async adjustOHQuantityMenuAfterSave(): Promise<void> {
        this.page.locator(this.Elements.materialMenu).click();
        this.page.locator(this.Elements.adjustOHQuantityMenu).click();
        await fixture.page.waitForTimeout(1000);
        this.page.locator(this.Elements.stockNoTransfer).fill("1054");
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.searchButtonOnTransfer).click();
        await this.page.locator(this.Elements.adjustReason).click();
        await this.page.getByText('Transfer Location').click();

        await this.page.locator(this.Elements.TotalOHQuantity).fill("48");
        await this.page.locator(this.Elements.adjustButton).click();
        // await this.page.locator(this.Elements.closeButtonTransfer).click();
        // await fixture.page.waitForTimeout(5000);
        const Text = await this.page.locator(this.Elements.erroValidationOnTransfer).textContent();
        expect(Text).toContain('under inventory count');
        await this.page.getByRole('button', { name: 'OK' }).click();
        await fixture.page.waitForTimeout(1000);

    }
    async adjustOHQuantityMenuAfterComplete(): Promise<void> {
        this.page.locator(this.Elements.materialMenu).click();
        this.page.locator(this.Elements.adjustOHQuantityMenu).click();
        await fixture.page.waitForTimeout(1000);
        this.page.locator(this.Elements.stockNoTransfer).fill("1054");
        await fixture.page.waitForTimeout(500);
        await this.page.locator(this.Elements.searchButtonOnTransfer).click();
        await this.page.locator(this.Elements.adjustReason).click();
        await this.page.getByText('Transfer Location').click();
        const randomNumber = getRandomInt(10, 99);
        await this.page.locator(this.Elements.TotalOHQuantity).fill(randomNumber.toString());
        await this.page.locator(this.Elements.adjustButton).click();
        await this.page.locator(this.Elements.closeButtonTransfer).click();
        await fixture.page.waitForTimeout(500);

    }
    async clickOncloseButton(): Promise<void> {
        await this.base.waitAndClick(this.Elements.materialMenu);
        await this.base.waitAndClick(this.Elements.inventoryCountMenu);
        await this.page.locator(this.Elements.statusList).click();
        await this.page.getByText('Completed').click();
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.inventoryCountID);
        await this.base.waitAndClick(this.Elements.closeButton);
        const Text = await this.page.locator(this.Elements.messageAfterComplete).textContent();
        expect(Text).toContain('Warehouse FD has been unlocked.');
        await this.page.getByRole('button', { name: 'OK' }).click();

    }
    async clickOnCancelButton(): Promise<void> {
        await fixture.page.waitForTimeout(500);
        await this.base.waitAndClick(this.Elements.cancelButton);
        // const Text = await this.page.locator(this.Elements.messageAfterComplete).textContent();
        // expect(Text).toContain('cancelled successfully');
        await this.page.getByRole('button', { name: 'OK' }).click();

    }
    async downloadReport(): Promise<string> {
        const downloadPath = 'C:\\Users\\jeena.manuel\\OneDrive - Milestone Technologies Inc\\LBCT - Automation Practice\\Automation Reports\\RAMS Reports';
        if (!fs.existsSync(downloadPath)) {
            fs.mkdirSync(downloadPath, { recursive: true });
        }
        this.clearDownloadFolder(downloadPath);

        // Handle the download event
        const [download] = await Promise.all([
            this.page.waitForEvent('download'), // Wait for the download to start
            this.page.locator(this.Elements.downloadButton).click() // Perform the action that initiates download
        ]);

        // Save the downloaded file to the specified folder as a text file
        const downloadPathWithFileName = path.join(downloadPath, 'inventoryCount.xlsx');
        await download.saveAs(downloadPathWithFileName);
        console.log(`File downloaded to: ${downloadPathWithFileName}`);
        expect(fs.existsSync(downloadPathWithFileName)).toBeTruthy();
         await new Promise(resolve => setTimeout(resolve, 5000));
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

}