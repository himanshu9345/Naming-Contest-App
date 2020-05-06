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
    mdb.collection('contests')
        .findOne({id: Number(req.params.contestId)})
        .then(contest => res.send(contest))
        .catch(console.error);
});

export default router;