import React, { useEffect, useState } from 'react';
import Weathercard from './weathercard';
import "./style.css";
const Temp = () => {

    const [searchValue, setSearchValue] = useState("Pune");
    const [tempInfo, setTempInfo] = useState({});

    const getweatherInfo = async () => {

        try {
            let url = `https://api.openweathermap.org/data/2.5/weather?q=${searchValue}&units=metric&appid=8344a0b1d3fb91aaef10a5325d20fcda`;

            let res = await fetch(url);
            let data = await res.json();

            const { temp, humidity, pressure } = data.main;
            const { main: weathermood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;
            // console.log(temp);

            const mynewinfo = {
                temp,
                humidity,
                pressure,
                weathermood,
                name,
                speed,
                country,
                sunset,
            };

            setTempInfo(mynewinfo);
        }
        catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getweatherInfo();
    }, []);

    return (
        <>
            <div className='wrap'>
                <div className='search'>
                    <input type='search'
                        placeholder='search...'
                        autoFocus
                        id="search"
                        className='searchTerm'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)} />
                    <button className='searchButton' type='button'
                        onClick={getweatherInfo} >Search</button>

                </div>
            </div>

            <Weathercard {...tempInfo} />


        </>
    );
};

export default Temp