import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./Header.js"
import MainScreen from "./MainScreen.js"
import MovieTimes from "./MovieTimes.js"
import MovieSeats from "./MovieSeats.js"
import Success from "./Success.js"

function App() {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Routes>
                    <Route path="/" element={<MainScreen />} />
                    <Route path="/sessoes/:movieID" element={<MovieTimes />} />
                    <Route path="/assentos/:sectionID" element={<MovieSeats/>} />
                    <Route path="/sucesso" element={<Success/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App