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

    registerBlock(`${categoryPrefix}whenkeypressed`, {
        message0: 'when %1 key is pressed %2 %3',
        args0: [
            {
                "type": "field_dropdown",
                "name": "KEY",
                "options": keyBoard
            },
            {
                "type": "input_dummy"
            },
            {
                "type": "input_statement",
                "name": "BLOCKS"
            }
        ],
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const KEY = block.getFieldValue('KEY')
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `document.addEventListener("keypress", event => {
            ${KEY===""?`${BLOCKS}`:`if (event.key == '${KEY}') { ${BLOCKS}}`}});`;
        return `${code}\n`;
    })
}

const keyBoard = [
    ["ANY", ""],
    ["SPACE", "32"],
    ["UP ARROW", "38"],
    ["DOWN ARROW", "40"],
    ["LEFT ARROW", "37"],
    ["RIGHT ARROW", "39"],
    ["A", "65"],
    ["B", "66"],
    ["C", "67"],
    ["D", "68"],
    ["E", "69"],
    ["F", "70"],
    ["G", "71"],
    ["H", "72"],
    ["I", "73"],
    ["J", "74"],
    ["K", "75"],
    ["L", "76"],
    ["M", "77"],
    ["N", "78"],
    ["O", "79"],
    ["P", "80"],
    ["Q", "81"],
    ["R", "82"],
    ["S", "83"],
    ["T", "84"],
    ["U", "85"],
    ["V", "86"],
    ["W", "87"],
    ["X", "88"],
    ["Y", "89"],
    ["Z", "90"],
    ["0", "48"],
    ["1", "49"],
    ["2", "50"],
    ["3", "51"],
    ["4", "52"],
    ["5", "53"],
    ["6", "54"],
    ["7", "55"],
    ["8", "56"],
    ["9", "57"],
    ["F1", "112"],
    ["F2", "113"],
    ["F3", "114"],
    ["F4", "115"],
    ["F5", "116"],
    ["F6", "117"],
    ["F7", "118"],
    ["F8", "119"],
    ["F9", "120"],
    ["F10", "121"],
    ["F11", "122"],
    ["F12", "123"],
];

export default register;
