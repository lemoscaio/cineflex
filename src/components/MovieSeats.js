import { useState, useEffect } from "react"
import { useParams, Link, useNavigate } from "react-router-dom"
import axios from "axios"

function MovieSeats() {

    const { sectionID } = useParams()
    const navigate = useNavigate()

    const URL_GET_MOVIE_SEATS = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sectionID}/seats`

    const URL_POST_ORDER = `https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`

    const [movieSeats, setMovieSeats] = useState({})

    const initialOrderInfo = {
        name: "",
        cpf: ""
    }

    const [orderInfo, setOrderInfo] = useState(initialOrderInfo)

    // TODO remove square link animation when clicking in a seat only on mobile

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

    useEffect(() => {
        if (Object.keys(movieSeats).length > 0) {
            const selectedSeats = movieSeats.seats.filter(seat => {
                return seat.isSelected
            })
            const selectedSeatsIDs = selectedSeats.map(seat => seat.id)
            setOrderInfo({ ...orderInfo, ids: selectedSeatsIDs })
        }
    }, [movieSeats])

    function setSeatAvailabilityCSS({ isAvailable }) {
        return isAvailable ? "" : "unavailable-seat"
    }

    function setSelectedSeatCSS(seat) {
        return seat.isSelected ? "selected-seat" : ""
    }

    function selectSeat(id) {
        const newSeats = movieSeats.seats.map(seat => {
            if (id === seat.id && !seat.isAvailable) {
                alert("Este assento não está disponível")
            }
            return (id === seat.id && seat.isAvailable) ? { ...seat, isSelected: !seat.isSelected } : seat
        })
        movieSeats.seats = newSeats
        setMovieSeats({ ...movieSeats })
    }

    function inputHandler(event) {
        if (event.target.name === "buyer-name") {
            setOrderInfo({ ...orderInfo, name: event.target.value })
        }
        if (event.target.name === "buyer-tax-number") {
            setOrderInfo({ ...orderInfo, cpf: event.target.value })
        }
    }

    function handleSubmit(event) {
        event.preventDefault()
        const promise = axios.post(URL_POST_ORDER, orderInfo)
        promise.then((response) => {
            navigate("/sucesso", { state: { orderInfo, movieSeats } })
            console.log(response)
        })
        promise.catch(err => console.log(err))
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
            <form onSubmit={handleSubmit} className="movie-seats__buyer-info">
                <label htmlFor="buyer-name">
                    Nome do comprador:
                </label>
                <input onChange={event => inputHandler(event)} type="text" value={orderInfo.name} name="buyer-name" placeholder="Digite seu nome..." className="movie-seats__buyer-name" />
                <label htmlFor="buyer-tax-number">
                    CPF do comprador:
                </label>
                <input onChange={event => inputHandler(event)} type="text" value={orderInfo.cpf} name="buyer-tax-number" placeholder="Digite seu CPF (sem pontuação)..." className="movie-seats__buyer-name" />
                <button type="submit" className="movie-seats__confirm-button button-1">Reservar assento(s)</button>
            </form>
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
