from django.db import models

# class Helbidea(models.Model):
#     herria = models.CharField(max_length=100,blank=False)
#     kodigoPostala = models.CharField(max_length=100, blank=False)
#     kalea = models.CharField(max_length=250,blank=False)
#     zenbakiaPisua = models.CharField(max_length=250, blank=False)
#     datuExtra = models.CharField(max_length=250)


class Erabiltzailea(models.Model):
    izena = models.CharField(max_length=100, blank=False)
    abizena1 = models.CharField(max_length=100)
    abizena2 = models.CharField(max_length=100)
    nan = models.CharField(max_length=9)
    helbideElektronikoa = models.EmailField(max_length=100, blank=False)
    pasahitza = models.CharField(max_length=250, blank=False)
    perfil = models.IntegerField(default = 1, blank=False) #1 erabiltzaile orokorra, 2 VIP, 3 Admin
    sortua = models.DateTimeField(auto_now=True)
    

class Produktua(models.Model):
    izena = models.CharField(max_length=100,blank=False)
    kategoria = models.CharField(max_length=100,blank=False, default="")
    deskripzioa = models.CharField(max_length=500,blank=False)
    argazkia = models.FilePathField(path="web/static/img/")
    prezioa = models.IntegerField(blank=False)
    stock = models.IntegerField(blank=False)
    pisua = models.IntegerField()
    vip = models.IntegerField(blank=False, default=0)

class Saskia(models.Model):
     erabiltzailea = models.ForeignKey(Erabiltzailea, on_delete=models.CASCADE)
     produktua = models.ForeignKey(Produktua, on_delete=models.CASCADE)
     kantitatea = models.IntegerField()
     zenbakia = models.IntegerField()
     bukatuta = models.IntegerField(default=0)

class Salmenta(models.Model):
    erabiltzailea = models.ForeignKey(Erabiltzailea, on_delete=models.CASCADE, blank=False)
    zenbakiaSaskia = models.IntegerField()
    prezioaFinala = models.IntegerField()
    data = models.DateField(auto_now=True)
    helbidea = models.CharField(max_length=1500, default="")