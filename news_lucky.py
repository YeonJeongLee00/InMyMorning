from flask import Flask, render_template, request, url_for
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from bs4 import BeautifulSoup
import time
import numpy as np
import os

start_time=time.time()
app = Flask(__name__, static_url_path='/static')




@app.route('/')
def main_get(num=None):

    options = webdriver.ChromeOptions()
    options.add_argument('headless')
    options.add_argument('window-size=1920x1080')
    options.add_argument("disable-gpu")
    prefs = {'profile.default_content_setting_values': {'cookies' : 2, 'images': 2, 'plugins' : 2, 'popups': 2, 'geolocation': 2, 'notifications' : 2, 'auto_select_certificate': 2, 'fullscreen' : 2, 'mouselock' : 2, 'mixed_script': 2, 'media_stream' : 2, 'media_stream_mic' : 2, 'media_stream_camera': 2, 'protocol_handlers' : 2, 'ppapi_broker' : 2, 'automatic_downloads': 2, 'midi_sysex' : 2, 'push_messaging' : 2, 'ssl_cert_decisions': 2, 'metro_switch_to_desktop' : 2, 'protected_media_identifier': 2, 'app_banner': 2, 'site_engagement' : 2, 'durable_storage' : 2}}   
    options.add_experimental_option('prefs', prefs)
    dv=webdriver.Chrome('/Users/USER/Downloads/chromedriver_win32/chromedriver.exe', chrome_options=options)

    ######## 운세 ###########
    dv.get('https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=0&ie=utf8&query=%EB%84%A4%EC%9D%B4%EB%B2%84+%EC%9A%B4%EC%84%B8')
    sex=dv.execute_script("return localStorage.getItem('ls')")
    birth=dv.execute_script("return localStorage.getItem('birth')")

    f=open('info.txt','r')
    sex=f.readline()
    birth=f.readline()
    category=f.readline()
    category=category.split('|')

    print(sex)
    print(birth)
    print(category)
    

    #여자일때 클릭
    elem = dv.find_element_by_class_name("radio_arr._gender")
    elem=elem.find_element_by_class_name("_list")
    elem.click()

    elem = dv.find_element_by_class_name("srch_txt")
    elem.clear()
    elem.send_keys(birth)
    elem.send_keys(Keys.RETURN)

    elem = dv.find_element_by_class_name("img_btn")
    elem.click()

    time.sleep(1)

    soup=BeautifulSoup(dv.page_source,'html.parser')
    lucky_title=soup.select("dl.infor._luckText.v2 dd strong")[0].text
    lucky_content=soup.select("dl.infor._luckText.v2 dd p")[0].text


    ######## 뉴스 ###########
    #txt에 category, 내용, 내용링크, 언론사, 언론사 이미지 저장
    #category -> pol(정치), eco(경제), soc(사회), lif(생활문화), wor(세계), sci(IT/과학)


    #category=['pol','lif','sci','wor','eco','soc'] #수정필요!!
    all_result=[[0 for x in range(3)] for y in range(len(category))]
    all_link=[[0 for x in range(3)] for y in range(len(category))]
    count=0

    for cate in category:
        #선호분야별 링크
        if cate=='pol':
            dv.get('https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=100')
            category[count]='정치'
        elif cate=='eco':
            dv.get('https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=101')
            category[count]='경제'
        elif cate=='soc':
            dv.get('https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=102')
            category[count]='사회'
        elif cate=='lif':
            dv.get('https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=103')
            category[count]='생활/문화'
        elif cate=='wor':
            dv.get('https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=104')
            category[count]='세계'
        elif cate=='sci':
            dv.get('https://news.naver.com/main/main.nhn?mode=LSD&mid=shm&sid1=105')
            category[count]='IT/과학'

        #print('************'+cate+'***************')
        soup=BeautifulSoup(dv.page_source,'html.parser')
        result=soup.select("div.cluster_group._cluster_content")
        #print('총', len(result), '개의 뉴스 제목이 있습니다')

        all_content=[]
        count2=0

        for i in result:
            if count2==3 : break
            content=i.select(".cluster_item .cluster_text a")[0].text
            news_link=i.select(".cluster_item .cluster_text a")[0].attrs['href']
            #print('내용')
            #print(content)
            all_result[count][count2]=content

            all_content.append(content)
            #print('링크')
            #print(news_link)
            all_link[count][count2]=news_link
            #print('\n')
            count2+=1

        count+=1
    print("seconds " , (time.time()-start_time))
    return render_template('index.html',char1=lucky_title, char2=lucky_content,category=category,category_len=len(category),content=all_result,link=all_link, num=1)


if __name__ == '__main__':
    # threaded=True 로 넘기면 multiple plot이 가능해짐
  app.run(debug=True, threaded=True)





