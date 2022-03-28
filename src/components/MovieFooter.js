function MovieFooter({ src, title, name, weekday }) {

    function checkAditionalInfo() {
        return weekday && name ? <p className="movie-summary__time">{weekday} - {name}</p> : <></>
    }

    return (<footer className="movie-summary">
        <article className="movie-summary__poster">
            <img className="movie-summary__poster-image" src={src} alt={title} />
        </article>
        <div className="movie-summary__info">
            <p className="movie-summary__name">{title}
            </p>
            {checkAditionalInfo()}
        </div>
    </footer>);
}

export default MovieFooter