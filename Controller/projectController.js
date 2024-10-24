
const projects = require('../Models/projectSchema')
exports.addProject = async (req, res) => {
    console.log("Inside add project");
    const userId = req.payload;
    console.log("userId:-", userId)
    //request we are getting is from data
    //so it is not possible to directly access the data
    //we need to use multer module to deal with multipart/from data

    const projectImage = req.file.filename
    console.log("image file name", projectImage);


    

    
    
    
}