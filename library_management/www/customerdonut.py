import json
import frappe
import frappe.utils
from frappe import utils
from frappe import _
from frappe.utils import *

@frappe.whitelist()
def customer_list():
    sales_person_list = frappe.get_all('Sales Person',fields=['name1'])
    customer_list=[]
    for sales_person in sales_person_list:
        customer_count = frappe.db.count('Customer',filters={'sales_person':sales_person.name1})
        customer_list.append({'sales_person':sales_person.name1,'count':customer_count})
    return customer_list


@frappe.whitelist()
def datalist():
    city_list = frappe.get_all('Customer',fields=['city'])
    customer_list=[]
    return city_list
