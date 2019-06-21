import React, { Component } from 'react';
import { GoogleMap, Polyline, withGoogleMap, withScriptjs } from 'react-google-maps';
import openSocket from 'socket.io-client';
import * as util from './utils/map';
import './App.css';

const MapWithPolyline = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={20}
    center={props.currentLatLng}
  >
    <Polyline path={props.polylinePath} />
  </GoogleMap>
)));

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.positions = [];
    this.socket = openSocket('http://localhost:6999');
    this.fileIndex = 0;
    this.geometry = util.generateGeometry();
  }
  state = {
    polylinePath: [],
    currentLatLng: { lat: 49.011212804408, lng: 8.4228850417969 },
  }
  componentDidMount() {
    const map = util.generateScene();
    this.container.current.appendChild(map.renderer.domElement);
    const animate = () => {
      requestAnimationFrame(animate);
      map.renderer.render(map.scene, map.camera);
    };
    const updateFrame = () => new Promise(() => {
      if (this.lastPointCloud) {
        map.scene.remove(this.lastPointCloud);
      }
      this.lastPointCloud = util.generatePointCloud(this.geometry);
      this.geometry.dispose();
      this.geometry = util.generateGeometry();
      map.scene.add(this.lastPointCloud);
    });
    const socketEnd = (geolocation) => {
      // console.log(geolocation);
      updateFrame();
      const currentLatLng = { lat: Number(geolocation[0]), lng: Number(geolocation[1]) };
      const polylinePath = [...this.state.polylinePath, currentLatLng];
      this.setState({ currentLatLng, polylinePath });
      if (!this.pause) {
        this.nextShot();
      }
    };
    const socketPosition = (positionArr) => {
      const vectArray = util.transferArrayBufferToVect(positionArr);
      util.pushDataToGeometry(this.geometry, vectArray);
    };
    animate();
    // this.socket.on('start', () => { this.setState({ loading: true }); });
    this.socket.on('position', socketPosition);
    this.socket.on('end', socketEnd);
  }
  nextShot = () => {
    let newIndex = this.fileIndex + 1;
    if (newIndex > 153) {
      newIndex = 0;
      this.setState({ polylinePath: [] });
    }
    this.pause = false;
    this.fileIndex = newIndex;
    this.socket.emit('getPosition', newIndex);
  }
  togglePause = () => {
    this.pause = true;
  }
  render() {
    return (
      <div className="app">
        <header>
          <h2>OTTOMETRIC</h2>
        </header>
        <main>
          <div className="googlemap">
            <MapWithPolyline
              googleMapURL="https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=drawing&key=AIzaSyD6qTu55F0bSv_Bj05mxZ8ffvxyP2rzxO0"
              loadingElement={<div />}
              containerElement={<div style={{ width: '100%', height: '100%' }} />}
              mapElement={<div style={{ width: '100%', height: '100%' }} />}
              currentLatLng={this.state.currentLatLng}
              polylinePath={this.state.polylinePath}
            />
          </div>
          <section>
            <div id="lidar" ref={this.container}></div>
            <aside>
              <div className="camera">
                <div>no image</div>
              </div>
              <div className="information">
                information
              </div>
            </aside>
          </section>
        </main>
        <footer>
          <button onClick={this.nextShot}>play</button>
          <button onClick={this.togglePause}>pause</button>
        </footer>
      </div>
    );
  }
}
