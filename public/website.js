// Model
var Blog = Backbone.Model.extend({
    defaults: {
        author: '',
        title: '',
        url: ''
    },
    urlRoot: 'http://localhost:3000/api/blogs' // Define where the POST request should go
});

// Collection
var BlogsCollection = Backbone.Collection.extend({
    model: Blog,
    url: 'http://localhost:3000/api/blogs'
});

// Instantiate collection
var blogs = new BlogsCollection();

// Backbone view for a single blog
var BlogView = Backbone.View.extend({
    model: new Blog(),
    tagName: 'tr',
    initialize: function() {
        this.template = _.template($('#blogs-list-template').html());
        this.listenTo(this.model, 'change', this.render);
        this.listenTo(this.model, 'destroy', this.remove);
    },
    events: {
        'click .edit-blog': 'edit',
        'click .update-blog': 'update',
        'click .cancel-blog': 'cancel',
        'click .delete-blog': 'delete'
    },
    edit: function() {
        this.$('.edit-blog').hide();
        this.$('.delete-blog').hide();
        this.$('.update-blog').show();
        this.$('.cancel-blog').show();

        var author = this.$('.author').html();
        var title = this.$('.title').html();
        var url = this.$('.url').html();

        this.$('.author').html('<input type="text" class="form-control author-update" value="' + author + '">');
        this.$('.title').html('<input type="text" class="form-control title-update" value="' + title + '">');
        this.$('.url').html('<input type="text" class="form-control url-update" value="' + url + '">');
    },
    update: function() {
        this.model.set({
            'author': this.$('.author-update').val(),
            'title': this.$('.title-update').val(),
            'url': this.$('.url-update').val()
        });
        this.model.save();
    },
    cancel: function() {
        this.render();
    },
    delete: function() {
        this.model.destroy();
    },
    render: function() {
        this.$el.html(this.template(this.model.toJSON()));
        return this;
    }
});

// Backbone view for all blogs
var BlogsView = Backbone.View.extend({
    model: blogs,
    el: $('.blogs-list'),
    initialize: function() {
        this.listenTo(this.model, 'add', this.render);
        this.listenTo(this.model, 'reset', this.render); // Added to listen to reset after fetching
        this.model.fetch(); // Fetch data from the server
    },
    render: function() {
        var self = this;
        this.$el.html('');
        this.model.each(function(blog) {
            self.$el.append((new BlogView({ model: blog })).render().$el);
        });
        return this;
    }
});

// Instantiate and render the blogs view
var blogsView = new BlogsView();

$(document).ready(function() {
    $('.add-blog').on('click', function() {
        var blog = new Blog({
            author: $('.author-input').val(),
            title: $('.title-input').val(),
            url: $('.url-input').val()
        });

        // Clear the form inputs
        $('.author-input').val('');
        $('.title-input').val('');
        $('.url-input').val('');

        // Save the new blog to the server
        blog.save(null, {
            success: function(model, response) {
                console.log('Blog saved successfully:', response);
                blogs.add(model); // Add the saved blog to the collection
            },
            error: function(model, response) {
                console.error('Error saving blog:', response);
            }
        });
    });

    blogsView.render();
});
