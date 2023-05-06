
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';
import React from 'react'
import Geocode from "react-geocode";
import { useEffect, useState } from 'react';


const containerStyle = {
    width: '400px',
    height: '400px'
};


const center = {
    lat: 51.4650696,
    lng: -0.2236411,
};

const ServiceMap = () => {
    const postcode = "SW15 1QL"; // 英国邮编
    const [lat, setLat] = useState(0);
    const [lng, setLng] = useState(0);

    useEffect(() => {
        Geocode.setApiKey("AIzaSyCkT6rPwlprpK8qnwG4SMnnloCsp7NcJkk");
        Geocode.fromAddress(postcode).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                setLat(lat);
                setLng(lng);
            },
            error => {
                console.error(error);
            }
        );
    }, [postcode]);

    return (
        <div style={{ position: 'fixed', top: '100px', right: '100px' }}>
            <LoadScript
                googleMapsApiKey="AIzaSyCkT6rPwlprpK8qnwG4SMnnloCsp7NcJkk"
                language="en"
                libraries={["places"]}
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {/* <Marker
                        position={{ lat: 51.4650696, lng: -0.2236411 }}
                    /> */}

                    <Marker position={{ lat, lng }} />
                </GoogleMap>

            </LoadScript>
        </div>
    )
}

export default ServiceMap

