const{test,expect} = require('@playwright/test');

test("Playwright Specail Locators",async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    // await page.getByLabel('Name').fill('Vishakha Patil');
    // await page.getByLabel('Email').fill('vishakha98patil@gmail.com');
    // await page.getByPlaceholder('Password').fill('Vivek@2897');
    await page.getByLabel('Check me out if you Love IceCreams!').click();
    await page.getByLabel('Gender').selectOption('Female');
    await page.getByLabel('Employed').click();

    //<input class="btn btn-success" type="submit" value="Submit">
    await page.getByRole('button',{name:'Submit'}).click();
    await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator('app-card').filter({hasText:'Nokia Edge'}).getByRole('button').click();
    await page.pause();
    

    /*
    
filter & hastext - > add to cart one item using locator chaning
--ui
*/ 

})