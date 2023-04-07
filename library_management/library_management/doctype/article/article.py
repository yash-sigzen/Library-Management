# Copyright (c) 2023, yash and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class Article(Document):
	def get_title(self):
		return self.article_name

	@frappe.whitelist()
	def get_isbn(self):
		self.isbn = frappe.generate_hash('Article', 10)
