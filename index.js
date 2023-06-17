const express = require("express");
const app = express();
app.use(express.json())

const uuid = require("uuid");

cç


app.get('/order', (resquest, response) => {
   return response.json(users);

});

app.get('/order/:id', (request, response) => {
   const { id } = request.params;
  
   const index = users.findIndex( user => user.id === id);

   if(index < 0){
      return response.status(404).json({message: "User not found"});
   }

   
   return response.json(users[index]);
 })


app.post('/order/', (resquest, response) => {

const { order, clientName, price, status } = resquest.body;

const user = { id:uuid.v4(), order, clientName, price, status };

users.push(user);
console.log(users);

return response.status(201).json(user);


});

app.put('/order/:id', (request, response) => {
   const { id } = request.params;
   const { order, clientName, price} = request.body;

   const updateUsers = { order, clientName, price, id};

   const index = users.findIndex( user => user.id === id);

   if(index < 0){
      return response.status(404).json({message: "User not found"});
   }

   users[index] = updateUsers;

   return response.json(updateUsers);
  

 });

 app.delete('/order/:id', (request, response) => {
   const { id } = request.params;

   const index = users.findIndex( user => user.id === id);

   users.splice(index, 1);
   return response.status(404).json(users);
 });

 
 app.patch('/order/:id', (resquest, response) => {
   const { id } = resquest.params;
   const { order, clientName, price, status } = resquest.params;
   

   const updatSave = {  order, clientName, price, status, id  };
   updatSave.status = "Pronto"
   
   const index = users.findIndex( user => user.id === id);
   
   if(index < 0){
      return response.status(404).json({message: "User not found"});
   }
   console.log(updatSave)
   
   users[index] = updatSave;
   
   
   return response.json(updatSave);

});


app.listen(3000, (resquest, response) => {
console.log(`Server started on 3000 🚀🚀`)
})