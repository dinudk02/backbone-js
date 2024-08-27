// this is used for rendering html tages in the selected id of the element

myView = Backbone.View.extend ({ 
    initialize: function() {
        this.render();
    },
    render: function() {
        var template = _.template($("#one").html(),{});
        this.$el.html(template);
    }

})



$(document).ready(function() {
    var page_1 =  new myView({el: $("#unique")});
});