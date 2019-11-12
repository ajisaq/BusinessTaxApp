"""tax_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
#from django.conf.urls import url
from django.urls import path, include

from django.contrib.auth.views import LoginView, LogoutView
from tax_app import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    #path(r'^login/$', auth_views.login, {'template_name': 'login.html'}, name='login'),
    path('', views.business, name='business'),
    path('login/', LoginView.as_view(template_name= 'tax_app/login.html'), name='login'),
    path('logout/', LogoutView.as_view(next_page= '/login/'), name='logout'),
    path('location/', views.location, name='location'),
    path('supervisor/', views.supervisor, name='supervisor'),
    path('add/business/', views.add_business, name='add_business'),
    path('add/location/', views.add_location, name='add_location'),
    path('update/location/', views.update_location, name='update_location'),
    path('add/supervisor/', views.add_supervisor, name='add_supervisor'),
    path('update/supervisor', views.update_supervisor, name='update_supervisor'),
    path('approve/supervisor', views.approve_supervisor, name='approve_supervisor'),
    path('suspend/supervisor', views.suspend_supervisor, name='suspend_supervisor'),
    path('add/admin/', views.add_admin, name='add_admin'),
    path('add/category/', views.add_category, name='add_category'),
    path('update/category/', views.update_category, name='update_category'),
    path('update/business/', views.update_business, name='update_business'),
    path('business/category/', views.business_category, name='business_category'),
    path('business/', views.business, name='business'),
    path('administrator/', views.administrator, name='administrator'),
]
