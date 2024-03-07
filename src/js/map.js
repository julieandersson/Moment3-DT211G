/* Hämtar karta från OpenLayers */

"use strict";

var attribution = new ol.control.Attribution({
    collapsible: false
});

var map = new ol.Map({
    controls: ol.control.defaults({attribution: false}).extend([attribution]),
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM({
                url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png',
                attributions: [ ol.source.OSM.ATTRIBUTION, 'Tiles courtesy of <a href="https://geo6.be/">GEO-6</a>' ],
                maxZoom: 18
            })
        })
    ],
    target: 'map',
    view: new ol.View({
        center: ol.proj.fromLonLat([18.063240, 59.334591]),
        maxZoom: 18,
        zoom: 12
    })
});

/* Markör för användarens position */
var marker = new ol.Overlay({
    positioning: 'center-center',
    element: document.createElement('div'),
    stopEvent: false
});

/* lägger till marköroverlayen till kartan */
map.addOverlay(marker);

/* Funktion för att centrera kartan på användarens plats */
function centerMapOnUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var userPosition = ol.proj.fromLonLat([position.coords.longitude, position.coords.latitude]);
            map.getView().setCenter(userPosition);

            /* Skapa en markör för användarens position */
            var markerElement = marker.getElement();
            markerElement.className = 'user-marker';
            /* Flytta markören till användarens position på kartan */
            marker.setPosition(userPosition); 
        });
    } else {
        console.error('Geolocation stöds inte av den här webbläsaren.');
    }
}

/* hämtar funktionen för att centrera kartan på användarens plats */
centerMapOnUserLocation();

/* Funktion för platssökning med Nominatim API */
async function searchPlace(query) {
    try {
        
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
        const data = await response.json();

        /* Kontrollera om platsen finns */
        if (data && data.length > 0) {
            
            const latitude = parseFloat(data[0].lat);
            const longitude = parseFloat(data[0].lon);
            return [longitude, latitude];
        } else {
            console.error('Inga resultat hittades för sökningen.');
            return null;
        }
        
    } catch (error) {
        console.error('Fel uppstod vid sökning:', error);
        return null;
    }
}