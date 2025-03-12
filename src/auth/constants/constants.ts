import { SetMetadata } from "@nestjs/common";

export const jwtConstants = {
    secret: "TEACH ME TO DO YOUR WILL, FOR YOU ARE MY GOD; MAY YOUR GOOD SPIRIT LEAD ME ON LEVEL GROUND.\
    FOR YOUR NAME'S SAKE, LORD, PRESERVE MY LIFE; IN YOUR RIGHTEOUSNESS, BRING ME OUT OF TROUBLE",
    audience: 'http://localhost:3000',
    issuer: 'http://localhost:3000',
    jwtTtl: '3600',
    jwtRefreshTtl: '86400'
};

export const IS_PUBLIC_KEY = 'isPublic';
export const REQUEST_TOKEN_PAYLOAD_KEY = 'tokenPayload';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);