function dg_orderTotalOnload(executionContext) {
    const formContext = executionContext.getFormContext();
    
	var order = formContext.data.entity.getId();
	var orderTotal = 0;
	var tableLogicalName ="dg_item";
	var options = "?$select=dg_total_price&$filter=dg_order/dg_orderid eq '"+order+"'";
		
	// get order line prices per row, add to total
	
	Xrm.WebApi.retrieveMultipleRecords(tableLogicalName, options).then(
    function success(result) {
        for (var i = 0; i < result.entities.length; i++) {
			orderTotal += result.entities[i]["dg_total_price"]
        }
        
    // set order total value 
		
		formContext.getAttribute("dg_total_order_price").setValue(orderTotal);
    },
    function (error) {
		console.log(error.message);
		// handle error conditions
		}
    );
}