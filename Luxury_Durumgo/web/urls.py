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
    path('addproducts/',views.addproducts, name='addproducts'),
    path('addproducts/addproducts_egin/',views.addproducts_egin, name='addproducts_egin'),
    path('menu/', views.menu, name='menu'),
    path('add_to_cart/', views.add_to_cart, name='add_to_cart'),
    path('set_cart_kantitatea/', views.set_cart_kantitatea, name='set_cart_kantitatea'),
    path('delete_cart_item/', views.delete_cart_item, name='delete_cart_item'),
    path('updateproducts/<int:id>', views.updateproducts, name='updateproducts'),
    path('updateproducts/updateproducts_egin/<int:id>', views.updateproducts_egin, name='updateproducts_egin'),
    path('deleteproducts/<int:id>', views.deleteproducts, name='deleteproducts'),
]
