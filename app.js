const express = require('express');
const tagHandler = require('./controllers/tagHandler');
const dataControl = require('./controllers/dataControl');
const apiControl = require('./controllers/apiControl');


const app = express();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.set('view engine', 'ejs');
let glbUsr, glbAll;

app.get("/", function(req, res){
    res.render('index');
});

app.post("/", async function(req, res){
    let userData,userInput,noDuplicates, byPopularity;
    userInput = req.body.userTag.toLowerCase();
    const userTags = tagHandler.userInputs(userInput);

    if(userTags === " " || userTags === "."){
        res.status(404).render("errorRes" , {errorSymbol: userTags});
    }
    
    userData = await apiControl.userChunk(userTags);//Retirieving data for each tag entered
    noDuplicates = dataControl.dataArrange(userData);//Removing elements from data having the same tag set, some names could be repeated as they have different tags although same name

    byPopularity = dataControl.dataSort(noDuplicates);//Sorting data in ascending order
    glbUsr = byPopularity;
    

    res.render("usrDataRender",{listItems : byPopularity});

});

app.get("/all", async function( _, res){
    let tagData = [ "tech", "politics", "culture", "health", "startups", "history", "science", "design"], allData, finalData;
    
    allData = await apiControl.userChunk(tagData);
    temp = dataControl.dataArrange(allData);
    finalData = dataControl.dataSort(temp);
    glbAll = finalData;

    res.render("allDataRender",{listItems : finalData});

});

app.get("/descendingUsr", function(req, res){
    let sortDescArr;

        sortDescArr = glbUsr;
        sortDescArr.sort(function(a,b){
            return b.popularity - a.popularity;
        })

        res.render("descendingTemplate",{listItems: sortDescArr});

});

app.get("/descendingAll", function(req, res){
    let sortDescArr;

        sortDescArr = glbAll;
        sortDescArr.sort(function(a,b){
            return b.popularity - a.popularity;
        })

        res.render("descendingTemplate",{listItems: sortDescArr});

});

app.get("/mainMenu", function(_,res){
    res.redirect("/");
});

app.all('*', (req, res, next) => {
    res.status(404).json({
        status: 'fail',
        message: `Cant find ${req.originalUrl} on this server!`
    })
}) 


app.listen(4000, function(){
    console.log("Running on port 4000");
});


