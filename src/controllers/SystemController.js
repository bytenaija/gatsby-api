//const axios = require('axios');

var distance = require('google-distance-matrix');
distance.key('AIzaSyBk2blfsVOf_t1Z5st7DapecOwAHSQTi4U');

exports.calculateDistance = (origins, addresses) => {

    /* listAddresses = ''
    for (let address of addresses) {
        listAddresses += address.latitude + ',' + address.longitude + ';'
    } */
    /* listAddresses = listAddresses.slice(0, listAddresses.length - 1);
    baseAddress = base.latitude + "," + base.longitude + ";";
    axios.get(`http://router.project-osrm.org/route/v1/driving/${baseAddress}${listAddresses}?overview=false`)
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.log(err)
        }) */
    var destinations = [];

    for (let address of addresses) {
        console.log(address)
        destinations.push(address.latitude + ',' + address.longitude);
    }


    console.log(destinations);
    let totalDistance = 0;

    distance.matrix(origins, destinations, function(err, distances) {
        if (!err)
        // console.dir(distances);
            for (let distanceElements of distances.rows) {
            for (let i = 0; i < distanceElements.elements.length; i++) {
                totalDistance += distanceElements.elements[i].distance.value;
            }



        }
        return (totalDistance / 1000)
    })


}