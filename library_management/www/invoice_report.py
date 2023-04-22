import frappe
from frappe import _


no_cache = True

def get_context(context):
    if frappe.session.user == "Guest":
        frappe.throw(_("You need to be logged in to access this page"), frappe.PermissionError)
    user = frappe.get_doc("User", frappe.session.user)
    tasks = frappe.get_all('Invoice',filters={'sales_person':user.full_name},fields=["invoice_no","total_amount","pending_amount","total_amount","customer_name","date"])
    context.tasks = tasks
    context.show_sidebar = True


@frappe.whitelist()
def fiilterargs(from_date, to_date):
    print(f'\n\n\n {from_date} \n\n\n')
    user = frappe.get_doc("User", frappe.session.user)
    tasks = frappe.get_all('Invoice',filters={'sales_person':user.full_name,'date':('>', from_date),'date': ('<',to_date)},fields=["invoice_no","total_amount","pending_amount","total_amount","customer_name","date"])
    #frappe.render_template("www/invoice_report.html", {"tasks": tasks})
    
    return tasks