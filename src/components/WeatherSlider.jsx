import React, { Fragment, useEffect, useState } from 'react';

export const WeatherSlider = (props) => {
  const { forecast } = props;
  const [carouselRef] = useState(React.createRef());
  const carouselHeight = carouselRef.current && carouselRef.current.offsetHeight;
  const [wrapperHeight, setWrapperHeight] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(0);

  useEffect(() => {
    setWrapperHeight(carouselRef.current.offsetHeight);
  }, [carouselRef]);

  useEffect(() => {
    const resizeWrapper = () => {
      setWrapperHeight(carouselRef.current.offsetHeight);
    }
   
    window.addEventListener('resize', resizeWrapper);

    return () => {
      window.removeEventListener('resize', resizeWrapper);
    }
  }, []);

  useEffect(() => {
    if (carouselRef.current) {
      const imgPromises = [];
      carouselRef.current.querySelectorAll('img').forEach(img => {
        imgPromises.push(new Promise(r => {
          img.onload = r;
        }));
      });
      Promise.all(imgPromises).then((values) => {
        setWrapperHeight(carouselRef.current.offsetHeight);
      }, reason => console.log(reason));
    }
  }, [carouselRef.current]);

  useEffect(() => {
    //if (!wrapperHeight) return;
    setWrapperHeight(carouselRef.current.offsetHeight);
  }, [carouselRef.current && carouselRef.current.offsetHeight, isLoading]);

  const scrollBackward = () => {
    if (scrollIndex > 0) setScrollIndex(0);
  };

  const scrollForward = () => {
    let scrollTo = forecast.length - 5;
    if (scrollTo > 0) setScrollIndex(scrollTo);
  };

  return (
    <div className="forecast-block">
    
    <div className={`slider-action action-left ${!scrollIndex ? 'action-disabled' : ''}`} onClick={scrollBackward}>
    <i className="fas fa-caret-left fa-lg"></i>
    </div>
    
    <div className="slider-wrapper" style={{height: wrapperHeight ? `${wrapperHeight}px` : 'auto'}}>
     <div ref={carouselRef} style={{marginLeft: `${-scrollIndex*(carouselRef.current ? carouselRef.current.offsetWidth/5 : 0)}px`}} className="slider-carousel">
     {forecast.map(item => <div className="table-item">
     
       <div>{ item.dt_txt.split(' ')[1].slice(0,2)} {+item.dt_txt.split(' ')[1].slice(0,2) < 12 ? 'AM' : 'PM'}</div>
     
       <div><img className="forecast-icon" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/></div>
       
       <div>{item.main.temp.toFixed(1)}</div>
       
       <div>{item.weather[0].main}</div>
       
     </div>)}
      </div>
     </div>
     
     <div className={`slider-action action-right ${scrollIndex >= forecast.length - 5 ? 'action-disabled' : ''}`} onClick={scrollForward}>
     <i className="fas fa-caret-right fa-lg"></i>
    </div>
     
   </div>
  );
}