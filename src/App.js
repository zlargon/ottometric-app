import React from 'react';
import GoogleMapReact from 'google-map-react';
import Camera from './Camera';
import './App.css';

const Marker = ({ text }) => <div className="marker">{text}</div>;

const App = () => {
  return (
    <div className="container">
      <header>
        <h2>OTTOMETRIC</h2>
      </header>
      <section>
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyD6qTu55F0bSv_Bj05mxZ8ffvxyP2rzxO0' }}
            defaultCenter={{lat: 42.3418206, lng: -71.091735}}
            defaultZoom={11}>

            <Marker lat={42.3418206} lng={-71.091735} text="my position" />
          </GoogleMapReact>
        </div>
        <aside>
          <div className="lidar">
            lidar
          </div>
          <div className="aside-down">
            <div className="camera">
              <Camera
                speed={100}
                imageFolder="/2011_09_26/2011_09_26_drive_0052_sync/image_00/data/" />
            </div>
            <div className="information">
              information
            </div>
          </div>
        </aside>
      </section>
      <footer>
        footer
      </footer>
    </div>
  );
}

export default App;
