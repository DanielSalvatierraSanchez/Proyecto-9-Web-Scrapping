const puppeteer = require('puppeteer')

const scrapper = async (url) => {
    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: false
    })

    const page = await browser.newPage()
    await page.goto(url)

    await page.waitForSelector('#didomi-notice-agree-button')
    await page.click('#didomi-notice-agree-button')

    await page.type('input.svelte-kdenn7', 'zapatillas')
    await page.click('button.svelte-kdenn7')
    
    await nextPage(page, browser)
}
    
    const nextPage = async (page, browser) => {
        await page.waitForSelector('button.vtmn-btn.vtmn-btn_variant--primary.vtmn-btn_size--small.vtmn-btn--icon-alone.vtmn-m-3 > span.vtmx-chevron-right-fill')
        if (nextPage) {
        await page.click('button.vtmn-btn.vtmn-btn_variant--primary.vtmn-btn_size--small.vtmn-btn--icon-alone.vtmn-m-3 > span.vtmx-chevron-right-fill')
        await nextPage(page)
    } else {
        await browser.close()
    }
}
    /*
    const allArticles = []
    console.log(allArticles)
    
    await store(page, allArticles)*/

/*
const store = async (page, allArticles) => {
    const allDivsOfArticles = await page.$$('div.relative.h-full.w-full')

    for (const product of allDivsOfArticles) {
        let image
        let name
        let price

        const imageOfArticle = await product.$(
            'a.aspect-square.flex.flex-col.items-center.justify-between.relative > img'
        )
        if (imageOfArticle) {
            image = await imageOfArticle.evaluate((image) => image.src)
        }
        /*
        const nameOfArticle = await product.$('span.inline-flex.items-center.text-start.font-bold.text-gray-950.line-clamp-2.font-primary.group-hover:underline.leading-6.tracking-tighter.sm:text-lg')
        if (nameOfArticle) {
            name = await nameOfArticle.evaluate((name) => name.textContent.trim())
            console.log(name)
        }*/
/*
        const priceOfArticle = await product.$(
            'span.font-bold.text-gray-950.text-base.tracking-normal'
        )
        if (priceOfArticle) {
            price = await priceOfArticle.evaluate((price) =>
                price.textContent.trim()
            )
        }

        const articleData = {
            image,
            price
        }
        console.log(articleData);
        

        allArticles.push(articleData)
    }*/


scrapper('https://www.decathlon.es/es/')
