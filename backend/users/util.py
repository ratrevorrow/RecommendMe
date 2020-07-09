"""[Separate logic from views]"""
import sys
from sklearn.ensemble import RandomForestClassifier
import numpy as np
import pandas as pd
from users.models import BeerTasted


def train_data(user):
    data = list(BeerTasted.objects.filter(user=user).values(
        'beername', 'rating', 'created_at', 'style', 'description'))
    print("to json")
    df = pd.DataFrame(data)
    print(df.head())
