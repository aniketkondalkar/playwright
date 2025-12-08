const {test,expect}=require('@playwright/test')

test('Search Product dynamically',async ({page})=>
{
const productName = "ADIDAS ORIGINAL";
const products =page.locator(".card-body");
const email = "kondalkar@gmail.com"
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.locator("[type='email']").fill(email);
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
await expect(page.locator(".user__name label")).toHaveText(email);
await page.locator(".action__submit").click();

await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
const orderid = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
console.log(orderid);

await page.locator("button[routerlink*='myorders']").click();
await page.locator("tbody").waitFor();

const rows = await page.locator("tbody tr");

for(let i=0 ; i< await rows.count() ; ++i)
{
const rowOrderID = await rows.nth(i).locator("th").textContent();
if (orderid.includes(rowOrderID))
{
    await  rows.nth(i).locator("button").first().click();
    break;
}
}
const OrderIDDetails = await page.locator(".col-text").textContent();
expect(orderid.includes(OrderIDDetails)).toBeTruthy();

}
)