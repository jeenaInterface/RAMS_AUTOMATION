import { Page } from "@playwright/test";
import PlaywrightWrapper from "../helper/wrapper/PlaywrightWrappers";
import { setDefaultTimeout } from "@cucumber/cucumber";

setDefaultTimeout(100 * 1000);

export default class LoginPage {
    private base: PlaywrightWrapper;
    private page: Page;

    constructor(page: Page) {
        this.base = new PlaywrightWrapper(page);
        this.page = page;
    }

    private Elements = {
        userName: "//input[@placeholder='User ID']",
        password: "//input[@placeholder='Password']",
        signInButton: "//span[normalize-space(text())='Go']",
        username: "//i[contains(@class,'menu-icon ivu-icon')]/following-sibling::span[1]",
        logOutButton: "//span[normalize-space()='Log Out']",
        logOut: "//a[normalize-space(text())='Logout']",
        yesButton: "//span[normalize-space(text())='YES']",
        noButton:"//span[normalize-space(text())='NO']"
    };

    async navigateToLoginPage(): Promise<void> {
        await this.base.goto(process.env.BASEURL, { timeout: 60000 });
        // await this.page.evaluate(() => {
        //     window.moveTo(0, 0);
        //     window.resizeTo(screen.width, screen.height);
        // });
    }

    async enterUserName(user: string): Promise<void> {
        await this.page.locator(this.Elements.userName).fill(user);
    }

    async enterPassword(password: string): Promise<void> {
        await this.page.locator(this.Elements.password).fill(password);

    }

    async clickLoginButton(): Promise<void> {
        await this.page.locator(this.Elements.signInButton).click();
    }
    async clickLoginButtonMechanic(): Promise<void> {
        await this.page.locator(this.Elements.signInButton).click();
        await this.page.locator(this.Elements.yesButton).click();

    }
        async clickLoginButtonMechanic1(): Promise<void> {
        await this.page.locator(this.Elements.signInButton).click();
        await this.page.locator(this.Elements.noButton).click();

    }

    async login(username: string, password: string): Promise<void> {
        await this.navigateToLoginPage();
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async logOutDropDownlist(): Promise<void> {
        await this.base.waitAndClick(this.Elements.username);
        await this.base.waitAndClick(this.Elements.logOutButton);
    }
}