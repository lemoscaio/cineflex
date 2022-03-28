function Modal({ setModalVisibility, modalVisibility }) {
 
    function showModal() {
        return modalVisibility ? "" : "hidden"
    }

    return (
        <article className={`modal ${showModal()}`}>
            <div className="modal__content">
                <p className="modal__title">Este assento não está disponível</p>
                <p className="modal__message">Os assentos amarelos já estão ocupados.</p>
                <p className="modal__message">Por favor, selecione outro assento.</p>
                <div className="modal__buttons">
                    <button onClick={() => setModalVisibility(false)} className="modal__button button-1">Fechar</button>
                </div>
            </div>
        </article>
    )
}

export default Modal