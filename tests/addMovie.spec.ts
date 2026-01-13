import { test, expect } from '@playwright/test';
import * as dotenv from 'dotenv';
import { v4 as uuidv4 } from 'uuid';

// Load .env file
dotenv.config();

let movieName: string;

test.beforeEach(async ({ page }) => {
    const BASE_URL = process.env.BASE_URL == undefined ? "" : process.env.BASE_URL;
    const USERNAME = process.env.USERNAME == undefined ? "" : process.env.USERNAME;
    const PASSWORD = process.env.PASSWORD == undefined ? "" : process.env.PASSWORD; 

    movieName = "Playwright " + uuidv4();

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

    // Open movies list
    await page.getByRole('link', { name: 'Movies' }).click();
    await expect(page.getByRole('heading', { name: 'Titles' })).toBeVisible();
    
    // Open movie
    await page.getByRole('listitem', { name: movieName }).getByRole('button', { name: 'open movie' }).click();
    await expect(page.getByRole('heading', { name: movieName })).toBeVisible();

    // Delete movie
    page.once('dialog', dialog => dialog.accept());
    await page.getByRole('button').nth(2).click();

    // Check movie deleted
    await expect(page.getByRole('heading', { name: 'Titles' })).toBeVisible();
    await expect(page.getByRole('listitem', { name: movieName })).toHaveCount(0);
})


test('add movie', async ({ page }) => {

    // Open movies list
    await page.getByRole('link', { name: 'Movies' }).click();
    await expect(page.getByRole('heading', { name: 'Titles' })).toBeVisible();

    // Add movie
    await expect(page.getByRole('button').nth(1)).toBeVisible();
    await page.getByRole('button').nth(1).click();

    // Title
    await page.getByRole('textbox', { name: 'Name' }).click();
    await page.getByRole('textbox', { name: 'Name' }).fill(movieName);
    // Status
    await page.locator('select[name="status"]').selectOption('2');
    // Type
    await page.locator('select[name="type"]').selectOption('1');
    // Submit
    await page.getByRole('button', { name: 'Submit' }).click();
    
    // Check added
    await expect(page.getByText(movieName)).toBeVisible();
    
});
