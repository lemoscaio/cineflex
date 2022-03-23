import testImage from "./../assets/images/testimage.png"

function MovieTimes() {
    return (
        <main className=" container movie-times-screen movie-times">
            <h2 className="movie-times-screen__title default-title">Selecione o horário</h2>
            <div className="movie-times__days">
                <div className="movie-times__day-times">
                    <p className="movie-times__day">Quinta-feira - 24/06/2021
                    </p>
                    <div className="movie-times__hours">
                        <button className="movie-times__hour">15:00</button>
                        <button className="movie-times__hour">19:00</button>
                    </div>
                </div>
                <div className="movie-times__day-times">
                    <p className="movie-times__day">Sexta-feira - 25/06/2021
                    </p>
                    <div className="movie-times__hours">
                        <button className="movie-times__hour">15:00</button>
                        <button className="movie-times__hour">19:00</button>
                    </div>
                </div>
            </div>
            <footer className="movie-summary">
                <article className="movie-summary__poster">
                    <img className="movie-summary__poster-image" src={testImage} alt="" />
                </article>
                <div className="movie-summary__info">
                    <p className="movie-summary__name">Enola Holmes
                    </p>
                </div>
            </footer>
        </main>
    )
}

export default MovieTimes