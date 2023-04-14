import frappe
from frappe import _


no_cache = True

def get_context(context):
    if frappe.session.user == "Guest":
        frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
    current_user = frappe.get_doc("User", frappe.session.user)
    context.customer_list = frappe.get_all('Customer',filters={'sales_person':current_user.full_name},fields=['name1','city','zone','type','category'])
    context.show_sidebar = True
