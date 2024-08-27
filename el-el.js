// el -> references a DOM object
// $el -> it is a jquery object that still references the same DOm object as el 


myView = Backbone.View.extend ({
    defaults: {
    },
    initialize: function() {
        console.log(this.el);
        console.log(this.$el);
        this.$el.append("the string is added");
    }
})



$(document).ready(function() {
    var page_1 =  new myView({el: $("#unique")});
});
