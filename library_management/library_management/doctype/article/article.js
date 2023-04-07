// Copyright (c) 2023, yash and contributors
// For license information, please see license.txt

frappe.ui.form.on('Article', {
	refresh: function (frm) {
		frm.add_custom_button('Fetch ISBN', () => {
			frm.call('get_isbn')
				.then(r => {
					if(r.message){
						frm.set_value('isbn',r.message)
					}
					console.log(r)
				})
		})

	}
});

frappe.ui.form.on('Article Review', {
	// refresh: function(frm) {
	reviews_add(frm, cdt, cdn) {
		console.log('row added', cdt, cdn);
		let row = frappe.get_doc(cdt, cdn);
		row.rating = 3 / 5;
		frm.refresh();

	},


	reviews_remove(frm, cdt, cdn) {
		console.log('row remove', cdt, cdn);

	},


	reviews_move(frm, cdt, cdn) {
		console.log('row moved', cdt, cdn);

	},
	form_render(frm, cdt, cdn) {
		console.log('row render ', cdt, cdn);

	},
	// }
});
