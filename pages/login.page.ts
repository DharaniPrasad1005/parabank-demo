import { expect, Page } from '@playwright/test';

export class LoginPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async registerUser() {
        await this.page.goto('/');
        await this.page.getByText('Register').click();

        await expect(this.page).toHaveURL(/.*register.htm/);

        await this.page.fill('[name="customer.firstName"]', `FirstName${Date.now()}`);
        await this.page.fill('[name="customer.lastName"]', `LastName${Date.now()}`);
        await this.page.fill('[name="customer.address.street"]', '123 Main St');
        await this.page.fill('[name="customer.address.city"]', 'Anytown');
        await this.page.fill('[name="customer.address.state"]', 'CA');
        await this.page.fill('[name="customer.address.zipCode"]', '12345');
        await this.page.fill('[name="customer.phoneNumber"]', '555-123-4567');
        await this.page.fill('[name="customer.ssn"]', '123-45-6789');
        await this.page.fill('[name="customer.username"]', `user${Date.now()}`);
        await this.page.fill('[name="customer.password"]', `password`);
        await this.page.fill('[name="repeatedPassword"]', `password`);

        await this.page.click('input[value="Register"]')
    }

    async login(username: string, password: string) {
        await this.page.goto('/')

        await this.page.fill('[name="username"]', username);
        await this.page.fill('[name="password"]', password);
        await this.page.click('input[value="Log In"]');
    }
}