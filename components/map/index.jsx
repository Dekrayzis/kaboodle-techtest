import React, { useState } from "react";
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react";
import styles from "./map.module.scss";

const mapStyles = {
  width: "100%",
  height: "100%",
};

const MapWrapper = (props) => {

  const {location, accommodationName } = props;
  const [state, setState] = useState({
    showingInfoWindow: false, // Hides or shows the InfoWindow
    activeMarker: {}, // Shows the active marker upon click
    selectedPlace: {}, // Shows the InfoWindow to the selected place upon a marker
  });

  const coordinates = {
    lat: location.location_lat,
    lng: location.location_long,
  };

  const onMarkerClick = (props, marker, e) =>
    setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
    });

  const onClose = () => {
    if (state.showingInfoWindow) {
      setState({
        showingInfoWindow: false,
        activeMarker: null,
      });
    }
  };

  return (
    <Map
      google={props.google}
      zoom={14}
      style={mapStyles}
      initialCenter={coordinates}
    >
      <Marker
        onClick={onMarkerClick}
        name={accommodationName}
      />
      <InfoWindow
        marker={state.activeMarker}
        visible={state.showingInfoWindow}
        onClose={onClose}
      >
        <div>
          <h4>{state.selectedPlace?.name}</h4>
        </div>
      </InfoWindow>
    </Map>
  );
};

export default GoogleApiWrapper(() => ({
  apiKey: `${process.env.GOOGLEMAPS_KEY}`
}))(MapWrapper);
