import frappe
from frappe import _


no_cache = True

def get_context(context):
    if frappe.session.user == "Guest":
        frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
    user = frappe.get_doc("User", frappe.session.user)
    context.customer_list = frappe.db.get_all('Customer',fields=['name1','sales_person','city','zone','type','category','sales_person'])
    context.show_sidebar = True
