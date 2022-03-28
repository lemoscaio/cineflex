import loadingIcon from "./../assets/loading/loading.svg";

function Loading() {
    return (<div className="loading-icon">
        <img src={loadingIcon} className="loading-icon__image" alt="Ícone de loading" />
    </div>);
}

export default Loading;