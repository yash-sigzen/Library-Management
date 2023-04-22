$(() => {
	console.log(this);
	class ListCustomer {
		constructor(wrapper) {
			this.wrapper = $(wrapper)
			this.sales_name = ""
			this.zone = ""
			this.page_length = 0
			this.start = 0
			// Render Product Views, Filters & Search
			this.show();
		}
		show() {
			this.setup_documents()
			const $createbooking = $('.create-booking');
			const $next = $('.next');
			const $previous = $('.previous');
			let me = this;
			$next.on('click', () => {
				me.start = me.page_length
				me.setup_documents();
			});
			$previous.on('click', () => {
				if(me.start>0){
					me.start = me.start-4
					me.setup_documents();
				}
			});
			$createbooking.on('click', () => {
				if(me.sales_name){
					me.show_customer_dialog();
				}else{
					frappe.throw(__('Select Sales Person'))
				}
			});
			$('.sales-person').empty();
			let sales_person = frappe.ui.form.make_control({
				df: {
					label:"Select Sales Person",
					fieldtype: 'Link',
					fieldname: 'sales_person',
					options:'Sales Person',
					placeholder: __('Sales Person'),
					input_class: 'input-xs',
					change: () => {
						me.sales_person = sales_person.get_value()
						me.sales_name = sales_person.get_value()
						me.start = 0
						me.setup_documents()
						me.make_sales_person_profile()
						// me.setup_documents();
					}
				},
				parent: $('.sales-person')
			});
			sales_person.refresh();
			$('[data-fieldname="sales_person"]').append('<div class="sales-person-info"></div>');
			$('.zone').empty();
			let zone = frappe.ui.form.make_control({
				df: {
					label:"Select Zone",
					fieldtype: 'Select',
					fieldname: 'xone',
					options:'\nNorth\nSouth\nEast\nWest',
					placeholder: __('Zone'),
					input_class: 'input-xs',
					change: () => {
						me.zone = zone.get_value()
						me.start = 0
						me.setup_documents()
					}
				},
				parent: $('.zone')
			});
			zone.refresh();
		}
		show_customer_dialog(){
			let me = this
			let d = new frappe.ui.Dialog({
				title: 'Enter Customer details',
				fields: [
					{
						label: 'Customer Name',
						fieldname: 'customer_name',
						fieldtype: 'Data',
						mandatory:1
					},
					{
						label: 'City',
						fieldname: 'city',
						fieldtype: 'Data',
						mandatory:1
					},
					{
						label: 'Type',
						fieldname: 'type',
						fieldtype: 'Select',
						options:"Dealer\nPrivate\nArchitect\nTrader\nBuilder\nDealer",
						mandatory:1
					},
					{
						label: 'Zone',
						fieldname: 'zone',
						fieldtype: 'Select',
						options:"North\nSouth\nEast\nWest",
						mandatory:1
					},
					{
						label: 'Category',
						fieldname: 'category',
						fieldtype: 'Select',
						options:"Private\nPublic\nGoverment",
						mandatory:1
					}
				],
				primary_action_label: 'create',
				primary_action(values) {
					me.create_customer(values)
					d.hide();
				}
			});
			d.show();
		}
		create_customer(values){
			let me = this
			return frappe.xcall('library_management.www.customer.create_customer', {
				customer: values,
				sales_person:this.sales_name
			}).then((booking) => {
				if (booking) {
					frappe.msgprint("Customer Created")
					me.setup_documents()
				}
			});
		}
		make_sales_person_profile(){
			this.get_sales_person_info().then(() => {
				$('.sales-person-info').empty().append(frappe.render_template('sales_person_info', {
					sales_person_image: this.sales_person.image,
					sales_person_name: this.sales_person.name1,
					mobileno: this.sales_person.mobileno
				}));
			});
		}
		setup_buttons() {
			let me = this;
			const $customer = $('.btn-customer');
			$customer.on('click', () => {
				($(this).attr('data-cusconsole.logtomer'));
			})
		}
		get_sales_person_info() {
			let me = this;
			return frappe.xcall('library_management.www.customer.get_sales_person_info', {
				name: this.sales_person,
			}).then((sales_person) => {
				if (sales_person) {
					this.sales_person = sales_person;
					this.sales_person_name1 = sales_person.name
					if(this.sales_person_name1){
						$('.booking-link').empty()
						$('.booking-link').append(`<a href="/app/sales-person/${this.sales_person_name1}">${sales_person.name1}</a>`)
						document.getElementById('create-booking').style.visibility = "visible";
					}else{
						$('.booking-link').empty()
					}
				}
			});
		}
		setup_documents() {
			let me = this;
			frappe.call({
				method: 'library_management.www.customer.get_customer',
				args:{
					sales_person:this.sales_name,
					zone:this.zone,
					start: this.start,
					page_length: 4
				},
				callback: function(r) {
					let data = r.message;
					me.add_to_records(data);
				}
			});
		}
		async add_to_records(data) {
			let me = this
			let details = $(`<table class="table table-bordered table-condensed">
			<thead>
			<tr style="background-color: #BFBFBF;">
			<th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">Customer Name</th>
			<th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">City</th>
			<th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">Zone</th>
			<th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">Type</th>
			<th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">Category</th>
			<th style="width: 150px;text-align: center;" class="" data-fieldname="opportunity_document" data-fieldtype="Table">Sales Person</th>
			</tr>
			</thead>`);
			let i;
			$('.cars-list').empty();
			for (i=0; i<data.length; i++) {
				if (data[i]) {
					$(`<tbody class="table table-bordered table-condensed" style="margin-top: -21px;"><tbody>
					<div><tr>
					<td style="text-align: center;"data-fieldname="opportunity_document" data-fieldtype="Table"><a class="btn-customer" data-customer='${data[i].name1}'><div class="value">${data[i].name1}</div></a></td>
					<td style="text-align: center;" data-fieldname="opportunity_document" data-fieldtype="Table"><div class="value">${data[i].city}</div></td>
					<td style="text-align: center;"data-fieldname="opportunity_document" data-fieldtype="Table"><div class="value">${data[i].zone}</div></td>
					<td style="text-align: center;" data-fieldname="opportunity_document" data-fieldtype="Table"><div class="value">${data[i].type}</div></td>
					<td style="text-align: center;" data-fieldname="opportunity_document" data-fieldtype="Table"><div class="value">${data[i].category}</div></td>
					<td style="text-align: center;" data-fieldname="opportunity_document" data-fieldtype="Table"><div class="value">${data[i].sales_person}</div></td>
					</tr></div>
					</tbody>
					</table>`).appendTo(details)
				}
			}
			$('.cars-list').append(details);
			this.page_length= data.length;
			this.page_length+=this.start
			if (this.start==0){
				$(".previous").hide();
			}else{
				$(".previous").show();
			}
			if (data.length === 4) {
				$(".next").show();
			} else {
				$(".next").hide();
			}
		}
	}
	new ListCustomer();
});
