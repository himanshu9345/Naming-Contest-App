import express from "express";
import {MongoClient, ObjectID} from 'mongodb'
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
            categoryName: 1,
            contestName: 1
        })
        .each((err,contest)=>{
            assert.equal(null,err);
            
            if (!contest){//when all contests are read
                res.send({contests});
                return;
            }
            contests[contest._id]=contest;
        })
});

router.get("/contest/:contestId",(req,res)=>{
    mdb.collection('contests')
        .findOne({_id: ObjectID(req.params.contestId)})
        .then(contest => res.send(contest))
        .catch(console.error);
});


router.get("/names/:nameIds",(req,res)=>{
    const nameIds = req.params.nameIds.split(',').map(ObjectID) ;
    let names = {}
    mdb.collection('names').find({_id: {$in : nameIds}})
        .each((err,name)=>{
            assert.equal(null,err);
            
            if (!name){//when all names are read
                res.send({names});
                return;
            }
            names[name._id]=name;
        })
});


export default router;