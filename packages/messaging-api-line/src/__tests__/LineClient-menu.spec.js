import fs from 'fs';
import path from 'path';

import MockAdapter from 'axios-mock-adapter';

import LineClient from '../LineClient';

const ACCESS_TOKEN = '1234567890';
const CHANNEL_SECRET = 'so-secret';

const headers = {
  Accept: 'application/json, text/plain, */*',
  'Content-Type': 'application/json',
  Authorization: `Bearer ${ACCESS_TOKEN}`,
};

const createMock = () => {
  const client = new LineClient(ACCESS_TOKEN, CHANNEL_SECRET);
  const mock = new MockAdapter(client.axios);
  return { client, mock };
};

describe('Rich Menu', () => {
  describe('#getRichMenuList', () => {
    it('should call api', async () => {
      expect.assertions(4);

      const { client, mock } = createMock();

      const reply = {
        richmenus: [
          {
            richMenuId: 'richmenu-8dfdfc571eca39c0ffcd1f799519c5b5',
            size: {
              width: 2500,
              height: 1686,
            },
            selected: false,
            name: 'Nice richmenu',
            chatBarText: 'Tap here',
            areas: [
              {
                bounds: {
                  x: 0,
                  y: 0,
                  width: 2500,
                  height: 1686,
                },
                action: {
                  type: 'postback',
                  data: 'action=buy&itemid=123',
                },
              },
            ],
          },
        ],
      };

      mock.onGet().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/richmenu/list'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.getRichMenuList();

      expect(res).toEqual([
        {
          richMenuId: 'richmenu-8dfdfc571eca39c0ffcd1f799519c5b5',
          size: {
            width: 2500,
            height: 1686,
          },
          selected: false,
          name: 'Nice richmenu',
          chatBarText: 'Tap here',
          areas: [
            {
              bounds: {
                x: 0,
                y: 0,
                width: 2500,
                height: 1686,
              },
              action: {
                type: 'postback',
                data: 'action=buy&itemid=123',
              },
            },
          ],
        },
      ]);
    });
  });

  describe('#getRichMenu', () => {
    it('should call api', async () => {
      expect.assertions(4);

      const { client, mock } = createMock();

      const reply = {
        richMenuId: 'richmenu-8dfdfc571eca39c0ffcd1f799519c5b5',
        size: {
          width: 2500,
          height: 1686,
        },
        selected: false,
        name: 'Nice richmenu',
        chatBarText: 'Tap here',
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 2500,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=buy&itemid=123',
            },
          },
        ],
      };

      mock.onGet().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/richmenu/richmenu-8dfdfc571eca39c0ffcd1f799519c5b5'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.getRichMenu(
        'richmenu-8dfdfc571eca39c0ffcd1f799519c5b5'
      );

      expect(res).toEqual(reply);
    });
  });

  describe('#createRichMenu', () => {
    it('should call api', async () => {
      expect.assertions(4);

      const { client, mock } = createMock();

      const reply = {
        richMenuId: 'richmenu-8dfdfc571eca39c0ffcd1f799519c5b5',
      };

      const richMenuObject = {
        size: {
          width: 2500,
          height: 1686,
        },
        selected: false,
        name: 'Nice richmenu',
        chatBarText: 'Tap here',
        areas: [
          {
            bounds: {
              x: 0,
              y: 0,
              width: 2500,
              height: 1686,
            },
            action: {
              type: 'postback',
              data: 'action=buy&itemid=123',
            },
          },
        ],
      };

      mock.onPost().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/richmenu'
        );
        expect(JSON.parse(config.data)).toEqual(richMenuObject);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.createRichMenu(richMenuObject);

      expect(res).toEqual(reply);
    });
  });

  describe('#deleteRichMenu', () => {
    it('should call api', async () => {
      expect.assertions(4);

      const { client, mock } = createMock();

      const reply = {};

      mock.onDelete().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/richmenu/1'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.deleteRichMenu('1');

      expect(res).toEqual(reply);
    });
  });

  describe('#getLinkedRichMenu', () => {
    it('should call api', async () => {
      expect.assertions(4);

      const { client, mock } = createMock();

      const reply = {
        richMenuId: 'richmenu-8dfdfc571eca39c0ffcd1f799519c5b5',
      };

      mock.onGet().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/user/1/richmenu'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.getLinkedRichMenu('1');

      expect(res).toEqual(reply);
    });
  });

  describe('#linkRichMenu', () => {
    it('should call api', async () => {
      expect.assertions(4);

      const { client, mock } = createMock();

      const reply = {};

      mock.onPost().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/user/1/richmenu/2'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.linkRichMenu('1', '2');

      expect(res).toEqual(reply);
    });
  });

  describe('#unlinkRichMenu', () => {
    it('should call api', async () => {
      expect.assertions(4);

      const { client, mock } = createMock();

      const reply = {};

      mock.onDelete().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/user/1/richmenu'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.unlinkRichMenu('1');

      expect(res).toEqual(reply);
    });
  });

  describe('#uploadRichMenuImage', () => {
    it('should call api', async () => {
      expect.assertions(4);

      const { client, mock } = createMock();

      const reply = {};

      const buffer = await new Promise((resolve, reject) => {
        fs.readFile(path.join(__dirname, 'fixture.png'), (err, buf) => {
          if (err) {
            reject(err);
          } else {
            resolve(buf);
          }
        });
      });

      mock.onPost().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/richmenu/1/content'
        );
        expect(config.data).toEqual(buffer);
        expect(config.headers).toEqual({
          ...headers,
          'Content-Type': 'image/png',
        });
        return [200, reply];
      });

      const res = await client.uploadRichMenuImage('1', buffer);

      expect(res).toEqual(reply);
    });

    it('should throw error when ', async () => {
      expect.assertions(1);

      const { client, mock } = createMock();

      const reply = {};

      mock.onPost().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/richmenu/1/content'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      let error;
      try {
        await client.uploadRichMenuImage('1', Buffer.from('a content buffer'));
      } catch (err) {
        error = err;
      }

      expect(error.message).toMatch(/image\/(jpeg|png)/);
    });
  });

  describe('#downloadRichMenuImage', () => {
    it('should call api', async () => {
      const { client, mock } = createMock();

      const reply = Buffer.from('a content buffer');

      mock.onGet().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/richmenu/1/content'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.downloadRichMenuImage('1');

      expect(res).toEqual(reply);
    });
  });

  describe('#getDefaultRichMenu', () => {
    it('should call api', async () => {
      const { client, mock } = createMock();

      const reply = {
        richMenuId: 'richmenu-8dfdfc571eca39c0ffcd1f799519c5b5',
      };

      mock.onGet().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/user/all/richmenu'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.getDefaultRichMenu();

      expect(res).toEqual(reply);
    });
  });

  describe('#setDefaultRichMenu', () => {
    it('should call api', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock.onPost().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/user/all/richmenu/richmenu-8dfdfc571eca39c0ffcd1f799519c5b5'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.setDefaultRichMenu(
        'richmenu-8dfdfc571eca39c0ffcd1f799519c5b5'
      );

      expect(res).toEqual(reply);
    });
  });

  describe('#deleteDefaultRichMenu', () => {
    it('should call api', async () => {
      const { client, mock } = createMock();

      const reply = {};

      mock.onDelete().reply(config => {
        expect(config.baseURL + config.url).toEqual(
          'https://api.line.me/v2/bot/user/all/richmenu'
        );
        expect(config.data).toEqual(undefined);
        expect(config.headers).toEqual(headers);
        return [200, reply];
      });

      const res = await client.deleteDefaultRichMenu();

      expect(res).toEqual(reply);
    });
  });
});
