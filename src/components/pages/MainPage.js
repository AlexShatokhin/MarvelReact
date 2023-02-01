import {useState} from "react"

import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';

import ErrorBoundary from "../errorBoundary/ErrorBoundary"

const MainPage = () => {
    console.log("mount")
    const [selectedId, setSelectedId] = useState();

    function onSelectId(id){
        setSelectedId(id);
    }

    return (
        <>
            <ErrorBoundary>
                <RandomChar/>                        
            </ErrorBoundary>

            <div className="char__content">
                <ErrorBoundary>
                    <CharList selectId = {onSelectId}/>
                </ErrorBoundary>
                    
                <ErrorBoundary>
                    <CharInfo selectedId = {selectedId}/>
                </ErrorBoundary>
                
            </div> 
            <img className="bg-decoration" src={decoration} alt="vision"/>
        </>
    )
}

export default MainPage