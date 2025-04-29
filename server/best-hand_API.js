const {findBestHand} = require("./Main_working/best_hand");
const {END_WINNING} = require("./END");
const express = require('express');
const pokerApi = express();
const PORT = 3000;

pokerApi.use(express.json());

pokerApi.post('/hand-array',(req , res) => {
    const {usercards , flopcards} = req.body;

    if(!Array.isArray(usercards) || !Array.isArray(flopcards)){
        return res.status(400).json({error : 'Input should be an array'});
    }
    
    const ans =  findBestHand(usercards , flopcards);

    res.json({result : ans });
});

pokerApi.post('/end-game' , (req,res) => {
    const {priority1 , hand1 , priority2 , hand2} = req.body;

    if(!Array.isArray(hand1) || !Array.isArray(hand2)){
        return res.status(400).json({error : 'Input should be an array'});
    }
    
    if(!Number.isInteger(priority1) || !Number.isInteger(priority2)){
        return res.status(400).json({error : 'Input should be an array'});
    }

    const ans = END_WINNING(priority1 , hand1 , priority2 , hand2);

    res.json({result : ans});
});

pokerApi.listen(PORT , () => {
    console.log(`Server is successfully running at http://localhost:${PORT}`);
})