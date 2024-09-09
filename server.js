var express = require('express');
var mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost/blogroll', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
  process.exit(1);
});

// Define a schema and model
var Schema = mongoose.Schema;
var BlogSchema = new Schema({
  author: String,
  title: String,
  url: String
});
var Blog = mongoose.model('Blog', BlogSchema);

// Create a new blog entry (if needed for initial testing)
//var blog = new Blog({
  //author: 'John Doe',
  //title: 'My Blog',
  //url: 'http://myblog.com'
//});

//blog.save().then(() => console.log('Blog saved')).catch(err => console.error('Error saving blog:', err));

// Set up Express
var app = express();
app.use(express.static(__dirname + '/public'));

// API to get all blogs
app.get('/api/blogs', function(req, res) {
  Blog.find().then(function(docs) {
    docs.forEach(function(item) {
      console.log('Received a GET request, id = ' + item._id);
    });
    res.send(docs);
  }).catch(function(err) {
    console.error('Error fetching blogs:', err);
    res.status(500).send('Error fetching blogs');
  });
});

var port = 3000;
app.listen(port, () => console.log('Server running on port ' + port));
