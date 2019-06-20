import React from 'react';
import GoogleMapReact from 'google-map-react';
import './App.css';

const Marker = ({ text }) => <div>{text}</div>;

function App() {
  return (
    <div className="container">
      <header>
        header
      </header>
      <section>
        <div className="google-map">
          <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyD6qTu55F0bSv_Bj05mxZ8ffvxyP2rzxO0' }}
            defaultCenter={{lat: 42.3418206, lng: -71.091735}}
            defaultZoom={11}>

            <Marker lat={42.3418206} lng={-71.091735} text="My Marker" />
          </GoogleMapReact>
        </div>
        <aside>
          <div className="lidar">
            lidar
          </div>
          <div className="aside-down">
            <div className="camera">
              camera
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
