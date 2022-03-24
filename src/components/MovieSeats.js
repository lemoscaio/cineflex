import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import movieSeatsJSON from "./mockMovieSeats.json"

function MovieSeats() {

    const { sectionID } = useParams()
    const URL_GET_MOVIE_SEATS = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sectionID}/seats`
    const [movieSeats, setMovieSeats] = useState({})

    // TODO remove square link animation when clicking on a seat

    // TODO remove comment after testing everything

    useEffect(() => {
        const promise = axios.get(URL_GET_MOVIE_SEATS)
        promise.then((response) => {
            const { data } = response
            setMovieSeats(data)
        })
            .catch((error => {
                console.log(error)
            }))
    }, [])

    // TODO remove this hardcoding after testing everything

    // useEffect(() => {
    //     setMovieSeats(movieSeatsJSON)
    // }, [])

    function setSeatAvailabilityCSS({ isAvailable }) {
        return isAvailable ? "" : "unavailable-seat"
    }

    function setSelectedSeatCSS(seat) {
        console.log(seat.id)
        console.log(seat.isSelected)
        return seat.isSelected ? "selected-seat" : ""
    }

    // TODO treat cases - seat already selected ////// where to store selected seats
    function selectSeat(id) {
        const newSeats = movieSeats.seats.map(seat => {
            return (id === seat.id) ? { ...seat, isSelected: !seat.isSelected } : seat
        })
        movieSeats.seats = newSeats
        console.log(movieSeats)
        setMovieSeats({...movieSeats})
    }

    return Object.keys(movieSeats).length > 0 ? (
        <main className=" container movie-seats-screen movie-seats">
            <h2 className="movie-seats-screen__title default-title">Selecione o(s) assento(s)</h2>
            <div className="movie-seats__seats-options">
                {movieSeats.seats.map(seat => {
                    const { id, name } = seat
                    const selectedCSS = setSelectedSeatCSS(seat)
                    return (
                        <div
                            key={id} onClick={() => selectSeat(id)} 
                            className={`movie-seats__seat ${setSeatAvailabilityCSS(seat)} ${selectedCSS}`}
                            >
                            <p className="movie-seats__seat-number">
                                {name}
                            </p>
                        </div>
                    )
                })}
            </div>
            <div className="movie-seats__labels">
                <div className="movie-seats__label">
                    <div className="movie-seats__seat selected-seat">
                    </div>
                    <p className="movie-seats__seat-label">
                        Selecionado
                    </p>
                </div>
                <div className="movie-seats__label">
                    <div className="movie-seats__seat">
                    </div>
                    <p className="movie-seats__seat-label">
                        Disponível
                    </p>
                </div>
                <div className="movie-seats__label">
                    <div className="movie-seats__seat unavailable-seat">
                    </div>
                    <p className="movie-seats__seat-label">
                        Indisponível
                    </p>
                </div>
            </div>
            <form
                className="movie-seats__buyer-info">
                <label htmlFor="buyer-name">
                    Nome do comprador:
                </label>
                <input type="text" name="buyer-name" placeholder="Digite seu nome..." className="movie-seats__buyer-name" />
                <label htmlFor="buyer-tax-number">
                    CPF do comprador:
                </label>
                <input type="text" name="buyer-tax-number" placeholder="Digite seu nome..." className="movie-seats__buyer-name" />
            </form>
            <button className="movie-seats__confirm-button button-1">Reservar assento(s)</button>
            <footer className="movie-summary">
                <article className="movie-summary__poster">
                    <img className="movie-summary__poster-image" src={movieSeats.movie.posterURL} alt={movieSeats.movie.title} />
                </article>
                <div className="movie-summary__info">
                    <p className="movie-summary__name">{movieSeats.movie.title}
                    </p>
                    <p className="movie-summary__time">{movieSeats.day.weekday} - {movieSeats.name}</p>
                </div>
            </footer>
        </main >
    ) : <></>
}

export default MovieSeats