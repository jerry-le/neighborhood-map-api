// Raw data
// TODO: Replace with API
var data = [
    {
        position: {lat: 21.022936, lng: 105.804776},
        name: 'Ha Noi',
        visible: true
    },
    {
        position: {lat: 10.755639, lng: 106.1347002},
        name: 'Ho Chi Minh city',
        visible: true
    },
    {
        name: "Phu Quoc",
        position: {lat: 10.289879, lng: 103.98401999999999},
        visible: false
    },
    {
        name: "Phong Nha",
        position: {lat: 17.5911277, lng: 106.28334689999997},
        visible: true
    },
    {
        name: "Hue",
        position: {lat: 16.4498, lng: 107.5623501},
        visible: true
    }
];


// Model
/**
 *
 * @param data: a dictionary including fields of a place: `name` is name
 * of place, `position` (lat, long) on map, is this `visible` on our map.
 * @param map: Map instance
 * @constructor
 */
function Place(data, map) {
    var self = this;
    this.position = ko.observable(data.position);
    this.name = ko.observable(data.name);
    this.visible = ko.observable(data.visible);
    this.map = ko.observable(map);
    this.marker = null;
    this.indexName = ko.computed(function () {
        return self.name().replace(' ', '').toLowerCase();
    });
    this.infoWindow = ko.observable(
        new google.maps.InfoWindow({content: ''})
    );

    this.setMarker = function (marker) {
        self.marker = ko.observable(marker);
        self.marker().addListener('click', self.popUpInfoWindow);
    };

    this.animate = function () {
        if (self.marker().getAnimation() !== null) {
            self.marker().setAnimation(null);
        } else {
            self.marker().setAnimation(google.maps.Animation.BOUNCE);
        }
    };

    this.popUpInfoWindow = function () {
        var content = "<h3 style='color: black;'>Say hi!</h3>";
        if (self.infoWindow().getMap()) {
            self.infoWindow().close();
        } else {
            self.infoWindow().setContent(content);
            self.infoWindow().open(self.map(), self.marker());
        }
    }
}

// ViewModel
function AppViewModel(map) {
    var self = this;
    this.map = ko.observable(map);
    this.places = ko.observableArray([]);
    this.searchContent = ko.observable('');
    this.indexSearchContent = ko.computed(function () {
        return self.searchContent().replace(' ', '').toLowerCase().trim();
    });

    // read data and create observable array
    for (var i = 0; i < data.length; i++) {
        var place = new Place(data[i], self.map());
        self.places.push(place);
    }

    // init map
    for (var i = 0; i < this.places().length; i++) {
        var place = this.places()[i];
        if (place.visible()) {
            var marker = new google.maps.Marker({
                position: place.position(),
                animation: google.maps.Animation.DROP,
                map: this.map(),
                title: place.name()
            });
            place.setMarker(marker);
        }
    }

    this.searchPlace = function (place, event) {
        if (event.key === 'Enter') {
            console.log(self.searchContent());
            self.places().forEach(function (place) {
                if (place.indexName().includes(self.indexSearchContent())) {
                    place.visible(true);
                } else {
                    place.visible(false);
                }
            });
        }
        return true; // allow proceed other bindings
    }
}

// entry point, callback function after get allow from Google Map API
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 16.2886177, lng: 106.1792378},
        zoom: 6
    });
    ko.applyBindings(new AppViewModel(map));
}
