const path = require("path");
const express = require("express");
const multer = require("multer");
const File = require('../model/File')
const Router = express.Router();
const fs = require("fs");

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

Router.post(
  "/upload",
  multer().single("file"),

  async (req, res) => {
    try {
      const { title,assignment_id} = req.body;
      const { mimetype } = req.file;
      
      
      var file=await File.findOne({class_id:req.myclass._id,assignment_id,user_id:req.user._id})
      
      
      if(file){
        return res.send({error:"asssignment already submitted"})
      } 
      file = new File({
        class_id:req.myclass._id,assignment_id,user_id:req.user._id,
        user_id:req.user._id,
        file_name:title,
        mimetype,
        file:req.file.buffer,
        submission_time:new Date()
      })
      await file.save()
      res.send("file uploaded successfully.");
    } catch (error) {
      console.log(error)
      res.status(400).send("Error while uploading file. Try again later.");
    }
  }
);




module.exports = Router;
