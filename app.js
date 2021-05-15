
const { chromium } = require('playwright');

const { inquirerInit, readInput, pause, } = require('./helpers/inquirer.helpers');
const { findByAttr, findByText } = require('./helpers/find.helpers');
require('colors');


// Create the instance of playwright
const createPage = async () => {

    // Browser initializitation
    const browser = await chromium.launch({ headless: false, slowMo: 50 });
    const context = await browser.newContext();
    const page = await context.newPage();

    return { page, context };
}

// Main Program
const main = async () => {

    console.clear();
    let option;

    // Infinite for loop until option 0 is chosed
    for (; ;) {

        option = await inquirerInit();

        // This exception is to prevent the init of the playwright instance
        // when the option 0 is selected
        if (option === 0) {
            console.log('Good bye!'.red);
            process.exit(0);
        }


        const { page, context } = await createPage();
        const url = 'https://web.gencat.cat/ca/inici';
        // Go to URL
        await page.goto(url);

        switch (option) {

            case 1:

                // Wait for text input
                const text = await readInput('Text: ');

                // Find the text
                await findByText(page, text);
                break;

            case 2:

                const attr = await readInput('Type the attribute: ');
                const textToFind = await readInput('Type the content of the attribute: ');

                // Find the text
                await findByAttr(page, attr, textToFind);
                break;

            case 3:

                // Find the text
                await findByText(page, 'Agenda cultural');

                // Find the input to fill, and the submit to click it
                const submitExists = await findByAttr(page, "aria-label", 'Cercar');
                const inputExists = await findByAttr(page, "title", 'Cercador');

                if (submitExists && inputExists) {
                    await page.fill('input[title="Cercador"]', 'informaciò pública');
                    await page.click('input[aria-label="Cercar"]');
                    console.log('\nClicking... please wait!!'.yellow);
                } else {
                    console.log('\nThere is no button to click!'.red);
                }
                break;

        }

        if (option !== 0) {
            await pause();
            context.close();
        }
    }
}
main();
