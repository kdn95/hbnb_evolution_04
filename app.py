#!/usr/bin/python3

import time
from flask import Flask, render_template, request, abort, jsonify
from api.v1 import api_routes
from models.country import Country
from models.place_amenity import Place, Amenity

app = Flask(__name__)
app.register_blueprint(api_routes)

@app.route('/')
def index():
    """ Landing page for the site """
    # you MUST have the 'templates' and 'static' folders

    # Load the data we need before passing it to the template
    countries = Country.all(True)
    amenities = Amenity.all(True)

    return render_template('index.html', countries=countries, amenities=amenities)

# This endpoint is meant to handle the data submitted by the 'traditional' form post that I have included in the sample HTML
@app.route('/', methods=["POST"])
def results():
    """ Results page after form post """

    # Evaluate what was submitted from the frontend and return the appropriate results
    if request.data is None:
        abort(400, "No form data submitted")

    submit_data = request.get_json()

    searched_destination = submit_data.get('destination')
    searched_amenities = submit_data.get('amenities')
    amenities_checkboxes = submit_data.get('amenities_checkboxes')

    if searched_amenities != "" and len(amenities_checkboxes) > 0:
        searched_amenities = amenities_checkboxes

    country_city_places = Country.places(searched_destination, searched_amenities)
    # print(country_city_places)

    # artificial delay to let you see the loader in the frontend
    time.sleep(0.5)

    return jsonify({
        "data": country_city_places
    })

@app.route('/status')
def status():
    """ Return server status """
    return 'OK'

# Set debug=True for the server to auto-reload when there are changes
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
