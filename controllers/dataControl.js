
exports.dataArrange = function(arr){
    let sendData, arrSerialized;
    arrSerialized = arr.map(e => JSON.stringify(e));
    sendData = [...new Set(arrSerialized)].map(e => JSON.parse(e));
    return sendData;
}

exports.dataSort = function(chunk){
    chunk.sort(function(a,b){
        return a.popularity-b.popularity;
    });
    return chunk;
}



