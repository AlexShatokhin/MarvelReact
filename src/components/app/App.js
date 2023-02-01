import { Component, lazy, Suspense } from "react";
import {BrowserRouter,  Routes, Route} from "react-router-dom"

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../Spinner/Spinner";
import {Page404} from "../pages/index"


const MainPage = lazy(()=>import("../pages/MainPage"))
const ComicsPage = lazy(()=>import("../pages/ComicsPage"))
const SingleComicPage = lazy(()=>import("../pages/SingleComicPage"))


class App extends Component {

    render(){
        return (
            <BrowserRouter>
                <div className="app">
                    <AppHeader />
                    <div className="main">
                        <Suspense fallback = {<Spinner />}>
                            <main >
                                <Routes>
                                    <Route path = "/" element = {<MainPage />}/>
                                    <Route path = "/comics" element = {<ComicsPage />}/>
                                    <Route path = "/comics/:comicId" element = {<SingleComicPage />}/>
                                    <Route path = "*" element = {<Page404 />}/>
                                </Routes>
                            </main>
                        </Suspense>

                    </div>
                </div>
            </BrowserRouter>

        )
    }

}

export default App;