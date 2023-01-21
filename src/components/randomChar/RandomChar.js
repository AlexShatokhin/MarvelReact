import { useState, useEffect } from 'react';

import Error from '../Error/Error'
import Spinner from '../Spinner/Spinner'
import useMarvelService from '../../services/MarvelService';
import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = (props) => {

    const [char, setChar] = useState({});
    const {loading, error, getCharacter, cleanError} = useMarvelService();

    useEffect(()=>{
        showChac();
    },[])


    const onCharLoaded = (char) => {
        setChar(char);

    }

    const showChac = () => {
        cleanError()
        const id = Math.floor(Math.random() * (1010789 - 1009146) + 1009146)
        getCharacter(id)
        .then(res => {
            onCharLoaded(res)
        })
    }

    let isLoading = loading ? <Spinner></Spinner> : null;
    let isError = error ? <Error></Error> : null;
    let isChar = !(loading || error) ? <View char = {char}></View> : null;

    return (
        <div className="randomchar">
            {isLoading}
            {isError}
            {isChar}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button onClick={showChac} className="button button__main">
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
    
}

const View = ({char:{name, description, thumbnail, urls, wiki}}) => {

    let styleImg = {objectFit: "cover"}; 
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'){
        styleImg = {objectFit: "contain"}
    }

    return (
        <div className="randomchar__block">
            <img src={thumbnail} style = {styleImg} alt="Random character" className="randomchar__img"/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={urls} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div> 
        </div>
       
    )
}

export default RandomChar;