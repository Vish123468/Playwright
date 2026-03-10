const{test,expect} = require('@playwright/test');

test("E2E Flow One",async({browser})=>{
  const context = await browser.newContext();
  const page = await context.newPage();

  //Locators 
  const username = page.locator("#userEmail");
  const password = page.locator("//input[@id='userPassword']");
  const loginbutton = page.locator(".btn-block");
  const productname = 'ADIDAS ORIGINAL';
  const productcard = page.locator("//div[@class='card-body']")

  //Page Navigation - Main Page Validation
  await page.goto("https://rahulshettyacademy.com/client");
  expect(await page.locator("//div[@class='banner']//h1").first().textContent()).toContain('Practice Website for ');

  //Login & Next Page Validation
  await username.fill('vishakha98patil@gmail.com');
  await password.fill('Vivek@2897');
  await loginbutton.click();
  await page.waitForLoadState('networkidle');
  //expect(await page.locator("//h3").textContent()).toBe('We Make Your Shopping Simple');

  //Gather List of products
  await productcard.locator("//b").first().waitFor();
  const producttitles = await productcard.locator("//b").allTextContents();
   
    const productcount = await productcard.locator("//b").count();
     // console.log(productcount)
      for(let  i = 0; i< productcount;i++) {
        if(await productcard.locator("//b").nth(i).textContent() === productname ){
            await productcard.nth(i).getByRole("button",{name: " Add To Cart"}).click();
            break;
        }
         
      }
    

    //cart page validation
    await page.locator("[routerlink*='cart']").click();
  
    // await page.locator("div li").first().waitFor();
    // expect(await page.locator("//h1",{ hasText: 'My Cart' }).textContent()).toBe('My Cart');
    // await page.locator("//div //li").first().waitFor();
   

    // await expect( page.locator("//div [@class='cartSection'] //h3",{hasText: 'ADIDAS ORIGINAL'})).toBeVisible();
    // await page.locator("text=Checkout").click();

     await page.locator("div li").first().waitFor();
   const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
   expect(bool).toBeTruthy();
    //cart page validation
    await page.locator("text=Checkout").click();
    expect(await page.locator("//label[@type='text'] /following-sibling::input").inputValue()).toBe('vishakha98patil@gmail.com');

    await page.locator("//input[@placeholder='Select Country']").pressSequentially("India",{delay:150});

    const dropdown =  page.locator("section.ta-results")
    await dropdown.waitFor();
    const dropdowncount =  await page.locator("section.ta-results button").count()
    const dropdownoptions = await page.locator("section.ta-results button").allTextContents()
    //console.log(dropdownoptions)
    //console.log(dropdowncount)

    for(let i = 0;i< dropdowncount;i++){
        if(await page.locator("section.ta-results button").nth(i).textContent() == " India"){
            await page.locator("section.ta-results button").nth(i).click()
            break;
        }
    }

    await page.locator(".action__submit").click();
   await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");

   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.locator("button[routerlink*='myorders']").click();

   //table flow
   await page.locator("//tbody").waitFor();
   const rows =  page.locator("//tbody //tr")
   const rowcount = await page.locator("//tbody //tr").count();

    await page.pause();
   for(let i = 0;i< rowcount;i++){
    console.log("Inside For Loop")
    // const orderIdDetails = await rows.nth(i).locator("//th").textContent()
    // if(orderIdDetails.includes(orderId) ) {
    //     await rows.nth(i).locator("//button").first().click();
    //     break;
    // }
      const orderIdDetails = await rows.nth(i).locator(" //th").textContent();
      console.log(orderIdDetails)
      if (orderId.includes(orderIdDetails)) {
         await rows.nth(i).locator("//button").first().click();
         break;
      }
   }

   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   




})