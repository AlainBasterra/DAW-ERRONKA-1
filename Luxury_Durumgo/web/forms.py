from django import forms
from .models import Produktua
class ProduktuaForm(forms.ModelForm):
    class Meta:
        model = Produktua
        fields = ['izena', 'kategoria', 'deskripzioa', 'argazkia', 'prezioa', 'stock', 'pisua', 'vip']