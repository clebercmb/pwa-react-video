import React, {useState} from 'react'

import {fetchWeather} from './api/fetchWeather'
import './App.css'

const App = () => {

//    const [query, setQuery] = useState('')

    const [state, setState] = useState({
        query: '',
        weather: {}
    })

    const search = async (e) => {
        if(e.key === 'Enter') {
            const data = await fetchWeather(state.query)
            console.log(data)
            
            setState({...state, weather:data, query:''})
            

        }
    }

    return (
        <div className='main-container'>
            <input
                type='text'
                className='search'
                placeholder='Seach...'
                value={state.query}
                onChange={(e) => setState({...state, query:e.target.value})}
                onKeyPress={search}
            />
            {state.weather.main && (
                <div className='city'> 
                    <h2 className='city-name'>
                        <span>{state.weather.name}</span>
                        <sup>{state.weather.sys.country}</sup>
                    </h2>
                    <div className='city-temp'>
                        {Math.round(state.weather.main.temp)}
                        <sup>&deg;C</sup>
                    </div>
                    <div className='info'>
                        <img className='city-icon' src={`https://openweathermap.org/img/wn/${state.weather.weather[0].icon}@2x.png`} alt={state.weather.weather[0].description}/>
                        <p>{state.weather.weather[0].description}</p>
                    </div>    
                </div>    
            )}
        </div>
    )
}

export default App