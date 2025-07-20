import redis
import json
import os
from typing import Dict, Any, Optional
from datetime import datetime, timedelta
import asyncio

class CacheService:
    def __init__(self):
        # Initialize Redis connection
        self.redis_client = redis.Redis(
            host=os.getenv("REDIS_HOST", "localhost"),
            port=int(os.getenv("REDIS_PORT", 6379)),
            db=0,
            decode_responses=True
        )
        
        # Fallback to in-memory cache if Redis is not available
        self.memory_cache = {}
        self.cache_ttl = timedelta(hours=24)  # 24 hours TTL
    
    async def cache_website(self, website_id: str, website_data: Dict[str, Any]) -> bool:
        """Cache website data"""
        try:
            # Add timestamp for TTL management
            website_data["cached_at"] = datetime.now().isoformat()
            
            # Try Redis first
            await self._cache_in_redis(website_id, website_data)
            return True
        except Exception as e:
            # Fallback to memory cache
            print(f"Redis cache failed, using memory cache: {e}")
            await self._cache_in_memory(website_id, website_data)
            return True
    
    async def get_website(self, website_id: str) -> Optional[Dict[str, Any]]:
        """Get website data from cache"""
        try:
            # Try Redis first
            cached_data = await self._get_from_redis(website_id)
            if cached_data:
                return cached_data
            
            # Fallback to memory cache
            cached_data = await self._get_from_memory(website_id)
            if cached_data:
                return cached_data
            
            return None
        except Exception as e:
            print(f"Cache retrieval failed: {e}")
            return None
    
    async def invalidate_website(self, website_id: str) -> bool:
        """Invalidate cached website data"""
        try:
            # Remove from Redis
            await self._remove_from_redis(website_id)
            
            # Remove from memory cache
            await self._remove_from_memory(website_id)
            
            return True
        except Exception as e:
            print(f"Cache invalidation failed: {e}")
            return False
    
    async def get_cache_stats(self) -> Dict[str, Any]:
        """Get cache statistics"""
        try:
            redis_info = self.redis_client.info()
            memory_cache_size = len(self.memory_cache)
            
            return {
                "redis_connected": True,
                "redis_memory_used": redis_info.get("used_memory_human", "N/A"),
                "memory_cache_size": memory_cache_size,
                "total_cached_websites": redis_info.get("db0", {}).get("keys", 0) + memory_cache_size
            }
        except Exception as e:
            return {
                "redis_connected": False,
                "memory_cache_size": len(self.memory_cache),
                "error": str(e)
            }
    
    # Redis methods
    async def _cache_in_redis(self, website_id: str, website_data: Dict[str, Any]):
        """Cache data in Redis"""
        try:
            key = f"website:{website_id}"
            value = json.dumps(website_data)
            self.redis_client.setex(key, int(self.cache_ttl.total_seconds()), value)
        except Exception as e:
            raise Exception(f"Redis cache error: {e}")
    
    async def _get_from_redis(self, website_id: str) -> Optional[Dict[str, Any]]:
        """Get data from Redis"""
        try:
            key = f"website:{website_id}"
            value = self.redis_client.get(key)
            if value:
                return json.loads(value)
            return None
        except Exception as e:
            raise Exception(f"Redis retrieval error: {e}")
    
    async def _remove_from_redis(self, website_id: str):
        """Remove data from Redis"""
        try:
            key = f"website:{website_id}"
            self.redis_client.delete(key)
        except Exception as e:
            raise Exception(f"Redis removal error: {e}")
    
    # Memory cache methods
    async def _cache_in_memory(self, website_id: str, website_data: Dict[str, Any]):
        """Cache data in memory"""
        self.memory_cache[website_id] = {
            "data": website_data,
            "cached_at": datetime.now(),
            "expires_at": datetime.now() + self.cache_ttl
        }
    
    async def _get_from_memory(self, website_id: str) -> Optional[Dict[str, Any]]:
        """Get data from memory cache"""
        if website_id in self.memory_cache:
            cache_entry = self.memory_cache[website_id]
            
            # Check if expired
            if datetime.now() > cache_entry["expires_at"]:
                del self.memory_cache[website_id]
                return None
            
            return cache_entry["data"]
        
        return None
    
    async def _remove_from_memory(self, website_id: str):
        """Remove data from memory cache"""
        if website_id in self.memory_cache:
            del self.memory_cache[website_id]
    
    async def cleanup_expired_cache(self):
        """Clean up expired cache entries"""
        try:
            # Clean memory cache
            current_time = datetime.now()
            expired_keys = [
                key for key, entry in self.memory_cache.items()
                if current_time > entry["expires_at"]
            ]
            
            for key in expired_keys:
                del self.memory_cache[key]
            
            # Redis automatically handles TTL
            return len(expired_keys)
        except Exception as e:
            print(f"Cache cleanup failed: {e}")
            return 0 