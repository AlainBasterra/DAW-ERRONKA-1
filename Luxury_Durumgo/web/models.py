from django.db import models

class Helbidea(models.Model):
    herria = models.CharField(max_length=100,blank=False)
    kodigoPostala = models.CharField(max_length=100, blank=False)
    kalea = models.CharField(max_length=250,blank=False)
    zenbakiaPisua = models.CharField(max_length=250, blank=False)
    datuExtra = models.CharField(max_length=250)


class Erabiltzailea(models.Model):
    izena = models.CharField(max_length=100, blank=False)
    abizena1 = models.CharField(max_length=100)
    abizena2 = models.CharField(max_length=100)
    nan = models.CharField(max_length=9)
    helbideElektronikoa = models.EmailField(max_length=100, blank=False)
    pasahitza = models.CharField(max_length=250, blank=False)
    perfil = models.IntegerField(max_length=1, default = 1, blank=False)
    sortua = models.DateTimeField(auto_now=True)
    helbidea = models.ForeignKey(Helbidea, on_delete=models.CASCADE)

class Produktua(models.Model):
    izena = models.CharField(max_length=100,blank=False)
    deskripzioa = models.CharField(max_length=500,blank=False)
    argazkia = models.CharField(max_length=500)
    prezioa = models.IntegerField(max_length=9,blank=False)
    stock = models.IntegerField(max_length=9,blank=False)
    pisua = models.IntegerField(max_length=9)
    vip = models.IntegerField(max_length=1, blank=False, default=0)

class Saskia(models.Model):
     erabiltzailea = models.ForeignKey(Erabiltzailea, on_delete=models.CASCADE)
     produktua = models.ForeignKey(Produktua, on_delete=models.CASCADE)
     kantitatea = models.IntegerField(max_length=2)
     zenbakia = models.IntegerField(max_length=3)

class Salmenta(models.Model):
    erabiltzailea = models.ForeignKey(Erabiltzailea, on_delete=models.CASCADE, blank=False)

    zenbakiaSaskia = models.IntegerField(max_length=3)
    prezioaFinala = models.IntegerField(max_length=9)
    data = models.DateField(auto_now=True)