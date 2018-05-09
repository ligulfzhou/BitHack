import redis
from aiohttp.web import json_response

import logging
import logging.config

logging.config.fileConfig('logging.conf')
logger = logging.getLogger('root')


REDIS = {
    'host': '127.0.0.1',
    'port': 6379,
    'db': 1
}

ELECTRUMX = {
    'host': '82.118.234.178',
    'port': 50001
}

rs = redis.StrictRedis(host=REDIS['host'], port=REDIS['port'])


ERR_CODE = {
    200: '请求成功',
    4004: '404, not find',
    5000: '服务器错误'
}


def wrap_json(data, errcode=200):
    data.update({
        'errcode': errcode,
        'errmsg': ERR_CODE[errcode]
    })
    headers = {
        'ACCESS-CONTROL-ALLOW-ORIGIN': '*'
    }
    t = json_response(data, headers=headers)
    return data
