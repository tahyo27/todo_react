import { useState ,useEffect } from "react";

function Weather() {
    const [coords, setCoords] = useState({lat: null, lon: null});
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = "ce9df8ebbf3610b44b2fc03caafb8f4b";

    useEffect(() => {
        const getPosition = (position) => {
            setCoords({
                lat: position.coords.latitude,
                lon: position.coords.longitude
            })     
        };
        const geoError = (error) => {
            console.log("geo Error!");
        }
        navigator.geolocation.getCurrentPosition(getPosition, geoError);
    }, []);

    useEffect(() => {
        const getWeatherData = async () => {
            try{
                const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&appid=${API_KEY}&units=metric&lang=kr`;
                const response = await fetch(url);
                const jsonData = await response.json();
                setWeatherData(jsonData);

            } catch (error) {
                console.log("Weather API fetch error~", error);
            }
        }
        getWeatherData();
    }, [coords]);


    console.log("lat" + coords.lat + "lon" + coords.lon);
    console.log(weatherData);

    return (
        <div>
            <h1>weather</h1>
        </div>
    );
}
export default Weather;