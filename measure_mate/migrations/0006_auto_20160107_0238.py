# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-07 02:38
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('measure_mate', '0005_auto_20160107_0158'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='attribute',
            options={'ordering': ['rank'], 'verbose_name_plural': 'attributes'},
        ),
    ]