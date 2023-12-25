# Task 1: File-Based Caching System

## Overview

This project implements a file-based caching system with the following features:

1. **Storage Format:** Cache data is stored as JSON files in a specified directory.

2. **Time-to-Live (TTL):** Each cache entry includes a time-to-live (TTL) option, allowing entries to expire automatically.

3. **Automatic Expiry:** Expired cache entries are automatically removed from the system.

4. **API Methods:**
    - `set(key: string, value: any, ttl: number)`: Store a cache entry with the given key, value, and time-to-live (TTL) in seconds.
    - `get(key: string)`: Retrieve the value for the given key if it exists and has not expired. Otherwise, return null.
    - `delete(key: string)`: Remove the cache entry with the given key.
    - `clear()`: Remove all cache entries.

## Implementation Details

- **Error Handling:** The implementation considers error handling to ensure robustness.

- **File I/O Performance:** File I/O performance is optimized to enhance efficiency in reading and writing cache data.

- **Concurrency Considerations:** Concurrency issues are taken into account to ensure the safe operation of the caching system in a multi-threaded environment.