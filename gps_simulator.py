import socket
import time
import random
from datetime import datetime, timezone


TRACCAR_HOST = "demo.traccar.org"
TRACCAR_PORT = 5001

DEVICES = [
    {
        "id": "100000000001",
        "name": "Demo Truck 01",
        "lat": 12.0020,
        "lon": 8.5160,
        "speed": 45,
        "course": 90,
    },
    {
        "id": "100000000002",
        "name": "Demo Truck 02",
        "lat": 12.0100,
        "lon": 8.5200,
        "speed": 60,
        "course": 180,
    },
    {
        "id": "100000000003",
        "name": "Demo Truck 03",
        "lat": 12.0200,
        "lon": 8.5100,
        "speed": 35,
        "course": 270,
    },
    {
        "id": "100000000004",
        "name": "Demo Truck 04",
        "lat": 12.0300,
        "lon": 8.5300,
        "speed": 70,
        "course": 45,
    },
    {
        "id": "100000000005",
        "name": "Demo Truck 05",
        "lat": 12.0400,
        "lon": 8.5400,
        "speed": 25,
        "course": 135,
    },
    {
        "id": "100000000006",
        "name": "Demo Truck 06",
        "lat": 12.0500,
        "lon": 8.5500,
        "speed": 55,
        "course": 225,
    },
    {
        "id": "100000000007",
        "name": "Demo Truck 07",
        "lat": 12.0600,
        "lon": 8.5600,
        "speed": 40,
        "course": 315,
    },
    {
        "id": "100000000008",
        "name": "Demo Truck 08",
        "lat": 12.0700,
        "lon": 8.5700,
        "speed": 80,
        "course": 90,
    },
    {
        "id": "100000000009",
        "name": "Demo Truck 09",
        "lat": 12.0800,
        "lon": 8.5800,
        "speed": 50,
        "course": 180,
    },
    {
        "id": "100000000010",
        "name": "Demo Truck 10",
        "lat": 12.0900,
        "lon": 8.5900,
        "speed": 30,
        "course": 270,
    },
]


def decimal_to_nmea(value):
    """
    Convert decimal latitude/longitude to NMEA-style degrees/minutes.
    """

    absolute = abs(value)

    degrees = int(absolute)
    minutes = (absolute - degrees) * 60

    return degrees, minutes


def build_message(device):
    now = datetime.now(timezone.utc)

    lat = device["lat"]
    lon = device["lon"]

    lat_deg, lat_min = decimal_to_nmea(lat)
    lon_deg, lon_min = decimal_to_nmea(lon)

    lat_direction = "N" if lat >= 0 else "S"
    lon_direction = "E" if lon >= 0 else "W"

    timestamp = now.strftime("%d%m%y%H%M%S")

    message = (
        f"imei:{device['id']},tracker,"
        f"{timestamp},,"
        f"F,"
        f"{timestamp[4:10]},"
        f"A,"
        f"{lat_deg:02d}{lat_min:07.4f},{lat_direction},"
        f"{lon_deg:03d}{lon_min:07.4f},{lon_direction},"
        f"{device['speed'] / 1000:.3f},"
        f"{device['course']:.0f},"
        f";"
    )

    return message


def move_device(device):
    """
    Move the simulated vehicle slightly.
    """

    direction = device["course"]

    # Small movement.
    movement = 0.0003

    if direction == 0:
        device["lat"] += movement

    elif direction == 90:
        device["lon"] += movement

    elif direction == 180:
        device["lat"] -= movement

    elif direction == 270:
        device["lon"] -= movement

    else:
        # Random movement for diagonal directions.
        device["lat"] += random.uniform(-movement, movement)
        device["lon"] += random.uniform(-movement, movement)


def simulate_device(device):
    while True:

        try:
            print(
                f"[{device['name']}] "
                f"Connecting to {TRACCAR_HOST}:{TRACCAR_PORT}"
            )

            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)

            sock.connect(
                (TRACCAR_HOST, TRACCAR_PORT)
            )

            print(
                f"[{device['name']}] Connected"
            )

            while True:

                message = build_message(device)

                print(
                    f"[{device['name']}] "
                    f"{device['lat']:.6f}, "
                    f"{device['lon']:.6f}"
                )

                sock.sendall(
                    message.encode()
                )

                move_device(device)

                time.sleep(5)

        except Exception as e:

            print(
                f"[{device['name']}] "
                f"Connection error: {e}"
            )

            time.sleep(5)


def main():

    import threading

    threads = []

    for device in DEVICES:

        thread = threading.Thread(
            target=simulate_device,
            args=(device,),
            daemon=True
        )

        thread.start()

        threads.append(thread)

    print()
    print("GPS simulator started")
    print(f"Devices: {len(DEVICES)}")
    print(
        f"Target: {TRACCAR_HOST}:{TRACCAR_PORT}"
    )
    print()

    try:

        while True:
            time.sleep(1)

    except KeyboardInterrupt:

        print("\nStopping simulator...")


if __name__ == "__main__":
    main()