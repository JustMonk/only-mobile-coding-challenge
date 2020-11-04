import React from 'react';
import {CardPanel} from './CardPanel.jsx';

export const TodayCard = (props) => {
  const data = props.weather;
  return  <CardPanel color="blue">
  <div>
  
  <div style={{fontSize: '1.3em'}}>{`${data.name}, ${data.sys.country || ''} (${data.coord.lat}, ${data.coord.lon})`}</div>
  
  <div className="today-main-wrapper">
  
  <div name="first-block">
  
  <div className="today-temp">
  <span className="temp-value">{data.main.temp.toFixed(1)}</span>
  <span className="temp-label">°C</span>
  </div>
  
  <div>feels like {data.main.feels_like.toFixed(1)}</div>
  
  </div>
  
  <div name="second-block" style={{display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
    <div>Humidity: {data.main.humidity}</div>
    <div>Pressure: {data.main.pressure}</div>
    <div>Wind: {data.wind.speed}ms</div>
  </div>
  
  <div>
  <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} />
  <div>{data.weather[0].main}</div>
  </div>
  
  </div>
  
  </div>
  </CardPanel>
}