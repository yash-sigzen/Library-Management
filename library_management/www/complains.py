import frappe
from frappe import _


no_cache = True

def get_context(context):
    if frappe.session.user == "Guest":
        frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
    user = frappe.get_doc("User", frappe.session.user)
    context.task = frappe.get_all('Complain',filters={'sales_person':user.full_name},fields = ['customer','complain'])
    context.show_sidebar = True
