import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'variable_';
const categoryColor = '#FF8C1A';

function register() {
        registerBlock(`${categoryPrefix}definevar`, {
        message0: 'define new variable called %1',
        args0: [
            {
                "type": "field_input",
                "name": "NAME",
                "checks": "String"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        return [`var ${NAME}`, javascriptGenerator.ORDER_ATOMIC];
    })
    // set variable
    registerBlock(`${categoryPrefix}set`, {
        message0: 'set value of variable %1 to %2',
        args0: [
            {
                "type": "field_input",
                "name": "NAME",
                "checks": "String"
            },
            {
                "type": "input_value",
                "name": "VAR"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        const VAR = javascriptGenerator.valueToCode(block, 'VAR', javascriptGenerator.ORDER_ATOMIC);
        const code = `${NAME || '""'} = ${VAR || '""'}`;
        return `${code}\n`;
    })

    // get variable
    registerBlock(`${categoryPrefix}get`, {
        message0: 'get variable %1',
        args0: [
            {
                "type": "field_input",
                "name": "NAME",
                "checks": "String"
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        return [`${NAME}`, javascriptGenerator.ORDER_ATOMIC];
    })
    // set localStorage
    registerBlock(`${categoryPrefix}setls`, {
        message0: 'set localstorage %1 to %2',
        args0: [
            {
                "type": "input_value",
                "name": "NAME",
                "checks": "String"
            },
            {
                "type": "input_value",
                "name": "VAR"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        const VAR = javascriptGenerator.valueToCode(block, 'VAR', javascriptGenerator.ORDER_ATOMIC);
        const code = `localStorage.setItem(${NAME || '""'}, ${VAR || '""'})`;
        return `${code}\n`;
    })

    // get localStorage
    registerBlock(`${categoryPrefix}getls`, {
        message0: 'get localstorage %1',
        args0: [
            {
                "type": "input_value",
                "name": "NAME",
                "checks": "String"
            }
        ],
        output: null,
        inputsInline: true,
        colour: categoryColor
    }, (block) => {
        const NAME = javascriptGenerator.valueToCode(block, 'NAME', javascriptGenerator.ORDER_ATOMIC);
        return [`localStorage.getItem(${NAME || '""'})`, javascriptGenerator.ORDER_ATOMIC];
    })
}

export default register;
