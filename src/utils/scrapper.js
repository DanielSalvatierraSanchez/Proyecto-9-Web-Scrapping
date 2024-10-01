const puppeteer = require('puppeteer')
const fs = require('fs')

const allProducts = []

const scrapper = async (url) => {
    const browser = await puppeteer.launch({
        headless: false
    })

    const page = await browser.newPage()
    await page.goto(url)
    await page.setViewport({ width: 800, height: 600 })

    await page.waitForSelector('.didomi-continue-without-agreeing')
    await page.click('.didomi-continue-without-agreeing')

    await page.type('input.svelte-kdenn7', 'gafas natación')
    await page.click('button.svelte-kdenn7')

    await repeat(page)
    await browser.close()
}

const repeat = async (page) => {
    await page.waitForSelector('div.product-block-top-main')
    const allDivs = await page.$$('div.product-block-top-main')

    for (const product of allDivs) {
        let image = await product.$eval(
            'a.vtmn-absolute.vtmn-top-0.vtmn-left-0.vtmn-h-full.vtmn-w-full > img',
            (image) => image.src
        )
        let name = await product.$eval(
            'h2.vtmn-p-0.vtmn-m-0.vtmn-font-normal.vtmn-overflow-hidden.vtmn-text-ellipsis.vtmn-typo_caption-1.svelte-1l3biyf',
            (name) => name.textContent
        )
        let price = await product.$eval(
            'span.vtmn-price.vtmn-price_size--large',
            (price) => price.textContent.slice(0, price.textContent.length -2)
        )
        price = parseFloat(price.replace(",", "."));
        price = price.toFixed(2)

        if (!image || !name || !price) {
            image = "IMAGEN VACÍA";
            name = "SIN TÍTULO";
            price = "PRECIO NO DISPONIBLE"
        }

        const productData = {
            image,
            name,
            price
        }

        allProducts.push(productData)
        console.log(
            `✅ SE HAN AÑADIDO UN TOTAL DE ${allProducts.length} PRODUCTOS.`
        )
    }

    if (allDivs.length < 40) {
        console.log('✅ NO HAY MÁS PAGINAS')
        fileOfProducts(allProducts)
    } else {
        await nextPage(page, allProducts)
    }
}

const nextPage = async (page, allProducts, retries = 5) => {
    try {
        const nextButton = await page.waitForSelector('button.vtmn-btn.vtmn-btn_variant--primary.vtmn-btn_size--small.vtmn-btn--icon-alone.vtmn-m-3 > span.vtmx-chevron-right-fill')

        if (nextButton) {
            const buttonDisabled = await nextButton.evaluate(
                (span) => span.closest('button').disabled
            )
            if (!buttonDisabled) {
                await nextButton.click()
                await page.waitForSelector('div.product-block-top-main')
                await page.waitForNavigation()
                await repeat(page, allProducts)
            } else {
                console.log('✅ NO HAY MÁS PAGINAS')
                fileOfProducts(allProducts)
            }
        }
    } catch (error) {
        console.log('❌ ERROR DE PAGINACIÓN: ', error)
        if (retries > 0) {
            console.log('🔁 REINTENTANDO...')
            await nextPage(page, allProducts, retries - 1)
        } else {
            console.log('❌ 5 REINTENTOS FALLIDOS')
        }
    }
}

const fileOfProducts = (allProducts) => {
    fs.writeFile('products.json', JSON.stringify(allProducts, null, 4), () => {
        console.log(`✅ ARCHIVO CREADO CON ${allProducts.length} PRODUCTOS.`)
    })
}

module.exports = { scrapper }
