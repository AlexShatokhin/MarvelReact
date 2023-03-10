import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import useMarvelService from '../../services/MarvelService';
import {SinglePageLayout} from './SinglePageLayout'
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
    const isContent = !(loading || error || !comic)? <SinglePageLayout dataType={"Comic"} prevProps = {comic} /> : null;

    return (
        <div className="single-comic">
            {isLoading}
            {isError}
            {isContent}
        </div>
    )
}

export default SingleComicPage;