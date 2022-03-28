import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import axios from "axios"

import MovieFooter from "./MovieFooter.js"
import Loading from "./Loading.js"

function MovieTimes({ setScreenCallback }) {

    const [movieTimes, setMovieTimes] = useState({})
    const { movieID } = useParams()
    const { days } = movieTimes

    useEffect(() => {
        const URL_GET_MOVIETIMES = `https://mock-api.driven.com.br/api/v5/cineflex/movies/${movieID}/showtimes`
        const promise = axios.get(URL_GET_MOVIETIMES)
        setScreenCallback(2)
        promise.then((response) => {
            const { data } = response
            setMovieTimes(data)
        })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return Object.keys(movieTimes).length > 0 ? (
        <main className=" container movie-times-screen movie-times">
            <h2 className="movie-times-screen__title default-title">Selecione o horário</h2>
            <div className="movie-times__days">
                {days.map(day => {
                    const { showtimes: showTimes, id, weekday, date } = day
                    return (
                        <div key={id} className="movie-times__day-times">
                            <p className="movie-times__day">{weekday} - {date}</p>
                            <div className="movie-times__hours">
                                {showTimes.map((time) => {
                                    const { id, name } = time
                                    return (
                                        <Link key={id} className="normalize-anchor-1" to={`/assentos/${id}`}>
                                            <button className="movie-times__hour">
                                                {name}
                                            </button>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>

            <MovieFooter
                src={movieTimes.posterURL} 
                alt={movieTimes.title}
                title={movieTimes.title}
            />

        </main>
    ) : <Loading />
}

export default MovieTimes