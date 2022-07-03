const express=require("express")
const router=express.Router()

const {getallCharacters,createCharacter,getCharacter,editCharacter,deleteCharacter} = require("../controllers/characters-controllers")

router.route('/').get(getallCharacters).post(createCharacter)
router.route('/:name').get(getCharacter).patch(editCharacter).delete(deleteCharacter)

module.exports=router
 

