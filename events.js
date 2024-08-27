// events  example click 

myView = Backbone.View.extend ({ 
    initialize: function() {
        this.render();
    },
    render: function() {
        var template = _.template($("#one").html(),{});
        this.$el.html(template);
    },
    events: {
        "click ": "onClick",
        "mouseover .hel":"mouseover"
    },
    onClick: function() {
        alert("you clikced me boy");
    },
    mouseover: function() {
        alert("you hover  me boy hahahahah");
    }

})



$(document).ready(function() {
    var page_1 =  new myView({el: $("#unique")});
});