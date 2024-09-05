var express = require('express');
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/blogroll', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define a schema and model
var Schema = mongoose.Schema;
var BlogSchema = new Schema({
  author: String,
  title: String,
  url: String
});
var Blog = mongoose.model('Blog', BlogSchema);

// Create a new blog entry
var blog = new Blog({
  author: 'John Doe',
  title: 'My Blog',
  url: 'http://myblog.com'
});

blog.save().then(() => console.log('Blog saved'));

// Set up Express
var app = express();
app.use(express.static(__dirname + '/public'));

var port = 3000;
app.listen(port, () => console.log('Server running on port ' + port));
