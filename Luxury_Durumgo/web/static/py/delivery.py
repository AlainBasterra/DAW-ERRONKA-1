import requests

def calcDelivery(address, attempt):
    # Helbidea lortu eta latitude eta longitude balioetara bihurtu
    
    url = "https://geocode.maps.co/search?q={" + address + "}"
    response = requests.get(url)

    if response.status_code == 200:
        data = response.json()
        #print(data)
    else:
        print(f'Error al acceder a la API. Código de estado: {response.status_code}')
        
    try:
        datos = data[0]
    except IndexError:
        print("Error: data is empty and has no elements.")
        
        address_mod = address.split(";")
        new_address = address_mod[-1]
        if new_address.lower().strip() == "durango":
            new_address = "Durango Spain"
            
        if attempt == 0:
            print("Trying again...")
            return calcDelivery(new_address, attempt=1)
        else:
            exit("error")
        
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
    else:
        print(f'Error al acceder a la API. Código de estado: {response.status_code}')

    # distance eta duration balioak lortu
    distance = data['features'][0]['properties']['segments'][0]['distance']
    duration = data['features'][0]['properties']['segments'][0]['duration']

    print("Distance:", distance)
    print("Duration:", duration)
    
    
    if distance < 6000000:
        error = False
        print("Delivery is possible")
        if distance < 1000:
            print("price: 10€")
            return {
            'distance': distance,
            'duration': duration,
            'price': '10€',
            'error': 'False'
            }
        else:
            print("price:" + "{:.2f}".format(distance / 100) + "€")
            return {
            'distance': distance,
            'duration': duration,
            'price': "{:.2f}".format(distance / 100) + '€',
            'error': 'False'
            }       
                
            
    else:
        print("Error, too far away")  
        print("price:" + "{:.2f}".format(distance / 100) + "€")
        return {
        'error': 'True'
        }    
        
    
