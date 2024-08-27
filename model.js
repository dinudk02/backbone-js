var WebsiteModel = Backbone.Model.extend ({
    defaults: {
        name :"dinesh"
    },
    initialize: function() {
        this.changeName();
    },

    changeName: function() {
        this.on("change:name", function(model){
            var new_name = model.get("name");
            alert("hey my name is " + new_name);
        })
    }
})



$(document).ready(function() {
    var page_1 =  new WebsiteModel();
    page_1.set({name:"rethika"});
    page_1.set({name:"rethika2"});
});



// direct attibute 

// $(document).ready(function() {
//     var page_1 =  new WebsiteModel({ name : " the best person in the world"});
//     alert("hello dinesh1" + page_1.get("name"));
// });

// attribute in model

// var WebsiteModel = Backbone.Model.extend ({
//     defaults: {
//         name :" an unknown person "
//     },
//     initialize: function() {
        
//     }
// })

// $(document).ready(function() {
//     var page_1 =  new WebsiteModel();
//     alert("hello dinesh1" + page_1.get("name"));
// });


// model change 

// var WebsiteModel = Backbone.Model.extend ({
//     defaults: {
//         name :"dinesh"
//     },
//     initialize: function() {
//         this.changeName();
//     },

//     changeName: function() {
//         this.on("change:name", function(model){
//             var new_name = model.get("name");
//             alert("hey my name is " + new_name);
//         })
//     }
// })



// $(document).ready(function() {
//     var page_1 =  new WebsiteModel();
//     page_1.set({name:"rethika"});
//     page_1.set({name:"rethika2"});
// });
