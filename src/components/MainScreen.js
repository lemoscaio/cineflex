import testImage from "./../assets/images/testimage.png"

function MainScreen() {
    return (
        <main className="main-screen container">
            <h2 className="main-screen__title default-title">Selecione o filme</h2>
            <div className="main-screen__movies">
                <article className="main-screen__movie">
                    <img className="main-screen__movie-image" src={testImage} alt="" />
                </article>
                <article className="main-screen__movie">
                    <img className="main-screen__movie-image" src={testImage} alt="" />
                </article>
                <article className="main-screen__movie">
                    <img className="main-screen__movie-image" src={testImage} alt="" />
                </article>
                <article className="main-screen__movie">
                    <img className="main-screen__movie-image" src={testImage} alt="" />
                </article>
                <article className="main-screen__movie">
                    <img className="main-screen__movie-image" src={testImage} alt="" />
                </article>
                <article className="main-screen__movie">
                    <img className="main-screen__movie-image" src={testImage} alt="" />
                </article>
            </ div>
        </main >
    )
}

export default MainScreen
