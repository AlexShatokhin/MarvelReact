import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import useMarvelService from '../../services/MarvelService';
import './singleComic.scss';

const SingleComicPage = () => {

    const {comicId} = useParams();
    const {getComic, loading, error, cleanError} = useMarvelService();
    const [comic, setComic] = useState(null);

    useEffect(()=>{
        onComicsLoading();
    }, [])

    const onComicsLoading = () => {
        cleanError();
        getComic(comicId)
        .then(onComicLoaded)
    }

    const onComicLoaded = (res) => {
        setComic(res);
    }

    const isLoading = loading ? <Spinner /> : null;
    const isError =  error ? <Error /> : null;
    const isContent = !(loading || error || !comic)? <View comic = {comic} /> : null;

    return (
        <div className="single-comic">
            {isLoading}
            {isError}
            {isContent}
            <Link to = "/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

const View = (props) => {
    const {title, description, thumbnail, pages, language, price} = props.comic;
    return (
        <>
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pages}</p>
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
        </>
    )
}

export default SingleComicPage;