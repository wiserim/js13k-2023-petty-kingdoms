const fs = require('fs');
const path = require('path');
const { minify } = require('html-minifier-terser');

async function start() {
    let template = fs.readFileSync(path.resolve(__dirname, './template.html'), 'utf8');
    let script = fs.readFileSync(path.resolve(__dirname, '../tmp/script.min.roadrolled.js'), 'utf8');
    let html = template.replace('{{ script }}', script);

    const result = await minify(html, {
        collapseBooleanAttributes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        removeComments: true,
        removeAttributeQuotes: true
    });

    fs.writeFileSync(path.resolve(__dirname, '../build/index.html'), result, 'utf8');
    console.log('HTML build done');
}

start()
