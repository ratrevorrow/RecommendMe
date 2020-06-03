"""Initiate all the data to use and return to the client"""
import re
import requests
import spacy

# Create your models here.
nlp = spacy.load('en_core_web_sm')


class Initiators:
    """Initiate the data to use from FS"""

    def __init__(self):
        self.breweries = []
        self.styles = []
        self.names = []
        self.beerlist = []
        self.drafts = []
        self.bottles = []
        self.cans = []
        self.adjectives = []

    def initiate_everything(self):
        self.initiate_beerlist()
        self.initiate_adjectives()

    """ 
        brew_id: "17368796"
        brewer: "Deep River Brewing"
        city: "Clayton, NC"
        container: "bottled"
        country: "United States"
        description: "<p>This is a sweet stout brewed with generous amounts of freshly ground cocoa, chocolate malt and cocoa nibs from North Carolina chocolatiers. Espresso notes, dark chocolate, hints of tobacco, and roasted coffee beans are all in the mix. 5.3% ABV.</p>
        name: "Deep River 4042 Stout (CAN)"
        reviews: "0"
        stars: 0
        store_id: "13877"
        style: "American Stout"
    """

    def initiate_beerlist(self):
        print("Initiating beerlist")

        breweries = []
        names = []
        styles = []

        bottles = 0
        cans = 0
        drafts = 0

        beer_objects = requests.get(
            'http://www.beerknurd.com/api/brew/list/13877')
        objs = beer_objects.json()
        for obj in objs:
            desc = obj['description']
            percentage = re.findall(r'(\d{1,2}(\.\d+)?%)', desc)

            count = desc.count('$')
            if count == 0:
                count = 1
            obj['dcount'] = count

            breweries.append(obj['brewer'])
            styles.append(obj['style'])
            names.append(obj['name'])

            if len(percentage) > 0:
                obj["percentage"] = percentage[0][0]

            if "CAN" in obj['name']:
                obj['container'] = "can"
                cans += 1
            elif obj["container"] == "draught":
                drafts += 1
            elif obj["container"] == "bottled":
                bottles += 1
            else:
                print('no container')

            if obj['city']:
                if "NC" in obj['city']:
                    obj['isNC'] = True
                else:
                    obj['isNC'] = False
            else:
                obj['isNC'] = False

            obj['description'] = obj['description'].replace(
                '<p>', '').replace('</p>', '')
        # set unique types
        self.breweries = list(dict.fromkeys(breweries))
        self.styles = list(dict.fromkeys(styles))
        self.names = list(dict.fromkeys(names))
        self.beerlist = objs
        self.drafts = drafts
        self.bottles = bottles
        self.cans = cans

    def initiate_adjectives(self):
        """Extract adjectives from beerlist obtained from FS"""

        for obj in self.beerlist:
            doc = nlp(obj['description'])
            for i, token in enumerate(doc):
                if token.pos_ not in ('NOUN', 'PROPN'):
                    continue
                for j in range(i+1, len(doc)):
                    try:
                        if doc[j].pos_ == 'ADJ':
                            doc = str(doc[j]).lower()
                            self.adjectives.append(doc)
                            break
                    except:
                        pass
        self.adjectives = list(dict.fromkeys(self.adjectives))

    def get_adjectives(self):
        return self.adjectives

    def get_beerlist(self):
        return self.beerlist

    def get_styles(self):
        return self.styles

    def get_everything(self):
        return {
            "breweries": self.breweries,
            "styles": self.styles,
            "names": self.names,
            "beerlist": self.beerlist,
            "drafts": self.drafts,
            "bottles": self.bottles,
            "cans": self.cans,
            "adjectives": self.adjectives
        }

