"""
Here, we will get data from https://www.brainyquote.com/quote_of_the_day
and store the quotes of the day in a text file
"""
import requests
from bs4 import BeautifulSoup
import re # regular expressions

def main():
    rootUrl = "https://www.brainyquote.com"
    response = requests.get(rootUrl+"/quote_of_the_day", headers={'User-Agent': 'Mozilla/5.0'})
    parsedHtml = BeautifulSoup(response.text, "html.parser")
    quotes = parsedHtml.find_all("div", {"style": "display: flex;justify-content: space-between"}) # get the quotes themselves
    quoteAuthors = parsedHtml.find_all("a", {"title": "view author"}) # get quote author quotes
    fileContents = ""
    for i in range(len(quotes)): # quotes and quoteTitles list should have the same length
        thisQuote = quotes[i].text
        thisQuoteAuthor = quoteAuthors[i].text
        fileContents += f"{thisQuote} - {thisQuoteAuthor}\n\n"
    with open("quotes_of_the_day.txt", "w") as file:
        file.write(fileContents)
    # PART 2 CONTINUES HERE:
    # <   >
main()