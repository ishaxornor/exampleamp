fetch("records.json")
.then(function(response){
    return response.json();
})
.then(function(records){
    let placeholder = document.querySelector("#data-output");
    let out  = "";
    for(let record of records){
        out += `   
        
        <amp-story-page id="cover-${record.id}">
        
            <!--Layer 1--> 
            <amp-story-grid-layer template="fill">
                <amp-img animate-in="fade" src="${record.image}" width="1080px" height="1920px" layout="responsive"></amp-img>
            </amp-story-grid-layer>
            <!--Layer 1-->

            <!---Layer 2 -->
            <amp-story-grid-layer template="thirds">
                <div grid-area="upper-third">
                    ${record.textlayer}             
                </div>
            </amp-story-grid-layer>
            
            <!---Layer 2 -->


            <!--Layer 3----->
            <amp-story-grid-layer template="thirds">
                <div grid-area="middle-third">
                    ${record.player}         
                </div>
            </amp-story-grid-layer>

            <!--Layer 3----->


        </amp-story-page>   

        `
    }
    placeholder.innerHTML = out;
})