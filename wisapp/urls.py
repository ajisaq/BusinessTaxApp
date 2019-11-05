from .import views
from django.urls import path

urlpatterns = [
	path('', views.home_page, name="home_page"),
	path('staff/', views.staff_list, name="staff"),
	path('staff/add/', views.staff_add, name="staff_add"),
	path('staff/save/', views.staff_save, name="staff_save"),
	path('staff/search/', views.staff_search, name="staff_search"),
	path('departments/', views.department_list, name="departments"),
	path('departments/add/', views.department_add, name="department_add"),
	path('async/staff/list/', views.get_staff_list, name="get_staff_list"),
	path('report/department/<int:department>/', views.department_report, name="staff_pdf_report"),
	path('report/bank/<int:department>/', views.bank_report, name="staff_bank_pdf_report"),
]