# Generated by Django 3.1.4 on 2023-11-07 12:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0008_saskia_bukatuta'),
    ]

    operations = [
        migrations.AlterField(
            model_name='produktua',
            name='argazkia',
            field=models.FilePathField(path='web/static/img/'),
        ),
    ]
