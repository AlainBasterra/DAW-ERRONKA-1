import requests

# Helbidea lortu eta latitude eta longitude balioetara bihurtu
address = "Hurtado de Amezaga Kalea, 43, 48008 Bilbo, Bizkaia"
address = "{" + address + "}"
url = "https://geocode.maps.co/search?q=" + address
response = requests.get(url)

if response.status_code == 200:
    data = response.json()
    #print(data)
else:
    print(f'Error al acceder a la API. Código de estado: {response.status_code}')
    
datos = data[0]
# Accede a los datos de latitud y longitud
latitud = datos['lat']
longitud = datos['lon']
# Imprime los valores de latitud y longitud
print("Latitud:", latitud)
print("Longitud:", longitud)

# Latitude eta longitudearekin distatzia eta denbora lortu
headers = {
    'Accept': 'application/json, application/geo+json, application/gpx+xml, img/png; charset=utf-8',
}
origen = "-2.626891,43.169450" # Montevideo Etorbidea, 23, 48200 Durango, Bizkaia. <= Luxury Durumgo
destino = longitud + "," + latitud
key = "5b3ce3597851110001cf6248b1571b7c250b4770b5f07d6ada4a93ef"
url = 'https://api.openrouteservice.org/v2/directions/driving-car?api_key=' + key + '&start=' + origen + '&end=' + destino
response = requests.get(url, headers=headers)

if response.status_code == 200:
    data = response.json()
    #print(data)
else:
    print(f'Error al acceder a la API. Código de estado: {response.status_code}')

# distance eta duration balioak lortu
distance = data['features'][0]['properties']['segments'][0]['distance']
duration = data['features'][0]['properties']['segments'][0]['duration']

print("Distance:", distance)
print("Duration:", duration)