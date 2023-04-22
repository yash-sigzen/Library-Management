import json
import frappe
from frappe.utils import cint
from frappe import _
no_cache = True

def get_context(context):
    if frappe.session.user == "Guest":
        frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
    context.show_sidebar = True

@frappe.whitelist()
def get_customer(sales_person=None,zone=None, start=0, page_length=4):
    filters = []
    if sales_person:
        sales_person_name = frappe.db.get_value('Sales Person',sales_person,'name1')
        filters.append({'sales_person':sales_person_name})
    if zone:
        filters.append({'zone':zone})
    result = frappe.db.get_all('Customer',filters=filters, fields=['name1','sales_person','city','zone','type','category','sales_person'],limit=cint(page_length),start=cint(start))
    return result

@frappe.whitelist()
def get_sales_person_info(name):
    if name:
        doc = frappe.get_doc('Sales Person',name)
        return doc
    else:
        return True

@frappe.whitelist()
def create_customer(customer, sales_person):
    customer = json.loads(customer)
    sales_person_name = ''
    if sales_person:
        sales_person_name = frappe.db.get_value('Sales Person',sales_person,'name1')
    customer_doc = frappe.new_doc('Customer')
    customer_doc.name1 = customer['customer_name']
    customer_doc.city = customer['city']
    customer_doc.zone = customer['zone']
    customer_doc.type = customer['type']
    customer_doc.category = customer['category']
    customer_doc.sales_person = sales_person_name
    customer_doc.submit()
    frappe.db.commit()
    if customer_doc:
        return True
