from django.shortcuts import render

# Create your views here.ç
def index(request):
    return render(request, 'index.html')