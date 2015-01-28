var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
var methodOverride = require('method-override');

books = {
  1: {
    id: 1,
    title: "THE GIRL ON THE TRAIN",
    author: "Paula Hawkins",
    isbn13: "9780698185395",
    description: "A  psychological thriller set in London is full of complications and betrayals."
  },

  2: {
    id: 2,
    title: "SAINT ODD",
    author: "Dean Koontz",
    isbn13: "9780345545886",
    description: "In the conclusion to the Odd Thomas series, Odd, who can communicate with the dead, returns home to small-town California to meet one last challenge."
  },

  3: {
    id: 3,
    title: "GONE GIRL",
    author: "Gillian Flynn",
    isbn13: "9780307588388",
    description: "A woman disappears on the day of her fifth anniversary; is her husband a killer?"
  },

  4: {
    id: 4,
    title: "BIG LITTLE LIES",
    author: "Liane Moriarty",
    isbn13: "9780698138636",
    description: "Who will end up dead, and how, when three mothers with children in the same school become friends?"
  },

  5: {
    id: 5,
    title: "ALL THE LIGHT WE CANNOT SEE",
    author: "Anthony Doerr",
    isbn13: "9781476746609",
    description: "The lives of a blind French girl and a gadget-obsessed German boy before and during World War II, when their paths eventually cross. "
  },

  6: {
    id: 6,
    title: "COLD COLD HEART",
    author: "Tami Hoag",
    isbn13: "9780698157279",
    description: "Shaken by torture and rape at a serial killer’s hands, a TV reporter returns to her hometown, where she investigates the disappearance of a high school friend many years earlier."
  },

  7: {
    id: 7,
    title: "FATAL SCANDAL",
    author: "Marie Force",
    isbn13: "9781426898761",
    description: "In Book 8 of the Fatal series, Lt. Sam Holland of the Metropolitan Police Department defends two colleagues from allegations of scandal."
  },

  8: {
    id: 8,
    title: "CORPS SECURITY: THE SERIES",
    author: "Harper Sloan",
    isbn13: "A00B00RSL6G2K",
    description: "The six novels collected here follow the men of Corps Security, brought together by the Marines, as they pursue love."
  },

  9: {
    id: 9,
    title: "FIFTY SHADES OF GREY",
    author: "E L James",
    isbn13: "9781612130293",
    description: "An inexperienced college student falls in love with a tortured man who has particular sexual tastes; the first book in a trilogy."
  },

  10: {
    id: 10,
    title: "ONE NIGHT STAND",
    author: "JS Cooper and Helen Cooper",
    isbn13: "9781940218335",
    description: "A romantic fling between two wedding guests is more complicated than they thought."
  }
}

var counter = 11;

app.get('/books', function(req, res) {
  res.render('index.ejs', {msg: books})
});

app.post('/book', function(req, res) {
  var add_title = req.body.title;
  var add_author = req.body.author;
  var add_isbn13 = req.body.isbn13;
  var add_description = req.body.description;
  var newbook = {
      id: counter,
      title: add_title,
      author: add_author,
      isbn13: add_isbn13,
      description: add_description
  };
  books[counter] = newbook;
  counter ++
  res.redirect('/books');
});

app.get('/book/:id', function(req, res) {
  var id = req.params.id
  res.render('show.ejs', {msg: books[id]})
});

app.use(methodOverride(function(req, res){
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}));

app.put('/book/:id', function(req, res) {
  var id = req.params.id
  var newtitle = req.body.newtitle.toUpperCase();
  var newauthor = req.body.newauthor;
  var newisbn13 = req.body.newisbn;
  var newdesc = req.body.newdesc;
  if (newtitle !== "") {
    books[id]["title"] = newtitle;
  }
  if (newauthor !== "") {
    books[id]["author"] = newauthor;
  }
  if (newisbn13 !== "") {
    books[id]["isbn13"] = newisbn13;
  }
  if (newdesc !== "") {
    books[id]["description"] = newdesc;
  }
  res.redirect('/book/' + id);
});

app.delete('/book/:id', function(req, res) {
  var id = req.params.id;
  delete books[id];
  res.redirect('/books');
})

app.listen(3000);

console.log("listening on port 3000");
