var studentModel = Backbone.Model.extend({
    defaults:{
        name: 'unkown'
    }
});

studentCollection= Backbone.Collection.extend({
    model: studentModel
}); 

$(document).ready(function() {
    var john =  new studentModel({name:"john", id: 1});
    var dinehs =  new studentModel({name:"dinesh", id: 2});
    var class_1 = new studentCollection([john,dinehs]);
    displayCollection("two elememts " , class_1);
    var pepe =  new studentModel({name:"pepe", id: 3});
    
    //add
    class_1.add([pepe]);
    displayCollection("three elememts " , class_1);
    
    //remove
    class_1.remove([dinehs]);
    displayCollection("remove elememts " , class_1);
});

function displayCollection(string, collection) {
    console.log(string + " " +JSON.stringify(collection.toJSON()));
}