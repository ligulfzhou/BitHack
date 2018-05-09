import asyncio
import pycoin
import json
import logging
import logging.config

from pycoin.key.Key import Key
from utils import ELECTRUMX, rs, logger, FIVE_DAYS
from aiohttp.web import json_response


def get_key_of_key_pair_of_number(num):
    return 'key_pair_of_%s' % num


async def get_bitcoin_balance(addr):
    reader, writer = await asyncio.open_connection(ELECTRUMX['host'], ELECTRUMX['port'])
    params = {
        'jsonrpc': '2.0',
        'method': 'blockchain.address.get_balance',
        'params': [addr],
        'id': addr
    }
    writer.write(json.dumps(params).encode()+b'\n')
    data = await reader.read(1024)
    writer.close()
    data = json.loads(data)
    res = {
        'confirmed': data['result']['confirmed'],
        'unconfirmed': data['result']['unconfirmed']
    }
    return res


async def get_key_pairs(num):
    key = get_key_of_key_pair_of_number(num)
    v = rs.get(key)
    if v:
        return json.loads(v)

    keypairs = []
    k = Key(num)
    addr, priv = k.address(), k.wif()
    try:
        balance = await get_bitcoin_balance(addr)
        keypairs.append({
            'priv': priv,
            'addr': addr,
            'confirmed': balance['confirmed'],
            'unconfirmed': balance['unconfirmed']
        })
    except Exception as e:
        logger.error(e)
        pass

    addr2, priv2 = k.address(use_uncompressed=True), k.wif(use_uncompressed=True)
    try:
        balance = await get_bitcoin_balance(addr2)
        keypairs.append({
            'priv': priv2,
            'addr': addr2,
            'confirmed': balance['confirmed'],
            'unconfirmed': balance['unconfirmed']
        })
    except Exception as e:
        logger.error(e)
        pass

    if keypairs and len(keypairs) == 2:
        rs.set(key, json.dumps(keypairs), FIVE_DAYS)
    return keypairs


async def get_key_pair(request):
    number = int(request.query.get('number', 1))
    assert 1 <= number <= 115792089237316195423570985008687907853269984665640564039457584007913129639936
    key_pairs = await get_key_pairs(number)
    return json_response({
        'key_pairs': key_pairs,
        'number': number
    })


async def get_multiple_key_pair(request):
    page = int(request.query.get('page', 1))
    if page > 14474011154664524427946373126085988481658748083205070504932198000989141204992:
        page = 14474011154664524427946373126085988481658748083205070504932198000989141204992
    page_size = int(request.query.get('page_size', 8))
    numbers = range((page - 1) * page_size + 1, page * page_size + 1)
    res = []
    for number in numbers:
        keypairs = await get_key_pairs(number)
        res.append({
            'title': str(number),
            'data': keypairs
        })
    return json_response({
        'page': page,
        'page_keypairs': res
    })

