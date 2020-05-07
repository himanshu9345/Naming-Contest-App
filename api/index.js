import express from "express";
import {MongoClient} from 'mongodb'
import assert from 'assert';
import config from '../config';

//mongo connected obj for external use
let mdb;
MongoClient.connect(config.mongodbUri,(err,db)=>{
    assert.equal(null,err);
    mdb = db.db(config.mongodbDB);
    
})

const router = express.Router();

router.get("/contests",(req,res)=>{
    let contests = {}
    mdb.collection('contests').find({})
        .project({
            id: 1,
            categoryName: 1,
            contestName: 1
        })
        .each((err,contest)=>{
            assert.equal(null,err);
            
            if (!contest){//when all contests are read
                res.send({contests});
                return;
            }
            contests[contest.id]=contest;
        })
});

router.get("/contest/:contestId",(req,res)=>{
    console.log("ggg")
    mdb.collection('contests')
        .findOne({id: Number(req.params.contestId)})
        .then(contest => res.send(contest))
        .catch(console.error);
});


router.get("/names/:nameIds",(req,res)=>{
    const nameIds = req.params.nameIds.split(',').map(Number) ;
    let names = {}
    mdb.collection('names').find({id: {$in : nameIds}})
        .each((err,name)=>{
            assert.equal(null,err);
            
            if (!name){//when all names are read
                res.send({names});
                return;
            }
            names[name.id]=name;
        })
});


export default router;