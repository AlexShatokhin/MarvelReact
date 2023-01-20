class MarvelService{

    _apikey = "50e5395a1a1e4e4347c98612859f811c";
    _dataURL = "https://gateway.marvel.com:443/v1/public/";
    _OpeningOffset = 400;

    async getResource(url){
        const res = await fetch(url);

        if(!res.ok){
            throw new Error(`Could not fetch\nURL:${url}\nStatus: ${res.status}!`);
        } else {
            return await res.json();
        }
    }

    async getAllCharacters(offset = this._OpeningOffset){
        const chars = await this.getResource(`${this._dataURL}characters?limit=${9}&offset=${offset}&apikey=${this._apikey}`);
        return chars.data.results.map(char => this._transformCharacter(char))
    }

    async getCharacter(id) {
        const char = await this.getResource(`${this._dataURL}characters/${id}?apikey=${this._apikey}`)
        return this._transformCharacter(char.data.results[0]);
    }

    _transformCharacter = (char) => {
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

}

export default MarvelService;