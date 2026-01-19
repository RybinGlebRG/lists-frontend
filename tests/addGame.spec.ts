import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Load .env file
dotenv.config();

let gameName: string;

test.beforeEach(async ({ page }) => {
    const BASE_URL = process.env.BASE_URL == undefined ? "" : process.env.BASE_URL;
    const USERNAME = process.env.USERNAME == undefined ? "" : process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD == undefined ? "" : process.env.PASSWORD; 

    gameName = "Playwright " + uuidv4();

    await page.goto(BASE_URL);

    // Login
    await expect(page.getByRole('heading', { name: 'Sign in' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Login' }).click();
    await page.getByRole('textbox', { name: 'Login' }).fill(USERNAME);
    await page.getByRole('textbox', { name: 'Password' }).click();
    await page.getByRole('textbox', { name: 'Password' }).fill(PASSWORD);
    await page.getByRole('button', { name: 'Sign in' }).click();
})

test.afterEach(async ({ page }) => {
    const BASE_URL = process.env.BASE_URL == undefined ? "" : process.env.BASE_URL;

    // Open list
    await page.getByRole('link', { name: 'Games' }).click();
    await expect(page.getByRole('heading', { name: 'Games' })).toBeVisible();
    
    // Delete game
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('listitem').filter({ hasText: gameName }).getByRole('button', { name: 'delete game' }).click();

    // Check game deleted
    await expect(page.getByRole('heading', { name: 'Games' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: gameName })).toHaveCount(0);
})


test('add game', async ({ page }) => {

    // Open list
    await page.getByRole('link', { name: 'Games' }).click();
    await expect(page.getByRole('heading', { name: 'Games' })).toBeVisible();

    // Add game
    await page.getByRole('button', { name: 'add game' }).click();

    // Title
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill(gameName);
    // Submit
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // Check added
    await expect(page.getByRole('heading', { name: 'Games' })).toBeVisible();
    await expect(page.getByText(gameName)).toBeVisible();
    
});
