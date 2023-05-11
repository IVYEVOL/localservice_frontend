import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useJsApiLoader } from '@react-google-maps/api';
import React from 'react'
import Geocode from "react-geocode";
import { useEffect, useState } from 'react';


const containerStyle = {
    width: '400px',
    height: '400px'
};




interface Service {
    key: number;
    ID: number;
    title: string;
    prices: number;
    city: string;
    description: string;
    address: string;
    category: string;
    photos: string;
    Status: string;
    CreatedAt: string;
    UpdatedAt: string;
    DeletedAt: string | null;
    areas_coverd: number;
    availibility: string;
    longitude_latitude: string;
    mobile: string;
    user_id: number;
}

interface ServiceMapProps {
    serviceMap: Service;
}



const ServiceMap: React.FC<ServiceMapProps> = ({ serviceMap }) => {
    console.log("serviceMap")
    console.log(serviceMap.longitude_latitude)

    const [center, setCenter] = useState({
        lat: 51.4650696,
        lng: -0.2236411,
    });

    useEffect(() => {
        const coordinates = serviceMap.longitude_latitude;
        const [latt, lngg] = coordinates.split(", ");
        setCenter({
            lat: parseFloat(latt),
            lng: parseFloat(lngg),
        });
    }, [serviceMap.longitude_latitude]);

    return (
        <div style={{ position: 'fixed', top: '100px', right: '100px' }}>
            <LoadScript
                googleMapsApiKey="AIzaSyCkT6rPwlprpK8qnwG4SMnnloCsp7NcJkk"
                language="en"
            >
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={12}
                >
                    <Marker
                        position={center}
                    />
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default ServiceMap;
