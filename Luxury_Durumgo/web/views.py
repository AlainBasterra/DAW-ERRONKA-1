from django.shortcuts import render
from django.db import connection

# Create your views here.ç
def index(request):
    return render(request, 'index.html')

def login(request):
    return render(request, 'login.html')

def login_egin(request):
    post_helbidea = request.POST.get('helbidea')
    post_helbidea = request.POST.get('pasahitza')

    with connection.cursor() as cursor:
        sql = "Select"