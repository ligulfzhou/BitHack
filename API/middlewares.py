from aiohttp import web
from utils import logger, wrap_json

@web.middleware
async def error_middleware(request, handler):
    try:
        resp = await handler(request)

        import ipdb
        ipdb.set_trace()
        if isinstance(resp, dict):
            return wrap_json(resp)

        return resp
    except Exception as e:
        logger.error(e)
        if e.status == 500:
            return wrap_json({}, errcode=5000)
        return wrap_json({}, errcode=4004)

