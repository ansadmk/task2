require('dotenv').config()
const express=require('express')
const app=express()
const mongoose=require('mongoose');
const model = require('./model');
const apicalls = require('./apicalls');
const cors=require('cors')
app.use(cors())
app.use(express.json())
const PORT=process.env.PORT || 8080
mongoose.connect(process.env.MONGO_URL)
app.post('/api/add',async (req, res) => {
    const {data}=req.body
    await model.create({
        data
    })
    
    

    await apicalls.updateMany({},{$inc:{add:1}})
    res.json({ message: 'Data added successfully' });
});

// API to edit data
app.post('/api/edit/:id',async (req, res) => {
    // Logic to edit data
    const {data}=req.body
    await model.updateOne({_id:req.params['id']},{data})
    await apicalls.updateMany({},{$inc:{update:1}})
    
    res.json({ message: 'Data updated successfully' });
});

// API to get count
app.get('/api/datas', async (req, res) => {
    const data=await model.find()
     const calls=await apicalls.find()
    res.json({ data,calls:calls[0] });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
