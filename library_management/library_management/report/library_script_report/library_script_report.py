# Copyright (c) 2023, yash and contributors
# For license information, please see license.txt

# import frappe




def execute(filters=None):
    profit = 20
    report_summary = [
		{"value": 1200, "label": 'Income',"datatype": "Currency", "currency": 'INR'},
		{"type": "separator", "value": "-"},
        {"value": 300, "label": "Expense","datatype": "Currency", "currency": "INR"},
		{"type": "separator", "value": "", "color": "blue"},
		{"value": 1200 - 300, "indicator": "Green" if profit > 0 else "Red", "label": "Profit/Loss", "datatype": "Currency", "currency": "INR"}
	]
    columns = [
        {'fieldtype':'Data','label':'Book Name','fieldname': 'book_name','width':100},
        {'fieldtype':'Data','label':'Author','fieldname': 'author','width':100},  
	]
    result = [
        {'book_name': 'Book1', 'author': 'Author1'},
        {'book_name': 'Book2', 'author': 'Author2'},
		{'book_name': 'Book3', 'author': 'Author3'}
	]
    chart = {
        "type": "bar",
        "data": {
			"labels": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
			"datasets": [
				{"name": "Some Data", "values": [50, 40, 30, 35, 81]},	
   				{"name": "Another Set", "values": [25, 50, -10, 15, 18]},
        	],
        }
    }
    return columns,result,'Hellooo',chart,report_summary 












	# columns = [df1, df2]

	# result = [{'df1': 'vall', 'df2': 'val2'}, ...]

	# message = "Hello World"
	
	# data = columns, result, message, chart, report_summary
	# return data
