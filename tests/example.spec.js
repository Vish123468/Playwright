// @ts-check
import { test, expect } from '@playwright/test';

//test.describe.configure({mode:"parallel"})
test.describe.configure({mode:"serial"})
test('@Web has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle('Fast and reliable end-to-end testing for modern web apps | Playwright');
});

test('get started link', async ({ page }) => {
  //await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
});

test("Miss",async({browser})=>{
     const context = await browser.newContext();
     const page = await context.newPage();

     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // expect(await page.screenshot()).toMatchSnapshot({path:'screenshot.png'});
     await page.locator('//input[@id="hide-textbox"]').screenshot({path:'screenshot2.png'});
     await page.locator('//input[@id="hide-textbox"]').click();
     await page.getByPlaceholder('Hide/Show Example').isHidden();
     page.on("dialog",dialog=>dialog.accept());
    await page.locator('//input[@id="alertbtn"]').click()

    //await page.locator('//button[@id="mousehover"]').hover();

    const iframe =  page.frameLocator('#courses-iframe')
    await iframe.locator('li a[href*="blog"]:visible').click();

      

}
)