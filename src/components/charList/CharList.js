import React from 'react';
import { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [charListLoading, setCharListLoading] = useState(false);
    const [offset, setOffset] = useState(400);
    const [isEnded, setIsEnded] = useState(false);
    const [scrollLoading, setScrollLoading] = useState(false);

    const itemRefs = [];

    const marvelService = new MarvelService();

    const onFocus = (index) => {
        if(itemRefs.current){
            itemRefs.current.forEach((item,i) => {
                if( item.classList.contains("char__item_selected")){
                    item.classList.remove("char__item_selected");
                }
                if(i === index){
                    item.classList.add("char__item_selected"); 
                }
            })
        }
    }

    useEffect(()=>{
        onRequest();

    },[])

    // const updateCharOnScroll = (offset) => {
    //     if(!scrollLoading && (document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight)){
    //         onRequest(offset)
    //     }
    // }

    const onRequest = () => {        onCharListLoading()
        marvelService.getAllCharacters(offset)
        .then(onCharLoaded)
        .catch(()=>onError())
    }

    const onCharListLoading = () => {
        setCharListLoading(true);
        setScrollLoading(true);
    }

    const onCharLoaded = (newChars) => {
        let ended = false;
        if(newChars < 9){ended = true;}

        setChars(chars => chars = [...chars, ...newChars]);
        setLoading(false);
        setError(false);
        setCharListLoading(false);
        setOffset(offset => offset + 9);
        setIsEnded(ended);
        setScrollLoading(false);

    }

    const onError = () => {
        setLoading(false);
        setError(true);

    }

    const renderItems = () => {
        const items = chars.map((char,i) => {

            let styleImg = {objectFit: "cover"};

            if(char.thumbnail.indexOf("image_not_available.jpg") > -1){
                styleImg = {objectFit: "unset"}
            }

            return <li
            // ref = {el => itemRefs.current[i] = el}
            tabIndex = {0}
            key = {char.id}
            char = {char}
            onClick={() => {props.selectId(char.id); onFocus(i)}} 
            className="char__item"
            onKeyDown={(e) => {
                if (e.key === ' ' || e.key === "Enter") {
                    props.selectId(char.id);
                    onFocus(i);
                }
            }}>
                <img style={styleImg} src={char.thumbnail} alt="abyss"/>
                <div className="char__name">{char.name}</div>
            </li>
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }

    const isLoading = loading ? <Spinner></Spinner> : null;
    const isError = error ? <Error /> : null;
    const isContent = !(loading && error) ? renderItems() : null;
    return (
        <div className="char__list">
            {isLoading}
            {isError}
            {isContent}

            <button style = {{display: isEnded ? "none" : "block"}}
            disabled = {charListLoading} 
            onClick = {()=>onRequest(offset)}
            className="button button__main button__long">

                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    selectId: PropTypes.func.isRequired
}

export default CharList;