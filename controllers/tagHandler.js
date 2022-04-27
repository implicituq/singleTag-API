
//tags- tech,politics,culture,health,startups,history,science,design
//Breaking up the tags and storing them into an array for calling each provided from given link
exports.userInputs = function (tag){
    let s=0, f=0, userTags= [];

    for(let i=0; i< tag.length ;i++){

        if(tag[i] === ","){
            f = i;
            userTags.push(tag.slice(s,f));
            s = f+1;
        }
        else if(tag[i] === " "){
            userTags = " ";
        }
        else if(tag[i] === "."){
            userTags = ".";
        }
        else if(i === tag.length-1){
            f=i+1;
            userTags.push(tag.slice(s,f));
        }
    }
    return userTags;

}



