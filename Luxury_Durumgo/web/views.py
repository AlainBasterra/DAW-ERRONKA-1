from django.http import HttpResponseRedirect, JsonResponse
from django.shortcuts import redirect, render
from django.db import connection
from django.urls import reverse
from .models import Erabiltzailea, Produktua, Saskia
from django.db.models import Max



# Create your views here.
def index(request):
    # Recuperar 'izena' y 'id' de la sesión
    izena = request.session.get('izena')
    user_id = request.session.get('id')
    perfil = request.session.get('perfil')
    produktuak = Produktua.objects.all().order_by('stock')[:3]

    # Construir el contexto con ambos valores
    context = {
        'izena': izena if izena is not None else '',
        'user_id': user_id if user_id is not None else None,
        'perfil': perfil if perfil is not None else None,
        'produktuak': produktuak
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
    izena = request.session.get('izena', '')
    user_id = request.session.get('id')
    perfil = request.session.get('perfil')
    context = {
        'izena': izena,
        'user_id': user_id,
        'perfil': perfil,
        
    }
    return render(request, 'addproducts.html',context)

def addproducts_egin(request):

    post_izena = request.POST['izena']
    post_kategoria = request.POST['kategoria']
    post_deskripzioa = request.POST['deskripzioa']
    post_argazkia = request.FILES['argazkia']
    post_prezioa = request.POST['prezioa']
    post_stock = request.POST['stock']
    post_pisua = request.POST['pisua']
    post_vip = request.POST['vip']

    produktuberria = Produktua(izena = post_izena, kategoria= post_kategoria, deskripzioa= post_deskripzioa, argazkia= post_argazkia, prezioa= post_prezioa, stock = post_stock, pisua= post_pisua, vip = post_vip)
    produktuberria.save()
    return HttpResponseRedirect(reverse('index'))


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

def add_to_cart(request):
    if request.method == 'POST' and request.is_ajax():
        
        user_id = request.session.get('id')
        produktu_id = request.POST.get('product_id')
        kantitatea = request.POST.get('quantity', 1)
        
        # produktua = Produktua.objects.get(pk=produktu_id)
        
        max_zenbakia = Saskia.objects.filter(erabiltzailea=user_id, bukatuta=1).aggregate(Max('zenbakia'))['zenbakia__max']

        # Si no hay ningún carrito finalizado, estableceremos max_zenbakia a 1
        if max_zenbakia is None:
            max_zenbakia = 1
        else:
            max_zenbakia += 1 
        
        saskia, sortua = Saskia.objects.get_or_create(erabiltzailea=request.user_id, produktu_id=produktu_id, zenbakia=max_zenbakia, bukatuta=0)
        
        if not sortua: #get
            saskia.kantitatea += int(kantitatea)
        else: #create
            saskia.kantitatea = int(kantitatea)
        saskia.save()

        return JsonResponse({'items_count': cart_items_count})
    return JsonResponse({'error': 'Ocurrió un error'}, status=400)


def updateproducts(request,id):
    produktua = Produktua.objects.get(id = id)
    return render(request, 'updateproducts.html', {'id':id, 'produktua':produktua})

def updateproducts_egin(request,id):
    produktua = Produktua.objects.get(id = id)
    
    post_izena = request.POST['izena']
    post_kategoria = request.POST['kategoria']
    post_deskripzioa = request.POST['deskripzioa']
    post_argazkia = request.FILES['argazkia']
    post_prezioa = request.POST['prezioa']
    post_stock = request.POST['stock']
    post_pisua = request.POST['pisua']
    post_vip = request.POST['vip']
    
    produktua.izena= post_izena
    produktua.kategoria = post_kategoria
    produktua.deskripzioa = post_deskripzioa
    produktua.argazkia = post_argazkia
    produktua.prezioa = post_prezioa
    produktua.stock = post_stock
    produktua.pisua = post_pisua
    produktua.vip = post_vip
    produktua.save()
    return HttpResponseRedirect(reverse('menu'))

def deleteproducts(request,id):
    produktua = Produktua.objects.get(id=id)
    produktua.delete()
    return HttpResponseRedirect(reverse('menu'))