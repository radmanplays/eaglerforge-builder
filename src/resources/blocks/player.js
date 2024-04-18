import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'player_';
const categoryColor = '#5468ff';

function register() {
    registerBlock(`${categoryPrefix}ingame`, {
        message0: 'player in game?',
        args0: [],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`ModAPI.player?(ModAPI.player.isPlayer()?true:false):false`, javascriptGenerator.ORDER_ATOMIC];
    })
    registerBlock(`${categoryPrefix}position`, {
        message0: "current %1 position",
        args0: [
            {
                "type": "field_dropdown",
                "name": "MENU",
                "options": [
                    [ "X", "X" ],
                    [ "Y", "Y" ],
                    [ "Z", "Z" ],
                ]
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const MENU = block.getFieldValue('MENU');
        return [`ModAPI.player.${MENU}`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}motion`, {
        message0: "current %1 motion",
        args0: [
            {
                "type": "field_dropdown",
                "name": "MENU",
                "options": [
                    [ "X", "X" ],
                    [ "Y", "Y" ],
                    [ "Z", "Z" ],
                ]
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const MENU = block.getFieldValue('MENU');
        return [`ModAPI.player.motion${MENU}`, javascriptGenerator.ORDER_ATOMIC];
    })
    
    registerBlock(`${categoryPrefix}indimension`, {
        message0: "is user in the %1 dimension",
        args0: [
            {
                "type": "field_dropdown",
                "name": "MENU2",
                "options": [
                    [ "Overworld", "0" ],
                    [ "Nether", "-1" ],
                    [ "End", "1" ],
                ]
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const MENU2 = block.getFieldValue('MENU2');
        return [`ModAPI.player?ModAPI.player.dimension===${MENU2}:""`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}username`, {
        message0: 'username',
        args0: [],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`ModAPI.getProfileName()`, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}whengamekeypressed`, {
        message0: 'when in game key %1 pressed do %2 %3',
        args0: [
            {
                "type": "field_dropdown",
                "name": "MENU3",
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
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const MENU3 = block.getFieldValue('MENU3');
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const code = `ModAPI.addEventListener("key", function(ev){
            if(ev.key == ${MENU3}){${BLOCKS}}});`;
        return `${code}\n`;
    })
    registerBlock(`${categoryPrefix}reload`, {
        message0: 'load new player values into game',
        args0: [],
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        return [`ModAPI.reload`, javascriptGenerator.ORDER_ATOMIC];
    })
}

const keyBoard = [
    ["SPACE", "57"],
    ["UP ARROW", "200"],
    ["DOWN ARROW", "208"],
    ["LEFT ARROW", "203"],
    ["RIGHT ARROW", "205"],
    ["A", "30"],
    ["B", "48"],
    ["C", "46"],
    ["D", "32"],
    ["E", "18"],
    ["F", "33"],
    ["G", "34"],
    ["H", "35"],
    ["I", "23"],
    ["J", "36"],
    ["K", "37"],
    ["L", "38"],
    ["M", "50"],
    ["N", "49"],
    ["O", "24"],
    ["P", "25"],
    ["Q", "16"],
    ["R", "19"],
    ["S", "31"],
    ["T", "20"],
    ["U", "22"],
    ["V", "47"],
    ["W", "17"],
    ["X", "45"],
    ["Y", "21"],
    ["Z", "44"],
    ["0", "11"],
    ["1", "2"],
    ["2", "3"],
    ["3", "4"],
    ["4", "5"],
    ["5", "6"],
    ["6", "7"],
    ["7", "8"],
    ["8", "9"],
    ["9", "10"],
    ["F1", "59"],
    ["F2", "60"],
    ["F3", "61"],
    ["F4", "62"],
    ["F5", "63"],
    ["F6", "64"],
    ["F7", "65"],
    ["F8", "66"],
    ["F9", "67"],
    ["F10", "68"],
    ["F11", "87"],
    ["F12", "88"],
];

export default register;
