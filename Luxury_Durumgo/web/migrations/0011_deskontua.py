# Generated by Django 3.1.4 on 2023-11-14 10:56

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('web', '0010_auto_20231110_1310'),
    ]

    operations = [
        migrations.CreateModel(
            name='Deskontua',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('izena', models.CharField(max_length=100)),
                ('kodigoa', models.CharField(max_length=100)),
                ('deskontua', models.CharField(max_length=100)),
            ],
        ),
    ]
