import {UserDocument} from "../database/User";

export interface UserListResponseDto {
    list: UserDocument[];
    totalPages: number;
    currentPage: number;
}