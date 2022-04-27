const superagent = require("superagent");//This js file is responsible for retrieving the required tag data using superagent 

 async function dataChunk(tag) {
    let chunk,temp;

    chunk = await superagent.get(`https://api.hatchways.io/assessment/blog/posts?tag=${tag}`// This link is for demonstrating the App only, and not intended for promotional use of any kind
    //Delete the above line after pasting your API link or it will cause an error
    //Paste your api link between the quotation marks in the line below
    // chunk = await superagent.get(`Paste your API Link here`
    ).catch(err=>{console.log(err.message);});

    temp = JSON.parse(JSON.stringify(chunk.body));
    // console.log(temp);
    return temp;
};

exports.userChunk = async function (tags){
    let data = [],dummy;
    for(let i=0; i<tags.length; i++){
        dummy = await dataChunk(tags[i]);
        async function arrange(temp){
            for(let i=0; i<temp.posts.length; i++){
                data.push(temp.posts[i]);
            }
        }
        arrange(dummy);
    }
    return data;
}