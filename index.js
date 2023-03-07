const express=require("express")
const path=require("path");
const detector   = require('web-technology-detector');

const app=express();
app.use(express.json());
app.set('view engine',"ejs");

const publicPath=path.join(__dirname,'public');


app.get('/',(req,resp)=>{    
        resp.render(publicPath+"/index",{url:""});    
});

app.get('/tech_data/',(req,resp)=>{



    let url=req.query.webUrl;
    try {
        url = new URL(url);
    } catch (_) {
        url="http://"+req.query.webUrl;
    }

    if(url){

        let tech_data=[];

        let technologies = new detector().url(url).then((result)=>{    
            result.forEach(element => {
                        
                    tech_data.push({
                        name:element.name,icon:element.icon,website:element.website,categories:element.categories
                    });

            });

            resp.render(publicPath+"/tech_data",{tech_data:tech_data,url:req.query.webUrl});

        });

        //  console.log(tech_data);   
    }else{
        resp.send("Invalid Url");    
    }
});


app.listen(4000);






