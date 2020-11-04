import React, { useState, useEffect } from 'react';
import { SearchInput } from './SearchInput.jsx';
import { CardPanel } from './CardPanel.jsx';
import { TodayCard } from './TodayCard.jsx';
import { ForecastCard } from './ForecastCard.jsx';

export const WeatherCard = (props) => {
  const [isLoading, setLoading] = useState(true);
  const [city, setCity] = useState(null);

  const [todayWeather, setTodayWeather] = useState(null);
  const [weeklyWeather, setWeeklyWeather] = useState(null);

  useEffect(() => {
    let lookup = fetch('https://json.geoiplookup.io/').then(resp => resp.json()).then(json => {
      setCity(json.city);
      console.log('geoiplookup data: %o', json)
      return json;
    });

    let today = lookup.then(geo => {
      return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${geo.city}&appid=${'5988f5c0aebc2ffa2256c4dc5e3db9a8'}&units=metric`).then(resp => resp.json()).then(json => {
        setTodayWeather(json);
        console.log('todayWeather: %o', json)
        return json;
      });
    });

    let weekly = lookup.then(geo => {
      return fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${geo.city}&appid=${'5988f5c0aebc2ffa2256c4dc5e3db9a8'}&units=metric`).then(resp => resp.json()).then(json => {
        setWeeklyWeather(json);
        console.log('weeklyWeather: %o', json)
        return json;
      });
    });

    Promise.all([today, weekly]).then((values) => {
      setLoading(false);
    });

  }, [])

  if (isLoading) return <div>Loading...</div>

  //TODO: вынести CardPanel в TodayCard
  return <div className="weather-card">
  <SearchInput/>
  
  <TodayCard weather={todayWeather}/>
  <ForecastCard forecast={weeklyWeather}/>
  
  </div>
}