import { test, expect } from '@playwright/test'; 
test('ParaBank End-to-End Flow', async ({ page }) => { 
 await page.goto('https://parabank.parasoft.com/parabank/index.htm'); 
 // --- Login --- 
 await page.fill('[name="username"]', 'john'); 
 await page.fill('[name="password"]', 'demo'); 
 await page.click('input[value="Log In"]'); 
 // --- Verify Account Overview --- 
 await expect(page.locator('#accountTable')).toBeVisible(); 
 console.log('PASS: Account Overview loaded'); 
 // --- Open New Account (SAVINGS) --- 
 await page.click('text=Open New Account'); 
 await page.selectOption('#type', 'SAVINGS'); 
 await page.selectOption('#fromAccountId', { index: 0 }); 
 await page.click('input[value="Open New Account"]'); 
 await expect(page.locator('#openAccountResult h1.title')) 
 .toHaveText('Account Opened!'); 
 const newAcct = await page.locator('#newAccountId').textContent(); 
 console.log('PASS: New account opened:', newAcct); 
 // --- Transfer Funds --- 
 await page.click('text=Transfer Funds'); 
 await page.fill('#amount', '100'); 
 await page.selectOption('#fromAccountId', { index: 0 }); 
 await page.selectOption('#toAccountId', { index: 1 }); 
 await page.click('input[value="Transfer"]'); 
 await expect(page.locator('#showResult h1.title')) 
 .toHaveText('Transfer Complete!'); 
 console.log('PASS: Transfer complete'); 
 // --- Bill Pay --- 
 await page.click('text=Bill Pay'); 
 await page.fill('[name="payee.name"]', 'John Electric Co.'); 
 await page.fill('[name="payee.address.street"]', '123 Power St'); 
 await page.fill('[name="payee.address.city"]', 'Springfield'); 
 await page.fill('[name="payee.address.state"]', 'IL'); 
 await page.fill('[name="payee.address.zipCode"]', '62701'); 
 await page.fill('[name="payee.phoneNumber"]', '555-123-4567'); 
 await page.fill('[name="payee.accountNumber"]', '12345678'); 
 await page.fill('[name="verifyAccount"]', '12345678'); 
 await page.fill('[name="amount"]', '75'); 
 await page.selectOption('[name="fromAccountId"]', { index: 0 }); 
 await page.click('input[value="Send Payment"]'); 
 await expect(page.locator('#billpayResult h1.title')) 
 .toContainText('Bill Payment Complete'); 
 console.log('PASS: Bill payment complete');
});
