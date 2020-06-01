from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class BeerTasted(models.Model):
    beername = models.TextField()
    rating = models.TextField()
    style = models.TextField()
    description = models.TextField()
    user = models.ForeignKey(User, related_name="beerstasted", on_delete=models.SET_NULL, null=True)

    # TODO: translate created time to season. i.e: 1,2,3,4
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.beername