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
  
  //Login & Next Page Validation
  await page.getByPlaceholder('email@example.com').fill('vishakha98patil@gmail.com');
  await page.getByPlaceholder('enter your passsword').fill('Vivek@2897');
  await page.getByRole('button',{name:'Login'}).click();
  await page.waitForLoadState('networkidle');
  
  //Gather List of products
  // await productcard.locator("//b").first().waitFor();
  // const producttitles = await productcard.locator("//b").allTextContents();
  //   const productcount = await productcard.locator("//b").count();
  //     for(let  i = 0; i< productcount;i++) {
  //       if(await productcard.locator("//b").nth(i).textContent() === productname ){
  //           await productcard.nth(i).getByRole("button",{name: " Add To Cart"}).click();
  //           break;
  //       }
         
  //     }
 
  await page.locator("//div[@class='card-body']").filter({hasText:'ADIDAS ORIGINAL'}).getByRole("button",{name:" Add To Cart"}).click()
  

    

  //   //cart page validation
  //   await page.locator("[routerlink*='cart']").click();
    
   await page.getByRole("listitem").getByRole('button',{name:"Cart"}).click();  
    
     await page.locator("div li").first().waitFor();
  const bool = await page.getByText('ADIDAS ORIGINAL').isVisible();
  expect(bool).toBeTruthy();
  //   //cart page validation
  await page.getByRole("button",{name:"Checkout"}).click();
  //expect(await page.getByLabel('vishakha98patil@gmail.com')).toContainText('vishakha98patil@gmail.com');

   await page.getByPlaceholder("Select Country").pressSequentially("India",{delay:150});

   await page.getByRole("button",{name:' India'}).last().click();

     await page.getByText("PLACE ORDER").click();
   
   await expect(page.getByText("Thankyou for the order.")).toBeVisible();

   const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
   console.log(orderId);
 
   await page.getByRole("button",{name:'  ORDERS'}).click();

   //table flow
 
   await page.locator("//tbody").waitFor();
   const rows =  page.locator("//tbody //tr")
   const rowcount = await page.locator("//tbody //tr").count();

  
   for(let i = 0;i< rowcount;i++){
    console.log("Inside For Loop")
    
      const orderIdDetails = await rows.nth(i).locator(" //th").textContent();
      console.log(orderIdDetails)
      if (orderId.includes(orderIdDetails)) {
         await rows.nth(i).get("//button").first().click();
         break;
      }
   }

   const orderIdDetails = await page.locator(".col-text").textContent();
   expect(orderId.includes(orderIdDetails)).toBeTruthy();
   




})