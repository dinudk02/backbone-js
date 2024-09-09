var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blogroll', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

var app = express();

// Middleware to parse incoming requests
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors());

// Define a schema and model
var Schema = mongoose.Schema;
var BlogSchema = new Schema({
  author: String,
  title: String,
  url: String
});
var Blog = mongoose.model('Blog', BlogSchema);

// Serve static files from the public directory
app.use(express.static(__dirname + '/public'));

// API to get all blogs
app.get('/api/blogs', function(req, res) {
  Blog.find().then(function(docs) {
    res.send(docs);
  }).catch(function(err) {
    console.error('Error fetching blogs:', err);
    res.status(500).send('Error fetching blogs');
  });
});

// API to add a new blog (POST)
app.post('/api/blogs', function(req, res) {
  var newBlog = new Blog({
    author: req.body.author,  // Access req.body correctly after body-parser
    title: req.body.title,
    url: req.body.url
  });

  newBlog.save().then(function(blog) {
    console.log('Blog added successfully:', blog);
    res.status(201).send(blog);
  }).catch(function(err) {
    console.error('Error adding blog:', err);
    res.status(500).send('Error adding blog');
  });
});

var port = 3000;
app.listen(port, () => console.log('Server running on port ' + port));
