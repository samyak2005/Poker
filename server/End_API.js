const {END_WINNING} = require("./END");
const express = require('express');
const endApi = express();
const PORT = 4000;

endApi.use(express.json());

endApi.post('/end-game' , (req,res) => {
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

endApi.listen(PORT , () => {
    console.log(`Server is successfully running at http://localhost:${PORT}`);
})

