from django.db import models

# Create your models here.
class User(models.Model):
    firstname = models.TextField()
    lastname = models.TextField()
    username = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) # when the user was created

    def __str__(self):
        return self.username

class BeersTasted(models.Model):
    beername = models.TextField()
    rating = models.TextField()
    style = models.TextField()
    description = models.TextField()
    user = models.ForeignKey(User, related_name="user", on_delete=models.SET_NULL, null=True)

    # TODO: translate created time to season. i.e: 1,2,3,4
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True) # when the beers was tasted by the user

    def __str__(self):
        return self.beername