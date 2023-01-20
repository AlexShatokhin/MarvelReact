import { useEffect, useState, useRef } from 'react';

import MarvelService from '../../services/MarvelService'
import Error from '../Error/Error'
import Spinner from '../Spinner/Spinner'
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(localStorage.getItem("charInfo")?  JSON.parse(localStorage.getItem("charInfo")): null)
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    const marvelService = new MarvelService();

    const prevProps = useRef(props.selectedId)

    useEffect(()=>{
            if(props.selectedId !== prevProps.selectedId){
                updateChar(props.selectedId)
        }
    },[props.selectedId])

    const onCharLoading = () => {
        setLoading(true)
    }

    const onCharLoaded = (char) => {
        setChar(char);
        setLoading(false);
        localStorage.setItem("charInfo", JSON.stringify(char))
    }

    const onError = () => {
        setError(true);
        setLoading(false);
    }

    const updateChar = (id) => {
        if(id){
            document.documentElement.scrollTop = 400;
            onCharLoading();
            marvelService.getCharacter(id)
            .then(res => {onCharLoaded(res)})
            .catch(onError)
        }

    }


    const isSkeleton = (loading || char || error) ? null : <Skeleton />
    const isLoading = loading ? <Spinner></Spinner> : null;
    const isError = error ? <Error /> : null;
    const isContent = !(loading || error || !char) ? <View char = {char}></View> : null;

    return (
        <div className="char__info">
            {isSkeleton}
            {isLoading}
            {isError}
            {isContent}
        </div>
    )

}

const View = ({char: {name, thumbnail, wiki, description, urls, comics}}) => {

    let comicsView = "There is no comics for this character";
    if(comics.length !== 0) {
        comicsView = comics.map((item, i)=>{
            if(i<10){
                return (
                    <li key = {i} className="char__comics-item">
                        {item.name}
                    </li>
                )
            }
        })
    }

    let styleImg = {objectFit: "cover"};

    if(thumbnail.indexOf("image_not_available.jpg") > -1){
        styleImg = {objectFit: "contain"}
    }

    return (
        <>
            <div className="char__basics">
                <img style = {styleImg} src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={urls} className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki} className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comicsView}
            </ul>        
        </>

    )
}

export default CharInfo;