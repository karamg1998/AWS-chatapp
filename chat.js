const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const path=require('path');
const sequelize=require('./database/db');
const dotenv=require('dotenv');
dotenv.config();

const userRoutes=require('./routes/user');
const messgRoutes=require('./routes/messages');
const groupRoutes=require('./routes/group');

const user=require('./models/user');
const messages=require('./models/messages');
const group=require('./models/group');
const groupMember=require('./models/group-member');
const groupMessages=require('./models/group-messages');

const app=express();

app.use(cors({origin:"http://127.0.0.1:5500"}));
app.use(bodyParser.json());
app.use(userRoutes);
app.use(messgRoutes);
app.use(groupRoutes);
app.use((req,res)=>{
   res.sendFile(path.join(__dirname,`frontend/${req.url}`))
});

user.hasMany(messages);
user.hasMany(group);
user.hasMany(groupMember);
group.hasMany(groupMember);
user.hasMany(groupMessages);
group.hasMany(groupMessages);

sequelize.sync()
.then(app.listen(5000));