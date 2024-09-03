myView = Backbone.View.extend ({ 
    template: _.template(" this is inline template"),
    initialize: function() {
        this.render();
    },
    render: function() {
        
        this.$el.html(this.template());
    }

})



$(document).ready(function() {
    var page_1 =  new myView({el: $("#unique")});
});


// external template

// myView = Backbone.View.extend ({ 
//     initialize: function() {
//         this.render();
//     },
//     render: function() {
//         //external template
//         var template = _.template($("#one").html(),{});
//         this.$el.html(template);
//     }

// })



// $(document).ready(function() {
//     var page_1 =  new myView({el: $("#unique")});
// });