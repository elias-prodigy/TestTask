// Custom error class for validation errors
export class ValidationError extends Error {
    name = "VALIDATION_ERROR";
    message = "Request validation failed";

    constructor(message: string = "Request validation failed") {
        super();
        this.message = message;
    }
}

// Custom error class for server errors
export class ServerError extends Error {
    name = "SERVER_ERROR";
    message = "Internal server error";

    constructor(message: string = "Internal server error") {
        super();
        this.message = message;
    }
}


export class KeyLengthValidationError extends ValidationError {
    name = "KEY_LENGTH_VALIDATION_FAILURE";
    message = "File name length should be greater than zero.";
}

export class ValueIsNullValidationError extends ValidationError {
    name = "VALUE_IS_NULL_VALIDATION_FAILURE";
    message = "File content was not provided.";
}

export class TtlValidationError extends ValidationError {
    name = "TTL_VALIDATION_FAILURE";
    message = "TTL should be equal or greater than zero.";
}

export class CacheDirectoryCreationError extends ServerError {
    name = "CACHE_DIRECTORY_CREATION_FAILURE";
    message = "Failed to create cache directory.";

    constructor(error?: string) {
        super();
        if (error) {
            this.message = `Failed to create cache directory with error: ${error}`;
        }
    }
}

export class RequestedCacheFileExpiredDeletionError extends ServerError {
    name = "REQUESTED_CACHE_FILE_EXPIRED_DELETION_FAILURE";
    message = "The requested file has expired. Error occurred while deleting expired file.";

    constructor(error?: string) {
        super();
        if (error) {
            this.message = `The requested file has expired. Error occurred while deleting expired file: ${error}`;
        }
    }
}

export class CacheFileCreationError extends ServerError {
    name = "CACHE_FILE_CREATION_FAILURE";
    message = "Failed to create cached file.";

    constructor(error?: string) {
        super();
        if (error) {
            this.message = `Failed to create cached file with error: ${error}`;
        }
    }
}

export class CacheFileDeletionError extends ServerError {
    name = "CACHE_FILE_DELETION_FAILURE";
    message = "Failed to delete cached file.";

    constructor(error?: string) {
        super();
        if (error) {
            this.message = `Failed to delete cached file with error: ${error}`;
        }
    }
}

export class ClearingCachedFilesError extends ServerError {
    name = "CLEARING_CACHED_FILES_FAILURE";
    message = "Failed to delete all cached entries.";

    constructor(error?: string) {
        super();
        if (error) {
            this.message = `Failed to delete all cached entries: ${error}`;
        }
    }
}