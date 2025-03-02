import React from 'react';
import { Map } from 'react-map-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MyLocation = () => {
    return (
        <div>
            <Map
                initialViewState={{
                    longitude: -122.4,
                    latitude: 37.8,
                    zoom: 14
                }}
                style={{ width: 600, height: 400 }}
                mapStyle="https://api.maptiler.com/maps/streets/style.json?key=ZCgD1QpQADKrMb0KYzKL"
            />
        </div>
    );
};

export default MyLocation;
