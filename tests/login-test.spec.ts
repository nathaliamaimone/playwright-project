import { test, expect } from '@playwright/test';

test('Realizar login com sucesso', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/v1/');

  await page.locator('#user-name').fill('standard_user');
  await expect(page.locator('#user-name')).toHaveValue('standard_user');
  await page.locator('#password').fill('secret_sauce');
  await expect(page.locator('#password')).toHaveValue('secret_sauce');
  
  await page.locator('input#login-button').click();

  await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");
  await expect(page.locator('div.product_label')).toHaveText('Products');
});

test('Realizar login com usuário bloqueado', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/v1/');
  
    await page.locator('#user-name').fill('locked_out_user');
    await expect(page.locator('#user-name')).toHaveValue('locked_out_user');
    await page.locator('#password').fill('secret_sauce');
    await expect(page.locator('#password')).toHaveValue('secret_sauce');
    
    await page.locator('input#login-button').click();
  
    await expect(page).toHaveURL("https://www.saucedemo.com/v1/");
    await expect(page.locator('h3[data-test="error"]')).toBeVisible();
    await expect(page.locator('h3[data-test="error"]')).toHaveText('Epic sadface: Sorry, this user has been locked out.');
  });

test("Realizar login com usuário com problemas e validar imagem quebrada", async ({ page }) => {
  await page.goto("https://www.saucedemo.com/v1/");

  await page.locator("#user-name").fill("problem_user");
  await expect(page.locator("#user-name")).toHaveValue("problem_user");
  await page.locator("#password").fill("secret_sauce");
  await expect(page.locator("#password")).toHaveValue("secret_sauce");

  await page.locator("input#login-button").click();

  await expect(page).toHaveURL("https://www.saucedemo.com/v1/inventory.html");

  const image = page.locator("#item_0_img_link img");
  await expect(image).toHaveAttribute("src", /GarbageOnItToBreakTheUrl/)
});