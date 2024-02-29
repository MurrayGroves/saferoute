#!/bin/python3

from flask import Flask, request, Response
import os
import subprocess
from subprocess import Popen

app = Flask(__name__)

@app.route("/webhook", methods=["POST"])
def update():
    output = subprocess.getoutput("git fetch --dry-run").strip()
    if output == "":
        print("No changes")
        return Response(status=204)
    
    else:
        print("Changes found")
        # Update local git log
        os.system("git fetch")
        os.system("git pull")

        # Update and restart docker containers
        os.system("docker compose down")
        Popen(["docker", "compose", "up", "-d"])
        return Response(status=200)
    

if __name__ == '__main__':
    app.run(host="localhost", port=1727, debug=True)