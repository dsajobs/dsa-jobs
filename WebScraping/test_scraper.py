from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = Options()
options.headless = True
options.add_argument("--window-size=80,24")

driver = webdriver.Chrome(options = options, service = Service(ChromeDriverManager().install()))

#data science jobs
website = "https://sg.indeed.com/jobs?q=data+science&l=Singapore&vjk=ff0c257b2bcbaf92"
driver.get(website)

job_listings = driver.find_elements(By.XPATH,"//a[@href]")
for i in job_listings:
    print(i.get_attribute("href"))



