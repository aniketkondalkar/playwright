const {test,expect}=require('@playwright/test')

test('Browser context test',async ({browser})=>
{
const context=await browser.newContext();
const page = await context.newPage();
const username = page.locator('input#username');
const password = page.locator("[type='password']");
const signIn = page.locator('input#signInBtn');
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
console.log(await page.title());
await username.fill("rahulshetty");
await password.fill("learning");
await signIn.click();
console.log(await page.locator("[style*='block']").textContent());
await expect(page.locator("[style*='block']")).toContainText("Incorrect");
// valid test
await username.fill("rahulshettyacademy");
await signIn.click();

console.log(await page.locator('.card-body a').first().textContent());
console.log(await page.locator('.card-body a').nth(1).textContent());



}
);

test('Page plawright tet',async ({page})=>
{

await page.goto("https://google.com/");
console.log(await page.title());
await expect(page).toHaveTitle("Google");

}
);