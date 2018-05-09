import socket
import argparse
import hashlib
import time
import errno
import json
import random
import os
import pycoin
import asyncio
from pycoin.key.Key import Key
import logging
import logging.config

logging.config.fileConfig('logging.conf')
logger = logging.getLogger('root')


filename = 'prikeys.txt'

class Bitcoin:

    def __init__(self, loop):
        self.loop = loop
        self.electrumx_host = '127.0.0.1'
        self.electrumx_port = 50001
        self.leveldb_host = '127.0.0.1'
        self.leveldb_port = 50005

    async def get_bitcoin_balance(self, addr):
        reader, writer = await asyncio.open_connection(self.electrumx_host, self.electrumx_port, loop=self.loop)
        params = {
            'jsonrpc': '2.0',
            'method': 'blockchain.address.get_balance',
            'params': [addr],
            'id': addr
        }
        writer.write(json.dumps(params).encode()+b'\n')
        logger.info('data send')
        data = await reader.read(1024)
        writer.close()
        logger.error('bitcoin_balace: {}'.format(json.loads(data)))
        data = json.loads(data)
        res = {
            'confirmed': data['result']['confirmed'],
            'unconfirmed': data['result']['unconfirmed']
        }
        return res

    async def _send_addr_priv(self, pairs):
        # 原先有将生成的私钥和地址入leveldb的,以地址为k,私钥为v
        # 获取到交易通知时，按交易的发送方和接收方的地址去查这个leveldb去获得私钥
        reader, writer = await asyncio.open_connection(self.leveldb_host, self.leveldb_port, loop=self.loop)
        data = {
            'params': [pairs],
            'method': 'put_multi'
        }
        writer.write(json.dumps(data).encode())
        logger.info('send pairs, {}'.format(pairs))
        writer.close()

    async def get_has_balance_prikey(self, num):
        res = []
        k = Key(num)
        addr, priv = k.address(), k.wif()
        try:
            balance = await self.get_bitcoin_balance(addr)
            if int(balance['confirmed']) or int(balance['unconfirmed'])>0:
                res.append(priv)
        except Exception as e:
            logger.error(e)
            logger.error('%s: %s'%(num, addr))

        addr2, priv2 = k.address(use_uncompressed=True), k.wif(use_uncompressed=True)
        try:
            balance = await self.get_bitcoin_balance(addr2)
            if int(balance['confirmed'])>0 or int(balance['unconfirmed'])>0:
                res.append(priv2)
        except Exception as e:
            logger.error(e)
            logger.error('%s: %s'%(num, addr))

        pairs = {
            addr: priv,
            addr2: priv2
        }
        # await self._send_addr_priv(pairs)

        return res

    async def start_scrap(self):
        while True:
            tmp = random.randint(1, 115792089237316195423570985008687907853269984665640564039457584007913129639937)
            num = tmp // (10**random.randint(0, len(str(tmp))))
            if not num:
                num = tmp
            logger.info('No: {}'.format(num))
            prikeys = await self.get_has_balance_prikey(num)
            if prikeys:
                self.write_to_file(prikeys)
