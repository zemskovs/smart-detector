import vk as vk_api

from app.constants import ACCESS_TOKEN
from app.core.models.vk_post import VKPost
from app.core.parsers.iparser import IParser
from app.core.parsers.utils import get_extended_post_id_from_url, get_group_id_from_url, \
    get_post_id_from_url


class VKParser(IParser):
    def parse(self, url):
        session = vk_api.Session(access_token=ACCESS_TOKEN)
        vk = vk_api.API(session, v='5.84')
        post_id = get_extended_post_id_from_url(url)
        post = vk.wall.getById(posts=post_id, extended=1, copy_history_depth=200)

        result_post = VKPost()
        result_post.fill_from_vk_object(post)
        return result_post
