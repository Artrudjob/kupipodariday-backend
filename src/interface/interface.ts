import { Request } from '@nestjs/common';

export interface RequestUserId extends Request {
    user: {
        id: number
    }
}
