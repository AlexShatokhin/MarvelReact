import React from 'react';
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Transition } from 'react-transition-group';
import { Formik } from 'formik';

import Spinner from '../Spinner/Spinner';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [chars, setChars] = useState([]);
    const [offset, setOffset] = useState(0);
    const [isEnded, setIsEnded] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);

    const itemRefs = [];

    const {loading, error, getAllCharacters, cleanError} = useMarvelService();

    const duration = 300;

    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
    }
    
    const transitionStyles = {
      entering: { opacity: 1 },
      entered:  { opacity: 1 },
      exiting:  { opacity: .9 },
      exited:  { opacity: .9 },
    };

    const onFocus = (index) => {
        if(itemRefs){
            itemRefs.forEach((item,i) => {
                if(item.classList.contains("char__item_selected")){
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

    const onRequest = () => {   
        cleanError();     
        getAllCharacters(offset)
        .then(onCharLoaded)
    }

    const onCharLoaded = (newChars) => {
        let ended = false;
        if(newChars < 9){ended = true;}

        setChars(chars => chars = [...chars, ...newChars]);
        setOffset(offset => offset + 9);
        setIsEnded(ended);
    }


    const renderItems = () => {
        const items = chars.map((char,i) => {

            let styleImg = {objectFit: "cover"};

            if(char.thumbnail.indexOf("image_not_available.jpg") > -1){
                styleImg = {objectFit: "unset"}
            }

            return(
                <Transition timeout={300} in = {!(loading || error)}>
                    {state => (
                        <li
                        style={{
                            ...defaultStyle,
                            ...transitionStyles[state]  
                        }}
                        ref = {el => itemRefs[i] = el}
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
                    )}
                </Transition>
            ) 
        })

        return (
            <ul className="char__grid">
                {items}
            </ul>
        )
    }
    
    const isContent = !(loading && error) ? renderItems() : null;
    const isLoading = (loading && firstLoad) ? <Spinner /> : null;
    return (
        <div className="char__list">

            {isLoading}
            {isContent}

            <button style = {{display: isEnded ? "none" : "block"}}
            disabled = {loading} 
            onClick = {()=>{onRequest(offset); setFirstLoad(false)}}
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