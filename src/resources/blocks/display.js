import javascriptGenerator from '../javascriptGenerator';
import registerBlock from '../register';

const categoryPrefix = 'display_';
const categoryColor = '#f73030';

function register() {
    registerBlock(`${categoryPrefix}displaychattext`, {
        message0: 'display %1 in chat',
        args0: [
            {
                "type": "field_input",
                "name": "TEXT1",
                "text": "hello world",
                "spellcheck": false
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const TEXT1 = block.getFieldValue('TEXT1')
        const code = `ModAPI.displayToChat({msg: \`${TEXT1}\`});`;
        return `${code}\n`;
    })
}

export default register;
