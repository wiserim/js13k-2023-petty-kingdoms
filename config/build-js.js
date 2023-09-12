const fs = require('fs');
const path = require('path');
const concat = require('concat-files');
const { minify } = require('terser');
const { Packer } = require('roadroller');

function concatJs(callback) {
    concat([
        './js/math.js',
        './js/dom.js',
        './js/ui.js',
        './js/region.js',
        './js/player.js',
        './js/ai.js',
        './js/map.js',
        './js/region-management.js',
        './js/game.js',
        './js/variables.js',
        './js/init.js',
    ], './tmp/script.js', function(err) {
        if (err) {
            throw err
        }
        console.log('concat js done');
        
        if(callback) {
            callback();
        }
    });
}

async function minifyJs(callback) {
    //minify files
    var options = {
        mangle: {
            toplevel: true,
        },
        nameCache: {}
    };

    const result = await minify({"foo.js" : fs.readFileSync(path.resolve(__dirname, '../tmp/script.js'), 'utf8')});
    await fs.writeFileSync(path.resolve(__dirname, '../tmp/script.min.js'), result.code, 'utf8');
    console.log('minify js done');
    if(callback) {
        callback();
    }
}

async function roadrollJs() {
    const inputs = [
        {
            data: fs.readFileSync(path.resolve(__dirname, '../tmp/script.min.js'), 'utf8'),
            type: 'js',
            action: 'eval',
        },
    ];

    const options = {
        // see the Usage for available options.
    };

    const packer = new Packer(inputs, options);
    await packer.optimize(); // takes less than 10 seconds by default
    
    const { firstLine, secondLine } = packer.makeDecoder();
    await fs.writeFileSync(path.resolve(__dirname, '../tmp/script.min.roadrolled.js'), firstLine + secondLine, 'utf8');
    console.log('roadroll js done');
}

async function start() {
    concatJs(() => {
        minifyJs(roadrollJs)
    });
}

start()
