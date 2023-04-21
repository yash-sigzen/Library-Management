import json
import frappe
import frappe.utils
from frappe import utils
from frappe import _
from frappe.utils import *

@frappe.whitelist()
def customer_list():
    city_list = frappe.get_all('Customer',fields=['city'])
    customer_list=[]
    for city in city_list:
        customer_count = frappe.db.count('Customer',filters={'city':city.coty})
        customer_list.append({'city':city.city,'count':customer_count})
    return customer_list


@frappe.whitelist()
def datalist():
    city_list = frappe.get_all('Customer',fields=['city'])
    customer_list=[]
    for city in city_list:
        customer_count = frappe.db.count('Customer',filters={'city':city.coty})
        customer_list.append({'city':city.city,'count':customer_count})
    return customer_list
