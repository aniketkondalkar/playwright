const {test,expect} = require('@playwright/test');

test('Register User', async ({page}) => 
{

page.goto("https://rahulshettyacademy.com/client/#/auth/register");
await page.locator("input#firstName").fill("Aniket");
await page.locator("input#lastName").fill("Kondalkar");
await page.locator("[type='email']").fill("kondalkar@gmail.com");
await page.locator("[type='text']").fill("9172222695");
await page.locator("[formcontrolname='occupation']").selectOption("Engineer");
await page.locator("[value='Male']").check();
await page.locator("input#userPassword").fill("Aniket@123");
await page.locator("input#confirmPassword").fill("Aniket@123");
await page.locator("[type='checkbox']").check();

await page.locator("[type='submit']").click();


await expect(page.getByText('Account Created Successfully')).toBeVisible();


}
)

test('Login User and select a product', async ({page}) => 
{
page.goto("https://rahulshettyacademy.com/client");
await page.locator("[type='email']").fill("kondalkar@gmail.com");
await page.locator("[type='password']").fill("Aniket@123");
await page.locator("input#login").click();

await page.waitForLoadState('networkidle');
console.log(await page.locator(".card-body b").first().textContent());

}
)

test('UI Controls', async ({page}) =>
{
 const username = page.locator("[name='username']");
 const password = page.locator("[name='password']");
 const radio    = page.locator(".radiotextsty").last();
 const select   = page.locator("select.form-control");
 const OKbutton = page.locator("button#okayBtn");
 const chkbox   = page.locator("input#terms");
 const documentlink  = page.locator("[href*='documents-request']");

 await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
 await username.fill("aniketkondalkar@gmail.com");
 await password.fill("Aniket!@123");
 await radio.click();
 await OKbutton.click();
 await select.selectOption("teach");
 await expect(radio).toBeChecked();
 await chkbox.click();
 expect(await chkbox).toBeChecked();
 await chkbox.uncheck();
 expect(await chkbox.isChecked()).toBeFalsy();
 expect(await documentlink).toHaveAttribute("class","blinkingText");

 //await page.pause()
}
)

test('Handle child window', async ({browser}) =>
{
  const context= await browser.newContext();
  const page =await context.newPage();
  const username = page.locator("[name='username']");
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const documentlink  = page.locator("[href*='documents-request']");

  const [page2]=await Promise.all([
    context.waitForEvent("page"),
  documentlink.click(),
  ]);

  const text =await page2.locator(".red").textContent();
  console.log(text);
  const arrayText=text.split("@");
  const domain=arrayText[1].split(" ")[0];
  console.log(domain);
  await page.locator("[name='username']").fill(domain);
  //await page.pause();

  

}
)