import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'display_';
const categoryColor = '#f73030';

function register() {
    registerBlock(`${categoryPrefix}displaychattext`, {
        message0: 'display %1 in chat',
        args0: [
            {
                "type": "input_value",
                "name": "TEXT1"
            }
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const TEXT1 = javascriptGenerator.valueToCode(block, 'TEXT1', javascriptGenerator.ORDER_ATOMIC);
        const code = `ModAPI.displayToChat({msg: ${TEXT1}});`;
        return `${code}\n`;
    })
}

export default register;
