import { useLocation, Link } from "react-router-dom"
import { useEffect } from "react"

function Success({ setScreenCallback }) {
    const location = useLocation()

    const { movieSeats: { day, movie, name: time }, orderInfo: { cpf, ids, name } } = location.state

    useEffect(() => {
        setScreenCallback(4)
    })

    // TODO correct seat number

    function changeDisplayCPF() {
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
                <h3 className="order-summary__section-title">Ingresso</h3>
                <div className="order-summary__movie-infos">
                    {ids.map(id => {
                        return <p key={id} className="order-summary__movie-info">Assento {id}</p>
                    })}
                </div>
                <h3 className="order-summary__section-title">Comprador</h3>
                <div className="order-summary__movie-infos">
                    <p className="order-summary__movie-info">Nome: {name}</p>
                    <p className="order-summary__movie-info">CPF: {changeDisplayCPF()}</p>
                </div>
            </div>
            <button className="movie-seats__confirm-button button-1"><Link to="/">Voltar para Home</Link></button>
        </main>
    )
}

export default Success