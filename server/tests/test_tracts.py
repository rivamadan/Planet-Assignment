# import pytest
# from server import app

# def test_list_tracts():
#     response = app.test_client().get("/tracts")
#     assert response.status_code == 200
#     assert type(response.data) is list

# def test_get_tract(client):
#     response = app.test_client().get("/tracts/1")
#     assert response.status_code == 200
#     assert type(response.data) is dict

# def test_get_tract_not_exist(client):
#     response = app.test_client().get("/tracts/5")
#     assert response.status_code == 404
