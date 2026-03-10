const{test, expect} = require('@playwright/test');

test("UIBasicControls",async({browser})=>{
    const context = await browser.newContext();
    const page =  await context.newPage();
    const username = page.locator("#username")
    const password = page.locator("input#password")
    const radiobutton = page.locator("(//span[@class='checkmark'])[2]")
    const dropdown = page.locator("//select[@data-style='btn-info']")
    const checkbox = page.locator("#terms")
    const signinbtn = page.locator("#signInBtn")

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page.locator("a[href*='documents']")).toHaveAttribute("class","blinkingText");


    await username.fill('rahulshettyacademy')
    expect(await username.inputValue()).toBe('rahulshettyacademy');
    await password.fill('Learning@830$3mK2')
    expect(await password.inputValue()).toBe('Learning@830$3mK2')

    await radiobutton.click();
    await expect (radiobutton).toBeChecked();
    await page.locator("#okayBtn").click();
    
    await dropdown.selectOption("Consultant");
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    expect ( await checkbox.isChecked()).toBeFalsy()

})

test("Handling Child Windows",async({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();

    const documentlink = page.locator("a[href*='documents']");
        
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const[newPage]= await Promise.all([ context.waitForEvent('page'),
     documentlink.click()])
     const para = await newPage.locator("p.red").textContent()
     console.log(para)

     const stringone = para.split('@')
     console.log(stringone)

     const email = stringone[1].split('.')[0];

     console.log(email
     )

     await page.locator("#username").fill(email)

      expect(await page.locator("#username").inputValue()).toBe('rahulshettyacademy');

})