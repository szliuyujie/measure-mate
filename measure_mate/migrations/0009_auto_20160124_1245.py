# -*- coding: utf-8 -*-
# Generated by Django 1.9 on 2016-01-24 12:45
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('measure_mate', '0008_attribute_desc_class'),
    ]

    operations = [
        migrations.AlterField(
            model_name='measurement',
            name='observations',
            field=models.TextField(null=True),
        ),
    ]
