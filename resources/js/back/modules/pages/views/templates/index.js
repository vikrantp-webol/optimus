const templateFiles = require.context('.', false, /\.vue$/);
let templates = {};

templateFiles.keys().forEach(file => {
    if (file === './index.js') {
        return;
    }

    templates[`Template${file.replace(/(\.\/|\.vue)/g, '')}`] = templateFiles(file).default;
});

export default templates;
