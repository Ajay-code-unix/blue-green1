const express=require('express')
const app = express();
const PORT=3000;
app.get('/',(req,res)=> res.send('Hello bg'));
app.listen(PORT,()=>console.log(`APP running on Port ${PORT}`));

