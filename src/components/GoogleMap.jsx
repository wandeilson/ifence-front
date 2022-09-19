import { Wrapper } from '@googlemaps/react-wrapper';
import { useRef, useState, useEffect } from 'react';

const google = window.google;
export function GoogleMap(props) {
    return (
        <Wrapper apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
            <Map {... props}/>
        </Wrapper>
    )
}

function Map (props) {
    const setCoordinate = props.setCoordinate;
    const ref = useRef();
    const [map, setMap] = useState();
    const [marker, setMarker] = useState();

    let newMarker = null;
    let newCircle = null;
    var radius = props.radius;

    const createMarker = (coordinate) => {
        return new window.google.maps.Marker({
                        position: coordinate,
                        map: map,
                        title: "Localização Selecionada",
                        label: props.name
                    });
    }

    const createCircle = (marker) => {
        const circle = new window.google.maps.Circle({
            map: map,
            radius,
            fillColor: '#00ff00'
        });
        circle.bindTo('center', marker, 'position');

        return circle
    }

    useEffect(() => {
        let options = null;
        if (props.coordinates) {
            options = {
                center: { lat: props.coordinates.latitude, lng: props.coordinates.longitude },
                zoom: 15
            };

            newMarker = createMarker(
                {
                    lat: props.coordinates.latitude,
                    lng: props.coordinates.longitude
                }
            );
            newCircle = createCircle(newMarker);
        } else {
            options = {
                center: { lat: -7.897789, lng: -37.118066 },
                zoom: 15
            }
        }

        if(ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, options));   
        }
    }, [ref, map]);

    useEffect(() => {
        if(props.editable && map){
            map.addListener("click", (event) => {
                if(newMarker == null){
                    newMarker = createMarker(event);
                }else{
                    newMarker.setOptions({
                        position: event.latLng,
                    });
                }

                const latitude = event.latLng.lat();
                const longitude = event.latLng.lng();
                
                setCoordinate({
                    latitude,
                    longitude
                });

                newCircle = createCircle(newMarker);
                
                setMarker(newMarker);
            });
        }
    }, [map]);

    return (
        <div ref={ref} id="map"
            style={
                {
                    width: "100%",
                    height: "100%"
                }
            }
        >
            
        </div>
    )
}

const Marker = (options) => {
  const [marker, setMarker] = useState();

  useEffect(() => {
    if (!marker) {
      setMarker(new google.maps.Marker());
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        marker.setMap(null);
      }
    };
  }, [marker]);
  useEffect(() => {
    if (marker) {
      marker.setOptions(options);
    }
  }, [marker, options]);
  return null;
};