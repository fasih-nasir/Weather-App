import React, { useState, useEffect } from 'react';
import { Select, Input, Card, Typography, Divider, Space, Spin } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faTemperatureHigh,faSun,faCloudSun, faSmog, faWater, faWind } from '@fortawesome/free-solid-svg-icons';
import './WeatherApp.css';
// FONT AWESOME


// FONT AWESOME

const { Title, Text } = Typography;
const { Option } = Select;

const famousCapitalCities = [
  { country: "Pakistan", capital: "Islamabad" },
  { country: "India", capital: "New Delhi" },
  { country: "United States", capital: "Washington, D.C." },
  { country: "United Kingdom", capital: "London" },
  { country: "Turkey", capital: "Ankara" },
  { country: "Japan", capital: "Tokyo" },
  { country: "China", capital: "Beijing" },
  { country: "Russia", capital: "Moscow" },
  { country: "France", capital: "Paris" },
  { country: "Brazil", capital: "Brasília" }
];

function WeatherApp() {
  const [city, setCity] = useState('Karachi'); // Default city set to Karachi
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch weather data whenever city changes
  useEffect(() => {
    const fetchWeather = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db0aa9c72e95928cd396d016c1c1c17a&units=metric`);
        if (!response.ok) throw new Error('City not found');
        const data = await response.json();
        setWeather(data);
        setError('');
      } catch (err) {
        setWeather(null);
        setError(err.message);
      } finally {
        setLoading(false); // End loading
      }
    };
    
    fetchWeather();
  }, [city]);
  const iconMapping = {
    "01d": "sun",
    "01n": "moon",
    "02d": "cloud-sun",
    "02n": "cloud-moon",
    "03d": "cloud",
    "03n": "cloud",
    "04d": "cloud",
    "04n": "cloud",
    "09d": "cloud-showers-heavy",
    "09n": "cloud-showers-heavy",
    "10d": "cloud-rain",
    "10n": "cloud-rain",
    "11d": "poo-storm",
    "11n": "poo-storm",
    "13d": "snowflake",
    "13n": "snowflake",
    "50d": "smog",
    "50n": "smog",
  };
  
  // Handle city change
  const handleCityChange = value => setCity(value);
  
  return (
    <div className="container-fluid d-flex flex-column flex-lg-row  m-0 p-0 justify-content-center align-items-center" >
     <div className='col-lg-7 col-12  position-relative ' id='bgim'>
      <div className=' justify-content-center col-7  col-lg-4 loc text-white d-flex  justify-content-lg-around align-items-center '>
     
<i className='fa-solid fa-location-dot col-2 px-3 ms-2'> </i>
<div className='col-11 px-lg-1 px-2 col-lg-9'>
<span style={{fontSize:"12px",fontWeight:"500"}}>Current Location</span>
<h6>{city}</h6>
</div>
      </div>
      {/* <Title level={2}>The only forecast you need</Title> */}
      <h2 className='py-3 tg col-lg-11 col-10 text-center d-none d-lg-block'>the only weather forecast you need</h2>
{/* <hr className='hr mb-4 col-4'/> */}
      <Space direction="vertical" size="large" className="weather-inputs col-lg-6 col-11  py-lg-3 py-5">
        {/* Select City from Famous Capital Cities */}
       
        <Select
    defaultValue={city}
    placeholder="Select a city..."
    onChange={handleCityChange}
    className="city-select col-12"
    id='re'
>
    {famousCapitalCities.map((item, index) => (
        <Option key={index} value={item.capital}>
            {item.country} - {item.capital}
        </Option>
    ))}
</Select>


        {/* Manual City Input */}
        <Input
          placeholder="Or enter a city name"
          value={city}
          onChange={e => setCity(e.target.value)}
          className="city-input col-12"
        />
      </Space>
      
      
     
      </div>
      <div className='col-lg-5 col-12 px-3 mt-2'>
        {/* <h2 className='fw-bolder'>Today</h2> */}
      {/* Loader */}
      {loading && <Spin size="large"  />}

      {/* Weather Details */}
      {error && <p type="danger">{error}</p>}
      {weather && weather.main && (
        <Card className="weather-card col-12" style={{ fontFamily:"Raleway"}}>
     <div className='d-flex col-12 flex-row'>
      <div className='col-6'>
      <h1 level={1} className='display-5 fw-bolder num'>{weather.main.temp}°<span style={{fontSize:"22px"}}>C</span> </h1>
      <h3 className='fw-light'>
  {weather && weather.weather && (
    <>
      {weather.weather[0].main === "Clear" && weather.weather[0].icon === "01d" ? (
        <>
          <i className="fas fa-sun "></i> Sunny
        </>
      ) : weather.weather[0].main === "Clouds" && 
        (weather.weather[0].icon === "02d" || weather.weather[0].icon === "03d" || weather.weather[0].icon === "04d") ? (
        <>
          <i className="fas fa-cloud fw-light"></i> Cloudy
        </>
      ) : (
        <>
        <span className="fw-light" >
        {/* {weather.weather[0].description}  */}
<i className={`px-2  fas fa-${iconMapping[weather.weather[0].icon]}`}></i>
</span>
          {/* <i className={`fas fa-${weather.weather[0].icon}`}></i> {weather.weather[0].description} */}
        </>
      )}
    </>
  )}
</h3>
      </div>
      <div className="col-1 br"></div>
      <div className='col-5 d-flex flex-column justify-content-center align-items-end'>
<h4 className='fw-light'>weather</h4> 
   
<h4 className='fw-light col-12 text-end'>{weather.weather[0].description.split(" ").slice(0,1)}</h4> 

<span className='fw-medium num' style={{fontSize:"12px"}}>{Date().split(" ").slice(0,4).join(" ")}</span>

      </div>

     </div>
          {/* <h1 level={1} className='display-6 fw-bolder'>{weather.main.temp}° </h1> */}
     

{/* <span className='fw-medium ' style={{fontSize:"12px"}}>{Date().split(" ").slice(0,4).join(" ")}</span> */}

          {/* <p><FontAwesomeIcon icon={faTemperatureHigh} /> Temperature: {weather.main.temp}°C</p> */}
          <Divider />
          <div className="d-flex col-12 justify-content-between">
  <p className="mb-0">Feel like:</p>
  <span className="num">{weather.main.feels_like}</span>
</div>

<div className="d-flex col-12 justify-content-between">
  <p className="mb-0">Humidity:</p>
  <span className="num">{weather.main.humidity}%</span>
</div>

<div className="d-flex col-12 justify-content-between">
  <p className="mb-0">Wind:</p>
  <span className="num">{weather.wind.speed} km/h</span>
</div>

<div className="d-flex col-12 justify-content-between">
  <p className="mb-0">Condition:</p>
  <span className="num">{weather.weather[0].description}</span>
</div>

<div className="d-flex col-12 justify-content-between">
  <p className="mb-0">Precipitation:</p>
  <span className="num">0%</span>
</div>

          <Divider />
          <p className='text-center'>Last Updated: <span className='num'>{new Date().toLocaleTimeString()}</span></p>
        </Card>
      )}
      </div>
    </div>
  );
}

export default WeatherApp;
