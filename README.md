# Ottometric App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

https://www.ottometric.com/

## Demo

https://zlargon.github.io/ottometric-app

## Setup Project

1. Download data from [The KITTI Vision Benchmark Suite](http://www.cvlibs.net/datasets/kitti/raw_data.php) with `[synced+rectified data]`

2. unzip the file and put folder to `public/drive_data/`

    ![Drive Data](https://user-images.githubusercontent.com/2791834/59929843-a549ac80-940f-11e9-9e84-b1549840ecbe.png)

3. (OPTIONAL) setup Google Map API Key

    - Register for the API Key https://developers.google.com/maps/documentation/javascript/get-api-key
    - add the API Key to `.env`

    ```
    REACT_APP_GOOGLE_MAP_API_KEY=xxxxxxxxxxx
    ```

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
