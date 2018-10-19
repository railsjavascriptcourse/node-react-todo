const mongoose = require('mongoose');

mongoose.set('useFindAndModify', false);

mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function(){
  console.log('Connected to MongoDb!');
});

const todoSchema = new mongoose.Schema({
  text: String,
  done: Boolean
})


todoSchema.statics.createDocument = function(params, callback){
  return Todo.create({ text: params.text, done: params.done },
    function (err, todo) {
      if (err) return handleError(err);
      callback(todo);
    }
  )
}

todoSchema.statics.updateDocument = function(id, params, callback){
  return Todo.findOneAndUpdate({ _id: id },
                               {
                                  text: params.text,
                                  done: params.done
                               }, function(err, todo){
                                  callback(todo);
                               })
}

todoSchema.statics.all = function(callback){
  return Todo.find({}, function(err, todos){
    callback({ todos: todos });
  })
}

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;








