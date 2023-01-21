import useHttpHook from "../hooks/Http.hook"

const useMarvelService = () => {

    const _apikey = "50e5395a1a1e4e4347c98612859f811c";
    const _dataURL = "https://gateway.marvel.com:443/v1/public/";
    const _OpeningOffset = 400;

    const {httpRequest, loading, error, cleanError} = useHttpHook();


    async function getAllCharacters(offset = _OpeningOffset){
        const chars = await httpRequest(`${_dataURL}characters?limit=${9}&offset=${offset}&apikey=${_apikey}`);
        return chars.data.results.map(char => _transformCharacter(char))
    }

    async function getCharacter(id) {
        const char = await httpRequest(`${_dataURL}characters/${id}?apikey=${_apikey}`);
        return _transformCharacter(char.data.results[0]);
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

    return {loading, error, cleanError, getCharacter, getAllCharacters};

}

export default useMarvelService;