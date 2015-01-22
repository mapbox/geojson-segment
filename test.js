var test = require('tape'),
    segment = require('./'),
    fs = require('fs');

test('geojson-segment', function(t) {
    fixtureEqual(t, 'fixture/run.geojson');
    t.end();
});

function fixtureEqual(t, file) {
    if (process.env.UPDATE) {
        var output = segment(JSON.parse(fs.readFileSync(file)));
        fs.writeFileSync(file + '.segment.geojson', JSON.stringify(output, null, 4));
    }

    t.deepEqual(
        segment(JSON.parse(fs.readFileSync(file, 'utf8'))),
        JSON.parse(fs.readFileSync(file + '.segment.geojson', 'utf8')),
        file);
}
