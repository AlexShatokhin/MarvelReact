import { Component, lazy, Suspense } from "react";
import {BrowserRouter,  Routes, Route} from "react-router-dom"
import { CSSTransition, SwitchTransition } from 'react-transition-group'

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../Spinner/Spinner";
import SingleCharacterPage from "../pages/SingleCharacterPage";
import {Page404} from "../pages/index"

import "./app.css"

const MainPage = lazy(()=>import("../pages/MainPage"))
const ComicsPage = lazy(()=>import("../pages/ComicsPage"))
const SingleComicPage = lazy(()=>import("../pages/SingleComicPage"))


const App = () => {
    return (
        <BrowserRouter>
            <div className="app">
                <AppHeader />
                <div className="main">
                    <Suspense fallback = {<Spinner />}>
                        <SwitchTransition>
                            <CSSTransition
                                timeout={300}
                                classNames="page"
                                unmountOnExit>
                                {(state) => (
                                    <main className="page">
                                        <Routes>
                                            <Route path = "/" element = {<MainPage />}/>
                                            <Route path = "/comics" element = {<ComicsPage />}/>
                                            <Route path = "/comics/:comicId" element = {<SingleComicPage />}/>
                                            <Route path = "/characters/:charName"  element = {<SingleCharacterPage />}/>
                                            <Route path = "*" element = {<Page404 />}/>
                                        </Routes>
                                    </main>
                                )}
                            </CSSTransition>
                        </SwitchTransition>

                    </Suspense>

                </div>
            </div>
        </BrowserRouter>
    )

}

export default App;


