import datetime
import requests
import json


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
        return request



        



