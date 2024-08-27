// creating new html element in views

myView = Backbone.View.extend ({
    tagName: "span",
    className: "taging",
    id: "span1",
    initialize: function() {
        console.log(this.el);
        console.log(this.$el)
        // this will be appended in the unique class 
        $("#unique").append(this.el);

    }
})



$(document).ready(function() {
    var page_1 =  new myView();
});
