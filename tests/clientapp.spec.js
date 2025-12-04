const {test,expect}=require('@playwright/test')

test('Search Product dynamically',async ({page})=>
{
const productName = "ADIDAS ORIGINAL";
const products =page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("[type='email']").fill("kondalkar@gmail.com");
await page.locator("[type='password']").fill("Aniket@123");
await page.locator("input#login").click();

await page.waitForLoadState('networkidle');
await page.locator(".card-body b").first().waitFor();
const titles=await page.locator(".card-body b").allTextContents();
console.log(titles);
const count = await products.count();
for(let i=0; i<count;++i)
{
   if (await products.nth(i).locator("b").textContent() == productName)
   {
   await products.nth(i).locator("text = Add To Cart").click();
   break;
   }

}
await page.locator("[routerlink*='cart']").click();
await page.locator("div li").first().waitFor();
const bool = await page.locator("h3:has-text('ADIDAS ORIGINAL')").isVisible();
expect(bool).toBeTruthy();
await page.locator("button[type='button']").last().click();
const cvv= page.locator("div[class='field small']").nth(1);
await cvv.locator("input").fill("345");
//await page.pause();
 const NameOnCard = page.locator("div[class='field']").last();
 await NameOnCard.locator("input").fill("Aniket Kondalkar");
 await page.locator("input[placeholder='Select Country']").pressSequentially("ind",{delay:150});
 const countryDD = page.locator(".ta-results");
 await countryDD.waitFor();
 const countryCount=await countryDD.locator("button").count();
for (let i=0; i<countryCount ; ++i)
{
 const text = await countryDD.locator("button").nth(i).textContent();
 if (text === " India")
 {
    await countryDD.locator("button").nth(i).click();
    break;
 }
}
await page.pause();

}
)