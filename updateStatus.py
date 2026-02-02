import requests
import json

# Replace with your Google Apps Script Web App URL
WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyP5fzOX30eYJqznqNOEL-esklx-KSxzPfs-JNEwXc8s6BW0Unq6xAR-C4yG_J11XnvLA/exec"

def add_status(status: str):
    """
    Sends a new status to the Google Sheet via POST request.

    :param status: The status string, e.g., "OK", "ERROR"
    """
    payload = {"status": status}

    try:
        response = requests.post(WEB_APP_URL, json=payload)
        response.raise_for_status()  # raise exception for HTTP errors
        data = response.json()
        if data.get("success"):
            print(f"Status '{status}' added successfully.")
        else:
            print("Failed to add status:", data)
    except requests.exceptions.RequestException as e:
        print("Error while sending request:", e)

if __name__ == "__main__":
    # add_status("OK")
    add_status("ERROR")
