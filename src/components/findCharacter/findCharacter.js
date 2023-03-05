import { Formik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';


import useMarvelService from "../../services/MarvelService"
import "./findCharacter.scss"

const SearchForm = () => {
    const {getCharacterByName, loading} = useMarvelService();
    const [character, setCharacter] = useState(null);
    const [searched, setSearched] = useState(false);
     
    return (
        <Formik
                initialValues={{character: ""}}
                validate = {
                    values => {
                        const errors = {}
                        if(!values.character){
                            errors.character = "This field is required";
                        }
                        if(values.character.length === 1){
                            errors.character = "Character name too short"
                        }
                        return errors
                    }
                }
                onSubmit = {(values)=> {
                   setSearched(true); 
                    getCharacterByName(values.character)
                    .then(setCharacter)
                    .catch(setCharacter)
                }
                }
            >
                {({values, errors, handleBlur, handleSubmit, handleChange}) => {

                    const isError = errors.character ?  <div className="error">{errors.character}</div> : null;
                    const isContent = character ?
                            <div className="success">
                                There is! Visit {character.name} page?
                                <Link to = {"/characters/" + character.name} className="button button__secondary">
                                    <div className="inner">TO PAGE</div>
                                </Link>
                            </div> : <div className="error">The character was not found. Check the name and try again</div>

                        return (
                            <section className="form">
                                <form onSubmit={handleSubmit} action="#" className="form__character">
                                    <div className="form__title">Or find a character by name:</div>
                                    <div className="form__wrapper">
                                        <input
                                            onBlur={handleBlur} 
                                            onChange={(e) => {handleChange(e); setSearched(false)}} 
                                            placeholder="Enter name" 
                                            name = "character" 
                                            type="text" 
                                            className="form__search"
                                            value = {values.character} />
                                        <button disabled = {loading} className="button button__main form_search">
                                        <div className="inner">FIND</div>
                                        </button>
                                    </div>      
                                    {(searched && !loading) ? isContent : isError}                    
                                </form>
                            </section>
                        )
                    }
                }
            </Formik>


    )
}

export default SearchForm