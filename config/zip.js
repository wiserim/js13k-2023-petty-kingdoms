const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const output = fs.createWriteStream(path.resolve(__dirname, '../build/js13k-2023.zip'));
const archive = archiver('zip', {
  zlib: { level: 9 }
});

output.on('close', function() {
    console.log('zip done');
    console.log(archive.pointer() + ' total bytes');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

archive.append(fs.createReadStream(path.resolve(__dirname, '../build/index.html')), { name: 'index.html' });
archive.finalize();
