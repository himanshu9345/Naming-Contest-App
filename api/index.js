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
        .catch(error=>{
            console.error(error)
            res.status(404).send("Bad Request");
            
          });
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

router.post('/names',(req,res)=>{
    //req.body....parse using body parser
    /*  
    what to return
    send updated contest and new name information
    1. insert name
    2. update contest
    3. read modified contest info(merge 2,3 with mongo findandmodify)
    4. return data
    */

    const contestId = ObjectID(req.body.contestId);
    const name = req.body.newName;
    //step1
    mdb.collection('names').insertOne({name}).then(result =>
       //step 2 and 3
        mdb.collection('contests').findAndModify(
            {_id: contestId},
            [],
            {$push: { nameIds: result.insertedId}},
            
            {new: true}
            
            
       ).then(doc=>
           res.send({
               
               updatedContest: doc,
               newName: {
                   _id: result.insertedId,
                   name
               }
           })
       )
    )
        .catch(error=>{
            console.error(error);
            res.status(404).send("Bad Request");
            
        });
});

export default router;