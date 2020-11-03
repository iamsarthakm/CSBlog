				 CS BLOG DEMO / READ ME FILE

Intro-
 CS Blogs is a RESTful website for posting and viewing information on topics related to computer science.  

Tech Stack Used-
1.	 Nodejs express
2.	MongoDB
3.	 HTML+CSS
4.	 JavaScript

Dependencies Used-
1.	Mongoose
2.	mongodb
3.	Method-override
4.	Body-parser
5.	Ejs
6.	Express

Gui Frameworks Used-

1.	Bootstrap 4.5


Features-
The site can do CRUD operations.
Create- allows users to create a new record in the database.
Read- allows user to get the database records.
Update – allows user to update the info present in the database.
Delete – allows user to delete a record in the database.




Setting Up Blog Schema 

var csBlogSchema = new mongoose.Schema({

    name: String,
    topic: String,
    description: String
});

var CSBlog = mongoose.model("CSBlog", csBlogSchema);




How To Add a Blog?

1.	Render new.ejs page 	

app.get("/csblogs/new", function (req, res) {
    res.render("new.ejs");
})

2.	Fill the data in the form and send post request to /csblogs

3.	Now getting the data from the form we add it to the database

app.post("/csblogs", function (req, res) {

 
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



How to Show a Particular Blog?

1.	First go to the Index page 

2.	Clicking on show more renders that particular blog page. Show more sends a get request to fetch the info about it. It does that by getting the id of that particular blog and finding the id in the database to fetch it’s info

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
  




How to Edit a Blog?

1.	Render the edit.ejs page

2.	Now edit the details in the form

3.	Hitting update button sends a put request

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










How to Delete a Blog-

1.	Go to the index page then go to that particular blog you want to delete. 
2.	Clicking on delete button send a delete request and the blog is deleted
 
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












Problems I faced-
•	handling put requests
•	setting up paths (slashes confusion)
•	sometimes css properties doesn’t apply because more that particular property has been applied by more specificity attribute. 








References-
1.	https://stackoverflow.com/
2.	https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/Introduction
3.	https://www.sumologic.com/glossary/crud/
4.	https://medium.com/@thejasonfile/restful-routing-2056f799223e
5.	https://www.w3schools.com/css/css_navbar.asp
6.	https://www.geeksforgeeks.org/
7.	https://www.google.com/
8.	https://getbootstrap.com/docs/4.5/getting-started/introduction/




	 
