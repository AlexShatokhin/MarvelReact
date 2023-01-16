import { Component } from 'react';

import MarvelService from '../../services/MarvelService'
import Error from '../Error/Error'
import Spinner from '../Spinner/Spinner'
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';

class CharInfo extends Component {

    state = {
        char: localStorage.getItem("charInfo")?  JSON.parse(localStorage.getItem("charInfo")): null,
        loading: false,
        error: false,
    }

    MarvelService = new MarvelService();

    componentDidUpdate(prevProps){
        if(this.props.selectedId !== prevProps.selectedId){
            this.updateChar(this.props.selectedId)
        }
    }


    onCharLoading = () => {
        this.setState({
            loading: true
        })
    }

    onCharLoaded = (char) => {
        this.setState({
            char,
            loading: false
        })
        localStorage.setItem("charInfo", JSON.stringify(char))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    updateChar = (id) => {
        if(id){
            document.documentElement.scrollTop = 400;
            this.onCharLoading();
            this.MarvelService.getCharacter(id)
            .then(res => {this.onCharLoaded(res)})
            .catch(this.onError)
        }

    }

    render(){

        const {loading, error, char} = this.state

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