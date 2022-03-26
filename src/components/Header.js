import { useNavigate } from "react-router-dom"

function Header({ screen }) {

    const navigate = useNavigate()

    function handleClick() {
        navigate(-1)
    }

    const backButton = screen !== 1 && screen !== 4 ?
        <button onClick={handleClick} className="go-back-button button-2"><ion-icon name="chevron-back-circle"></ion-icon></button> : null

    return (
        <header className="header">
            {backButton}
            <h1 className="header__title">CINEFLEX</h1>

        </header>
    )
}

export default Header