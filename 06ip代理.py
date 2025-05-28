import random
from http.client import responses

import requests
from lxml import etree
import time
import execjs
from concurrent.futures.thread import ThreadPoolExecutor
import re
import jsonpath
import os

# 代理地址：https://schb.shanchendaili.com/getip/
class MusicSpider:
    # 基础URL，用于构造分页请求
    base_url = 'https://5sing.kugou.com/yc/list?t=2&l=&s=&p={}'
    # 用于生成签名的密钥字符串
    o = '5uytoxQewcvIc1gn1PlNF0T2jbbOzRl5'
    # 下载链接的URL
    download_url = 'https://5sservice.kugou.com/song/getsongurl'
    # 获取IP代理的API地址
    ip_url = 'https://sch.shanchendaili.com/api.html?action=get_ip&key=HUe6fdb3315800232838tXHE&time=10&count=5&type=json&only=0'
    # Cookie池，用于模拟登录
    cookie_list=[
        {"kg_mid":"bc53a47723d79e7c47e989a19c1ffa5c","kg_dfid":"3MmHmW2T95TW4Bee872lFvzq"},
        {"kg_mid":"499222cf50f704d5a11abfe627e240a7","kg_dfid":"2mRd8G2T95Pu3h04DX3q0LjL"},
        {"kg_mid":"04ee0b611382b26ea8e7069152e52d91","kg_dfid":"3x6wQm2T95ZC3R6Wvv3AsuiL"},
        {"kg_mid":"a0c831e8b3f0b757d89ce3425dc43709","kg_dfid":"0R70XE2T95Nq3OpjtP4VE4AM"}
    ]

    def __init__(self):
        # 初始化代理列表，并获取有效的代理
        self.proxies_list = []
        self.fetch_valid_proxies()
        # 如果没有歌曲下载目录，则创建该目录
        if not os.path.isdir('歌曲下载'):
            os.mkdir('歌曲下载')

    def fetch_valid_proxies(self):
        """获取并验证有效代理"""
        resp = requests.get(self.ip_url)
        ips=resp.json()['list'][0]
        for ip in ips:
            proxies = {'http': f'http://{ips["sever"]}:{ips["port"]}'}
            if self.test_proxy(proxies):
                print(f'代理：{ips["sever"]}:{ips["port"]}可用')
                self.proxies_list.append(proxies)

    def test_proxy(self, proxy):
        """测试代理是否可用"""
        try:
            response = requests.get("http://httpbin.org/ip", proxies=proxy, timeout=5)
            return response.status_code == 200
        except:
            return False

    def get_page_html(self, page):
        # 随机选择一个代理进行请求
        proxies=random.choice(self.proxies_list)
        print(f'使用代理：{proxies}')
        resp = requests.get(self.base_url.format(page), proxies=proxies)
        # 提取页面HTML内容
        page = resp.text
        html = etree.HTML(page)
        dl_list = html.xpath('//div[@class="lists"]/dl')

        # 遍历所有dl标签
        for dl in dl_list:
            # 获取歌曲名称
            song_name = dl.xpath('.//h3/a/text()')[0]
            # 获取歌曲首页地址
            song_url = 'https://5sing.kugou.com' + dl.xpath('.//h3/a/@href')[0]
            # 获取歌曲id
            song_id = dl.xpath('.//a[@class="m_date_shou"]/@argid')[0]
            print(f'歌名：{song_name} 歌曲地址：{song_url} 歌曲id：{song_id}')
            self.get_download_url(song_id,proxies)

    def get_sign(self, params):
        # 构造参数列表
        plist = [f'{k}={v}' for k, v in params.items()]
        # 插入密钥字符串到列表首尾
        plist.insert(0, self.o)
        plist.append(self.o)
        pstr = ''.join(plist)

        # 读取JS文件，生成签名
        js_code = open('sign.js', 'r', encoding='utf-8').read()
        JS = execjs.compile(js_code)
        sign = JS.call('get_sign', pstr)
        return sign

    def get_download_url(self, song_id,proxies):
        # 随机选择一个cookie进行请求
        cookie=random.choice(self.cookie_list)
        params = {
            'appid': '2918',
            'clienttime': int(time.time() * 1000),
            'clientver': '1000',
            'dfid': cookie['kg_dfid'],
            'mid': cookie['kg_mid'],
            'songid': song_id,
            'songtype': 'yc',
            'uuid': cookie['kg_mid'],
            'version': '6.6.72',
        }
        sign = self.get_sign(params)
        # 添加签名到请求参数中
        params['signature'] = sign
        # 发送请求获取下载链接
        response = requests.get(self.download_url, params=params,proxies=proxies)
        result = response.json()
        print(result)
        # 提取下载地址和歌曲名称
        download_url = result['data']['lqurl']
        song_name = result['data']['songName']
        self.download_music(download_url, song_name,proxies)

    def download_music(self, download_url, song_name,proxies):
        # 下载音乐文件
        resp = requests.get(download_url,proxies=proxies)
        print(resp.status_code)
        if resp.status_code == 200:
            with open(f'歌曲下载/{song_name}.mp3', 'wb') as f:
                f.write(resp.content)
                print(f'歌曲{song_name}下载完成')
        else:
            print('下载失败')

    def main(self, pages, workers=1):
        # 使用线程池并发执行爬取任务
        with ThreadPoolExecutor(max_workers=workers) as t:
            for page in range(1, pages + 1):
                t.submit(self.get_page_html, page)

if __name__ == '__main__':
    music_spider = MusicSpider()
    music_spider.main(pages=2, workers=5)
