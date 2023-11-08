from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render
from django.db import connection
from django.urls import reverse
from .models import Erabiltzailea, Produktua



# Create your views here.
def index(request):
    # Recuperar 'izena' y 'id' de la sesión
    izena = request.session.get('izena')
    user_id = request.session.get('id')
    perfil = request.session.get('perfil')
    

    # Construir el contexto con ambos valores
    context = {
        'izena': izena if izena is not None else '',
        'user_id': user_id if user_id is not None else None,
        'perfil': perfil if perfil is not None else None
    }

    # Renderizar la plantilla con el contexto que contiene 'izena' y 'user_id'
    return render(request, 'index.html', context)

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
        request.session['perfil'] = user.perfil
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

def addproducts(request):
    return render(request, 'addproducts.html')

def addproducts_egin(request):


    
    post_izena = request.POST['izena']
    post_kategoria = request.POST['kategoria']
    post_deskripzioa = request.POST['deskripzioa']
    post_argazkia = request.FILES['argazkia']
    post_prezioa = request.POST['prezioa']
    post_stock = request.POST['stock']
    post_pisua = request.POST['pisua']
    post_vip = request.POST['vip']
 
              # Guarda la imagen en la base de datos

    produktuberria = Produktua(izena = post_izena, kategoria= post_kategoria, deskripzioa= post_deskripzioa, argazkia= post_argazkia, prezioa= post_prezioa, stock = post_stock, pisua= post_pisua, vip = post_vip)
    produktuberria.save()
    return HttpResponseRedirect(reverse('index'))  # Redirige a una página de éxito
   
def menu(request):
    izena = request.session.get('izena', '')
    user_id = request.session.get('id')
    perfil = request.session.get('perfil')
    
    produktuak = Produktua.objects.all()
    
    context = {
        'izena': izena,
        'user_id': user_id,
        'perfil': perfil,
        'produktuak': produktuak, 
    }

    
    return render(request, 'menu.html', context)
