from django.shortcuts import render, redirect
from .models import Staff, Department
from django.contrib import messages
from .forms import StaffAddForm
from django.http import HttpResponse
#from weasyprint import HTML, CSS
from django.template.loader import get_template


def home_page(request):
	temp = 'wisapp/home.html'
	departments_count = Department.objects.all().count()
	staff_count = Staff.objects.all().count()
	ct = {
		'departments_count': departments_count,
		'staff_count': staff_count
		}
	return render(request, temp, ct)

def staff_list(request):
	departments = Department.objects.all()
	ct = {'departments': departments}
	temp = 'wisapp/staff_list.html'
	return render(request, temp, ct)

def department_list(request):
	temp = 'wisapp/department_list.html'
	departments = Department.objects.all()
	ct = {'departments': departments}
	return render(request, temp, ct)

def get_staff_list(request):
	temp = 'wisapp/async/async_staff_list.html'
	dept_id = request.GET.get('dept_id')
	staff_list = Staff.objects.filter(department=dept_id)
	ct = {
		'staff_list': staff_list,
	}

	return render(request, temp, ct)

def staff_add(request):
	departments = Department.objects.all()
	ct = {'departments': departments}
	temp = 'wisapp/staff_add.html'
	return render(request, temp, ct)

def department_add(request):
	if request.method == 'POST':
		data = request.POST
		dept_name = data.get('dept_name')
		dept_code = data.get('dept_code')
		dept_head = data.get('dept_head')

		Department.objects.create(
			name=dept_name,
			dept_id=dept_code,
			hod=dept_head
		).save()

		messages.success(request, f'{dept_name} was successfully added')

		return redirect('departments')
	else:
		messages.error(request, f'Only POST request is allowed')
		return redirect('departments')

def staff_save(request):
	context = {}
	if request.method == 'POST':
		form = StaffAddForm(request.POST, request.FILES)
		if form.is_valid():
			form.save()
			messages.success(request, f'record successfully added')
			return redirect('staff_add')
		else:
			departments = Department.objects.all()
			context =  {"form": form, "departments": departments}
	return render(request, 'wisapp/staff_add.html', context)


def staff_search(request):
	from django.db.models import Q
	keyword = request.GET.get('q')
	query_r = Staff.objects.filter(
		Q(nimc__contains=keyword) |
		Q(first_name__contains=keyword) |
		Q(last_name__contains=keyword)
	)
	temp = 'wisapp/async/search_results.html'
	return render(request, temp, {
		'staff_list': query_r,
		}
	)

def department_report(request, department):
	department = Department.objects.get(id=department)
	staff_list = Staff.objects.filter(department=department.id)
	ct = {
		'staff_list': staff_list, 
		'department': department
	}
	template = "wisapp/report/department.html"
	template = get_template(template)
	html = template.render(ct)

	css_string = """@page {
		size: a4 portrait;
		margin: 1mm;
		counter-increment: page;
	}"""

	#pdf_file = HTML(string=html, base_url=request.build_absolute_uri()).write_pdf(
			#stylesheets=[CSS(string=css_string)],presentational_hints=True)
	pdf_file=""


	response = HttpResponse(pdf_file, content_type='application/pdf')
	response['Content-Disposition'] = 'filename="subject_allocation.pdf"'
	return response
	return HttpResponse(response.getvalue(), content_type='application/pdf')

def bank_report(request, department):
	department = Department.objects.get(id=department)
	staff_list = Staff.objects.filter(department=department.id)
	ct = {
		'staff_list': staff_list, 
		'department': department
	}
	template = "wisapp/report/bank_details.html"
	template = get_template(template)
	html = template.render(ct)

	css_string = """@page {
		size: a4 portrait;
		margin: 1mm;
		counter-increment: page;
	}"""

	#pdf_file = HTML(string=html, base_url=request.build_absolute_uri()).write_pdf(
	#		stylesheets=[CSS(string=css_string)],presentational_hints=True)
	pdf_file = ""

	response = HttpResponse(pdf_file, content_type='application/pdf')
	response['Content-Disposition'] = 'filename="subject_allocation.pdf"'
	return response
	return HttpResponse(response.getvalue(), content_type='application/pdf')