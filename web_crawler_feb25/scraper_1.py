""" 
Here, we will get data from https://forebears.io/
and parse information about surnames and fornames
"""
import requests
from bs4 import BeautifulSoup
    
def prompt():
    nameType = "surnames" if input("Surname or Forename?: [s/f]\n") == 's' else "forenames"
    name = input("What is your name?: ")
    return nameType, name

def main():
    nType, name = prompt()
    url = f"https://forebears.io/{nType}/{name}"
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'}) # make a GET HTTP request to the website
    parsedHtml = BeautifulSoup(response.text, "html.parser")
    ranking = parsedHtml.find("div", {"class": "statistic-number"})
    if ranking:
        print(f"{name} is the {ranking.text} most common {nType[:-1]} in the world.")
        countryList = parsedHtml.find_all("div", {"class": "detail"}) # returns an array of html tags
        if len(countryList) == 2:
            print("Most prevalent in: " + countryList[0].text)
            print("Highest density in: " + countryList[1].text)
    else:
        print("No results found :(")
    
main()