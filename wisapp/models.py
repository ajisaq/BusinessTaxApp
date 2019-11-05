from django.db import models
from .constants import *

class Department(models.Model):
	name = models.CharField(max_length=25)
	dept_id = models.CharField(max_length=12)
	hod = models.CharField(max_length=22)

	def get_hod(self):
		return self.hod

	def get_name(self):
		return self.name

	def __str__(self):
		return self.name

class Staff(models.Model):
	email = models.EmailField(blank=True, null=True)
	bvn = models.CharField(max_length=11)
	lga = models.CharField(max_length=20)
	nimc = models.CharField(max_length=11, unique=True)
	address = models.CharField(max_length=20)
	last_name = models.CharField(max_length=25)
	first_name = models.CharField(max_length=25)
	bank_name = models.CharField(max_length=50)
	account_name = models.CharField(max_length=100)
	disability = models.CharField(max_length=150, blank=True, null=True)
	other_name = models.CharField(max_length=25, blank=True, null=True)
	next_of_kin = models.CharField(max_length=25)
	nationality = models.CharField(max_length=50)
	phone_number = models.CharField(max_length=30)
	salary_amount = models.IntegerField(default=0)
	place_of_work = models.CharField(max_length=25)
	account_number = models.CharField(max_length=10)
	state_of_origin = models.CharField(max_length=20)
	passport = models.ImageField(upload_to='passports/')
	fingerprint = models.CharField(max_length=48)
	date_of_employment = models.DateTimeField()
	date_of_retirement = models.DateTimeField()
	gender = models.CharField(max_length=7, choices=GENDER)
	department = models.ForeignKey(Department, on_delete=models.CASCADE)

	def __str__(self):
		return f'{self.first_name} {self.last_name}'

	def get_picture(self):
		return self.passport.url

	def get_full_name(self):
		return f'{self.first_name or ""} {self.last_name or ""} {self.other_name or ""}'

	def get_fingerprint_harsh(self):
		return self.fingerprint