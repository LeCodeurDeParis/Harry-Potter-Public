from machine import Pin, PWM
import time
import network   #import des fonction lier au wifi
import urequests	#import des fonction lier au requetes http
import utime	#import des fonction lier au temps
import ujson	#import des fonction lier aà la convertion en Json

led = [PWM(Pin(16,mode=Pin.OUT)),PWM(Pin(17,mode=Pin.OUT)),PWM(Pin(18,mode=Pin.OUT))]


def setColor(c):
    for i in range(3):
        led[i].duty_u16(c[i]*32)

def offLED(int):
    for i in range(3):
        led[i].duty_u16(0)



wlan = network.WLAN(network.STA_IF) # met la raspi en mode client wifi
wlan.active(True) # active le mode client wifi

ssid = ' '
password = ' '
wlan.connect(ssid, password) # connecte la raspi au réseau
url = "http://  /Color"

maison = {
    "Gryffindor": [0,0,255],
    "Hufflepuff": [0,200,200],
    "Ravenclaw": [255,0,0],
    "Slytherin": [0,255,0],
    "": [255,255,255],
    None:[255,255,255]
    }



while not wlan.isconnected():
    print("pas co")
    utime.sleep(1)
    pass

while(True):
    try:
        print("GET")
        r = urequests.get(url) # lance une requete sur l'url
        maiColor = r.json()['message']
        print(maiColor) # traite sa reponse en Json
        r.close() # ferme la demande
        utime.sleep(1)
        setColor(maison[maiColor])
        utime.sleep(3)
        offLED(0)
            
        
    except Exception as e:
        print(e)