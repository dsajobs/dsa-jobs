from selenium import webdriver
import time
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import pandas as pd


options = Options()
options.headless = True
options.add_argument("--window-size=1920,1200")

driver = webdriver.Chrome(options = options, service = Service(ChromeDriverManager().install()))

#data science jobs
driver.get("https://sg.linkedin.com/jobs/search?keywords=data%2Bscience&location=Singapore%2C%2BSingapore&trk=homepage-jobseeker_jobs-search-bar_search-submit&currentJobId=3191177955&position=1&pageNum=0")

#add jobs in

roles = []
companies = []
companies_url = []
desc = []
employment_types = []
experience_levels = []
industry_types = []
jobs_url = []
applications = []
count = 0
check = 0

#scroll through page
SCROLL_PAUSE_TIME = 4

# Get scroll height
last_height = driver.execute_script("return document.body.scrollHeight")

while True:
    try: 
        button = driver.find_element(By.XPATH,"//*[@id='main-content']/section[2]/button")
        button.click()
        time.sleep(SCROLL_PAUSE_TIME+3)
        print("clicked")
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

    # Wait to load page
        time.sleep(SCROLL_PAUSE_TIME)

    # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
        count+=1
        print(count)
    # Scroll down to bottom
    except:
        driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")

        # Wait to load page
        time.sleep(SCROLL_PAUSE_TIME)

        # Calculate new scroll height and compare with last scroll height
        new_height = driver.execute_script("return document.body.scrollHeight")
        if new_height == last_height:
            break
        last_height = new_height
        count+=1
        print(count)



#jobs_listings = driver.find_elements(By.XPATH,"//h4/a[@href]")

job_listings = driver.find_elements(By.XPATH,"//div[@data-column='1']/a[@href]")
for i in job_listings:
    job_url = job_listings.get_attribute("href")
    jobs_url.append(job_url)
    driver2 = webdriver.Chrome(options = options, service = Service(ChromeDriverManager().install()))
    driver2.get(job_url)

    # job_description = driver.find_element(By.CLASS_NAME, "show-more-less-html__markup show-more-less-html__markup--clamp-after-5").text
    # desc.append(job_description)

    role = driver2.find_element(By.TAG_NAME,"h1").text
    roles.append(role)
    company = driver2.find_element(By.XPATH,"//h4/div/span/a").text
    companies.append(company)
    company_url = driver2.find_element(By.XPATH, "//*[@id='main-content']/section[1]/div/section[2]/div/div[1]/div/h4/div[1]/span[1]/a").get_attribute("href")
    companies_url.append(company_url)
    try:
        employment_type = driver2.find_element(By.XPATH, "//*[@id='main-content']/section[1]/div/div/section[1]/div/ul/li[2]/span").text
    except:
        employment_types.append("NIL")
    else:
        employment_types.append(employment_type)
    try:
        experience_level = driver2.find_element(By.XPATH,"//*[@id='main-content']/section[1]/div/div/section[1]/div/ul/li[1]/span").text
    except:
        experience_levels.append("NIL")
    else:    
        experience_levels.append(experience_level)
    try:
        industry_type = driver2.find_element(By.XPATH,"//*[@id='main-content']/section[1]/div/div/section[1]/div/ul/li[4]/span").text
    except:
        industry_types.append("NIL")
    else:
        industry_types.append(industry_type)

    try:
        total_applicants = driver2.find_element(By.XPATH,"//*[@id='main-content']/section[1]/div/section[2]/div/div[1]/div/h4/div[2]/span[2]").text
    except:
        total_applicants = "NIL"
    if total_applicants == "NIL":
        try: 
            total_applicants = driver2.find_element(By.XPATH,"//*[@id='main-content']/section[1]/div/section[2]/div/div[1]/div/h4/div[2]/figure/figcaption").text
        except:
            total_applicants = "NIL"
    applications.append(total_applicants)
    print(check)
    check+=1
    driver2.quit()

jobs_df = pd.DataFrame({
    "Role": roles,
    "Company": companies,
    "Company_Link":companies_url,
    # "Job_Details": desc,
    "Employment_Type": employment_types,
    "Experience_Level" : experience_levels,
    "Industry_Type": industry_types,
    "Total_Applicants": applications,
    "Job_Link": jobs_url
})

jobs_df.to_csv("~/Downloads/linkedin_jobs.csv", index = False)











