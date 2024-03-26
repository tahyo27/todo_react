import React, {useState, useEffect} from "react";

function Clock() {
    const [time, setTime] = useState(getCurrentTime);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setTime(getCurrentTime);

        }, 1000);

        return () => clearInterval(intervalId);
    }, []);


function getCurrentTime() {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2,"0");
    const minutes = String(date.getMinutes()).padStart(2,"0");
    return `${hours}:${minutes}`;
    }

    return <div id="clock">{time}</div>
}

export default Clock;