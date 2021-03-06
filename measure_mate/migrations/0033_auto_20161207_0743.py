# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2016-12-07 07:43
from __future__ import unicode_literals

import django.core.validators
from django.db import migrations, models
import re


class Migration(migrations.Migration):

    dependencies = [
        ('measure_mate', '0032_auto_20161207_0240'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tag',
            name='name',
            field=models.SlugField(unique=True, validators=[django.core.validators.RegexValidator(code=b'invalid', message="Enter a valid 'slug' consisting of lowercase letters, numbers, underscores or hyphens; starting and ending with letters or numbers.", regex=re.compile(b'^[a-z0-9][a-z0-9_-]*[a-z0-9]$'))]),
        ),
    ]
