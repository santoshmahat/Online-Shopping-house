var itemList=[];
$(document).ready(function(){
      output();
        
	$(".item").on('click',function(){
       
      var item=$(this.dataset)[0];
      item.quantity=1;
      var itemInList=false;
      $.each(itemList,function(index,value){

            if(value.id==item.id){
               value.quantity=parseInt(value.quantity)+parseInt(item.quantity);
               itemInList=true;
            }

      });

    if(!itemInList){
    	itemList.push(item);
    }

    sessionStorage["ss"]=JSON.stringify(itemList);
     output();

	});


function output(){
	if(sessionStorage["ss"]!=null){
      	itemList=JSON.parse(sessionStorage["ss"].toString());
      }
	console.log(sessionStorage["ss"]);
	 
	 var holder="";
	 var total=0;
	 var count=0;
	$.each(itemList,function(index,value){
		var subTotal=value.quantity* value.price;
		    count=count + parseInt(value.quantity);
            total=total+subTotal;
           holder +='<tr><td>'+value.name+'</td><td>'+ value.quantity+'</td><td>'+value.price + '</td><td>' + formatMoney(subTotal) +'</td></tr>';
           
	});
	  holder=holder+ '<tr><td>Total</td><td>'+formatMoney(total)+'</td></tr>';
      $("#display").html(holder);
      $("#total").html(formatMoney(total));

      $("#totalQty").html(count);



function formatMoney(n){
	return "$"+ (n/100).toFixed(2);
}



});