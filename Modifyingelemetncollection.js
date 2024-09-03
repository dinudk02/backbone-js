// add-> use to add a data to object 
// remove-> use to remove a data from object
// set -> set the data 
// shift-> use to shift the index of 0 into last and the index 1 will come to index 0
// unshift-> use to add the data in specfic place and shift +1 index of the chnaged data object
// pop-> startuing index data will be removed 
// removes -> used to remove the data
// where -> to find the object based on there models ex:name




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
    var student = class_1.get(1);
    student.set({name:"harihs"});
    displayCollection("two elememts " , class_1);
});

function displayCollection(string, collection) {
    console.log(string + " " +JSON.stringify(collection.toJSON()));
}