from django.urls import include, path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('login/', views.login_index, name='login'),
    path('login/login_egin/', views.login_egin, name='login_egin'),
    path('register/', views.register, name='register'),
    path('register/register_egin/', views.register_egin, name='register_egin'),
    path('contact/', views.contact, name='contact'),
    path('checkout/', views.checkout, name='checkout'),
    path('logout/', views.logout, name='logout'),
    path('aboutUs/',views.aboutUs, name='aboutUs'),
    path('menu/', views.menu, name='menu'),
]
