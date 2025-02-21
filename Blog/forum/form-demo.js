function togglePaymentDetails(change, togglePaymentDetails) {
    // get a reference to the form. We can access all the named form inputs through the form element.
    const theForm = document.querySelector('#checkoutform');
    // we will also need the creditCardContainer and paypalUsernameContainer
    const creditCardContainer = document.querySelector('#creditCardNumberContainer');
    const paypalContainer = document.querySelector('#paypalUsernameContainer');
    
    Element.required=false
    Element.classlist.add('hide')  .remove
    let value = e.target.value;

    if (value == 'creditCard') {
        console.log('cc');
    } else if (value == 'paypal') {
        console.log('pp')
    }
    const selectElement = document.getElementById("payemntMethod");

    selectElement.addEventListener('change' , togglePaymentDetails);
  
  }
  