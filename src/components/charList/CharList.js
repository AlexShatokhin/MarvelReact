import React from 'react';
import { Component } from 'react';
import PropTypes from 'prop-types';

import Error from '../Error/Error';
import Spinner from '../Spinner/Spinner';
import MarvelService from '../../services/MarvelService';

import './charList.scss';

class CharList extends Component {

    state = {
        chars: [],
        loading: true,
        error: false,
        charListLoading: false,
        offset: 500,
        isEnded: false,
        scrollLoading: false,
    }

    itemRefs = [];

    setRef = (element) => {
        this.itemRefs.push(element);
    }

    onFocus = (index) => {
        if(this.itemRefs){
            this.itemRefs.forEach((item,i) => {
                if( item.classList.contains("char__item_selected")){
                    item.classList.remove("char__item_selected");
                }
                if(i === index){
                    item.classList.add("char__item_selected"); 
                }
            })
        }
    }

    MarvelService = new MarvelService();

    componentDidMount(){
        this.onRequest()
        document.addEventListener("scroll", this.updateCharOnScroll)
    }

    componentWillUnmount(){
        document.removeEventListener("scroll", this.updateCharOnScroll)
    }

    updateCharOnScroll = () => {
        if(!this.state.scrollLoading && (document.documentElement.scrollTop + document.documentElement.clientHeight === document.documentElement.scrollHeight)){
            this.onRequest(this.state.offset)
        }
    }

    onRequest = (offset) => {
        this.onCharListLoading()
        this.MarvelService.getAllCharacters(offset)
        .then(this.onCharLoaded)
        .catch(()=>this.onError())
    }

    onCharListLoading = () => {
        this.setState({
            charListLoading: true,
            scrollLoading: true
        })
    }

    onCharLoaded = (newChars) => {
        let ended = false;
        if(newChars < 9){ended = true;}
        this.setState(({chars})=>({
            chars: [...chars, ...newChars],
            loading: false,
            error: false,
            charListLoading: false,
            offset: this.state.offset + 9 ,
            isEnded: ended,
            scrollLoading: false
        }))
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true,
        })
    }

    renderItems = () => {
        const items = this.state.chars.map((char,i) => {

            let styleImg = {objectFit: "cover"};

            if(char.thumbnail.indexOf("image_not_available.jpg") > -1){
                styleImg = {objectFit: "unset"}
            }

            return <li
            ref = {this.setRef}
            tabIndex = {0}
            key = {char.id}
            char = {char}
            onClick={() => {this.props.selectId(char.id); this.onFocus(i)}} 
            className="char__item"
            onKeyDown={(e) => {
                if (e.key === ' ' || e.key === "Enter") {
                    this.props.selectId(char.id);
                    this.onFocus(i);
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

    render(){

        const {loading, error, charListLoading, isEnded} = this.state;

        const isLoading = loading ? <Spinner></Spinner> : null;
        const isError = error ? <Error /> : null;
        const isContent = !(loading && error) ? this.renderItems() : null;
        return (
            <div className="char__list">
                {isLoading}
                {isError}
                {isContent}

                <button style = {{display: isEnded ? "none" : "block"}}
                 disabled = {charListLoading} 
                 onClick = {()=>this.onRequest(this.state.offset)}
                  className="button button__main button__long">

                    <div className="inner">load more</div>
                </button>
            </div>
        )
    
    }
}

class ListItem extends Component{
   render(){
    const {char: {name, thumbnail, id}, selectId} = this.props
        let styleImg = {objectFit: "cover"};

        if(thumbnail.indexOf("image_not_available.jpg") > -1){
            styleImg = {objectFit: "unset"}
        }

        return (
            <li onClick={()=>selectId(id)} className="char__item">
                <img style={styleImg} src={thumbnail} alt="abyss"/>
                <div className="char__name">{name}</div>
            </li>
        )
    } 
} 

CharList.propTypes = {
    selectId: PropTypes.func.isRequired
}

export default CharList;