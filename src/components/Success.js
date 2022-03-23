function Success() {
    return (
        <main className=" container success-screen success">
            <h2 className="success-screen__title--success default-title">Pedido feito com sucesso!</h2>
            <div className="success__order-summary order-summary">
                <h3 className="order-summary__section-title">Filme e sessão</h3>
                <div className="order-summary__movie-infos">
                    <p className="order-summary__movie-info">Enola Holmes</p>
                    <p className="order-summary__movie-info">24/06/2021 15:00</p>
                </div>
                <h3 className="order-summary__section-title">Ingresso</h3>
                <div className="order-summary__movie-infos">
                    <p className="order-summary__movie-info">Assento 15</p>
                    <p className="order-summary__movie-info">Assento 16</p>
                </div>
                <h3 className="order-summary__section-title">Comprador</h3>
                <div className="order-summary__movie-infos">
                    <p className="order-summary__movie-info">Nome: João da Silva Sauro</p>
                    <p className="order-summary__movie-info">CPF: 123.456.789-10</p>
                </div>
            </div>
            <button className="movie-seats__confirm-button button-1">Voltar para Home</button>
        </main>
    )
}

export default Success