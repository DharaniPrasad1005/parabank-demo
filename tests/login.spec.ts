import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Positive Login Tests', () => {

    test('Successful Register User', async ({ page }) => {
        const loginPage = new LoginPage(page);
        await loginPage.registerUser();

        await expect(page).toHaveTitle('ParaBank | Customer Created');
    });


    test('Succesful user login', async ({ page }) => {
        const loginPage = new LoginPage(page);

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

test.describe('Negative Test Cases', () => {
    test('Unsuccessful login with invalid username', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('username', process.env.TEST_PASSWORD!);
        await expect(page).toHaveURL(/.*login.htm/);
        await expect(page.locator('.title')).toHaveText('Error!');
    })

    test('Unsuccessful login with invalid password', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login(process.env.TEST_USERNAME!, 'password');
        await expect(page).toHaveURL(/.*login.htm/);
        await expect(page.locator('.title')).toHaveText('Error!');
    });

    test('Unsuccessful login with empty credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);

        await loginPage.login('', '');
        await expect(page).toHaveURL(/.*login.htm/);
        await expect(page.locator('.title')).toHaveText('Error!');
    });
})  
