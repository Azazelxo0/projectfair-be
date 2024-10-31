
const projects = require('../Models/projectSchema')

//add a new project
exports.addProject = async (req, res) => {
    console.log("Inside add project");
    const userId = req.payload;
    console.log("userId:-", userId)
    //request we are getting is from data
    //so it is not possible to directly access the data
    //we need to use multer module to deal with multipart/from data

    const projectImage = req.file.filename
    console.log("Image file name", projectImage)

    const { title, language, github, website, overview } = req.body;

    try {
        const existingProject = await projects.findOne({ github: github });
        if (existingProject) {
            res.status(409).json("Project already exist")
        }
        else {
            const newProject = new projects({
                title,
                language,
                github,
                website,
                overview,
                projectImage,
                userId
            })
            await newProject.save();
            res.status(200).json("Project uploaded successfully")
        }
    } catch (err) {
        res.status(401).json("Project upload failed", err)
    }
}


//get any # project detail for home page
exports.getHomeProject = async (req, res) => {
    try {
        const homeProject = await projects.find().limit(3)
        res.status(200).json(homeProject)
    }
    catch (err) {
        res.send(401).json("Request failed due to:", err)
    }
}
//get all projects
exports.getAllProject = async (req, res) => {
    const searchKey = req.query.search;
    console.log(searchKey);
    const searchQuery = {
        $or: [
            {
                title: {
                    $regex: searchKey,
                    $options: 'i'
                }
            },
            {
                language: {
                    //options i is used to remove case sensitivity
                    $regex: searchKey,
                    $options: 'i'
                }
            }
        ]

    }


    try {
        const allProject = await projects.find(searchQuery)
        res.status(200).json(allProject)
    }
    catch (err) {
        res.send(401).json("Request failed due to:", err)
    }
}
//get all projects uploaded by that specific user  
exports.getUserProject = async (req, res) => {
    userId = req.payload;
    try {
        const allUserProject = await projects.find({ userId: userId });
        res.status(200).json(allUserProject)
    }
    catch (err) {
        res.send(401).json("Request failed due to:", err)
    }
}

//edit project
exports.editUserProject = async(req,res)=>{
    const {id}=req.params;
    const userId = req.payload;
    const {title,language,github,website,overview,projectImage}= req.body;
    const uploadProjectImage = req.file?req.file.filename:projectImage;
    try{
        const updateProject = await projects.findByIdAndUpdate(
            {_id:id},{
              title:title,
              language:language,
              github:github,
              website:website,
              overview:overview,
              projectImage:uploadProjectImage,
              userId:userId
            },
            {
                new:true,
            }

        );
        await updateProject.save();
        res.status(200).json(updateProject)
    }
    catch(error){
        res.status(401).json(error)
    }
}

//delete project
exports.deleteUserProject  = async(req,res)=>{
    const {id}=req.params;
    try{
        const removeProject = await projects.findByIdAndDelete({_id:id})
        res.status(200).json(removeProject)
    }catch(err){
        res.status(401).json(err)
    }
}