frappe.pages['dashboard1'].on_page_load = function(wrapper) {
	var page = frappe.ui.make_app_page({
		parent: wrapper,
		title: 'Dashboard1',
		single_column: true
	});

	frappe.require('dashboard1.bundle.js',() =>{
		console.log('dashboard bundle loaded');
	})
}