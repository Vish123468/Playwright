const{test,expect} =  require('@playwright/test');

test('Browser Playwright Test',async({page})=> {
    // const context = await browser.newContext();
    // const page =  await context.newPage();
    await page.goto("https://www.google.com/")
    await page.goto("https://www.bing.com/")
    await page.goBack()
    await page.goForward()
    expect(await page.title()).toBe('Search - Microsoft Bing');
})

// test('Page Playwright Test',async({page})=> {
//     await page.goto('https://www.google.com/')

    
// })
