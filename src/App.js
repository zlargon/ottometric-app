import React from 'react';
import { GoogleMap, Polyline, withGoogleMap, withScriptjs } from 'react-google-maps';
import googleMapApiKey from './googleMapApiKey';
import * as util from './utils';
import './App.css';

const MapWithPolyline = withScriptjs(withGoogleMap(props => (
  <GoogleMap
    defaultZoom={20}
    center={props.currentLatLng}>
    <Polyline path={props.polylinePath} />
  </GoogleMap>
)));

const delay = (ms) => new Promise((solve) => {
  setTimeout(solve, ms);
});

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.container = React.createRef();
    this.image = React.createRef();
    this.imageInfo = React.createRef();
    this.geometry = util.generateGeometry();
    this.play = false;
  }

  state = {
    polylinePath: [],
    currentLatLng: { lat: 49.011212804408, lng: 8.4228850417969 },
    count: 0
  }

  componentDidMount = () => {
    this.map = util.generateScene();
    this.container.current.appendChild(this.map.renderer.domElement);

    const animate = () => {
      requestAnimationFrame(animate);
      this.map.renderer.render(this.map.scene, this.map.camera);
    };

    animate();
    this.start();
  }

  fetchData = async () => {
    const no = ('0000000000' + this.state.count).slice(-10);

    // 1. update radar
    await fetch(`/drive_data/velodyne_points/data/${no}.bin`)
      .then(res => res.arrayBuffer())
      .then(positionArr => {
        const vectArray = util.transferArrayBufferToVect(positionArr);
        util.pushDataToGeometry(this.geometry, vectArray);

        if (this.lastPointCloud) {
          this.map.scene.remove(this.lastPointCloud);
        }
        this.lastPointCloud = util.generatePointCloud(this.geometry);

        this.geometry.dispose();
        this.geometry = util.generateGeometry();

        this.map.scene.add(this.lastPointCloud);
      });

    // 2. update google map
    await fetch(`/drive_data/oxts/data/${no}.txt`)
      .then(res => res.text())
      .then(file => file.split(' ', 2))
      .then(geolocation => {
        const currentLatLng = { lat: Number(geolocation[0]), lng: Number(geolocation[1]) };
        const polylinePath = [...this.state.polylinePath, currentLatLng];
        this.setState({ currentLatLng, polylinePath });
      });

    // 3. update image and imageInfo
    this.image.current.src = `/drive_data/image_00/data/${no}.png`;
    this.imageInfo.current.innerText = `${no}.png`;

    // 4. update state count
    console.log(no);
    this.setState({
      count: this.state.count + 1
    });
  }

  start = async () => {
    if (this.state.play) return;

    this.setState({ play: true });
    try {
      for (;;) {
        await this.fetchData();
        await delay(100);
        if (this.state.play === false) break;
      }
    } catch (e) {
      console.log(e);
    } finally {
      this.setState({ play: false });
    }
  }

  stop = () => {
    this.setState({ play: false });
  }

  reset = () => {
    this.setState({
      polylinePath: [],
      currentLatLng: { lat: 49.011212804408, lng: 8.4228850417969 },
      count: 0
    });

    this.imageInfo.current.innerText = '0000000000.png';
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
              googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=drawing&key=${googleMapApiKey}`}
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
                <img ref={this.image} alt=""/>
              </div>
              <div className="information">
                <div><b>Photo:</b><br/><span ref={this.imageInfo}></span></div>
                <div><b>Latitude:</b><br/> {this.state.currentLatLng.lat}</div>
                <div><b>Longitude:</b><br/> {this.state.currentLatLng.lng}</div>
              </div>
            </aside>
          </section>
        </main>
        <footer>
          { !this.state.play && <button onClick={this.start}>start</button> }
          {  this.state.play && <button onClick={this.stop}>stop</button> }
          <button onClick={this.reset}>reset</button>
        </footer>
      </div>
    );
  }
}
