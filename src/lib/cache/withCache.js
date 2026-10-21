import { cacheProvider } from "./init.js";

export function withCache(ttl = 3600) {
  return async (req, res, next) => {
   
    let key = `${req.method} ${req.originalUrl}`;

    
    const cached = await cacheProvider.get(key);
    if (cached) {
        res.setHeader('x-Cache' ,"HIT")
      return res.json(JSON.parse(cached));
    }
   
    const originalJson = res.json.bind(res);

    res.json = (async (body) => {
         if(res.statusCode >= 200 && res.statusCode < 300){

      await cacheProvider.set(key, JSON.stringify(body), ttl);
      res.setHeader('x-Cache' ,"MISS")
       }
      return originalJson(body);
    });

    next();
  };
}