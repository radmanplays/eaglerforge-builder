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
        return [`(ModAPI.player?ModAPI.player.lastReportedPos${MENU}:"")`, javascriptGenerator.ORDER_ATOMIC];
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
}

export default register;
