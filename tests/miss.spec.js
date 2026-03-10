//https://rahulshettyacademy.com/AutomationPractice/
const{test,expect}=require('@playwright/test');

test("Miss",async({browser})=>{
     const context = await browser.newContext();
     const page = await context.newPage();

     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
     expect(await page.screenshot()).toMatchSnapshot({path:'screenshot.png'});
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