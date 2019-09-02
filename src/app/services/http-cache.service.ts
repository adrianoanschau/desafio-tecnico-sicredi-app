import { Injectable } from '@angular/core';
import {HttpResponse} from '@angular/common/http';

const cachePersistenceKey = 'httpCache';

export interface HttpCacheEntry {
  lastUpdated: Date;
  data: HttpResponse<any>;
}

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  private cachedData: {
    [key: string]: HttpCacheEntry
  } = {};
  private storage: Storage | null = null;

  constructor() {
    this.loadCacheData();
  }

  setPersistence(persistence?: 'local' | 'session') {
    this.cleanCache();
    this.storage = persistence === 'local' || persistence === 'session' ? window[persistence + 'Storage'] : null;
    this.loadCacheData();
  }

  private saveCacheData() {
    if (this.storage) {
      this.storage.setItem(cachePersistenceKey, JSON.stringify(this.cachedData));
    }
  }

  private loadCacheData() {
    const data = this.storage ? this.storage.getItem(cachePersistenceKey) : null;
    this.cachedData = data ? JSON.parse(data) : {};
  }

  setCacheData(url: string, data: HttpResponse<any>, lastUpdate?: Date) {
    this.cachedData[url] = {
      lastUpdated: lastUpdate || new Date(),
      data
    };
    this.saveCacheData();
  }

  getCacheData(url: string): HttpResponse<any> | null {
    const cacheEntry = this.cachedData[url];

    if (cacheEntry) {
      return cacheEntry.data;
    }

    return null;
  }

  getHttpCacheEntry(url: string): HttpCacheEntry | null {
    return this.cachedData[url] || null;
  }

  clearCache(url: string): void {
    delete this.cachedData[url];
    this.saveCacheData();
  }

  cleanCache(expirationDate?: Date) {
    if (expirationDate) {
      Object.entries(this.cachedData).forEach(([key, value]) => {
        if (expirationDate >= value.lastUpdated) {
          delete this.cachedData[key];
        }
      });
    } else {
      this.cachedData = {};
    }
    this.saveCacheData();
  }
}
