// const { response } = require("express");
// const express = require("express");
// const app=express();

// const admin=require("firebase-admin");
// const credentials=require("./key.json");


// admin.initializeApp({
//   credential: admin.credential.cert(credentials)
// });

// const db=admin.firestore();

// app.use(express.json());

// app.use(express.urlencoded({extended: true}));


// app.post('/create',async (req,res)=>{
//     try{
//         const id=req.body.email;
//         const UserJson={
//             email: req.body.email,
//              firstname:req.body.firstname,
//              lastname:req.body.lastname
//         }
//         const response=db.collection("users").add(UserJson);
//             res.send(response);
        
//     }catch(error){
//         res.send(error);
//     }
// })



// // app.listen(port, () => console.log(`Server has started on port: ${port}`))
// //module.exports = { db }
// app.listen(8080,()=>{
//     console.log(`Server is running on port 8080`)
// })





const { response } = require("express");
const express = require("express");
const app=express();

const admin=require("firebase-admin");
const credentials=require("./key.json");


admin.initializeApp({
  credential: admin.credential.cert(credentials)
});

const db=admin.firestore();

app.use(express.json());

app.use(express.urlencoded({extended: true}));


app.post('/create',async (req,res)=>{
    try{
        const id=req.body.email;
        const UserJson={
            email: req.body.email,
             firstname:req.body.firstname,
             lastname:req.body.lastname
        }
        const response=db.collection("users").doc(id).set(UserJson);
            res.send(response);
        
    }catch(error){
        res.send(error);
    }
})

app.get('/read/all',async (req,res)=>{
    try{
        const usersRef=db.collection("users");
        const response=await usersRef.get();
        let responseArr=[];
        response.forEach(doc=>{
            responseArr.push(doc.data());
        })
        res.send(responseArr);

    }catch(error){
        res.send(error);
    }
});

app.get('/read/:id',async (req,res)=>{
    try{
        const userRef=db.collection("users").doc(req.params.id);
        const response=await userRef.get();
        res.send(response.data());

    }catch(error){
        res.send(error);
    }
})

app.post('/update',async (req,res)=>{
    try{
        const id=req.body.id;
        const newfirstname="hello world";

        const userRef=await db.collection("users").doc(id)
        .update({
            firstname:newfirstname
        })
        
        res.send(userRef);

    }catch(error){
        res.send(error);
    }
})


app.delete('/delete/:id',async (req,res)=>{
    try{
        const userRef=await db.collection("users").doc(req.params.id).delete()
        
        res.send(response);

    }catch(error){
        res.send(error);
    }
})

app.listen(8080,()=>{
    console.log(`Server is running on port 8080`)
})