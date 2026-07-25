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
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

gsap.registerPlugin(useGSAP);

const App = () => {
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    const checkServer = async () => {
      try {
        const response = await fetch(
          "https://weatherapp-odzs.onrender.com/api/health",
        );
        if (response.ok) {
          setIsBackendReady(true);
        } else {
          setTimeout(checkServer, 5000);
        }
      } catch (error) {
        setTimeout(checkServer, 5000);
      }
    };

    checkServer();
  }, []);

  const [image, setImage] = useState(
    "https://media.istockphoto.com/id/1007768414/photo/blue-sky-with-bight-sun-and-clouds.jpg?s=612x612&w=0&k=20&c=MGd2-v42lNF7Ie6TtsYoKnohdCfOPFSPQt5XOz4uOy4=" ||
      "./assets/hero.png",
  );
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState({});
  const [city, setCity] = useState("Yaounde");

  useGSAP(
    () => {
      const tl = gsap.timeline({
        delay: 1,
        defaults: {
          ease: "power2.out",
          duration: 1.7,
        },
      });

      tl.from("#metrics", {
        opacity: 0,
        y: 500,
      }).from(
        ".text",
        {
          opacity: 0,
          y: 50,
          stagger: 0.5,
        },
        "-=0.2",
      );
    },
    { dependencies: [city] },
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    const cityName = event.target.elements.city.value;
    if (cityName) setCity(cityName);
  };
  useEffect(() => {
    const getImage = async (city) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://weatherapp-odzs.onrender.com/api/cities/${city}`,
        );
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
        const response = await axios.get(
          `https://weatherapp-odzs.onrender.com/api/weather/${city}`,
        );
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

  if (!isBackendReady) {
    return (
      <div className="min-h-screen w-full bg-cover bg-center text-white oflex flex-col justify-center items-center verflow-hidden">
        <h2>Waking up the server...</h2>
        <p>This may take up to 60 seconds on Render's free tier.</p>
      </div>
    );
  }

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
          <label
            for="city"
            className="font-black text-lg text-shadow-lg flex items-center justify-center">
            {" "}
            <span>City : </span>
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
            className=" flex  items-center justify-center gap-2 px-4 py-2 bg-sky-600 text-white rounded-full">
            <CloudLightning size={20} />
            <span className="text-sm lg:text-lg">get Weather</span>
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
      <main className="p-4  gap-12 md:p-12 font-black flex flex-col lg:grid lg:grid-cols-2">
        <div id="current" className="h-[35vh] lg:h-screen  ">
          <div className=" absolute top-[45vh] lg:top-1/2 -translate-y-1/2 p-12 ">
            <div className=" text text-7xl text-sky-600 lg:text-9xl">
              {weather ? weather?.main?.temp : "0.00"}°C
            </div>
            <h1 className=" text text-3xl lg:text-7xl text-shadow-lg flex gap-2 items-center ">
              <MapPin className=" aspect-2/3" width={60} height={80} />
              <div className="flex flex-col">
                {weather.name} {weather ? weather.sys?.country : "CM"}
                <span className="p-2 text-xl lg:text-2xl">
                  {weather ? weather?.weather?.[0]?.description : "Sunny"}{" "}
                </span>
              </div>
            </h1>

            <p className=" text text-xl  lg:text-2xl font-black lg:ml-6">
              {weather.timezone
                ? getLocalTime(weather.timezone)
                : "01 Jan, --:--"}
            </p>
          </div>
        </div>
        <div
          id="metrics"
          className=" border border-white rounded-3xl p-4 md:p-12 backdrop-blur-md h-[70vh] lg:h-screen overflow-hidden">
          <h2 className="text-3xl text-sky-600 font-bold tracking-tighter text-center pb-4">
            Current Metrics
          </h2>
          <div className="w-[80%] mx-auto flex flex-col  gap-16 lg:gap-20">
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
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
