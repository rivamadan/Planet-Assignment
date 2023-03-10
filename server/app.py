from flask import Flask, jsonify, request
from flask_cors import CORS
from werkzeug.exceptions import abort
import sqlite3
import base64

TRACTS_TABLE_NAME = "tracts"
DEFAULT_PER_PAGE = 15
ID_COLUMN_NAME = "fid"

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

def dict_factory(cursor, row):
    fields = [column[0] for column in cursor.description]
    return {key: modify_value(key, value) for key, value in zip(fields, row)}

def modify_value(key, value):
    if key == "geom":
        # Returning binary data in JSON is not great
        # Probably better to not include this directly in the api response
        # and instead have a url pointing to the data
        return base64.b64encode(value).decode()
    else:
       return value 

def get_conn():
    conn = sqlite3.connect("tracts.gpkg")
    conn.row_factory = dict_factory
    return conn

@app.route("/tracts")
def list_tracts():
    cursor = get_conn().cursor()
    per_page = request.args.get("per_page", DEFAULT_PER_PAGE)
    page = request.args.get("page", 0)
    # Using offset to paginate is not performant for large datasets
    query = f"SELECT * FROM {TRACTS_TABLE_NAME} order by {ID_COLUMN_NAME} limit {per_page} offset {int(page) * per_page}"
    cursor.execute(query)
    return jsonify(cursor.fetchall())


@app.route("/tracts/<int:pk>")
def get_tract(pk):
    cursor = get_conn().cursor()
    query = f"SELECT * FROM {TRACTS_TABLE_NAME} where fid = ?"
    cursor.execute(query, [pk])
    tract = cursor.fetchone()
    if tract is None:
        abort(404, f"Tract id {pk} doesn't exist.")
    return tract