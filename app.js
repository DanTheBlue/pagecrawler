var request = require("request");
var cheerio = require("cheerio");
var MongoClient = require('mongodb').MongoClient



var elements = [];
var text = [];

request({
  uri: "http://www.google.com",
}, function(error, response, body) {

  //Parse as html
  var parsed = cheerio.parseHTML(body);

  for(var i = 0; i < parsed.length; i++) {
    traverseList(parsed[i]);
  }

  console.log(elements);
  console.log(text);

  var page = {
    "url" : "http://www.google.com",
    "time" : new Date(),
    "words" : text,
    "elements" : elements
  };

  MongoClient.connect('mongodb://localhost:27017/pagecrawler', function(err, db) {
    if(err) throw err;

    var collection = db.collection('pagecrawler');
    collection.insert(page, function(err, inserted) {

    });

    db.close();
  });
  
});

var addHTML = function(name) {
  var current = checkIfExists(elements, name);
  if(current !== null) {
    current.quantity++;
  }

  else {
    addNewTag(name, 1);
  }
}

var addNewTag = function(name, quantity) {
  var current = {
    "name" : name,
    "quantity" : quantity
  };
  elements.push(current);
}

var addNewText = function(name, quantity) {
  var current = {
    "name" : name,
    "quantity" : quantity
  };

  text.push(current);
}


var addText = function(name) {
  var current = checkIfExists(text, name);

  if(current !== null) {
    current.quantity++;
  }

  else {
    addNewText(name, 1);
  }

}
/* Checks if the provided array contains an object with the string as a name. */
var checkIfExists = function(array, string) {
  for(var i =0; i < array.length; i++) {
    if(array[i].name === string) {
      return array[i];
    }
  }

  return null;
}

var traverseList = function(object) {
  if(object.type === 'tag'){
    //elements.push(object.name);
    addHTML(object.name);
    if(object.children.length > 0) {
      for(var i = 0; i < object.children.length; i++) {
        traverseList(object.children[i]);
      }
    }
  }

  else if(object.type === 'text') {
    var words = object.data.toString().split(' ');
    
    for(var i = 0; i < words.length; i++) {
      addText(words[i]);
    }

    //addText(object.data);
  }
}