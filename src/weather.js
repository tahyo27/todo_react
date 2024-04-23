import { useState ,useEffect } from "react";
import styles from "./weather.module.css";

function Weather() {
    const [coords, setCoords] = useState({lat: null, lon: null});
    const [weatherData, setWeatherData] = useState(null);
    const API_KEY = "ce9df8ebbf3610b44b2fc03caafb8f4b";
    const [showModal, setShowModal] = useState(false);

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

    const handleTodoClick = () => {
        setShowModal(true);
      };
    
      const closeModal = () => {
        setShowModal(false);
      };

    return (
        <div>
            <div onClick={handleTodoClick}>
                {weatherData && weatherData.main ? (
                    <>Icon {weatherData.name}, {weatherData.main.temp}°C</>
                ) : (
                    <>Loading...</>
                )}
            </div>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                        <div>
                            {weatherData && weatherData.main ? (
                                <>
                                    <p>Weather: {weatherData.weather[0].main}</p>
                                    <p>Temperature: {weatherData.main.temp}°C</p>
                                    <p>Humidity: {weatherData.main.humidity}%</p>
                                </>
                            ) : (
                                <p>Loading...</p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
export default Weather;