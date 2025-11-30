const {test,expect}=require('@playwright/test')

test('Search Product dynamically',async ({page})=>
{
const productName = "ADIDAS ORIGINAL";
const products =page.locator(".card-body");
await page.goto("https://rahulshettyacademy.com/client");
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

}
)