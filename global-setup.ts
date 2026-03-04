import { chromium, FullConfig } from '@playwright/test';
import * as dotenv from 'dotenv';
import * as fs from 'fs';

dotenv.config(); // loads your .env file

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();

    // Generate unique username per run to avoid conflicts
    const username = `testuser_${Date.now()}`;
    const password = 'Test@1234!';

    console.log(`\n🔧 Registering user: ${username}`);

    await page.goto(process.env.REGISTER_URL!);

    // Fill in all ParaBank registration fields
    await page.fill('[id="customer.firstName"]', process.env.TEST_FIRST_NAME! || 'Test');
    await page.fill('[id="customer.lastName"]', process.env.TEST_LAST_NAME! || 'User');
    await page.fill('[id="customer.address.street"]', process.env.TEST_ADDRESS! || '123 Main St');
    await page.fill('[id="customer.address.city"]', process.env.TEST_CITY! || 'Anytown');
    await page.fill('[id="customer.address.state"]', process.env.TEST_STATE! || 'CA');
    await page.fill('[id="customer.address.zipCode"]', process.env.TEST_ZIP! || '12345');
    await page.fill('[id="customer.phoneNumber"]', process.env.TEST_PHONE! || '555-123-4567');
    await page.fill('[id="customer.ssn"]', process.env.TEST_SSN! || '123-45-6789');
    await page.fill('[id="customer.username"]', username);
    await page.fill('[id="customer.password"]', password);
    await page.fill('[id="repeatedPassword"]', password);

    // Submit the form
    await page.click('[value="Register"]');

    // Wait for successful registration
    await page.getByText(`Welcome ${username}`);

    console.log(`✅ Registration successful for: ${username}`);

    // Save browser session (cookies, localStorage) for reuse
    await page.context().storageState({ path: 'storageState.json' });

    // Write generated credentials to .env.test
    fs.writeFileSync(
        '.env.test',
        `TEST_USERNAME=${username}\nTEST_PASSWORD=${password}\n`
    );

    // Also set in current process for immediate use
    // process.env.TEST_USERNAME = username;
    // process.env.TEST_PASSWORD = password;

    console.log(`💾 Credentials saved to .env.test`);

    await browser.close();
}

export default globalSetup;