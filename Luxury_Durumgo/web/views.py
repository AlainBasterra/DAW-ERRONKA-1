from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.db import connection
from django.urls import reverse
from .models import Erabiltzailea
from django.contrib.auth import login


# Create your views here.ç
def index(request):
    variable = request.session.get('izena')
    if variable is not None:
        context = {'izena': variable}
        return render(request, 'index.html', context)
    else:

        return render(request, 'index.html')

def login_index(request):
    return render(request, 'login.html')

def contact(request):
    return render(request, 'contact.html')

def login_egin(request):
    
    post_helbidea = request.POST['helbideElektronikoa']
    post_pasahitza = request.POST['pasahitza']
    try:
        user = Erabiltzailea.objects.get(helbideElektronikoa=post_helbidea, pasahitza=post_pasahitza)
    except Erabiltzailea.DoesNotExist:
            user = None


    if user is not None:
        
        return JsonResponse({'success': True, 'redirect_url': reverse('index')})
    else:
        return JsonResponse({'success': False, 'message': 'Usuario o contraseña incorrectos'})

    return JsonResponse({'success': False, 'message': 'Método no permitido'})
    # with connection.cursor() as cursor:
    #     sql = "SELECT izena FROM web_erabiltzailea WHERE helbideElektronikoa = %s AND pasahitza = %s"
        
    # izenasql = cursor.execute(sql, [post_helbidea, post_pasahitza])
    
    # request.session['izena'] = izenasql
   


def register(request):
    return render(request, 'register.html')

def register_egin(request):
    post_izena = request.POST['izena']
    post_abizena1 = request.POST['abizena1']
    post_abizena2 = request.POST['abizena2']
    post_nan = request.POST['nan']
    post_helbideElektronikoa = request.POST['helbideElektronikoa']
    post_pasahitza = request.POST['pasahitza']
    
    request.session['izena'] = post_izena
    
    erabiltzaileberria = Erabiltzailea(izena = post_izena, abizena1 = post_abizena1, abizena2 = post_abizena2, nan = post_nan, helbideElektronikoa = post_helbideElektronikoa, pasahitza = post_pasahitza)
    erabiltzaileberria.save()
    return HttpResponseRedirect(reverse('index'))