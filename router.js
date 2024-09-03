//http://000.0.0.0/index.html#/view2

$(document).ready(function() {
    var RouterEx = Backbone.Router.extend({
        routes: {
            'view1': 'firstView',
            'view2': 'secView',
            '': 'thirdView',
        },
        firstView: function() {
            alert("This is the first view selected");
        },
        secView: function() {
            alert("This is the second view selected");
        },
        thirdView: function() {
            alert("This is the third view selected");
        },
    });

    var router = new RouterEx();
    Backbone.history.start();

    // Button event handlers
    $('#view1Btn').on('click', function() {
        router.navigate('view1', { trigger: true });
    });

    $('#view2Btn').on('click', function() {
        router.navigate('view2', { trigger: true });
    });
});
