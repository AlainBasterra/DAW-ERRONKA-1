from django.shortcuts import render
from django.db import connection
from .models import Erabiltzailea

# Create your views here.ç
def index(request):
    return render(request, 'index.html')

def login(request):
    return render(request, 'login.html')

def contact(request):
    return render(request, 'contact.html')

def login_egin(request):
    post_helbidea = request.POST.get('helbidea')
    post_pasahitza = request.POST.get('pasahitza')

    with connection.cursor() as cursor:
        sql = "SELECT helbideElektronicoa, pasahitza FROM web_erabiltzailea WHERE helbideElektronikoa = %s AND pasahitza = %s"
        cursor.execute(sql, [post_helbidea, post_pasahitza])

def register(request):
    return render(request, 'register.html')

def register_egin(request):
    post_izena = request.POST.get('izena')
    post_abizena1 = request.POST.get('abizena1')
    post_abizena2 = request.POST.get('abizena2')
    post_nan = request.POST.get('nan')
    post_helbideElektronikoa = request.POST.get('helbideElektronikoa')
    post_pasahitza = request.POST.get('pasahitza')
    
    contexto = {'izena': post_izena}
    erabiltzaileberria = Erabiltzailea(izena = post_izena, abizena1 = post_abizena1, abizena2 = post_abizena2, nan = post_nan, helbideElektronikoa = post_helbideElektronikoa, pasahitza = post_pasahitza)
    erabiltzaileberria.save()
    return render (request, 'index.html' , contexto)