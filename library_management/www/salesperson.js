$(()=>{
    class SalesPerson {
        constructor(wrapper){
            this.wrapper = $(wrapper)
            this.page_length = 0
            this.start = 0
            this.show();
        }
        show(){
            let me = this;
            this.get_sales_person()    
            const clicknext = $('.next')
            const clickprevious = $('.previous')
            clicknext.on('click', ()=>{
                me.start = me.page_length
                me.get_sales_person()
            })
            clickprevious.on('click', ()=>{
                me.start -= 5
                me.get_sales_person()
            })
        }
        get_sales_person(){
            let me = this
            frappe.call({
                method: 'library_management.www.salesperson.get_sales_person_list',
                args:{
                    start: me.start,
                    page_length: me.page_length
                },
                callback: function(r) {
                 let data = r.message;
                 me.add_to_records(data)
                } 
             })
        }
        async add_to_records(data){
            let me = this
            let html = $(` 
            <table class="table table-bordered table-condensed" align="center">
            <thead>
              <tr style="background-color: #BFBFBF;">
                <th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">Name</th>
                <th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">Mobile No</th>
                <th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">City</th>
                <th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">Zone</th>
                <th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">Designation</th>
              </tr>
            </thead>`)
          let i;
          $('.sales-person').empty();
          console.log(data.length);
          for (i=0; i<data.length; i++) {
            if(data[i]){
                $(` <tbody>
                <div>
                  <tr>
                    <td style="text-align: center;"data-fieldname="opportunity_document" data-fieldtype="Table"><div class="value">${data[i].name1}</div></td>
                    <td style="text-align: center;" data-fieldname="opportunity_document" data-fieldtype="Table"><div class="value">${data[i].mobileno}</div></td>
                    <td style="text-align: center;"data-fieldname="opportunity_document" data-fieldtype="Table"><div class="value">${data[i].city}</div></td>
                    <td style="text-align: center;" data-fieldname="opportunity_document" data-fieldtype="Table"><div class="value">${data[i].zone}</div></td>
                    <td style="text-align: center;" data-fieldname="opportunity_document" data-fieldtype="Table"><div class="value">${data[i].designation}</div></td>
                  </tr>
                </div>
              </tbody>
            </table>`).appendTo(html)
            }
          }
          $(`.sales-person`).append(html);
          this.page_length = data.length;
          this.page_length += this.start

        if(me.start==0){
            $('.previous').hide()
        }
        else(
            $('.previous').show()
        
        )
        if (data.length==5){
            $('.next').show();
        }
        else(
            $('.next').hide())
                  

        }
    }
    new SalesPerson();
})