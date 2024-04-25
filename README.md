# [Saferoute](https://saferoute.murraygrov.es)
For [BrisHack](https://brishack.io) 2024 (24 hour hackathon run by the Computer Science Society) the brief was "Health" - one of the categories was mental health and this was our take. If you're travelling by yourself (especially late at night), speed might not be the priority when it comes to getting home.
You might prefer a slower route that routes you around a dangerous area.

## Tech
We use networkx and osmnx for routing - using dijkstra's where the weights of each edge is a combination of time and also the number and severity of crimes where that was the closest edge.

## Data Sources
[Crime Data](https://opendata.bristol.gov.uk/datasets/bcc::street-crime-incidents/about)
[Streetlight Data](https://opendata.bristol.gov.uk/datasets/bcc::streetlights/about)
