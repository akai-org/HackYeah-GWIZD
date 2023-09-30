import React from 'react';
import MapView, { Marker, MapViewProps } from 'react-native-maps';

import { LatLng } from '../../types/location';
import { POLAND_CENTER_LAT_LNG, DELTA } from '../../constants/Locations';

type Props = {
   latLng?: LatLng;
   currentLatLng?: LatLng;
   mapRef?: any;
};

const Map = ({
   latLng,
   currentLatLng,
   mapRef,
   ...props
}: Props & MapViewProps): React.ReactElement => {
   return (
      <MapView
         ref={mapRef}
         region={{
            latitude: latLng ? latLng.lat : POLAND_CENTER_LAT_LNG.lat,
            longitude: latLng ? latLng.lng : POLAND_CENTER_LAT_LNG.lng,
            latitudeDelta: latLng
               ? DELTA.latitudeDelta
               : DELTA.latitudeDeltaDefault,
            longitudeDelta: latLng
               ? DELTA.longitudeDelta
               : DELTA.longitudeDeltaDefault,
         }}
         loadingEnabled
         showsUserLocation
         {...props}
      >
         {latLng ? (
            <Marker
               coordinate={{
                  latitude: latLng.lat,
                  longitude: latLng.lng,
               }}
            />
         ) : null}
         {/* {currentLatLng ? (
        <Marker
          coordinate={{
            latitude: currentLatLng.lat,
            longitude: currentLatLng.lng,
          }}
        />
      ) : null} */}
      </MapView>
   );
};

export default Map;
