import datetime
import requests
from geopy.geocoders import Nominatim


class OpenTripPlanner():
    def __init__(self, host="http://localhost:8080"):
        self.host = host

    def Distance(self, 
                 source, 
                 destination, 
                 mode="WALK", 
                 time=str(datetime.datetime.now().date()), 
                 date=str(datetime.datetime.now().strftime("%I:%M:%p")), 
                 arriveBy="FALSE"):
        
        
        request = self.host + "/otp/routers/default/plan?fromPlace=" + source + "&toPlace=" + destination + "&time=" + time + "&date=" + date + "&MODE=" + mode + "&arriveBy=" + arriveBy
        response = requests.get(request)
        return response
    
    def AddressToCoord(self, address):
        geolocator = Nominatim(user_agent="http")
        location = geolocator.geocode(address)
        return (location.latitude, location.longitude)




