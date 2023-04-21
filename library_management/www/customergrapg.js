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
        var chart = new frappe.Chart("#chart", {
          title: "Sales Person",
          data: {
            labels: sales_person,
            datasets: [
              {
                name: "Data",
                values: count,
              },
            ],
          },
          type: "donut",
          colors: ["#FFC300", "#FF5733", "#C70039"],
          height: 300
        });
      }
    }
  });
}
