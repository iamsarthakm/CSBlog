//====================================================================================================================
//Adding the required dependencies and setting properties
//====================================================================================================================

var express = require("express");
var app = express();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

mongoose.connect('mongodb://localhost/csblog', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ encoded: true, useUnifiedTopology: true, extended: true }));

app.use(methodOverride('_method'));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(express.static('public'));

//==================================================================================================================
//Schema of Blog Site
//==================================================================================================================

var csBlogSchema = new mongoose.Schema({

    name: String,
    topic: String,
    description: String
});

var CSBlog = mongoose.model("CSBlog", csBlogSchema);




//==========================================================================================================
//GET REQUESTS
//==========================================================================================================


//displaying the landing page

app.get("/", function (req, res) {

    res.render("landing.ejs");

});



//find all the blogs and parse the data to index page where all our blogs will be displayed

app.get("/csblogs", function (req, res) {
    
    CSBlog.find({}, function (err, allblogs) {
        if (err) {
            console.log(err);
        }
        else {
            res.render("index.ejs", { csblogs: allblogs });
        }

    });
})

//show a form for adding a blog 

app.get("/csblogs/new", function (req, res) {
    res.render("new.ejs");
})

//show a particular blog by using id and finding the blog with that particulat id and parding the data to show page

app.get("/csblogs/:id", function (req, res) {

    CSBlog.findById(req.params.id, function (err, foundBlog) {

        if (err) {
            console.log(err);
        }
        else {
            res.render("show.ejs",{csblog:foundBlog});
        }


    });

});

//show a form for editing the blog

app.get("/csblogs/:id/edit",function(req,res){

    CSBlog.findById(req.params.id,function(err,foundcsblog){

        res.render("edit.ejs",{csblog:foundcsblog});
    });

    

});




//===================================================================================================
//POST REQUESTS
//===================================================================================================

// adding a new blog to the database

app.post("/csblogs", function (req, res) {

    
    //The information we get from HTML Form page is extracted here and added to the database

    var topic = req.body.topic;
    var name = req.body.name;
    var description = req.body.description;

    var newCSBlog = {
        topic: topic,
        name: name,
        description: description
    }
    CSBlog.create(newCSBlog, function (err, newcsBlog) {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/csblogs");
        }

    })


});

//===================================================================================================================
//PUT REQUESTS
//===================================================================================================================

//editing the blog information and updating the database

app.put("/csblogs/:id",function(req,res){

    CSBlog.findByIdAndUpdate(req.params.id,req.body.csblog,function(err,updatedBlog){

            if(err){
                console.log(err);
            }
            else{
                res.redirect("/csblogs/"+req.params.id);
            }

    });

});




//====================================================================================================================
//DELETE REQUESTS
//====================================================================================================================

//deleting the blog from the database

app.delete("/csblogs/:id", function (req, res) {


    CSBlog.findByIdAndRemove(req.params.id, function (err) {

        if (err) {
            console.log(err);
        }
        else {
            res.redirect("/csblogs");
        }
    });

});





//===========================================
//Listening to all the requests !!Mandatory!!
//===========================================

app.listen(3000, function () {
    console.log("Server has started succesfully");
});


