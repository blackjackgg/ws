import time
from selenium import webdriver
from selenium.webdriver import ActionChains
from readcookie import get_cookies_from_chrome
from selenium.webdriver.chrome.options import Options

chrome_options = Options()
# chrome_options.add_argument('--headless')
chrome = webdriver.Chrome(chrome_options=chrome_options, )

url = "https://nw1.mw0008.com/index.html?account=81887_nwg818873a58335&token" \
      "=eyJkYXRhIjoiODE4ODdfbndnODE4ODczYTU4MzM1IiwiY3JlYXRlZCI6MTYwNzI0MjczMSwiZXhwIjoxNTB9.SkEMx584CaqJF4Enf5" \
      "/LHzv9I0XYq5xcsXIR2psymSg=&lang=zh-CN&route=wss.xsj052.com&gameId=910&jumpType=1"


def openurl(link):
    copy_cookie("baidu.com")
    chrome.set_window_size(883, 764)
    chrome.execute_script('window.open("%s")' % link)
    window_list = chrome.window_handles  # 获取窗口列表
    chrome.switch_to.window(window_list[1])  # 将browers_driver的指针转移到指定的窗口
    print(chrome.current_url)  # 打印browers_driver指向的窗口网址

    time.sleep(8)  # 等待加载完成

    canvas = chrome.find_element_by_tag_name("canvas")
    x = 721  ## 参数值获取参考nws.js内的内容
    y = 233

    drawing = ActionChains(chrome) \
        .move_to_element_with_offset(canvas, x, y).click()
    drawing.perform()

    print("点击了进入房间按钮！！")


def copy_cookie(hostname):
    hosturl = "https://%s" % (hostname)
    chrome.get(hosturl)  # 这里必须使用get才能导入cookie
    hostcookie = get_cookies_from_chrome(domain=hostname)
    # 导入cookie 导入前需要先访问一遍url才可以
    for item in hostcookie:
        print(item)
        chrome.add_cookie(item)
    chrome.get(hosturl)  # 这里必须使用get才能导入cookie
    return "000"


## 写入本地localstorge内容
## chrome.execute_script('localStorage.setItem("websitename", arguments["token"]);', "66666+")  ##网站名 key + value

try:  #进程退出关闭chrome 释放内存
    openurl(url)
except:
    chrome.quit()
