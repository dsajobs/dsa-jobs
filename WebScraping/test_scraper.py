from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from selenium.webdriver.chrome.options import Options

options = Options()
options.headless = True
options.add_argument("--window-size=80,24")

driver = webdriver.Chrome(options = options, service = Service(ChromeDriverManager().install()))

driver.get("https://www.nintendo.com/")
print(driver.page_source)
driver.quit()