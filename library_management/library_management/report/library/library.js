// Copyright (c) 2023, yash and contributors
// For license information, please see license.txt
// /* eslint-disable */
// first
// last
// phn

frappe.query_reports["library"] = {
	"filters": [{
		"fieldname":"library_member",
		"label":"Library Member",
		"fieldtype":"Link",
		"options":"Library Member",
		"width":200
		// "reqd":0
	},
	{
		"fieldname":"first_name",
		"label":"First Name",
		"fieldtype":"Data",
		"width":200
		// "reqd":0
	}
]
};
