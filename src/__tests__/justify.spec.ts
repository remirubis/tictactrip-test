import type { Secret } from 'jsonwebtoken';
import jwt from 'jsonwebtoken';
import request from 'supertest';

import app from '../app';

let accessToken = '';

describe('POST /api/justify', () => {
  beforeAll(() => {
    const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET as Secret;
    const email = 'test@example.com';
    accessToken = jwt.sign({ email }, accessTokenSecret);
  });

  it('returns text for a text who have less characters than justify size', async () => {
    const text = 'Hi it is me, I am a text with less than 80 characters.';

    const response = await request(app)
      .post('/api/justify')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(text)
      .set('Content-Type', 'text/plain');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/plain');
    expect(response.text).toEqual('Hi it is me, I am a text with less than 80 characters.');
  });

  it('returns justified text for a 300 character string', async () => {
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget turpis euismod, consequat libero eu, tincidunt lorem. Integer nec elit vel lacus blandit tincidunt. Morbi rutrum odio sit amet orci feugiat, id ullamcorper enim convallis. Praesent nec velit tristique, sodales eros vel, feugiat libero. Donec ut feugiat urna. Nullam vestibulum leo ut fringilla tristique. In hac habitasse platea dictumst. Sed varius, libero vitae suscipit pharetra, velit nulla iaculis turpis, vitae tempor nibh nibh nec tellus. Sed eu mi dolor. Aliquam aliquet dui a ex ullamcorper, vitae dapibus mauris venenatis. Donec euismod euismod nulla, non imperdiet nisl sagittis ac. Pellentesque sit amet sapien eu orci facilisis bibendum nec non est. Nunc id dolor id augue imperdiet pharetra. Fusce sed elit elit. Nam interdum turpis vel metus blandit euismod.';

    const response = await request(app)
      .post('/api/justify')
      .set('Authorization', `Bearer ${accessToken}`)
      .send(text)
      .set('Content-Type', 'text/plain');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/plain');
    expect(response.text).toEqual(
      `Lorem  ipsum  dolor  sit  amet, consectetur adipiscing elit. Proin eget turpis\neuismod,  consequat  libero  eu,  tincidunt  lorem. Integer nec elit vel lacus\nblandit tincidunt. Morbi rutrum odio sit amet orci feugiat, id ullamcorper enim\nconvallis. Praesent nec velit tristique, sodales eros vel, feugiat libero.Donec\nut feugiat urna. Nullam vestibulum leo ut fringilla tristique. In hac habitasse\nplatea dictumst. Sed varius, libero vitae suscipit pharetra, velit nullaiaculis\nturpis, vitae tempor nibh nibh nec tellus. Sed eu mi dolor. Aliquam aliquet dui\na ex ullamcorper, vitae dapibus mauris venenatis. Donec euismod euismod nulla,\nnon imperdiet nisl sagittis ac. Pellentesque sit amet sapien eu orci facilisis\nbibendum nec non est. Nunc id dolor id augue imperdiet pharetra. Fusce sed elit\nelit. Nam interdum turpis vel metus blandit euismod.`
    );
  });

  it('returns justified text for a 300 character string with limit', async () => {
    const text =
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin eget turpis euismod, consequat libero eu, tincidunt lorem. Integer nec elit vel lacus blandit tincidunt. Morbi rutrum odio sit amet orci feugiat, id ullamcorper enim convallis. Praesent nec velit tristique, sodales eros vel, feugiat libero. Donec ut feugiat urna. Nullam vestibulum leo ut fringilla tristique. In hac habitasse platea dictumst. Sed varius, libero vitae suscipit pharetra, velit nulla iaculis turpis, vitae tempor nibh nibh nec tellus. Sed eu mi dolor. Aliquam aliquet dui a ex ullamcorper, vitae dapibus mauris venenatis. Donec euismod euismod nulla, non imperdiet nisl sagittis ac. Pellentesque sit amet sapien eu orci facilisis bibendum nec non est. Nunc id dolor id augue imperdiet pharetra. Fusce sed elit elit. Nam interdum turpis vel metus blandit euismod.';

    const response = await request(app)
      .post('/api/justify')
      .query({ size: 120 })
      .set('Authorization', `Bearer ${accessToken}`)
      .send(text)
      .set('Content-Type', 'text/plain');

    expect(response.status).toBe(200);
    expect(response.type).toBe('text/plain');
    expect(response.text).toEqual(
      `Lorem  ipsum  dolor  sit  amet, consectetur adipiscing elit. Proin eget turpis euismod, consequat libero eu, tincidunt\nlorem.  Integer  nec  elit  vel  lacus blandit tincidunt. Morbi rutrum odio sit amet orci feugiat, id ullamcorper enim\nconvallis. Praesent nec velit tristique, sodales eros vel, feugiat libero. Donec ut feugiat urna. Nullam vestibulum leo\nut  fringilla  tristique.  In  hac  habitasse platea dictumst. Sed varius, libero vitae suscipit pharetra, velit nulla\niaculis turpis, vitae tempor nibh nibh nec tellus. Sed eu mi dolor. Aliquam aliquet dui a ex ullamcorper, vitae dapibus\nmauris  venenatis.  Donec  euismod euismod nulla, non imperdiet nisl sagittis ac. Pellentesque sit amet sapien eu orci\nfacilisis bibendum nec non est. Nunc id dolor id augue imperdiet pharetra. Fusce sed elit elit. Nam interdum turpis vel\nmetus blandit euismod.`
    );
  });

  it('returns error message when the body is missing', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Authorization', `Bearer ${accessToken}`)
      .send()
      .set('Content-Type', 'text/plain');

    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual({ error: 'Missing text' });
  });

  it('returns error message when the body is empty', async () => {
    const response = await request(app)
      .post('/api/justify')
      .set('Authorization', `Bearer ${accessToken}`)
      .send('')
      .set('Content-Type', 'text/plain');

    expect(response.status).toBe(400);
    expect(response.type).toBe('application/json');
    expect(response.body).toEqual({ error: 'Missing text' });
  });
});
