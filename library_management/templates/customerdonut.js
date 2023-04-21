frappe.ready(function() {
  window.onload = function () {
    frappe.call({
      method: 'library_management.www.customerdonut.customer_list',
      callback: function (r) {
        if(r.message){
          var sales_person = []
          var count = []
          r.message.forEach(function(item) {
            sales_person.push(item.sales_person)
            count.push(item.count)
          })
          let chart = new frappe.Chart( "#chartContainer", { // or DOM element
            data: {
              labels: sales_person,
              datasets: [
                {
                  values: count
                }
              ],
            },
            type: 'pie', // or 'bar', 'line', 'pie', 'percentage', 'donut'
            height: 400,
            colors: ['#0A3771', '#1157B4', '#156DE1']
          });
          chart.render();
        }
      }
    });
  }
})
