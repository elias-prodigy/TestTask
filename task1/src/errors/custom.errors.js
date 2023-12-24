"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClearingCachedFilesError = exports.CacheFileDeletionWhileClearingError = exports.CacheFileDeletionError = exports.CacheFileCreationError = exports.RequestedCacheFileExpiredDeletionError = exports.CacheDirectoryCreationError = exports.TtlValidationError = exports.ValueIsNotValidJsonValidationError = exports.ValueIsNullValidationError = exports.KeyLengthValidationError = exports.ServerError = exports.ValidationError = void 0;
// Custom error class for validation errors
class ValidationError extends Error {
    constructor(message = "Request validation failed") {
        super();
        this.name = "VALIDATION_ERROR";
        this.message = "Request validation failed";
        this.message = message;
    }
}
exports.ValidationError = ValidationError;
class ServerError extends Error {
    constructor(message = "Internal server error") {
        super();
        this.name = "SERVER_ERROR";
        this.message = "Internal server error";
        this.message = message;
    }
}
exports.ServerError = ServerError;
class KeyLengthValidationError extends ValidationError {
    constructor() {
        super(...arguments);
        this.name = "KEY_LENGTH_VALIDATION_FAILURE";
        this.message = "File name length should be greater than zero.";
    }
}
exports.KeyLengthValidationError = KeyLengthValidationError;
class ValueIsNullValidationError extends ValidationError {
    constructor() {
        super(...arguments);
        this.name = "VALUE_IS_NULL_VALIDATION_FAILURE";
        this.message = "File content was not provided.";
    }
}
exports.ValueIsNullValidationError = ValueIsNullValidationError;
class ValueIsNotValidJsonValidationError extends ValidationError {
    constructor() {
        super(...arguments);
        this.name = "VALUE_IS_NOT_VALID_JSON_VALIDATION_FAILURE";
        this.message = "TTL should be equal or greater than zero.";
    }
}
exports.ValueIsNotValidJsonValidationError = ValueIsNotValidJsonValidationError;
class TtlValidationError extends ValidationError {
    constructor() {
        super(...arguments);
        this.name = "TTL_VALIDATION_FAILURE";
        this.message = "TTL should be equal or greater than zero.";
    }
}
exports.TtlValidationError = TtlValidationError;
class CacheDirectoryCreationError extends ServerError {
    constructor(error) {
        super();
        this.name = "CACHE_DIRECTORY_CREATION_FAILURE";
        this.message = "Failed to create cache directory.";
        if (error) {
            this.message = `Failed to create cache directory with error: ${error}`;
        }
    }
}
exports.CacheDirectoryCreationError = CacheDirectoryCreationError;
class RequestedCacheFileExpiredDeletionError extends ServerError {
    constructor(error) {
        super();
        this.name = "REQUESTED_CACHE_FILE_EXPIRED_DELETION_FAILURE";
        this.message = "The requested file has expired. Error occurred while deleting expired file.";
        if (error) {
            this.message = `The requested file has expired. Error occurred while deleting expired file: ${error}`;
        }
    }
}
exports.RequestedCacheFileExpiredDeletionError = RequestedCacheFileExpiredDeletionError;
class CacheFileCreationError extends ServerError {
    constructor(error) {
        super();
        this.name = "CACHE_FILE_CREATION_FAILURE";
        this.message = "Failed to create cached file.";
        if (error) {
            this.message = `Failed to create cached file with error: ${error}`;
        }
    }
}
exports.CacheFileCreationError = CacheFileCreationError;
class CacheFileDeletionError extends ServerError {
    constructor(error) {
        super();
        this.name = "CACHE_FILE_DELETION_FAILURE";
        this.message = "Failed to delete cached file.";
        if (error) {
            this.message = `Failed to delete cached file with error: ${error}`;
        }
    }
}
exports.CacheFileDeletionError = CacheFileDeletionError;
class CacheFileDeletionWhileClearingError extends ServerError {
    constructor(error) {
        super();
        this.name = "CACHE_FILE_DELETION_WHILE_CLEARING_FAILURE";
        this.message = "Failed to delete cached file while clearing all cache entries.";
        if (error) {
            this.message = `Failed to delete cached file while clearing all cache entries: ${error}`;
        }
    }
}
exports.CacheFileDeletionWhileClearingError = CacheFileDeletionWhileClearingError;
class ClearingCachedFilesError extends ServerError {
    constructor(error) {
        super();
        this.name = "CLEARING_CACHED_FILES_FAILURE";
        this.message = "Failed to delete all cached entries.";
        if (error) {
            this.message = `Failed to delete all cached entries: ${error}`;
        }
    }
}
exports.ClearingCachedFilesError = ClearingCachedFilesError;
