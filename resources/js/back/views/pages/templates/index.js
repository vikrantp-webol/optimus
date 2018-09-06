const templateFiles = require.context('.', false, /\.vue$/);
let templates = {};

files.keys().forEach(key => {
    if (key === './index.js') {
        return;
    }

    templates[key.replace(/(\.\/|\.vue)/g, '')] = templateFiles(key);
});

export default templates;
