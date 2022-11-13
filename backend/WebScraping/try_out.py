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
website = "https://webscraper.io/test-sites/e-commerce/static/computers/laptops?page=2"
#driver.get(website)


#data science jobs
driver.get("https://sg.linkedin.com/jobs/search?keywords=data%2Bscience&location=Singapore%2C%2BSingapore&trk=homepage-jobseeker_jobs-search-bar_search-submit&currentJobId=3191177955&position=1&pageNum=0")

#add jobs in
jobs = []

#jobs_listings = driver.find_elements(By.XPATH,"//h4/a[@href]")
jobs_listings = driver.find_elements(By.XPATH,"//div[@data-column='1']/a[@href]")
for i in jobs_listings:
    job_url = i.get_attribute("href")
    
    driver2 = webdriver.Chrome(options = options, service = Service(ChromeDriverManager().install()))
    driver2.get(job_url)
    role = driver2.find_element(By.TAG_NAME,"h1").text
    print(role)
    company = driver2.find_element(By.XPATH,"//h4/div/span/a").text
    print(company)
    #job_description = driver.find_element(By.XPATH, "//*[@id='main-content']/section[1]/div/div/section[1]/div/div/section/div")
    #print(job_description)
    employment_type = driver2.find_element(By.XPATH, "//*[@id='main-content']/section[1]/div/div/section[1]/div/ul/li[2]/span").text
    print(employment_type)
    experience_level = driver2.find_elemeent(By.XPATH,"//*[@id='main-content']/section[1]/div/div/section[1]/div/ul/li[1]/span").text
    print(experience_level)
    industry_type = driver2.find_element(By.XPATH,"//*[@id='main-content']/section[1]/div/div/section[1]/div/ul/li[4]/span").text
    print(industry_type)
    total_applicants = driver2.find_element(By.XPATH,"//*[@id='main-content']/section[1]/div/section[2]/div/div[1]/div/h4/div[2]/figure/figcaption").text
    print(total_applicants)
    driver2.quit()










# #scroll through page
# SCROLL_PAUSE_TIME = 0.5

# # Get scroll height
# last_height = driver.execute_script("return document.body.scrollHeight")

# while True:
#     # Scroll down to bottom
#     driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

#     # Wait to load page
#     time.sleep(SCROLL_PAUSE_TIME)

#     # Calculate new scroll height and compare with last scroll height
#     new_height = driver.execute_script("return document.body.scrollHeight")
#     if new_height == last_height:
#         break
#     last_height = new_height

