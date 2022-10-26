import React, { useState, useEffect } from 'react'

function Weather() {
  const [search, setSearch] = useState("lubbock");
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");

  // eslint-disable-next-line
  let componentMounted = true;
  
  useEffect(() => {
    const fetchWeather = async () => {
        const response =  await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}
        &appid=8561f172ac57ccb845991074be563cc0&units=imperial`)
          if (componentMounted) {
            setData(await response.json());
            console.log(data)
          }
          return () => {
            // eslint-disable-next-line
            componentMounted = false;
          }
      }
    fetchWeather();
  
    }, [search]);

    let emoji = null;
    if (typeof data.main != "undefined") {
      // eslint-disable-next-line
      if (data.weather[0].main == "Clouds") {
        emoji = "fa-cloud"
        // eslint-disable-next-line
      }else if (data.weather[0].main == "Thunderstorm") {
        emoji = "fa-bolt"
        // eslint-disable-next-line
      }else if (data.weather[0].main == "Drizzle") {
        emoji = "fa-cloud-rain"
        // eslint-disable-next-line
      }else if (data.weather[0].main == "Rain") {
        emoji = "fa-cloud-shower-heavy"
        // eslint-disable-next-line
      }else if (data.weather[0].main == "Snow") {
        emoji = "fa-snow-flake"
      }else {
        emoji = "fa-smog"
      }
    }else {
      return (
        <div>...Loading</div>
      )
    };
  
    let temp = (data.main.temp).toFixed(0);
    let feels_like = (data.main.feels_like).toFixed(0);
    let wind_speed = (data.wind.speed).toFixed(0);

    /// Date
    let d = new Date();
    let date = d.getDate();
    let year = d.getFullYear()
    let month = d.toLocaleDateString("default", {month:'long'});
    let day = d.toLocaleDateString("default", {weekday:'long'});

    //Time
    let time = d.toLocaleDateString([],{
        hour: '2-digit',
        minute: '2-digit'
    });

    const handleSubmit = (event) => {
      event.preventDefault();
      setSearch(input)
    }

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-4">
          <div class="card text-white text-center border-0">
            <img 
              src={`https://source.unsplash.com/600x900/?${data.weather[0].main}`}
              class="card-img"
              alt="..."
                />
              <div class="card-img-overlay">
               <form onSubmit={handleSubmit} >
                  <div class='input-group mb-4 w-75 mx-auto'>
                    <input type="search" 
                       class="form-control"
                       placeholder='Search City' 
                       aria-label="Search City"
                       aria-describedby='basic-addon2'
                       name='search'
                       value={input}
                       onChange={(e)=>setInput(e.target.value)}
                       required
                     />
                      <button type='submit' class="input-group-text">
                        <i className='fas fa-search'></i>
                      </button>
                  </div>        
                </form>
            <div className="bg-dark bg-opacity-50 py-3">
                <div class="input-group mb-4 w-75 mx-auto"></div>
                  <h2 class="card-title">{data.name}</h2>
                    <p class="card-text lead">
                      {day}, {month} {date}, {year}
                      <br />
                      {time}
                    </p>
                    <hr />
                    <i className={`fas ${emoji} fa-4x`}></i>
                    <h1 className='fw-boulder mb-5'>{temp} &deg;F</h1>
                    <p className='lead fw-boulder mb-0'>{data.weather[0].main}</p>
                    <p className='lead'>Feels {feels_like}&deg;F | Wind {wind_speed} mph</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather;