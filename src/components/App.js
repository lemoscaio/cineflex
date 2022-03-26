
import { useState } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./Header.js"
import MainScreen from "./MainScreen.js"
import MovieTimes from "./MovieTimes.js"
import MovieSeats from "./MovieSeats.js"
import Success from "./Success.js"

function App() {

    const [screen, setScreen] = useState(1)

    return (
        <>
            <BrowserRouter>
                <Header screen={screen}/>
                <Routes>
                    <Route path="/" element={<MainScreen setScreenCallback={value => setScreen(value)}/>} />
                    <Route path="/sessoes/:movieID" element={<MovieTimes setScreenCallback={value => setScreen(value)}/>} />
                    <Route path="/assentos/:sectionID" element={<MovieSeats setScreenCallback={value => setScreen(value)}/>} />
                    <Route path="/sucesso" element={<Success setScreenCallback={value => setScreen(value)}/>} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default App