import React from "react";
import './customerccss.css'
const MapSearching = () => {
    // function initMap() {
    //     const CONFIGURATION = {
    //       "ctaTitle": "FIND",
    //       "mapOptions": {"center":{"lat":37.4221,"lng":-122.0841},"fullscreenControl":true,"mapTypeControl":false,"streetViewControl":true,"zoom":11,"zoomControl":true,"maxZoom":22,"mapId":""},
    //       "mapsApiKey": "AIzaSyCkT6rPwlprpK8qnwG4SMnnloCsp7NcJkk",
    //       "capabilities": {"addressAutocompleteControl":true,"mapDisplayControl":true,"ctaControl":true}
    //     };
    //     const componentForm = [
    //       'location',
    //       'locality',
    //       'administrative_area_level_1',
    //       'country',
    //       'postal_code',
    //     ];
  
    //     const getFormInputElement = (component) => document.getElementById(component + '-input');
    //     const map = new google.maps.Map(document.getElementById("gmp-map"), {
    //       zoom: CONFIGURATION.mapOptions.zoom,
    //       center: { lat: 37.4221, lng: -122.0841 },
    //       mapTypeControl: false,
    //       fullscreenControl: CONFIGURATION.mapOptions.fullscreenControl,
    //       zoomControl: CONFIGURATION.mapOptions.zoomControl,
    //       streetViewControl: CONFIGURATION.mapOptions.streetViewControl
    //     });
    //     const marker = new google.maps.Marker({map: map, draggable: false});
    //     const autocompleteInput = getFormInputElement('location');
    //     const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
    //       fields: ["address_components", "geometry", "name"],
    //       types: ["address"],
    //     });
    //     autocomplete.addListener('place_changed', function () {
    //       marker.setVisible(false);
    //       const place = autocomplete.getPlace();
    //       if (!place.geometry) {
    //         // User entered the name of a Place that was not suggested and
    //         // pressed the Enter key, or the Place Details request failed.
    //         window.alert('No details available for input: \'' + place.name + '\'');
    //         return;
    //       }
    //       renderAddress(place);
    //       fillInAddress(place);
    //     });
  
    //     function fillInAddress(place) {  // optional parameter
    //       const addressNameFormat = {
    //         'street_number': 'short_name',
    //         'route': 'long_name',
    //         'locality': 'long_name',
    //         'administrative_area_level_1': 'short_name',
    //         'country': 'long_name',
    //         'postal_code': 'short_name',
    //       };
    //       const getAddressComp = function (type) {
    //         for (const component of place.address_components) {
    //           if (component.types[0] === type) {
    //             return component[addressNameFormat[type]];
    //           }
    //         }
    //         return '';
    //       };
    //       getFormInputElement('location').value = getAddressComp('street_number') + ' '
    //                 + getAddressComp('route');
    //       for (const component of componentForm) {
    //         // Location field is handled separately above as it has different logic.
    //         if (component !== 'location') {
    //           getFormInputElement(component).value = getAddressComp(component);
    //         }
    //       }
    //     }
  
    //     function renderAddress(place) {
    //       map.setCenter(place.geometry.location);
    //       marker.setPosition(place.geometry.location);
    //       marker.setVisible(true);
    //     }
    //   }


        return (
            <div>
                <body>
                    <div className="card-container">
                        <div className="panel">
                            <div>
                                <img className="sb-title-icon" src="https://fonts.gstatic.com/s/i/googlematerialicons/location_pin/v5/24px.svg" alt="" />
                                <span className="sb-title">Address Selection</span>
                            </div>
                            <input type="text" placeholder="Address" id="location-input" />
                            <input type="text" placeholder="Apt, Suite, etc (optional)" />
                            <input type="text" placeholder="City" id="locality-input" />
                            <div className="half-input-container">
                                <input type="text" className="half-input" placeholder="State/Province" id="administrative_area_level_1-input" />
                                <input type="text" className="half-input" placeholder="Zip/Postal code" id="postal_code-input" />
                            </div>
                            <input type="text" placeholder="Country" id="country-input" />
                            <button className="button-cta">FIND</button>
                        </div>
                        <div className="map" id="gmp-map"></div>
                    </div>
                    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCkT6rPwlprpK8qnwG4SMnnloCsp7NcJkk&libraries=places&callback=initMap&solution_channel=GMP_QB_addressselection_v1_cABC" async defer></script>
                </body>
            </div>
        )

    }

    export default MapSearching;
