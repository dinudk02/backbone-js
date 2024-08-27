// view is used for user interface for the end user 



myView = Backbone.View.extend ({
    defaults: {
    },
    initialize: function() {
        alert(" this is dinesh view ");
    }
})



$(document).ready(function() {
    var page_1 =  new myView();
});
