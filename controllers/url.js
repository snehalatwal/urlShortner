const URL=require("../models/url");
const shortid=require("shortid");

async function handleGenrateNewShortUrl(req,res){
    const body=req.body;
    if(!body.url) return res.status(400).json({error: "URL is required"});
    const shortUrl=shortid.generate();
    await URL.create({     
        shortId: shortUrl,
        redirectUrl:body.url,
        visitHistory:[],
        // req.user from middleware auth.js
        createdBy:req.user._id
    });

    return res.render("home", {id:shortUrl});
    
    // res.status(201).json({id:shortUrl});
};

async function handleRedirectToShortId(req, res){
    const shortId = req.params.shortId;
    const entry=await URL.findOneAndUpdate(
    {
        shortId
    },
    {
        $push:{
        visitHistory: {
            timestamps:Date.now(),
        },
    },
});

res.redirect(entry.redirectUrl);
};

async function handleAnalytics(req,res){
    const shortId= req.params.shortId;
    const result= await URL.findOne({shortId});
    res.json({
                   
        totalClicks:result.visitHistory.length, 
        analytics:result.visitHistory
    });
}

module.exports={
    handleGenrateNewShortUrl,
    handleRedirectToShortId,
    handleAnalytics
};