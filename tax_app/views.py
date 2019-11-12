from django.shortcuts import render, redirect
from django.contrib.auth.models import Permission
from .models import *
from django.http import HttpResponse



def mmm_page(request):
	temp = 'index.html'
	ct = {}
	return render(request, temp, ct)


def update_business(request):
	if request.method == 'POST':
		if(request.POST.get('name')!="" and request.POST.get('tin')!="" and request.POST.get('location')!="" and request.POST.get('category')!="" and request.POST.get('payment_status')!=""):
			business = Business.objects.get(pk=int(request.POST.get('id')))
			business.name=request.POST.get('name')
			business.tin=request.POST.get('tin')
			business.location=request.POST.get('location')
			business.category= Business_Category.objects.get(id=int(request.POST.get('category'))) 
			business.payment_status=request.POST.get('payment_status')
			business.save()
			return redirect("/tax/business/")
def add_business(request):
	bd_cr=[{'name':'Business','url':'/business/'},{'name':'Add', 'url':''}] 
	if request.method == 'POST':
		if(request.POST.get('name')!="" and request.POST.get('tin')!="" and request.POST.get('location')!="" and request.POST.get('category')!="" and request.POST.get('payment_status')!=""):
			business = Business.objects.create(name=request.POST.get('name'), 
			tin=request.POST.get('tin'),
			location=request.POST.get('location'), 
			category=Business_Category.objects.get(id=int(request.POST.get('category'))), 
			payment_status=request.POST.get('payment_status'))
			business.save()
			return redirect("/tax/business/")
	q = request.GET.get('q')
	business = ""

	edit = False
	try:
		business = Business.objects.get(pk=int(q))
		edit = True
		bd_cr=[{'name':'Business','url':'/tax/business/'},{'name':'Edit', 'url':''}]
	except Exception as e:
		pass
	business_category = Business_Category.objects.all()
	location = Location.objects.all()
	return render(request, "tax_app/forms/add_business.html", {'locations':location, 'business':business, 'business_category':business_category, 'edit':edit, 'bd_cr':bd_cr})

def update_location(request):
	if request.method == 'POST':
		if(request.POST.get('code')!="" and request.POST.get('name')!=""):
			loc = Location.objects.get(pk=int(request.POST.get('id')))
			loc.code = request.POST.get('code')
			loc.name = request.POST.get('name')
			loc.save()
			return redirect("/tax/location/")

def add_location(request):
	bd_cr=[{'name':'Location','url':'/tax/location/'},{'name':'Add', 'url':''}]
	if request.method == 'POST':
		if(request.POST.get('code')!="" and request.POST.get('name')!=""):
			loc = Location.objects.create(code=request.POST.get('code'),name=request.POST.get('name'))
			loc.save()
			return redirect("/tax/location/")

	q = request.GET.get('q')
	location = ""
	edit = False
	try:
		location = Location.objects.get(pk=int(q))
		edit = True
		bd_cr=[{'name':'Location','url':'/tax/location/'},{'name':'Edit', 'url':''}]
	except Exception as e:
		pass

	return render(request, "tax_app/forms/add_location.html", {'location':location, 'edit':edit, 'bd_cr':bd_cr})

def update_supervisor(request):
	if request.method == 'POST':
		if(request.POST.get('employee_id')!="" and request.POST.get('name')!="" and request.POST.get('contact')!="" and request.POST.get('location')!=""):
			supervisor = Profile.objects.get(pk=int(request.POST.get('id')))
			supervisor.contact = request.POST.get('contact')
			supervisor.location = request.POST.get('location')
			supervisor.save()
			return redirect("/tax/supervisor/")

def approve_supervisor(request):
	q = request.GET.get('q')
	profile = ""
	edit = False
	try:
		profile = Profile.objects.get(pk=int(q))
		profile.approved = not profile.approved
		profile.save()
		edit = True
	except Exception as e:
		pass

	return redirect("/tax/supervisor/")

def suspend_supervisor(request):
	q = request.GET.get('q')
	profile = ""
	
	edit = False
	try:
		profile = Profile.objects.get(pk=int(q))
		profile.user.is_active = not profile.user.is_active
		edit = True
	except Exception as e:
		pass

	return redirect("/tax/supervisor/")

def add_supervisor(request):
	bd_cr=[{'name':'Supervisor','url':'/tax/supervisor/'},{'name':'Add', 'url':''}]
	q = request.GET.get('q')
	supervisor = ""
	edit = False
	try:
		supervisor = Profile.objects.get(pk=int(q))
		edit = True
		bd_cr=[{'name':'Supervisor','url':'/tax/supervisor/'},{'name':'Edit', 'url':''}]
	except Exception as e:
		pass
	loc = Location.objects.all()
	
	return render(request, "tax_app/forms/add_supervisor.html", {'supervisor':supervisor, 'locations':loc, 'edit':edit, 'bd_cr':bd_cr})

def add_admin(request):
	business = Business.objects.all()
	bd_cr=[{'name':'Supervisor','url':'/tax/supervisor/'},{'name':'Add', 'url':''}]
	return render(request, "tax_app/forms/add_administrator.html", {'businesses':business})

def add_category(request):
	if request.method == 'POST':
		if(request.POST.get('name')!=""):
			category = Business_Category.objects.create(name=request.POST.get('name'))
			category.save()
			return redirect("/tax/business/category/")
	bd_cr=[{'name':'Category','url':'/tax/business/category/'},{'name':'Add', 'url':''}]
	q = request.GET.get('q')
	category = ""
	edit = False
	try:
		category = Business_Category.objects.get(pk=int(q))
		edit = True
		bd_cr=[{'name':'Category','url':'/tax/business/category/'},{'name':'Edit', 'url':''}]
	except Exception as e:
		pass
	
	return render(request, "tax_app/forms/add_category.html", {'category':category, 'edit':edit, 'bd_cr':bd_cr})

def update_category(request):
	if request.method == 'POST':
		if(request.POST.get('employee_id')!="" and request.POST.get('name')!="" and request.POST.get('contact')!="" and request.POST.get('location')!=""):
			category = Business_Category.objects.get(pk=int(request.POST.get('id')))
			category.name = request.POST.get('name')
			category.save()
			return redirect("/tax/business/category/")


def location(request):
	locations = Location.objects.all()
	bd_cr=[{'name':'Location','url':'/tax/location/'}]
	return render(request, "tax_app/location.html", {'locations':locations, 'bd_cr':bd_cr})

def supervisor(request):
	supervisors = Profile.objects.filter(is_supervisor=True)
	bd_cr=[{'name':'Supervisors','url':'/tax/supervisor/'}]
	return render(request, "tax_app/supervisor.html", {'supervisors':supervisors, 'bd_cr':bd_cr})

def business_category(request):
	categories = Business_Category.objects.all()
	bd_cr=[{'name':'Category','url':'/tax/business/category/'}]
	return render(request, "tax_app/business_category.html", {'categories':categories, 'bd_cr':bd_cr})
	#print(len(categories))
	#return HttpResponse("<h2>hello</h2>")


def business(request):
	business = Business.objects.all()
	bd_cr=[{'name':'Businesses','url':'/tax/business/'}]
	return render(request, "tax_app/business.html", {'businesses':business, 'bd_cr':bd_cr})

def administrator(request):
	business = Business.objects.all()
	bd_cr=[{'name':'Administrator','url':'/tax/administrator/'}]
	return render(request, "tax_app/administrator.html", {'businesses':business, 'bd_cr':bd_cr})
