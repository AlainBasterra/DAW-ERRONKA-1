from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import render
from django.db import connection
from django.urls import reverse
from .models import Erabiltzailea
from django.contrib.auth import login


# Create your views here.
def index(request):
    izena = request.session.get('izena')
    user_id = request.session.get('id')
        
    context = {
    'izena': izena if izena is not None else '',
    'user_id': user_id if user_id is not None else None
    }
    
    return render(request, 'index.html', context)

    # if izena is not None:
    #     context = {'izena': izena}
    #     return render(request, 'index.html', context )
    # else:
    #     context = {'izena': ''}
    #     return render(request, 'index.html', context)

def login_index(request):
    return render(request, 'login.html')

def contact(request):
    return render(request, 'contact.html')

def checkout(request):
    return render(request, 'checkout.html')

def login_egin(request):
    
    post_helbidea = request.POST['helbideElektronikoa']
    post_pasahitza = request.POST['pasahitza']
    try:
        user = Erabiltzailea.objects.get(helbideElektronikoa=post_helbidea, pasahitza=post_pasahitza)
    except Erabiltzailea.DoesNotExist:
        user = None


    if user is not None:
        request.session['izena'] = user.izena
        request.session['id'] = user.id
        return JsonResponse({'success': True, 'redirect_url': reverse('index')})
    else:
        return JsonResponse({'success': False, 'message': 'Usuario o contraseña incorrectos'})



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

def logout(request):
    request.session.flush()
    return HttpResponseRedirect(reverse('index'))

def aboutUs(request):
    return render(request, 'aboutUs.html')