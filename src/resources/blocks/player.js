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
                    [ "X", "x" ],
                    [ "Y", "y" ],
                    [ "Z", "z" ],
                ]
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const MENU = block.getFieldValue('MENU');
        return [`(ModAPI.player?ModAPI.player.${MENU}:"")`, javascriptGenerator.ORDER_ATOMIC];
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
        return [`(ModAPI.player?ModAPI.player.motion${MENU}:"")`, javascriptGenerator.ORDER_ATOMIC];
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

    registerBlock(`${categoryPrefix}setpropertyboolean`, {
        message0: 'set player property %1 to %2',
        args0: [
            {
                "type": "field_dropdown",
                "name": "PROPERTIES",
                "options": [
                    [ "is dead", "isdead" ],
                    [ "is invisible", "isinvisible" ],
                    [ "is in web", "isinweb" ],
                    [ "is sprinting", "issprinting" ],
                    [ "is sneaking", "issneaking" ],
                    [ "is silent", "issilent" ],
                    [ "can edit", "canedit" ],
                ]
            },
            {
                "type": "input_value",
                "name": "BOOLEAN",
                "check": "Boolean"
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const PROPERTY = block.getFieldValue('PROPERTIES');
        let BOOLEAN = javascriptGenerator.valueToCode(block, 'BOOLEAN', javascriptGenerator.ORDER_ATOMIC);
        BOOLEAN = BOOLEAN ? `${Boolean(BOOLEAN)}` : 'false'
        let code;
        if (PROPERTY === "isdead") {
            code = (BOOLEAN==="true"?`ModAPI.player.setDead()`:'');
        } else if (PROPERTY === "isinvisible") {
            code = `ModAPI.player.setInvisible({invisible: ${BOOLEAN}})`
        } else if (PROPERTY === "isinweb") {
            code = `ModAPI.player.setInWeb(${BOOLEAN})`
        } else if (PROPERTY === "issprinting") {
            code = `ModAPI.player.setSprinting({flag: ${BOOLEAN}})`
        } else if (PROPERTY === "issneaking") {
            code = `ModAPI.player.setSneaking({sneaking: ${BOOLEAN}})`
        } else if (PROPERTY === "issilent") {
            code = `ModAPI.player.setSilent({isSilent: ${BOOLEAN}})`
        } else if (PROPERTY === "canedit") {
            code = `ModAPI.player.allowEdit(${BOOLEAN})`
        }
        return code;
    })

    registerBlock(`${categoryPrefix}getpropertyboolean`, {
        message0: "get player property %1",
        args0: [
            {
                "type": "field_dropdown",
                "name": "PROPERTIES",
                "options": [
                    [ "is dead", "isdead" ],
                    [ "is invisible", "isinvisible" ],
                    [ "is in web", "isinweb" ],
                    [ "is sprinting", "issprinting" ],
                    [ "is sneaking", "issneaking" ],
                    [ "is silent", "issilent" ],
                    [ "can edit", "canedit" ],
                    [ "on ground", "onground" ],
                    [ "is moving", "ismoving" ],
                ]
            },
        ],
        output: "Boolean",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const PROPERTY = block.getFieldValue('PROPERTIES');
        let code;
        if (PROPERTY === "isdead") {
            code = 'ModAPI.player.isDead';
        } else if (PROPERTY === "isinvisible") {
            code = `ModAPI.player.isInvisible()`
        } else if (PROPERTY === "isinweb") {
            code = `ModAPI.player.isInWeb`
        } else if (PROPERTY === "issprinting") {
            code = `ModAPI.player.isSprinting()`
        } else if (PROPERTY === "issneaking") {
            code = `ModAPI.player.isSneaking()`
        } else if (PROPERTY === "issilent") {
            code = `ModAPI.player.isSilent()`
        } else if (PROPERTY === "canedit") {
            code = `ModAPI.player.isAllowEdit()`
        } else if (PROPERTY === "onground") {
            code = `ModAPI.player.onGround`
        } else if (PROPERTY === "isdead") {
            code = `ModAPI.player.isDead`
        } else if (PROPERTY === "ismoving") {
            code = `ModAPI.player.isMoving()`
        }
        return code;
    })

    registerBlock(`${categoryPrefix}setpropertynumber`, {
        message0: 'set player property %1 to %2',
        args0: [
            {
                "type": "field_dropdown",
                "name": "PROPERTIES",
                "options": [
                    [ "X position", "xposition"],
                    [ "Y position", "yposition"],
                    [ "Z position", "zposition"],
                    [ "X motion", "Xmotion"],
                    [ "Y motion", "Ymotion"],
                    [ "Z motion", "Zmotion"],
                    [ "food level", "foodLevel" ],
                    [ "food saturation level", "foodSaturationLevel" ],
                    [ "experience", "experience" ],
                    [ "experience level", "experiencelevel" ],
                    [ "walk speed", "walkspeed" ],
                ]
            },
            {
                "type": "input_value",
                "name": "INPUT",
                "check": "Number"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const PROPERTY = block.getFieldValue('PROPERTIES');
        let INPUT = javascriptGenerator.valueToCode(block, 'INPUT', javascriptGenerator.ORDER_ATOMIC);
        if (INPUT == "") {
            INPUT = 0;
        }
        let code;
        if (PROPERTY === "foodLevel") {
            code = `ModAPI.player.setFoodLevel({foodLevelIn: Math.round(${INPUT})})`;
        } else if (PROPERTY === "foodSaturationLevel") {
            code = `ModAPI.player.setFoodSaturationLevel({foodSaturationLevelIn: ${INPUT}})`
        } else if (PROPERTY.indexOf('position') === 1) {
            code = `ModAPI.player.${PROPERTY.charAt(0)} = ${INPUT}`
        } else if (PROPERTY.indexOf('motion') === 1) {
            code = `ModAPI.player.motion${PROPERTY.charAt(0)} = ${INPUT}`
        } else if (PROPERTY === "experience") {
            code = `ModAPI.player.experience = ${INPUT}`;
        } else if (PROPERTY === "experiencelevel") {
            code = `ModAPI.player.experienceLevel = ${INPUT}`;
        } else if (PROPERTY === "walkspeed") {
            code = `ModAPI.player.setSpeed({speed: Math.round(${INPUT})})`;
        }
        return code+';ModAPI.player.reload();';
    })

    registerBlock(`${categoryPrefix}getpropertynumber`, {
        message0: "get player property %1",
        args0: [
            {
                "type": "field_dropdown",
                "name": "PROPERTIES",
                "options": [
                    [ "food level", "foodLevel" ],
                    [ "food saturation level", "foodSaturationLevel" ],
                    [ "experience", "experience" ],
                    [ "experience level", "experiencelevel" ],
                    [ "fall distance", "falldistance" ],
                    [ "total armor protection", "armorprotection" ],
                    [ "walk speed", "walkspeed" ],
                ]
            },
        ],
        output: "Number",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const PROPERTY = block.getFieldValue('PROPERTIES');
        let code;
        if (PROPERTY === "foodLevel") {
            code = 'ModAPI.player.foodStats.foodLevel';
        } else if (PROPERTY === "foodSaturationLevel") {
            code = `ModAPI.player.foodStats.foodSaturationLevel`
        } else if (PROPERTY === "experience") {
            code = `ModAPI.player.experience`
        } else if (PROPERTY === "experiencelevel") {
            code = `ModAPI.player.experienceLevel`
        } else if (PROPERTY === "falldistance") {
            code = `ModAPI.player.fallDistance`
        } else if (PROPERTY === "walkspeed") {
            code = `ModAPI.player.getSpeed()`
        } else if (PROPERTY === "armorprotection") {
            code = `ModAPI.player.getTotalArmorValue()`
        }

        return [code, javascriptGenerator.ORDER_ATOMIC];
    })

    registerBlock(`${categoryPrefix}execommand`, {
        message0: 'execute command %1 as player',
        args0: [
            {
                "type": "input_value",
                "name": "COMMAND"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const COMMAND = javascriptGenerator.valueToCode(block, 'COMMAND', javascriptGenerator.ORDER_ATOMIC);
        const code = `
        if (${COMMAND}.charAt(0)==="/") {
            ModAPI.player.sendChatMessage({message: ${COMMAND}})
        }`;
        return `${code}\n`;
    })

    registerBlock(`${categoryPrefix}sendchat`, {
        message0: 'send %1 message in chat',
        args0: [
            {
                "type": "input_value",
                "name": "COMMAND"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const COMMAND = javascriptGenerator.valueToCode(block, 'COMMAND', javascriptGenerator.ORDER_ATOMIC);
        const code = `
        if (${COMMAND}.charAt(0)!=="/") {
            ModAPI.player.sendChatMessage({message: ${COMMAND}})
        }`;
        return `${code}\n`;
    })
}

export default register;
