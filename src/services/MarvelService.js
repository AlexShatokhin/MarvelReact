import useHttpHook from "../hooks/Http.hook"

const useMarvelService = () => {

    const _apikey = "50e5395a1a1e4e4347c98612859f811c";
    const _dataURL = "https://gateway.marvel.com:443/v1/public/";
    const _OpeningOffset = 1;

    const {httpRequest, loading, error, cleanError} = useHttpHook();


    async function getAllCharacters(offset = _OpeningOffset){
        const chars = await httpRequest(`${_dataURL}characters?limit=${9}&offset=${offset}&apikey=${_apikey}`);
        return chars.data.results.map(char => _transformCharacter(char))
    }

    async function getCharacter(id) {
        const char = await httpRequest(`${_dataURL}characters/${id}?apikey=${_apikey}`);
        return _transformCharacter(char.data.results[0]);
    }

    async function getCharacterByName(name) {
        const char = await httpRequest(`${_dataURL}characters?name=${name}&apikey=${_apikey}`);
        return _transformCharacter(char.data.results[0]) ;
    }

    async function getAllComics(offset = _OpeningOffset){
        const comics = await httpRequest(`${_dataURL}comics?limit=12&offset=${offset}&apikey=${_apikey}`);
        return comics.data.results.map(comic => _transformComic(comic))
    }

    async function getComic(id){
        const comic = await httpRequest(`${_dataURL}comics/${id}?apikey=${_apikey}`);
        return _transformComic(comic.data.results[0]);
    }

    const _transformCharacter = (char) => {
        const pathChar = char;
        return {
            name: pathChar.name,
            description: pathChar.description ? pathChar.description.slice(0,210) + '...' : "There is no description for this character",
            thumbnail: pathChar.thumbnail.path + '.' + pathChar.thumbnail.extension,
            urls: pathChar.urls[0].url,
            wiki:  pathChar.urls[1].url,
            comics: pathChar.comics.items,
            id: pathChar.id,
        }
    }

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description ? comic.description:"There is no description",
            pageCount: comic.pageCount ? `${comic.pageCount} p.` : "No information about the number of pages",
            thumbnail: comic.thumbnail.path + "." + comic.thumbnail.extension,
            language: comic.textObjects[0] ?  comic.textObjects[0].language : "en-us",
            price: comic.prices[0].price ? comic.prices[0].price : 0
        }
    }

    return {loading, error, cleanError, getCharacter, getAllCharacters, getComic, getAllComics, getCharacterByName};

}

export default useMarvelService;