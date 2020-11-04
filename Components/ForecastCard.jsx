import React, { Fragment } from 'react';
import { CardPanel } from './CardPanel.jsx';
import { WeatherSlider } from './WeatherSlider.jsx';

export const ForecastCard = (props) => {
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'November', 'December'];
  const forecast = {};
  props.forecast.list.forEach(val => {
    let date = val.dt_txt.split(' ')[0];
    if (!forecast[date]) forecast[date] = [val];
    else {
      forecast[date].push(val);
    }
  });

  console.log('forecastList: %o', forecast);
  console.log(new Date('2020-09-10').toString())
  console.log(new Date('2020-09-10').getDay())

  return <Fragment>
   {Object.keys(forecast).map(val => <CardPanel color="white">
   <div className="date-title">{weekdays[new Date(val).getDay()]}, {new Date(val).getDate()} {months[new Date(val).getMonth()]}</div>
   
   <WeatherSlider forecast={forecast[val]} />
   
   </CardPanel>)}
  </Fragment>
}