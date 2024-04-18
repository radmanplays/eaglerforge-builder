import javascriptGenerator from '../javascriptGenerator';

class Compiler {
    /**
     * Generates JavaScript code from the provided workspace & info.
     * @param {Blockly.Workspace} workspace 
     * @param {object} extensionMetadata 
     * @param {object} imageStates 
     * @returns {string} Generated code.
     */
    compile(workspace, extensionMetadata, imageStates) {
        const code = javascriptGenerator.workspaceToCode(workspace);
        let start = '';
        if (code.indexOf('ModAPI.player') > -1) {
            start+= "ModAPI.require('player');";
        }
        if (code.indexOf('sendData(') > -1) {
            start+= `function sendData(message,url) {
    var request = new XMLHttpRequest();
    request.open("POST", url);
    request.setRequestHeader("Content-type", "application/json");

    var params = {
        content: message
    };

    request.send(JSON.stringify(params));
}`;
        }
        if (code.indexOf('variables[') > -1) {
            start+= 'let variables = [];';
        }
        if (code.indexOf('pressedKeys[') > -1) {
            start+= `var pressedKeys = {};
            window.onkeyup = function(e) { pressedKeys[e.keyCode] = false; }
            window.onkeydown = function(e) { pressedKeys[e.keyCode] = true; }`;
        }
        if (code.indexOf('function onload() {') > -1) {
            start+= 'onload();';
        }
        const headerCode = start;
        const classRegistry = {
            top: [],
            extensionInfo: {},
            bottom: [
            ]
        }
        const footerCode = [];

        if (imageStates) {
            if (imageStates.icon.image) {
                // add icon uri
                const url = imageStates.icon.image;
                classRegistry.extensionInfo.blockIconURI = url;
            }
            if (imageStates.menuicon.image) {
                // add icon uri
                const url = imageStates.menuicon.image;
                classRegistry.extensionInfo.menuIconURI = url;
            }
        }
        if (extensionMetadata) {
            classRegistry.extensionInfo.id = extensionMetadata.id;
            classRegistry.extensionInfo.name = extensionMetadata.name;
            if (extensionMetadata.docsURL) {
                classRegistry.extensionInfo.docsURI = extensionMetadata.docsURL;
            }
            if (extensionMetadata.color1) {
                classRegistry.extensionInfo.color1 = extensionMetadata.color1;
            }
            if (extensionMetadata.color2) {
                classRegistry.extensionInfo.color2 = extensionMetadata.color2;
            }
            if (extensionMetadata.color3) {
                classRegistry.extensionInfo.color3 = extensionMetadata.color3;
            }
            if (extensionMetadata.tbShow) {
                classRegistry.extensionInfo.tbShow = extensionMetadata.tbShow;
            }
        }

        return [].concat(headerCode, classRegistry.top, [], classRegistry.bottom, code, footerCode).join('\n');
    }
}

export default Compiler;
