const express=require("express");
const router=express.Router();
const {handleGenrateNewShortUrl,
    handleRedirectToShortId,
    handleAnalytics} =require("../controllers/url");

router.post('/generate',handleGenrateNewShortUrl);
router.get('/:shortId', handleRedirectToShortId);
router.get('/analytics/:shortId',handleAnalytics);

module.exports=router;