var ApiUtils = {
    getPlace: function (position, map, type) {
        return new Promise(function (resolve, reject) {
            var locate = new google.maps.LatLng(
                position['lat'],
                position['lng']);
            var request = {
                location: locate,
                radius: '500',
                type: [type]
            };
            var service = new google.maps.places.PlacesService(map);
            service.nearbySearch(request, function (results, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        var place = results[i];
                        console.log(place);
                    }
                    resolve(results);
                }
                resolve(null);
            });
        });
    }
};


