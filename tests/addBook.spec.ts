import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Load .env file
dotenv.config();

let bookName: string;

test.beforeEach(async ({ page }) => {
    const BASE_URL = process.env.BASE_URL == undefined ? "http://localhost:8080/" : process.env.BASE_URL;
    const USERNAME = process.env.USERNAME == undefined ? "" : process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD == undefined ? "" : process.env.PASSWORD; 

    bookName = "Playwright " + uuidv4();


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
    const BASE_URL = process.env.BASE_URL == undefined ? "http://localhost:8080/" : process.env.BASE_URL;

    // Open book list
    await expect(page.getByRole('heading', { name: 'Book List' })).toBeVisible();
    
    // Open book
    await page.getByRole('listitem', { name: bookName }).getByRole('button', { name: 'open book' }).click();

    // Delete book
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button', { name: 'delete book' }).click();
    
    // Check book deleted
    await expect(page.getByRole('heading', { name: 'Book List' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: bookName })).toHaveCount(0);
    // let bookLocator = page.getByRole('listitem', { name: bookName });
    // expect(bookLocator).toBeNull();
})

test('add book', async ({ page }) => {

    // Open book list
    await expect(page.getByRole('heading', { name: 'Book List' })).toBeVisible();

    // Add book
    await page.getByRole('button').nth(4).click();
    await expect(page.getByRole('heading', { name: 'Add Book' })).toBeVisible();

    // Title
    await page.getByRole('textbox', { name: 'Title' }).click();
    await page.getByRole('textbox', { name: 'Title' }).fill(bookName);
    // Status
    await page.locator('select[name="status"]').selectOption('1');
    // Submit
    await page.getByRole('button', { name: 'Submit' }).click();

    // Check added 
    await expect(page.getByRole('heading', { name: bookName })).toBeVisible();
    
});
