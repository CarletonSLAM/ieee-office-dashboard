from django import forms

class ConfigForm(forms.Form):
    config = forms.CharField()