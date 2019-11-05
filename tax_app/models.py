from __future__ import unicode_literals

from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    emp_no   = models.CharField(max_length = 150)
    contact   = models.CharField(max_length = 150)
    location   = models.CharField(max_length = 150)
    supervisor = models.CharField(max_length = 150, blank=True)
    is_supervisor = models.BooleanField(default = False)
    is_tax_collector = models.BooleanField(default = False)
    is_admin = models.BooleanField(default = False)
    approved = models.BooleanField(default = False)

    def __str__(self):
        return self.user.username+" - "+self.emp_no

class Business_Category(models.Model):
    name   = models.CharField(max_length = 150)
    
    def __str__(self):
        return self.name

class Business(models.Model):
    name   = models.CharField(max_length = 150)
    bn_rc   = models.CharField(max_length = 150, blank=True)
    tin   = models.CharField(max_length = 150)
    location   = models.CharField(max_length = 150)
    email   = models.CharField(max_length = 150, blank=True)
    contact_num   = models.CharField(max_length = 150, blank=True)
    owner_name   = models.CharField(max_length = 150, blank=True)
    location_lga = models.CharField(max_length = 150, blank=True)
    payment_status = models.CharField(max_length = 150, blank=True)
    due_amount = models.IntegerField(blank=True, default=0)
    due_date = models.CharField(max_length = 150, blank=True)
    tax_collector = models.OneToOneField(User, on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Business_Category, on_delete=models.CASCADE)
    
    def __str__(self):
        return self.name


class Location(models.Model):
    code   = models.CharField(max_length = 15)
    name   = models.CharField(max_length = 150)
    
    def __str__(self):
        return self.code + " - " + self.name
