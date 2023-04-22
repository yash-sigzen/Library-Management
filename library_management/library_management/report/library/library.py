# Copyright (c) 2023, yash and contributors
# For license information, please see license.txt

import frappe


def execute(filters=None):
	columns = get_columns()
	data = get_data(filters)
	return columns, data



def get_columns():
	return [
		"library member:Link/Library Member:200",
		"First Name::200",
		"Last Name::200"
	]



def get_data(filters=None):

	conditions="1=1"
	if(filters.get("library_member")):conditions+=f" AND name='{filters.get('library_member')}'"
	if(filters.get("first_name")):conditions+=f" AND first_name like '%{filters.get('first_name')}%'"
	data=frappe.db.sql(f"""select name,first_name,last_name from `tabLibrary Member` where {conditions}""")
	return data