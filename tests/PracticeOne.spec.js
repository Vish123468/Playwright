const {test,expect} = require('@playwright/test');

test("Incorrect Login Test",async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Locators 
    const username = page.locator("#username");
    const password = page.locator("[id='password']");
    const signinbtn = page.locator("input#signInBtn");
    const errormsglocator = page.locator("[style*='block']")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill('vishakhapatil589@gmail.com');
    await password.fill('Vivek@2897');
    await signinbtn.click();
    await expect( errormsglocator).toContainText("Incorrect");
})

test("Correct Login Test",async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    
    //Locators 
    const username = page.locator("#username");
    const password = page.locator("[id='password']");
    const signinbtn = page.locator("input#signInBtn");
    const errormsglocator = page.locator("[style*='block']");
    const producttitles = page.locator(".card-body a");

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');
    await signinbtn.click();
    
    await producttitles.first().waitFor();
    console.log(await producttitles.first().textContent())
    console.log(await producttitles.allTextContents())
})