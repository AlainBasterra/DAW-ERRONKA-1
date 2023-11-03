# Generated by Django 3.1.4 on 2023-11-03 09:05

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='erabiltzailea',
            name='helbidea',
            field=models.ForeignKey(blank=True, on_delete=django.db.models.deletion.CASCADE, to='web.helbidea'),
        ),
        migrations.AlterField(
            model_name='erabiltzailea',
            name='perfil',
            field=models.IntegerField(default=1),
        ),
        migrations.AlterField(
            model_name='produktua',
            name='pisua',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='produktua',
            name='prezioa',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='produktua',
            name='stock',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='produktua',
            name='vip',
            field=models.IntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='salmenta',
            name='prezioaFinala',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='salmenta',
            name='zenbakiaSaskia',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='saskia',
            name='kantitatea',
            field=models.IntegerField(),
        ),
        migrations.AlterField(
            model_name='saskia',
            name='zenbakia',
            field=models.IntegerField(),
        ),
    ]