import { Link } from "react-router-dom";

const SinglePageLayout = ({dataType, prevProps}) => {

    let type, url;

    if(dataType === "Comic"){
        type = <ComicSinglePage prevProps = {prevProps} />
        url= "/comics";
    } else if(dataType === "Character"){
        type = <HeroSinglePage prevProps = {prevProps} />
        url= "/";
    } else {
        url = "/oops";
        type = "error";
    }

    return (
        <div className="single-comic">
            {type}
            <Link to = {url} className="single-comic__back">Back to all</Link>
        </div>
    )

}

const ComicSinglePage = ({prevProps:{thumbnail, title, description, pages, language, price}}) => {
    console.log("200")
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

const HeroSinglePage = ({prevProps:{thumbnail, name, description}}) => {
    return (
        <>
            <img src={thumbnail} alt={name} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{name}</h2>
                <p className="single-comic__descr">{description}</p>
            </div>
        </>
    )
}

export {SinglePageLayout}