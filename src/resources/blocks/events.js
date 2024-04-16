import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'events_';
const categoryColor = '#FFBF00';

function register() {
    registerBlock(`${categoryPrefix}modload`, {
        message0: 'when mod loaded do %1 %2',
        args0: [
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "BLOCKS"
        }],
        inputsInline: true,
        colour: categoryColor,
        //helpUrl: "#fullscreen",
    }, (block) => {
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        return `${BLOCKS.indexOf('await') > -1 ? 'async' : ''} function onload() {\n${BLOCKS}}`;
    })

    registerBlock(`${categoryPrefix}eachTicks`, {
        message0: 'every in game ticks do %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `ModAPI.addEventListener("update", () => { ${BLOCKS} });`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}gui`, {
        message0: 'when Mod Manager opens do %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `ModAPI.addEventListener("gui", () => { ${BLOCKS} });`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}load`, {
        message0: 'after every mod finishes loading do %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `ModAPI.addEventListener("load", () => { ${BLOCKS} });`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}frame`, {
        message0: 'every frame do %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `ModAPI.addEventListener("frame", () => { ${BLOCKS} });`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}drawhud`, {
        message0: 'when HUD is drawn to screen do %1 %2',
        args0: [
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `ModAPI.addEventListener("drawhud", () => { ${BLOCKS} });`;
        return `${code}\n`;
    })

    // setInterval
    registerBlock(`${categoryPrefix}interval`, {
        message0: 'every %1 seconds do %2 %3',
        args0: [
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const TIME = javascriptGenerator.valueToCode(block, 'TIME', javascriptGenerator.ORDER_ATOMIC);
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `setInterval(async () => { ${BLOCKS} }, (${TIME} * 1000));`;
        return `${code}\n`;
    })


    registerBlock(`${categoryPrefix}timeout`, {
        message0: 'in %1 seconds do %2 %3',
        args0: [
            {
                "type": "input_value",
                "name": "TIME",
                "check": "Number"
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const TIME = javascriptGenerator.valueToCode(block, 'TIME', javascriptGenerator.ORDER_ATOMIC);
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `setTimeout(async () => { ${BLOCKS} }, (${TIME} * 1000));`;
        return `${code}\n`;
    })
}

export default register;
