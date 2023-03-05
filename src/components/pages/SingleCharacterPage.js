import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import Spinner from '../Spinner/Spinner';
import Error from '../Error/Error';
import useMarvelService from '../../services/MarvelService';
import {SinglePageLayout} from './SinglePageLayout'
import './singleComic.scss';

const SingleCharacterPage = () => {

    const {charName} = useParams();
    const {getCharacterByName, loading, error, cleanError} = useMarvelService();
    const [char, setChar] = useState(null);

    useEffect(()=>{
        onCharLoading();
    }, [])

    const onCharLoading = () => {
        cleanError();
        getCharacterByName(charName)
        .then(onCharLoaded)
    }

    const onCharLoaded = (res) => {
        setChar(res);
    }

    const isLoading = loading ? <Spinner /> : null;
    const isError =  error ? <Error /> : null;
    const isContent = !(loading || error || !char)? <SinglePageLayout dataType={"Character"} prevProps = {char} /> : null;

    return (
        <div className="single-comic">
            {isLoading}
            {isError}
            {isContent}
        </div>
    )
}

export default SingleCharacterPage;