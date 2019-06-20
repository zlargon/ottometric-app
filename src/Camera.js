import React from 'react';
import './App.css';

const Camera = ({ imageFolder = '', speed = 500 }) => {
  let [timeId, setTimeId] = React.useState(null);
  const [imgSrc, setImgSrc] = React.useState('');

  const stopPlaying = () => {
    clearInterval(timeId);
    setTimeId(null);
  }

  React.useLayoutEffect(() => {
    let count = 0;
    const id = setInterval(() => {
      const fileName = ('0000000000' + count).slice(-10) + '.png';
      console.log(fileName);
      setImgSrc(fileName);
      count++;
    }, speed);

    setTimeId(id);

    return stopPlaying;
  }, []);

  return (
    timeId === null ?
      <div>no more image</div> :
      <img style={{ width: '100%', height: '100%' }}
          alt="No Image"
          src={imageFolder + imgSrc}
          onError={stopPlaying}
        />
  );
}

export default Camera;
