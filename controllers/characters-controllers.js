const Schema = require("../models/schema")
const asyncWrapper = require("../middleware/async")
const { CreateCustomError } = require("../error/customError")
const getallCharacters = asyncWrapper( async (req,res,next)=>{

    const skip=12
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