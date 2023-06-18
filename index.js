const express = require("express");
const app = express();
app.use(express.json())

const uuid = require("uuid");

const users = [];

const chekeUserId = (request, response, next) => {

   const { id } = request.params;

   const index = users.findIndex( user => user.id === id);

   if(index < 0){
     return response.status(404).json({error: "User not found"})
   }

   request.userIndex = index;
   request.userId = id;

   next()
}

const checkurl = (request, response, next) => {

   const method = request.method;
   const url = request.url;
   console.log(`${method}, ${url}`);



   next()
}



app.get('/order/', checkurl,  (request, response) => {
   return response.json(users)
})

app.post('/order/', checkurl,(request, response) => {
   const { order, clientName, price, status} = request.body;

   const user = {id:uuid.v4(), order, clientName, price, status};

   users.push(user);
 
   return response.json(users);
})

app.put('/order/:id', chekeUserId, checkurl, (request, response) => {
   const {order, clientName, price, status} = request.body;
   const id = request.userId;
   const index = request.userIndex;

   const updateServer = {id, order, clientName, price, status};

   users[index] = updateServer;

   return response.json(updateServer);
});


app.delete('/order/:id', chekeUserId, checkurl,(request, response) => {
   const index = request.userIndex;

   users.splice(index, 1);

   return response.status(204).json()
});

app.get('/order/:id', chekeUserId, checkurl, (request, response) => {
   const id = request.userId;
   const index = request.userIndex;

   users[id] = index;

   return response.json(users[index]);
});

app.patch('/order/:id', chekeUserId, checkurl, (request, response) => {
   
   const index = request.userIndex;
   const purchaseOrder = users[index]
 
   purchaseOrder.status = "Pedido Pronto"
   

      return response.json(purchaseOrder);
})




  



app.listen(3000, (resquest, response) => {
console.log(`Server started on 3000 🚀🚀`)
})