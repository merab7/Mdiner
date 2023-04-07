import {menuArray} from "./data.js";
   //data from paymentmodal
      const paymentForm=document.getElementById('paymentform')
      paymentForm.addEventListener('submit', function(e){
      e.preventDefault()
       const paymentFormData = new FormData(paymentForm)
       const username = paymentFormData.get('firstname')
      document.getElementById('chekoutsection').innerHTML=`<div class="thanks">
      
      Thanks, ${username} ! Your order is on its way 💜💜💜 ! </div>
      
      `
      document.getElementById('paimentmodalid').style.display='none'
   
   })
        
          //data from paymentmodal
 

          //predecleared variabels
let sumofprice=0
let pickeditems=[]




      //eventlistener herre

      document.addEventListener('click', function(e){
      if(e.target.dataset.buy){

            buyProduct(e.target.dataset.buy)

      } else if(e.target.dataset.remove){
            
            remove(e.target.dataset.remove)

      } else if (e.target.id==='completebtn'){

            document.getElementById('paimentmodalid').style.display='flex'

      }  else if(e.target.id=== 'modal-close-btn'){

            document.getElementById('paimentmodalid').style.display='none'
         
      }

      })


   
        //this function hendels buybtn

            function buyProduct(item){ 
            const targetproduct = menuArray.filter(function(product){
            
            return product.id==item

            })[0];

            const index = pickeditems.findIndex(function(pickeditem) {
                  return pickeditem.id == targetproduct.id;
                });

                if (index > -1) {
                  // If the target product is already in the "pickeditems" array, increase its count
                  pickeditems[index].count++;
                } else {
                  // If the target product is not in the "pickeditems" array, add it with a count of 1
                  targetproduct.count = 1;
                  pickeditems.push(targetproduct);
                }
              
                // Update the total price

              

            sumofprice+=targetproduct.price;
            
            
            document.getElementById('chekoutsection').style.display='flex'

            document.getElementById('totalprice').innerHTML= `
            <p class="tptalpricetext"> Total price:</p>
            <P class="totalprice">$ ${sumofprice}</p>
            `

                    // to be updated
                     
                  renderpicked()
                  
        

            }


            function remove(itemId) {
                  const index = pickeditems.findIndex(function(pickeditem) {
                    return pickeditem.id == itemId;
                  });
                
                  if (index > -1) {
                    const targetproduct = pickeditems[index];
                    // If the target product is in the "pickeditems" array
                    if (pickeditems[index].count > 1) {
                      // If the count of the target product is greater than 1, decrease its count by 1
                      pickeditems[index].count--;
                    }
                    
                    
                    else {
                      // If the count of the target product is 1, remove it from the "pickeditems" array
                      pickeditems.splice(index, 1);
                    }
                
                    // Update the total price
                    sumofprice -= targetproduct.price;
                
                    // Render the updated picked items
                    renderpicked();
                    
                    // Update the total price display
                    document.getElementById('totalprice').innerHTML = `
                      <p class="tptalpricetext"> Total price:</p>
                      <p class="totalprice">$ ${sumofprice}</p>
                    `
                    
                    


                  }
      
                  
                }


            function boughtproductshtml(){

                  let selectedproductes=``
                 
                  pickeditems.forEach(function(selectedone){
                  
                  selectedproductes+=`
                  <div class="selectedblocke">
                  <div class="pickeditemsname">${selectedone.name}  ${selectedone.count} X</div> <i class="fa-regular fa-square-minus" data-remove="${selectedone.id}"></i>
                  <div class="pickeditemsprice">$ ${selectedone.price}</div>
                  </div>
                  `
                  })
                  
                  return selectedproductes
                  



                  
                  }
                  
                  function renderpicked(){
                  
                  document.getElementById('pickeditems').innerHTML=boughtproductshtml()
                  if (pickeditems.length === 0) {
                        document.getElementById('chekoutsection').style.display = 'none';
                      } else {
                        document.getElementById('chekoutsection').style.display = 'flex';
                      }
                  
                  }
            





function productsHtml(){
      let offeredproducts=``

      menuArray.forEach(function(product){
            offeredproducts+=`
            <div class="productblock">
            <div class="productemoji">${product.emoji}</div>
            <div class="productinfo">
            <p class="prductname">${product.name}</p>
            <p class="prductingredients">${product.ingredients}</p>
            <p class="prductprice">$ ${product.price}</p>
            </div>
               
            <i class="fa-solid fa-cart-shopping" data-buy="${product.id}"></i>
            
            
            </div>  
            <div class="productlistdivider"></div>
            `
       })
     
       return offeredproducts
}

function render(){
      document.getElementById('main').innerHTML=productsHtml()
}

render()



      

