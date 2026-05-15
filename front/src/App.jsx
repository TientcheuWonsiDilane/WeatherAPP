import React from "react";
import { useState, useEffect } from "react";
import {
  CloudLightning,
  MapPin,
  Thermometer,
  Gauge,
  Droplet,
  Wind,
} from "lucide-react";
import axios from "axios";

const App = () => {
  const [image, setImage] = useState(
    "https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bright-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=",
  );
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("Yaounde");

  const handleSubmit = (event) => {
    event.preventDefault();
    const cityName = event.target.elements.city.value;
    if (cityName) setCity(cityName);
  };
  useEffect(() => {
    const getImage = async (city) => {
      try {
        setLoading(true);
        const response = await axios.get(`https://weatherapp-odzs.onrender.com/api/cities/${city}`);
        const imgUrl = response.data;
        const img = new Image();

        img.src = imgUrl;

        img.onload = () => {
          setImage(imgUrl);
          setLoading(false);
        };
      } catch (err) {
        console.log(err);
      }
    };
    if (city) {
      getImage(city);
    }
  }, [city]);

  useEffect(() => {
    const getWeather = async (city) => {
      try {
        const response = await axios.get(`https://weatherapp-odzs.onrender.com/api/weather/${city}`);
        setWeather(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (city) {
      getWeather(city);
    }
  }, [city]);

  const getLocalTime = (offsetInSeconds) => {
    const now = new Date();
    const utcMillis = now.getTime() + now.getTimezoneOffset() * 60000;

    const cityMillis = utcMillis + offsetInSeconds * 1000;

    return new Date(cityMillis).toLocaleTimeString([], {
      weekday: "long",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center text-white overflow-hidden"
      style={{
        backgroundImage: `url(${image})`,
      }}>
      <header className="py-3 flex flex-col md:flex-row gap-3 justify-center items-center md:justify-evenly">
        <h1 className="text-3xl tracking-tighter font-black text-shadow-lg">
          Weather-App
        </h1>
        <form
          onSubmit={handleSubmit}
          className=" flex flex-col items-center justify-center md:flex-row gap-3 md:gap-6">
          <label for="city" className="font-black text-lg text-shadow-lg">
            {" "}
            City :
            <input
              type="text"
              placeholder="Enter a city"
              name="city"
              id="city"
              className=" ml-2 bg-white border border-sky-600 rounded-full md:ml-2 p-2 text-lg text-slate-600"
            />
          </label>
          <button
            type="submit"
            className=" flex gap-2 px-4 py-2 bg-sky-600 text-white rounded-full">
            <CloudLightning size={20} />
            <span className="text-lg">get Weather</span>
          </button>
        </form>
        <nav>
          <ul className="flex gap-9 justify-center align-middle font-black text-shadow-lg">
            <li className="border-b-2 border-sky-600 px-1">
              <a href="#">Current</a>
            </li>
            <li className="border-b-2 border-sky-600 px-1">
              <a href="#">Forcast</a>
            </li>
            <li className="border-b-2 border-sky-600 px-1">
              <a href="#">History</a>
            </li>
          </ul>
        </nav>
      </header>
      <main className="p-12 font-black flex flex-cols lg:grid lg:grid-cols-2">
        <div>
          <div className=" absolute top-1/2 -translate-y-1/2 p-12 ">
            <div className="text-9xl">{weather?.main?.temp}°C</div>
            <h1 className="text-7xl text-shadow-lg flex gap-2 items-center ">
              <MapPin size={60} />
              {weather.name} {weather.sys?.country}
            </h1>
            <p className="p-5 text-2xl">
              {weather?.weather?.[0]?.description}{" "}
              <span className="text-2xl font-bold ml-6">
                {weather.timezone ? getLocalTime(weather.timezone) : " --:--"}
              </span>
            </p>
          </div>
        </div>
        <div className=" border border-white rounded-3xl p-12 backdrop-blur-md h-screen overflow-hidden">
          <h2 className="text-3xl font-bold tracking-tighter text-center pb-4">Current Metrics</h2>
          <div className="w-[80%] mx-auto flex flex-col  gpa-16 lg:gap-20">
            <p className="border-b-2 p-2 flex justify-between ">
              <span className="flex gap-1">
                <Thermometer size={20} />
                Min Temp :
              </span>
              <span>{weather.main?.temp_min}</span>
            </p>
             <p className="border-b-2 p-2 flex justify-between ">
              <span className="flex gap-1">
                <Thermometer size={20} />
                Max Temp :
              </span>
              <span>{weather.main?.temp_max}</span>
            </p>
             <p className="border-b-2 p-2 flex justify-between ">
              <span className="flex gap-1">
                <Droplet size={20} />
                Humidity :
              </span>
              <span>{weather.main?.humidity}</span>
            </p>
             <p className="border-b-2 p-2 flex justify-between ">
              <span className="flex gap-1">
                <Gauge size={20} />
                Pressure :
              </span>
              <span>{weather.main?.pressure}</span>
            </p>
             <p className="border-b-2 p-2 flex justify-between ">
              <span className="flex gap-1">
                <Wind size={20} />
                Wind Speed :
              </span>
              <span>{weather.wind?.speed}</span>
            </p>
            <p className="border-b-2 p-2 flex justify-between ">
              <span className="flex gap-1">
                <Wind size={20} />
                Wind Speed :
              </span>
              <span>{weather.wind?.speed}</span>
            </p>
            <p className="border-b-2 p-2 flex justify-between ">
              <span className="flex gap-1">
                <Wind size={20} />
                Wind Speed :
              </span>
              <span>{weather.wind?.speed}</span>
            </p>
            <p className="border-b-2 p-2 flex justify-between ">
              <span className="flex gap-1">
                <Wind size={20} />
                Wind Speed :
              </span>
              <span>{weather.wind?.speed}</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
