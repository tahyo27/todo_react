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
                    <div className={styles.weather_box}>
                        <img src={`https://tahyo27.github.io/todo_r/icons/${weatherData.weather[0].icon}.png`} alt="" style={{ width: "6rem", height: "6rem" }} />
                        <div className={styles.nt_box}>
                            <div>{weatherData.name}</div>
                            <div>{weatherData.main.temp}°C</div>
                        </div> 
                    </div>
                ) : (
                    <div>Loading...</div>
                )}
            </div>
            {showModal && (
                <div className={styles.modal}>
                    <div className={styles.modal_content}>
                        <span className={styles.close} onClick={closeModal}>&times;</span>
                        <div>
                            {weatherData && weatherData.main ? (
                                <div>
                                    <div>
                                        <div style={{fontSize:"1.5rem", fontWeight:"600"}}>{weatherData.name}, {weatherData.sys.country}</div>
                                        <div style={{fontSize:"1rem", fontWeight:"400", color:"gray"}}>&nbsp;{weatherData.weather[0].description}</div>
                                    </div>
                                    <div className={styles.weatherModal_box}>
                                        <div>
                                            <img src={`https://tahyo27.github.io/todo_r/icons/${weatherData.weather[0].icon}.png`} alt="" style={{ width: "6rem", height: "6rem" }} />
                                        </div>
                                        <div>
                                            <div><span>체감 온도 </span>{weatherData.main.feels_like}°C</div>
                                            <div><span>최고 온도 </span> {weatherData.main.temp_max}°C</div>
                                            <div><span>최저 온도 </span> {weatherData.main.temp_min}°C</div>
                                            <div><span>습도 </span> {weatherData.main.humidity}%</div>
                                        </div>
                                    </div>
                                </div>
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