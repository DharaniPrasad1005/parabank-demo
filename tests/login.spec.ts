import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Positive Login Tests', () => {

    test('Successful Register User', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.registerUser();

        await expect(page).toHaveTitle('ParaBank | Customer Created');
    });


    test('Succesful user login', async ({ page }) => {
        const loginPage = new LoginPage(page);
        console.log(process.env.TEST_USERNAME);
        console.log(process.env.TEST_PASSWORD);

        await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);

        await expect(page).toHaveURL(/.*overview.htm/);
    });

    test('check account overview', async ({ page }) => {

        const loginPage = new LoginPage(page);
        await loginPage.login(process.env.TEST_USERNAME!, process.env.TEST_PASSWORD!);
        await expect(page).toHaveURL(/.*overview.htm/);

        await expect(page.locator('#showOverview')).toBeVisible();

        ;
    });
})
