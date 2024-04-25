import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'interface_';
const categoryColor = '#78573a';

function register() {
    registerBlock(`${categoryPrefix}definepage`, {
        message0: 'new page with id %1 and content %2 %3',
        args0: [
        {
            "type": "field_input",
            "name": "ID",
            "text": "page1",
            "spellcheck": false
        },
        {
            "type": "input_dummy"
        },
        {
            "type": "input_statement",
            "name": "BLOCKS"
        }],
        inputsInline: false,
        colour: categoryColor,
    }, (block) => {
        const BLOCKS = javascriptGenerator.statementToCode(block, 'BLOCKS');
        const ID = toPageName(block.getFieldValue('ID'));
        const code = `const ${ID} = document.createElement("eaglerpage");
        ${ID}.id = ${ID};
        ${ID}.innerHTML = \`${BLOCKS}\`;`;
        return code;
    });
    registerBlock(`${categoryPrefix}showpage`, {
        message0: 'show page with id %1',
        args0: [
        {
            "type": "field_input",
            "name": "ID2",
            "text": "page1",
            "spellcheck": false
        }],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: categoryColor
    }, (block) => {
        const ID = toPageName(block.getFieldValue('ID2'));
        const code = `document.body.appendChild(${ID});`;
        return code;
    });

    registerBlock(`${categoryPrefix}hidepage`, {
        message0: 'hide page with id %1',
        args0: [
        {
            "type": "field_input",
            "name": "ID3",
            "text": "page1",
            "spellcheck": false
        }],
        inputsInline: true,
        previousStatement: null,
        nextStatement: null,
        colour: categoryColor
    }, (block) => {
        const ID = toPageName(block.getFieldValue('ID3'));
        const code = `document.getElementById(${ID}).remove();`;
        return code;
    })

    function toPageName(name) {
        let Pagename = name.replaceAll(' ', '');
        return ("page" + Pagename.charAt(0).toUpperCase() + Pagename.slice(1));
    }

    registerBlock(`${categoryPrefix}currentscreen`, {
        message0: 'current screen %1',
        args0: [{
            "type": "field_dropdown",
            "name": "MENU",
            "options": [
                [ "name", "name" ],
                [ "ID", "ID" ],
            ]
        }],
        output: "String",
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const MENU = block.getFieldValue('MENU');
        let code = "";
        if (MENU === "ID") {
            code = `ModAPI.currentScreen()`
        } else if (MENU === "name") {
            code = `ModAPI.currentScreen().substring(ModAPI.currentScreen().lastIndexOf(".")+1, ModAPI.currentScreen().lastIndexOf("@"))`
        }
        return [code, javascriptGenerator.ORDER_ATOMIC];
    })
}

export default register;
