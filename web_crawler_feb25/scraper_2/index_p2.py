"""
Here, we will get data from https://www.brainyquote.com/quote_of_the_day
and store the quotes of the day in a text file
"""
import requests
from bs4 import BeautifulSoup
import re # regular expressions

# save image locally function
def saveImageFromUrl(url):
    fileName = url.split("/")[-1]
    response = requests.get(url)
    with open(fileName, "wb") as f: # write binary to file
        f.write(response.content)

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
    # MARKER
    quoteUrls = re.findall(r"\/quotes\/+\w+", response.text)[1:] # find quote subdirectories using ONLY regex from the website code NO bs4 needed
    # ^ skip the first entry as the img div houses the same url as the next div
    for quoteUrl in quoteUrls:
        thisUrl = rootUrl+quoteUrl
        print(f"Going to: {thisUrl}")
        quotePage = requests.get(thisUrl, headers={'User-Agent': 'Mozilla/5.0'})
        quotePageParsed = BeautifulSoup(quotePage.text, "html.parser")
        imgUrl = quotePageParsed.find("meta", {"property": "og:image"})["content"]
        saveImageFromUrl(imgUrl)
main()