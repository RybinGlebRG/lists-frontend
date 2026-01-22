import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Load .env file
dotenv.config();

let tagName: string;

test.beforeEach(async ({ page }) => {
    const BASE_URL = process.env.BASE_URL == undefined ? "" : process.env.BASE_URL;
    const USERNAME = process.env.USERNAME == undefined ? "" : process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD == undefined ? "" : process.env.PASSWORD; 

    tagName = "Playwright Tag " + uuidv4();


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

    // Open tags list
    await page.getByRole('link', { name: 'Books' }).click();
    await expect(page.getByRole('heading', { name: 'Book List' })).toBeVisible();
    await page.getByRole('link', { name: 'Tags' }).click();
    await expect(page.getByRole('heading', { name: 'Tags' })).toBeVisible();
    
    // Delete tag
    page.once('dialog', dialog => dialog.accept());
    await page.getByLabel(tagName).getByRole('button', { name: 'delete tag' }).click();

    // Check tag deleted
    await page.getByRole('link', { name: 'Tags' }).click();
    await expect(page.getByRole('heading', { name: 'Tags' })).toBeVisible();
    await expect(page.getByLabel( tagName )).toHaveCount(0);
})

test('add tag', async ({ page }) => {

    // Open tags list
    await page.getByRole('link', { name: 'Books' }).click();
    await expect(page.getByRole('heading', { name: 'Book List' })).toBeVisible();
    await page.getByRole('link', { name: 'Tags' }).click();
    await expect(page.getByRole('heading', { name: 'Tags' })).toBeVisible();

    // Add tag
    await page.getByRole('button', { name: 'add tag' }).click();
    await page.getByRole('textbox', { name: 'Tag Name' }).click();
    await page.getByRole('textbox', { name: 'Tag Name' }).fill(tagName);
    await page.getByRole('button', { name: 'Submit' }).click();

    // Check added 
    await page.getByRole('link', { name: 'Tags' }).click();
    await expect(page.getByRole('heading', { name: 'Tags' })).toBeVisible();
    await expect(page.getByLabel( tagName )).toBeVisible();
    
});
