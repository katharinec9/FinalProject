var DataPromise = d3.json("Data.json");
    DataPromise.then (function(country){
            console.log("worked", country); 
        
                                      },
                      function(err){
                    console.log("failed:", err);
    })


