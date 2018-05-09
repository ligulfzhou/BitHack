import optparse
from aiohttp import web
from views import get_key_pair, get_multiple_key_pair
from utils import logger
from middlewares import error_middleware


parser = optparse.OptionParser()
parser.add_option('-p', '--port', help='run on which port', default=50009)
options, _ = parser.parse_args()


if __name__ == '__main__':
    app = web.Application()
    app.router.add_get('/bit/num', get_key_pair)
    app.router.add_get('/bit/multi', get_multiple_key_pair)
    # app.middlewares.append(error_middleware)
    # set_up_app(app)
    web.run_app(app, host='0.0.0.0', port=options.port)

