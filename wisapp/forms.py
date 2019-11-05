from django import forms
from .models import Staff

class StaffAddForm(forms.ModelForm):
	class Meta:
		model = Staff
		exclude = ['fingerprint']
