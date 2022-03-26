import { Link } from "react-router-dom"

import axios from "axios"
import { useState, useEffect } from "react"

function MainScreen({ setScreenCallback }) {

    const URL_GET_MOVIES = "https://mock-api.driven.com.br/api/v5/cineflex/movies"

    const [movies, setMovies] = useState([])

    useEffect(() => {
        const promise = axios.get(URL_GET_MOVIES)
        setScreenCallback(1)
        promise.then((response) => {
            const { data } = response
            setMovies(data)
        })
            .catch((error) => {
                console.log(error)
            })
    }, [])

    return (
        <main className="main-screen container">
            <h2 className="main-screen__title default-title">Selecione o filme</h2>
            <div className="main-screen__movies">
                {movies.map(movie => {
                    return (
                        <article className="main-screen__movie" key={movie.id}>
                            <Link to={`/sessoes/${movie.id}`}>
                                <img className="main-screen__movie-image" src={movie.posterURL} alt={movie.title} />
                            </Link>
                        </article>
                    )
                })}
            </ div>
        </main >
    )
}

export default MainScreen
