import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./Header.js"
import MainScreen from "./MainScreen.js"
import MovieTimes from "./MovieTimes.js"
import MovieSeats from "./MovieSeats.js"
import Success from "./Success.js"

function App() {
    return (
        <>
            {/* <BrowserRouter> */}
                {/* <Routes> */}
                    <Header />
                    <MovieSeats />
                    {/* <Route path="/" element={<MainScreen />} />
                    <Route path="/sessoes" element={<MovieTimes />} />
                    <Route path="/assentos" element={<MovieSeats />} />
                    <Route path="/" element={<Success />} /> */}
                {/* </Routes> */}
            {/* </BrowserRouter> */}
        </>
    )
}

export default App