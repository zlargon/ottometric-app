# Ottometric App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

https://www.ottometric.com/

## Demo

https://zlargon.github.io/ottometric-app

## Setup Project

1. Download data from [The KITTI Vision Benchmark Suite](http://www.cvlibs.net/datasets/kitti/raw_data.php) with `[synced+rectified data]`

2. unzip the file and put folder to `public/drive_data/`

![Drive Data](https://user-images.githubusercontent.com/2791834/59912342-df04be00-93e3-11e9-8b47-15a9a8d111d0.png)

3. (OPTIONAL) setup Google Map API Key

- Register for the API Key https://developers.google.com/maps/documentation/javascript/get-api-key
- add the API Key to `src/App.js`

![Google Map API Key](https://user-images.githubusercontent.com/2791834/59912298-c09ec280-93e3-11e9-8d92-c4552554ea46.png)

4. install node packages depandencies by `yarn`

```bash
yarn install
```

5. start react develop server

```bash
yarn start
```

6. open http://localhost:3000/ in browser

## Referece

- https://github.com/chnbohwr/js-velodyne-viewer
