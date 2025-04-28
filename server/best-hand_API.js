const {findBestHand} = require("./Main_working/best_hand");
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

pokerApi.listen(PORT , () => {
    console.log(`Server is successfully running at http://localhost:${PORT}`);
})