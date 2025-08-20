import './css/index.scss';

import './background';
import './nav';

import pLimit from 'p-limit';

class WorkerPool {
  #lim;
  constructor(concurrency: number) {
    this.#lim = pLimit(concurrency);
  }
  async run(url: string, data: unknown): Promise<unknown> {
    return this.#lim(() => {
      return new Promise((resolve, reject) => {
        const worker = new Worker(url, {
          type: 'module'
        });
        worker.addEventListener('message', (event) => {
          resolve(event.data);
          worker.terminate();
        });
        worker.addEventListener('error', (error) => {
          reject(error);
          worker.terminate();
        });
        worker.postMessage(data);
      });
    });
  }
}
