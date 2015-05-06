#The Page Crawler

Crawls the provided page and finds the html and non html tags.

##Starting the program

As it uses node, you should use npm to install the requirements.

`npm install`

once done, run the program using the following command

`node app.js http://www.yahoo.com` replacing yahoo.com with the website you would like to crawl.

The results will be stored in the locally running mongo database, and on the screen.

##Why nodejs

I chose nodejs for this application for 3 main reasons.

1) I have been interested in node, and wanted to learn more about it

2) Node is pretty quick when it comes to making small applications. With a low amount of boilerplate, and flexibility to create a command line or web based projects made it a good candidate.

3) Libraries. Nodejs has a vast array of libraries, and when approriate it is useful to use these to assist in making the application work correctly.

### Libraries

* request - To download the website
* cheerio - Used to parse the html and text elements
* MongoClient - Used to store the data in the mongo database

### Database schema

As the database is mongo there is no direct schema, however an example document is found below.

```json
{
    "_id" : ObjectId("5547e212941cfa69f48b7a61"),
    "url" : "http://www.google.com",
    "time" : ISODate("2015-05-04T21:18:10.767Z"),
    "words" : [ 
        {
            "name" : "Google",
            "quantity" : 3
        }, 
        {
            "name" : "",
            "quantity" : 67
        }, 
        {
            "name" : "Search",
            "quantity" : 2
        }, 
        {
            "name" : "Images",
            "quantity" : 1
        }, 
    ],
    "elements" : [ 
        {
            "name" : "html",
            "quantity" : 1
        }, 
        {
            "name" : "head",
            "quantity" : 1
        }, 
        {
            "name" : "meta",
            "quantity" : 5
        }, 
    ]
}

```

