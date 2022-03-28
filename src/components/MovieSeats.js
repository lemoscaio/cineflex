import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import axios from "axios"

import MaskedInputCPF from "./MaskedInputCPF.js"
import MovieFooter from "./MovieFooter.js"

function MovieSeats({ setScreenCallback }) {

    const { sectionID } = useParams()
    const navigate = useNavigate()

    const URL_GET_MOVIE_SEATS = `https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${sectionID}/seats`
    const URL_POST_ORDER = `https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many`
    const initialOrderInfo = {
        buyers: [
        ],
        ids: []
    }

    const [movieSeats, setMovieSeats] = useState({})
    const [orderInfo, setOrderInfo] = useState({ ...initialOrderInfo })

    useEffect(() => {
        const promise = axios.get(URL_GET_MOVIE_SEATS)
        setScreenCallback(3)
        promise.then((response) => {
            const { data } = response
            setMovieSeats(data)
        })
            .catch((error => {
                console.log(error)
            }))
    }, [])

    function setSeatAvailabilityCSS({ isAvailable }) {
        return isAvailable ? "" : "unavailable-seat"
    }
    function setSelectedSeatCSS(seat) {
        return seat.isSelected ? "selected-seat" : ""
    }
    function disabledButtonCSS() {
        let anySeatsArray = movieSeats.seats.filter(seat => {
            if (seat.isSelected) {
                return true
            }
        })
        return anySeatsArray.length > 0 ? "" : "disabled"
    }

    function selectSeat(id) {
        const newSeats = movieSeats.seats.map(seat => {
            if (id === seat.id && !seat.isAvailable) {
                alert("Este assento não está disponível")
                return seat
            }
            else if (id === seat.id && seat.isAvailable && !seat.isSelected) {
                return { ...seat, isSelected: true, buyer: {} }
            }
            else if (id === seat.id && seat.isAvailable && seat.isSelected) {
                if (seat.buyer.name || seat.buyer.cpf) {
                    const result = window.confirm("Existem dados já preenchidos. Realmente gostaria de tirar a seleção do assento?");
                    if (result) {
                        delete seat.buyer
                        return { ...seat, isSelected: false }
                    } else {
                        return { ...seat, isSelected: true }
                    }
                } else {
                    delete seat.buyer
                    return { ...seat, isSelected: false }
                }
            } else {
                return seat
            }
        })
        movieSeats.seats = newSeats
        setMovieSeats({ ...movieSeats })
    }

    useEffect(() => {
        if (Object.keys(movieSeats).length > 0) {
            const selectedSeats = movieSeats.seats.filter(seat => {
                return seat.isSelected
            })

            const selectedSeatsIDs = selectedSeats.map(seat => seat.id)
            const selectedSeatsNumbers = selectedSeats.map(seat => seat.name)

            const buyers = selectedSeats.map(seat => {
                let treatedCPF;
                if (seat.buyer.cpf) {
                    treatedCPF = seat.buyer.cpf.replace(/[^0-9]/g, "")
                }
                return {
                    seatID: seat.id,
                    seatNumber: seat.name,
                    name: seat.buyer["name"],
                    cpf: treatedCPF,
                }
            })

            orderInfo.buyers = buyers

            setOrderInfo({ ...orderInfo, ids: selectedSeatsIDs, numbers: selectedSeatsNumbers })
        }
    }, [movieSeats])

    function inputHandler(event, index, seatID) {
        if (event.target.name === "buyer-name") {
            movieSeats.seats.forEach(seat => {
                if (seat.id === seatID) {
                    seat.buyer.name = event.target.value
                }
            })
            setMovieSeats({ ...movieSeats })
        }
        if (event.target.name === "buyer-tax-number") {
            movieSeats.seats.forEach(seat => {
                if (seat.id === seatID) {
                    seat.buyer.cpf = event.target.value
                }
            })
            setMovieSeats({ ...movieSeats })
        }
    }

    function handleSubmit(event) {
        event.preventDefault()





        const postObject = {
            ids: orderInfo.ids, buyers: orderInfo.buyers.map(buyer => {
                const tempBuyer = { ...buyer }
                delete tempBuyer.seatNumber
                return tempBuyer
            })
        }

        const promise = axios.post(URL_POST_ORDER, postObject)
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

                {/* TODO transform in component */}

                {movieSeats.seats.map((seat, index) => {
                    if (seat.buyer) {
                        const { id: seatID, name: seatNumber, buyer: { name, cpf } } = seat
                        return (
                            <div key={seatID} className="movie-seats__buyer-info-container">
                                <p className="movie-seats__buyer-seat-title">Informações para o assento {seatNumber}</p>
                                <div className="movie-seats__buyer-seat-container" >
                                    <label htmlFor="buyer-name">
                                        Nome:
                                    </label>
                                    <input
                                        onChange={event => inputHandler(event, index, seatID)} type="text"
                                        value={name}
                                        name="buyer-name"
                                        id="buyer-name"
                                        placeholder="Digite o nome..." className="movie-seats__buyer-name"
                                        inputMode="latin-name"
                                        required />
                                    <label htmlFor="buyer-tax-number">
                                        CPF:
                                    </label>
                                    <MaskedInputCPF
                                        onChange={event => inputHandler(event, index, seatID)}
                                        value={cpf}
                                    />
                                </div>
                            </div>
                        )
                    }
                })}

                <button type="submit" className={`movie-seats__confirm-button button-1 ${disabledButtonCSS()}`}>Reservar assento(s)</button>
            </form>
            <MovieFooter 
            src={movieSeats.movie.posterURL} 
            alt={movieSeats.movie.title}
            title={movieSeats.movie.title} 
            weekday={movieSeats.day.weekday} 
            name={movieSeats.name} />
        </main >
    ) : <></>
}

export default MovieSeats
