import {SVGProps} from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export type IconProps = {
  className?: string;
};

export type LoginType = {
  email: string;
  password: string;
};

// export type UserTypes = {
//    // create a user auth type
//    accessToken: string;
//    auth: {},
//    displayName: string;

//     email: string;
//     emailVerified: boolean;
//     metadata: {},
//     phoneNumber: string;
//     photoURL: string;
//     providerData: {},
    
//     providerId: string;
//     refreshToken: string;

// };

export type UserTypes = any;