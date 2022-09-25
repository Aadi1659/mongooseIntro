const mongoose = require('mongoose'); 

mongoose.connect("mongodb://localhost:27017/fruitsDB");

//create schema or blueprint
const fruitSchema = new mongoose.Schema({
    name:{
       type: String,
       required:[true,"why no name?"]
    },
    rating: {
        type: Number,
        min:1,
        max:10,
    },
    review :String,
    
});

//lets embed a favorite fruit inside the fruitschema it a scheme inside a scheme

const personSchema = new mongoose.Schema({
    name: String,
    age: Number,
    favoriteFruit : fruitSchema,
});

//creating collection called Fruit
const Fruit = mongoose.model("Fruit",fruitSchema);

const Person = mongoose.model("Person",personSchema);

//mongo will very cleverly drop the capital letter F and also add a plural tense s to make it fruits

const person = new Person({
    name:"John",
    age:37,
});

const apple = new Fruit({
    name:"apple",
    rating:7,
    review:"Washington Apples are the best!",
});
const banana = new Fruit({
    name:"banana",
    rating:8,
    review:"Amazing!",
});
const orange = new Fruit({
    name:"orange",
    rating:6,
    review:"A bit sour!",
});
const watermelon = new Fruit({
    name:"watermelon",
    rating:10,
    review:"The best fruit in the world!",
});
const peach = new Fruit({
    rating:8,
    review:"One of the best fruits in the world!",
});
const pineapple = new Fruit({
    name:"pineapple",
    rating:9,
    review:"Great fruit",
});
const grape = new Fruit({
    name:"grape",
    rating:7,
    review:"sometimes good sometimes bad",
});

// pineapple.save();
grape.save();
const amy = new Person({
    name: "Amy",
    age: 34,
    favoriteFruit: pineapple,
})
// amy.save();

//to insert many items into a collection we can use the insertMany() function.
// Fruit.insertMany([banana,orange,watermelon],function(err){
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log("Success!");
//     }
// });

Fruit.find(function(err,fruits){
    if(err){
        console.log(err);
    }
    else{
       
        fruits.forEach(element => {
            console.log(element.name);
        });
    }
});

//updating our peach model with no name
Fruit.updateOne({_id:"63301f6bb4b1d7b2a7d4c53e"},{name:"Peach"},function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("Success!");
    }
})

//deleting the peach model
Fruit.deleteOne({_id:"63301f6bb4b1d7b2a7d4c53e"},function(err){
    if(err){
        console.log("could not delete");
    }
    else{
        console.log("successfully deleted!");
    }
})

//fruit apple is saved in the fruits collection
//person.save();
// peach.save();

//deleting the many johns in the people collection
// Person.deleteMany({name:"John"},function(err){
//     if(err){
//         console.log("could not delete");
//     }
//     else{
//         console.log("successfully deleted");
//     }
// })

Person.updateOne({_id:"63302741a214c1cc4e686fbc"},{favoriteFruit:grape},function(err){
    if(err){
        console.log("ERROR!");
    }
    else{
        console.log("sucessfully updated johns fruit!");
    }
})

// person.save();


