import frappe
import json
from frappe.utils import cint

no_cache = True

def get_context(context):
    if frappe.session.user == "Guest":
        frappe.throw(_("You need to be logged in to access this page "), frappe.PermissionError)
        context.show_sidebar = True
    # context.salespersonlist = frappe.db.get_all('Sales Person',fields=['name1','id','mobileno','city','zone','designation'])


@frappe.whitelist()
def get_sales_person_list(start=0,page_lenght=5):
    salespersonlist = frappe.db.get_all('Sales Person',fields=['name1','id','mobileno','city','zone','designation'],limit=cint(page_lenght),start=cint(start))
    return salespersonlist
