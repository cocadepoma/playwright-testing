const inquirer = require('inquirer');
require('colors');

const inquirerQuestions = [
    {
        type: 'list',
        name: 'option',
        message: 'Hi! What you wanna do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Find by Text.`
            },
            {
                value: 2,
                name: `${'2.'.green} Find by Attribute and its content.`
            },
            {
                value: 3,
                name: `${'3.'.green} Auto Script.`
            },
            {
                value: 0,
                name: `${'0.'.green} Exit.`
            },
        ]
    }
]

const inquirerInit = async () => {
    console.clear();
    console.log('=========================='.green);
    console.log('    Choose and option'.white);
    console.log('==========================\n'.green);

    const { option } = await inquirer.prompt(inquirerQuestions);

    return option;
}

const pause = async () => {

    const question = [{
        type: 'input',
        name: 'enter',
        message: `Press ${'Enter'.green} to continue`,
    }];

    console.log(`\n`);

    await inquirer.prompt(question);

}

const readInput = async (message) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if (value.length === 0) {
                    return 'Please, you must insert a text';
                }
                return true;
            }

        }
    ];

    const { desc } = await inquirer.prompt(question);

    return desc;
}

module.exports = {
    inquirerInit,
    pause,
    readInput,
}