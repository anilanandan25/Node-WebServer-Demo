const express= require('express');
const hbs= require('hbs');
const fs= require('fs');

const port =process.env.PORT || 3000;
var app=express();

hbs.registerPartials(__dirname +'/views/partials')
app.set('View Engine','hbs');

app.use((req,res,next)=> {
  var now =new Date().toString();
  var log=`${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('Server.log',log + '\n',(err) ={
    if(err){
      console.log('Unable to append to Server Log');
    }
  });
  next();
});

// app.use((req,res,next) =>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname +'/public'));

hbs.registerHelper('getCurrentYear',()=>{
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt',(text) =>{
  return text.toUpperCase();

});
//for HomePage!!!
app.get('/',(req,res) =>{
  res.render('Home.hbs',{
    welcomNote:"Welcome to my Dynamic Page"
  });
});

app.get('/',(req,res) =>{
//res.send('<h1>Hello Express</h1>');
res.send({
  name:"Anil Kumar",
  age:31,
   likes:['Biking','Babes']
})
});

app.get('/aboutPage',(req,res) => {
res.render('about.hbs',{
  pageTitle:'My First Page on HBS- Handler'
});
});


app.get('/projects', (req,res) =>{
  res.render('projects.hbs',{
    pageTitle:'Projects'
  });
});

//Bad- Send back Jason with Error Message!

app.get('/BadPage',(req,res)=> {
  res.send({
    errorMessage:'Unable to Handle Request'
  });
});

app.listen(port, () =>{
  console.log(`Server is up on port ${port}`);
});
