const router = require('express').Router()
const Assignment = require('../model/assignment')
const fileRoute = require('./file')
const File = require('../model/File')
router.use('/:a_id',fileRoute);
router.post('/assign',async(req,res)=>{
    try{
        if(!req.isTeacher){
            return res.send({error:"Students are not allowed to upload assignments"})
        }
        const newAssignment = new Assignment(req.body)
        await newAssignment.save()
        res.send({newAssignment,message:"success"})
    }
    catch(e){
        console.log(e)
        res.send({error:"errornous"})
    }
})

router.get('/all',async(req,res)=>{
    try{
        const assignments = await Assignment.find({class_id:req.myclass._id})

        res.send({assignments,message:"all assignments send"})
    }
    catch(e){
        console.log(e)
        res.send({error:"check server console in back"})
    }
})

router.get("/getAllFiles", async (req, res) => {
    try {
        if(!req.isTeacher){
            return res.send({error:"Only teachers are allowed to view this page"})
        }
      const files = await File.find({class_id:req.myclass._id},{file:0}).sort('assignment_id').populate(
          'assignment_id','title').populate( 'user_id','name');
      res.send(files);
    } catch (error) {
        console.log(error)
      res.status(400).send("Error while getting list of files. Try again later.");
    }
  });


  router.get("/download/:id", async (req, res) => {
    try {
      const file = await File.findById(req.params.id);
      res.set({
        "Content-Type": file.file_mimetype,
      });
      res.send(file.file);
    } catch (error) {
      res.status(400).send("Error while downloading file. Try again later.");
    }
  });

module.exports=router