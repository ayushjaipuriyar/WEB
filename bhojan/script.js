var main = function() {
	
	$('form').submit(function(event) {
		var $input = $(event.target).find('input');
		var comment = $input.val();

		if (comment != "") {
			var html = $('<li>').text(comment); 
			html.prependTo('#comments');
			$input.val("");
		}
		return false;
	});
}
$(document).ready(main);

function check(form){
			if (form.email.value == "admin" && form.password.value == "admin") {
				window.open("cart.html","_self")}
				else{
					alert("this is not the password")
			}
		}
function myFunction() {
    var person = prompt("Please enter your name");
    var adrs = prompt("Pllease enter your address for dilevery ")
    
    if (person) {
        document.getElementById("all").innerHTML =
        "Thank You! " + person + ",for using our service.Your order is being sent to " + adrs;
    }
}

      
$(document).ready(function(){
  $('.add_qty').on('click', function(ev) {
    $currObj = $(ev.currentTarget);
    var currQCount = getCurrQCount($currObj);
      currQCount++;
      updateData($currObj, currQCount);
   });

   $('.remove_qty').on('click', function(ev) {
    $currObj = $(ev.currentTarget);
    var currQCount = getCurrQCount($currObj);

      currQCount--;
      updateData($currObj, currQCount);

   });


  function getCurrQCount($currObj){
    return $currObj.siblings(".input_qty").val();
  }

  function updateData($currObj, currQCount){
    $currObj.siblings(".input_qty").val(currQCount);

    var $parentObj = $currObj.closest(".item-row");
    var itemPrice = $parentObj.find(".item_price").attr("data-price");
    var itemCost = Number(itemPrice) * currQCount;
    $parentObj.find(".item-cost-val").text(itemCost);

    var subTotal = getSubTotal();
    var vatAmount = getVatAmount();
    var shippingCharges = getShippingCharges();
    var totalCost = subTotal + vatAmount + shippingCharges;
    $("#subtotal").text(subTotal);
    $("#total_vat").text(vatAmount);
    $("shipping_charges").text(shippingCharges)
    $("#total_cost").text(totalCost);
  }

  function getSubTotal(){
    var subTotal = 0;
    $(".item-cost-val").each(function() {
      subTotal+= Number($(this).text());
    });
    return subTotal;
  }

  function getVatAmount(){
    var vatPercentage = 0.2;
    return vatPercentage * getSubTotal();
  }
  function getShippingCharges(){
    var shippingCharges = 59;
    $(".shipping_charges").each(function() {
      shippingCharges+= Number($(this).text());
    });
    return shippingCharges;
  }
});

$(function() {
  $('a[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
$(document).ready(function(){
  // Add smooth scrolling to all links
  $("a").on('click', function(event) {

    // Make sure this.hash has a value before overriding default behavior
    if (this.hash !== "") {
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){
   
        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
    } // End if
  });
});	