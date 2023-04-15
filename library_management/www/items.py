import frappe
from frappe import _


no_cache = True

def get_context(context):
    if frappe.session.user == "Guest":
        frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
    context.tasks = frappe.get_all('Items',filters={'invoice_no':frappe.form_dict.invoice_no},fields=['item_code','quantity','rate','discount','total'])
    context.show_sidebar = True
