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