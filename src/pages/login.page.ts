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
        logOutButton: "//i[@role='button']",
        logOut: "//a[normalize-space(text())='Logout']",
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

    async login(username: string, password: string): Promise<void> {
        await this.navigateToLoginPage();
        await this.enterUserName(username);
        await this.enterPassword(password);
        await this.clickLoginButton();
    }

    async logOutDropDownlist(): Promise<void> {
        await this.base.waitAndClick(this.Elements.logOutButton);
        await this.base.waitAndClick(this.Elements.logOut);
    }
}