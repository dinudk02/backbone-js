var express = require('express');
var mongoose = require('mongoose');
var cors = require('cors');
var path = require('path');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blogroll', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

// Define Blog schema and model
var Schema = mongoose.Schema;
var BlogSchema = new Schema({
  author: String,
  title: String,
  url: String
});

var Blog = mongoose.model('Blog', BlogSchema); // Define the Blog model

var app = express();

// Middleware to parse incoming requests
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve the index.html for the root route
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

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
    author: req.body.author,
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

// API to delete a blog (DELETE)
app.delete('/api/blogs/:id', function(req, res) {
  Blog.findByIdAndDelete(req.params.id).then(function(blog) {
    if (!blog) {
      return res.status(404).send('Blog not found');
    }
    console.log('Blog deleted successfully:', blog);
    res.status(200).send('Blog deleted');
  }).catch(function(err) {
    console.error('Error deleting blog:', err);
    res.status(500).send('Error deleting blog');
  });
});

var port = 3000;
app.listen(port, () => console.log('Server running on port ' + port));
