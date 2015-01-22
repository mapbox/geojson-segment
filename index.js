module.exports = segment;

/**
 * @alias segment
 *
 * Given a [GeoJSON](http://geojson.org/) produced by [toGeoJSON](https://github.com/mapbox/togeojson)
 * from GPX, split LineString geometries into two-vertex linestrings with properties
 * of heartRate and time before & after.
 * @param {Object} geojson a GeoJSON FeatureCollection object output by toGeoJSON
 * @returns {Object} a GeoJSON FeatureCollection of two-vertex linestrings
 */
function segment(geojson) {
    var segments = [];
    geojson.features.forEach(function(f) {
        if (f.geometry && f.geometry.type === 'LineString') {
            var coords = f.geometry.coordinates;
            if (f.properties.coordTimes ||
                f.properties.heartRates) {
                var heartRates = f.properties.heartRates,
                    coordTimes = f.properties.coordTimes;
                for (var i = 0; i < coords.length - 1; i++) {
                    segments.push({
                        type: 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates: [coords[i], coords[i + 1]]
                        },
                        properties: {
                            heartRates: coordTimes && [heartRates[i], heartRates[i + 1]],
                            coordTimes: coordTimes && [coordTimes[i], coordTimes[i + 1]],
                        }
                    });
                }
            }
        }
    });
    return {
        type: 'FeatureCollection',
        features: segments
    };
}
