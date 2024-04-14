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
    registerBlock(`${categoryPrefix}startsound`, {
        message0: 'start sound %1',
        args0: [
            {
                "type": "field_input",
                "name": "SOUND",
                "text": "https://t.ly/2gHlM",
                "spellcheck": false
            },
        ],
        previousStatement: null,
        nextStatement: null,
        inputsInline: true,
        colour: categoryColor,
    }, (block) => {
        const SOUND = block.getFieldValue('SOUND')
        const code = `new Audio(\`${SOUND}\`).play();`;
        return `${code}\n`;
    })
}

export default register;
