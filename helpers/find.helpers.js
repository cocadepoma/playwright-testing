// Find one node by its text node
const findByText = async (page, text) => {

    const testAttribute = `text=${text}`;
    const item = await page.$(testAttribute);

    if (!item) {
        console.log(`The text: ${text.green} is not at the DOM!`);
        return false;
    } else {
        console.log(`Gratulations, The text: ${text.green} is at the DOM!`);
        return true;
    }

}

// Only will find 1 node with the attribute and text provided
// if the is more than one node with the same caracteristics, won't get it
const findByAttr = async (page, attr, text) => {

    const nodeToFind = `[${attr}="${text}"]`;
    const item = await page.$(nodeToFind);

    if (!item) {
        console.log(`The node with the content: ${text.green} is not at the DOM!`);
        return false;
    } else {
        console.log(`Grats! The node with the content: ${text.green} is at the DOM!`);
        return true;
    }

}

module.exports = {
    findByText,
    findByAttr
}