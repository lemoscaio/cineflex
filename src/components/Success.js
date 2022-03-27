import { useLocation, Link } from "react-router-dom"
import { useEffect } from "react"

function Success({ setScreenCallback }) {
    const location = useLocation()

    const { movieSeats: { day, movie, name: time }, orderInfo: { buyers } } = location.state
    
    useEffect(() => {
        setScreenCallback(4)
    })

    // TODO correct seat number

    function changeDisplayCPF(cpf) {
        let displayCPF = cpf.split("")
        displayCPF.splice(9, 0, "-").splice(6, 0, ".").splice(3, 0, ".")
        displayCPF.splice(6, 0, ".")
        displayCPF.splice(3, 0, ".")
        return displayCPF ? displayCPF : ""
    }

    return (
        <main className=" container success-screen success">
            <h2 className="success-screen__title--success default-title">Pedido feito com sucesso!</h2>
            <div className="success__order-summary order-summary">
                <h3 className="order-summary__section-title">Filme e sessão</h3>
                <div className="order-summary__movie-infos">
                    <p className="order-summary__movie-info">{movie.title}</p>
                    <p className="order-summary__movie-info">{day.date} {time}</p>
                </div>
                {buyers.map(({ name, cpf, seatNumber, seatID }, index) => {
                    return (
                        <>
                            <h3 key={seatID} className="order-summary__section-title">Ingresso - Assento {seatNumber}</h3>
                            <div className="order-summary__movie-infos">
                                <p className="order-summary__movie-info">Nome: {name}</p>
                                <p className="order-summary__movie-info">CPF: {changeDisplayCPF(cpf)}</p>
                            </div>
                        </>
                    )
                })}
            </div>
            <Link className="normalize-anchor-2" to="/"><button className="movie-seats__confirm-button button-1">Voltar para Home</button></Link>
        </main>
    )
}

export default Success