type WorkerData = number;

self.onmessage = (event: MessageEvent<WorkerData>) => {
  // 这就是我们之前在 Blob 里的代码哦!
  const data = event.data;
  const result = data * 2;
  
  self.postMessage(result);
};
