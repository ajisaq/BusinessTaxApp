# -*- coding: utf-8 -*-
# Generated by Django 1.10.8 on 2019-10-22 16:58
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tax_app', '0007_auto_20191022_1619'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='is_admin',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='profile',
            name='is_tax_collector',
            field=models.BooleanField(default=False),
        ),
    ]
