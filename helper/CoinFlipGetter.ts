import { HttpStatusCode, IHttp } from '@rocket.chat/apps-engine/definition/accessors';

import { CoinFlipResult } from '../helper/CoinFlipResult';

export class CoinFlipGetter {
    public async flip(): Promise<CoinFlipResult> {
      const thecoin = ['Heads', 'Tails'];
      const result = new CoinFlipResult();
      result.result = thecoin[Math.floor(Math.random() * thecoin.length)];
      return result;
    }
}
