import React, { Fragment, useEffect, useState } from 'react';

export const WeatherSlider = (props) => {
  const { forecast } = props;
  //const carouselRef = React.createRef();
  const [carouselRef] = useState(React.createRef());
  const carouselHeight = carouselRef.current && carouselRef.current.offsetHeight;
  console.log(carouselHeight)
  const [wrapperHeight, setWrapperHeight] = useState(null);
  useEffect(() => {
    setWrapperHeight(carouselRef.current.offsetHeight);
  }, [carouselRef]);

  useEffect(() => {
    const resizeWrapper = () => {
      setWrapperHeight(carouselRef.current.offsetHeight);
    }
    /*document.addEventListener('resize', resizeWrapper);*/
    window.addEventListener('resize', resizeWrapper);
    return () => {
      /*document.removeEventListener('resize', resizeWrapper)*/
      window.removeEventListener('resize')
    }
  }, []);
  
  useEffect(()=>{
    //if (!wrapperHeight) return;
    setWrapperHeight(carouselRef.current.offsetHeight);
  }, [carouselRef.current && carouselRef.current.offsetHeight])
  
  setTimeout(()=>{
    console.log(carouselRef.current.offsetHeight)
  }, 2000)

console.log('wrapperHeight before return: %o', wrapperHeight)
  return (
    <div className="forecast-block">
    
    <div className="slider-action">
    </div>
    
    <div className="slider-wrapper" style={{height: wrapperHeight ? `${wrapperHeight}px` : 'auto'}}>
     <div ref={carouselRef} className="slider-carousel">
     {forecast.map(item => <div className="table-item">
     
       <div>{ item.dt_txt.split(' ')[1].slice(0,2)} {+item.dt_txt.split(' ')[1].slice(0,2) < 12 ? 'AM' : 'PM'}</div>
     
       <div><img class="forecast-icon" src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}/></div>
       
       <div>{item.main.temp.toFixed(1)}</div>
       
       <div>{item.weather[0].main}</div>
       
     </div>)}
      </div>
     </div>
     
     <div className="slider-action">
    </div>
     
   </div>
  );
}