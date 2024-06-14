#!/usr/bin/python3

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
    if request.form is None:
        abort(400, "No form data submitted")

    formdata = request.form
    # print(formdata)

    searched_destination = formdata.get('destination-radio-group')
    searched_amenities = formdata.get('amenities-radio-group')

    # NOTE: Python flask has a weird way of handling the checkboxes values grouped in an array
    if searched_amenities != "":
        searched_amenities = formdata.getlist('amenities-specific-group[]')

    # Load the data we need before passing it to the template
    countries = Country.all(True)
    amenities = Amenity.all(True)
    country_city_places = Country.places(searched_destination, searched_amenities)
    # print(country_city_places)

    # ??? What is this for? Why are we passing the stuff we selected back to the template???
    selected = {
        "destination": searched_destination,
        "amenities": searched_amenities
    }
    # print(selected)

    return render_template('index.html', countries=countries, amenities=amenities, places=country_city_places, selected=selected)

@app.route('/status')
def status():
    """ Return server status """
    return 'OK'

# Set debug=True for the server to auto-reload when there are changes
if __name__ == '__main__':
    app.run(host='localhost', port=5000, debug=True)
