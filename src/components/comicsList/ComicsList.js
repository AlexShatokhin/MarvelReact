import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Transition } from 'react-transition-group';


import useMarvelService from '../../services/MarvelService';

import Spinner from "../Spinner/Spinner"
import Error from "../Error/Error"
import './comicsList.scss';

const ComicsList = () => {

    const {loading, error, cleanError, getAllComics} = useMarvelService();
    const [offset, setOffset] = useState(400);
    const [comics, setComic] = useState([]);
    const [firstLoad, setFirstLoad] = useState(true)


    
    const duration = 300;

    const defaultStyle = {
      transition: `opacity ${duration}ms ease-in-out`,
      opacity: 0,
    }
    
    const transitionStyles = {
      entering: { opacity: 1 },
      entered:  { opacity: 1 },
      exiting:  { opacity: .8 },
      exited:  { opacity: .8 },
    };

    useEffect(()=>{
        console.log(comics)
        if(comics.length === 0)
            onComicsLoading();
    },[]);

    function onComicsLoading(){
        cleanError();
        getAllComics(offset)
        .then(onComicsLoaded);
    }

    function onComicsLoaded(com) {
        setComic([...comics, ...com]);
        setOffset(offset + 9);

    }

    function renderComics(comics){
        const items = comics.map((comic,i)=>{
            return (
                <Transition timeout={300} in = {!(loading || error)}>
                    {state => (
                        <li style ={{
                            ...defaultStyle,
                            ...transitionStyles[state]
                        }} key = {i} className="comics__item">
                            <Link to = {"" + comic.id}>
                                <img src={comic.thumbnail} alt={comic.title} className="comics__item-img"/>
                                <div className="comics__item-name">{comic.title}</div>
                                <div className="comics__item-price">{comic.price}</div>
                            </Link>
                        </li>
                    )}
                </Transition>

            )
        })

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderComics(comics);
    const isLoading = (loading && firstLoad) ? <Spinner /> : null;
    const isError =  error ? <Error /> : null;

    return (
        <div className="comics__list">
            {isLoading}
            {isError}
            {items}
            <button 
            disabled = {loading} 
            onClick={() => {onComicsLoading();setFirstLoad(false);}} 
            className="button button__main button__long">
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;