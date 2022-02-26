
# Introduction

1. What is web scraping?

* *scraping* data from websites by parsing the website's source (HTML)

2. What is web crawling?

* an Internet bot that systematically browses the web for the purpose of data indexing (google search engine)

3. Methodologies

* Python3
* bs4 - [Beautiful Soup](https://www.crummy.com/software/BeautifulSoup/bs4/doc/)
* HTTP web requests

4. Installation

* Install [python](https://www.python.org/downloads/release/python-383/#:~:text=Full%20Changelog-,Files,-Version)
```bash
# verify installation (in the terminal)
py --version
# OR
python --version
# OR
python3 --version
#OUT>> Python 3.8.3
```

* Install bs4
```bash
# in terminal
pip install bs4
```

* *OPTIONAL* - Install code editor of your choice:
- [Visual Studio Code](https://code.visualstudio.com/Download)
- [Atom](https://atom.io/)
- [Notepad++](https://notepad-plus-plus.org/downloads/)

# Development

1. Applications

*Zavaar will show what we will create with wsu profile search **and also explain the code too*** 

*also show howmanypeopleinspace application but show backend api and that its always not ideal to scrape raw html*

2. Project #1 - [forebears.io](https://forebears.io/) data scraping

```py
# scraper_1.py
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
```

3. Project #2

Part 1 (Scraping)
```py
# scraper_2/index.py
"""
Here, we will get data from https://www.brainyquote.com/quote_of_the_day
and store the quotes of the day in a text file
"""
import requests
from bs4 import BeautifulSoup
import os
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
```

Part 2 (Introduction to web crawling)

```diff
"""
Here, we will get data from https://www.brainyquote.com/quote_of_the_day
and store the quotes of the day in a text file.
Now we will save images from different sites using the same root site (unidimensional web crawling)
"""
import requests
from bs4 import BeautifulSoup
import os
+ import re # regular expressions

# save image locally function
+ def saveImageFromUrl(url):
+   fileName = url.split("/")[-1]
+   response = requests.get(url)
+   with open(fileName, "wb") as f: # write binary to file
+       f.write(response.content)

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
+    quoteUrls = re.findall(r"\/quotes\/+\w+", response.text)[1:] # find quote subdirectories using ONLY regex from the website code NO bs4 needed
+   # ^ skip the first entry as the img div houses the same url as the next div
+   for quoteUrl in quoteUrls:
+        thisUrl = rootUrl+quoteUrl
+        print(f"Going to: {thisUrl}")
+        quotePage = requests.get(thisUrl, headers={'User-Agent': 'Mozilla/5.0'})
+        quotePageParsed = BeautifulSoup(quotePage.text, "html.parser")
+        imgUrl = quotePageParsed.find("meta", {"property": "og:image"})["content"]
+        saveImageFromUrl(imgUrl)
main()
```

4. Project 3 (wikipedia crawling)

```py
""" 
Here we will create our first webcrawler and index data all across wikipedia
in hopes of creating a viable search engine (of some sorts)
https://en.wikipedia.org/wiki/Wikipedia:Contents/Portals 
"""
import requests
from bs4 import BeautifulSoup
from time import sleep
import re
visited = []
iterations = 0
rootUrl = "https://en.wikipedia.org"
def crawl(url):
    global iterations, visited
    iterations += 1 # show number of pages crawled at the end
    response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
    parsed = BeautifulSoup(response.text, "html.parser")
    links = parsed.find_all('a')
    print(url, iterations)
    for link in links:
        if link.get("href"):
            thisLink = link["href"]
            theNextUrl = rootUrl + thisLink
            if "/wiki/" in thisLink and "Wikipedia:" not in thisLink\
            and "/Help" not in thisLink \
            and "Template:" not in thisLink and "Special:" not in thisLink \
            and "User" not in thisLink and "File:" not in thisLink \
            and ((theNextUrl not in visited) and (thisLink not in visited)): # All of these conditions are for filtering useless links for site functionality
                if "http" in thisLink:
                    visited.append(thisLink)
                    print("VISITING DIRECT SITE: ", thisLink, iterations)
                    crawl(thisLink)
                else:
                    visited.append(theNextUrl)
                    print("VISITNG NEW SITE: ", theNextUrl, iterations)
                    crawl(theNextUrl)
                if iterations % 50: # every 50 iterations update the data with all the crawled sites as of then, 
                    with open("visited.txt", "w", encoding='utf-8') as f:
                        f.write('\n'.join(visited))
                sleep(1) # so we dont spam their servers (give them a break lol)
                
def main():
    rootResponse = requests.get(rootUrl + "/wiki/Wikipedia:Contents/Portals", headers={'User-Agent': 'Mozilla/5.0'})
    parsedHtml = BeautifulSoup(rootResponse.text, "html.parser")
    categoryLinks = parsedHtml.find_all("a", {"href": re.compile(r"\/wiki\/Portal:+\w+")})
    filteredLinks = list(set([rootUrl + url["href"] for url in categoryLinks])) # removes duplicates from categoryLinks arr
    [crawl(url) for url in filteredLinks]

main()

print(iterations, len(visited))

```



>>>>>>>>>>>>>>>
TODO:
* web CRAWLING? (Seleniuim, chrome driver)
* web crawling with wikipedia and **search** indexing
>>>>>>>>>>>>>>>