const Schema = require("../models/schema")
const asyncWrapper = require("../middleware/async")
const { CreateCustomError } = require("../error/customError")
const { query } = require("express")
const getallCharacters = asyncWrapper( async (req,res,next)=>{

    const skip=12
    const status_query=req.query.status ? req.query.status : ['Dead','Alive']
    const gender_query=req.query.gender ? req.query.gender : ['Male','Female']
    const species_query=req.query.species ? req.query.species : ['Andriod', 'Dog','Human/Celestial Hybrid', 'Sakaaran', 'Luphomoids', 'Titan', 'Zehoberei', 'Skrull', 'Black Order', 'Flora Colossus', 'Synthezoid', 'Halfworlder', 'insectoids', 'Eternal', 'NA', 'Asgardian', 'Centaurian', 'Kylosians', 'Faltine', 'Celestial', 'Flerkens', 'Human', 'Kree', 'Human/Kree Hybrid']
    const name_query= req.query.name ? req.query.name : "[A-Za-z0-9]"
    const movie_query = req.query.movie ? req.query.movie : ['Ant-Man', 'Ant-Man and The Wasp', 'Ant-Man and The Wasp: Quantumani','NA', 'Avengers: Age of Ultron', 'Avengers: Infinity War', 'Black Panthe', 'Black Widow', 'Captain America: Civil War', 'Captain America: The First Aveng', 'Captain America: The Winter Soldier', 'Captain Marv', 'Doctor Stran', 'Doctor Strange in the Multiverse of Madness', 'Eternals', 'Guardians of the Galaxy', 'Guardians of the Galaxy Vol.', 'Iron Man', 'Shang-Chi and The Legend of The Ten Ring', 'Spider-Man: Far From Home', 'Spider-Man: Homecomi', 'Spider-Man: No Way Home', 'The Avengers', 'The Incredible Hulk', 'The Marvels', 'Thor', 'Thor: Love and Thund', 'Thor: Ragnarok', 'Thor: The Dark World']
    const tv_series_query = req.query.tv_series ? req.query.tv_series : ['Hawkeye', 'Loki', 'The Falcon and The Winter Soldier', 'WandaVision', 'What If...?','NA']

    if(req.query.status || req.query.gender || req.query.species || req.query.name || req.query.movie || req.query.tv_series)
    {
        const characters = await Schema.find({
            $and:[
                {status:{$in:status_query}},
                {gender:{$in:gender_query}},
                {species:{$in:species_query}},
                {name:{"$regex": req.query.name, "$options": "i" }},
                {movie:{$in:movie_query}},
                {tv_series:{$in:tv_series_query}}
            ]
        }).skip(skip*req.query.page).limit(12)
       
        return res.status(200).json({ characters })
    }
    if(req.query.page)
    {
        if(req.query.page>=0 && req.query.page<=8)
        {
            const characters = await Schema.find({}).skip(skip*req.query.page).limit(12)
            return res.status(200).json({ characters })
        }
        else
        {
            return next(CreateCustomError(`page not found`, 404))
        }
    }
    else
    {
        const characters = await Schema.find({})
        return res.status(200).json({ characters })
    }

})

const createCharacter = asyncWrapper( async (req,res,next)=>{
    const character = await Schema.create(req.body)
    res.status(201).json({character})
})

const getCharacter =  asyncWrapper(async (req,res,next)=>{
    // res.json({id:req.params.id})
    const { name: character } = req.params
    // console.log(character)
    const characterdata = await Schema.findOne({name:character})
    if(!characterdata)
    {
        return next(createCustomError(`No character Found`, 404))
    }
    res.status(200).json({characterdata})
})

const editCharacter =  asyncWrapper( async (req,res,next)=>{
    const { name: character } = req.params
    // console.log(character)
    const characterdata = await Schema.findOneAndUpdate({name:character},req.body,{
        new:true,
        runValidators:true,
    })
    if(!characterdata)
    {
        return next(createCustomError(`No character Found`, 404))
    }
    res.status(200).json({characterdata})
})

const deleteCharacter =  asyncWrapper(async (req,res,next)=>{
    const { name: character } = req.params
    console.log(character)
    const characterdata = await Schema.findOneAndDelete({name:character})
    if(!characterdata)
    {
        return next(createCustomError(`No character Found`, 404))
    }
    res.status(200).json({characterdata})
})


module.exports={
    getallCharacters,
    createCharacter,
    getCharacter,
    editCharacter,
    deleteCharacter,
}