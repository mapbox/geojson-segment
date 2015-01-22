# geojson-segment

[![build status](https://secure.travis-ci.org/mapbox/geojson-segment.png)](http://travis-ci.org/mapbox/geojson-segment)

Given a [GeoJSON](http://geojson.org/) produced by [toGeoJSON](https://github.com/mapbox/togeojson)
from GPX, split LineString geometries into two-vertex linestrings with properties
of heartRate and time before & after.
