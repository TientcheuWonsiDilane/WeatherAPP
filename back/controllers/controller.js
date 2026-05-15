export const getWeather = async (req, res) => {
  try {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ message: "City name required" });
    }

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_KEY}&units=metric`,
    );
    const weather = await response.json();
    res.status(200).json(weather);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getCity = async (req, res) => {
  try {
    const { city } = req.params;
    if (!city) {
      return res.status(400).json({ message: "City name not provided" });
    }
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${city}`,
      {
        headers: {
          Authorization: process.env.CITY_KEY,
        },
      },
    );
    const image = await response.json();
    res.status(200).json(image.photos[Math.floor(Math.random() * 5)].src.large2x);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
