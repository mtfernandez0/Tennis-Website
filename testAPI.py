import os
from dotenv import load_dotenv
import http.client

load_dotenv()
api_key = os.environ["YOUR_API_KEY"]

conn = http.client.HTTPSConnection("api.sportradar.us")

conn.request(
   "GET", "/tennis/trial/v3/en/competitors/sr:competitor:163504/profile.json?api_key=" + api_key
)

res = conn.getresponse()

data = res.read()

data.decode("utf-8")
