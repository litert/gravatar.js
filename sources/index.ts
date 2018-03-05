/*
   +----------------------------------------------------------------------+
   | LiteRT Gravatar.js Library                                           |
   +----------------------------------------------------------------------+
   | Copyright (c) 2018 Fenying Studio                                    |
   +----------------------------------------------------------------------+
   | This source file is subject to version 2.0 of the Apache license,    |
   | that is bundled with this package in the file LICENSE, and is        |
   | available through the world-wide-web at the following url:           |
   | https://github.com/litert/gravatar.js/blob/master/LICENSE            |
   +----------------------------------------------------------------------+
   | Authors: Angus Fenying <fenying@litert.org>                          |
   +----------------------------------------------------------------------+
 */

export interface GetAvatarConfig {

    "email": string;

    /**
     * If no avatar for this email, specify a default avatar.
     *
     * - 404: do not load any image if none is associated with the email hash,
     *        instead return an HTTP 404 (File Not Found) response
     * - mm: (mystery-man) a simple, cartoon-style silhouetted outline of a
     *       person (does not vary by email hash)
     * - identicon: a geometric pattern based on an email hash
     * - monsterid: a generated 'monster' with different colors, faces, etc
     * - wavatar: generated faces with differing features and backgrounds
     * - retro: awesome generated, 8-bit arcade-style pixelated faces
     * - robohash: a generated robot with different colors, faces, etc
     * - blank: a transparent PNG image (border added to HTML below for
     *          demonstration purposes)
     *
     * Default: mm
     */
    "default"?: string;

    /**
     * Select the rating level of avatar image.
     *
     * - g: suitable for display on all websites with any audience type.
     * - pg: may contain rude gestures, provocatively dressed individuals, the
     *       lesser swear words, or mild violence.
     * - r: may contain such things as harsh profanity, intense violence,
     *      nudity, or hard drug use.
     * - x: may contain hardcore sexual imagery or extremely disturbing
     *      violence.
     *
     * Default: G
     */
    "rating"?: "G" | "g" | "PG" | "pg" | "R" | "r" | "X" | "x";

    /**
     * Select the size (in pixels) of avatar image.
     *
     * Default: 40
     */
    "size"?: number;

    /**
     * Force using default avatar image.
     *
     * Default: false
     */
    "forceDefault"?: boolean;

    /**
     * Using the link of HTTPS.
     *
     * Default: true
     */
    "https"?: boolean;
}

const GRAVATAR_PREFIX: string = "https://www.gravatar.com/avatar/";

const INSECURE_GRAVATAR_PREFIX: string = "http://www.gravatar.com/avatar/";

const BUILT_IN_DEFAULT_AVATAR: string[] = [
    "404", "mm", "identicon", "monsterid",
    "wavatar", "retro", "robohash", "blank"
];

/**
 * The default configuration to avatar URLs.
 */
export let defaultConfig: GetAvatarConfig = {
    "email": "",
    "default": "mm",
    "rating": "G",
    "size": 40,
    "forceDefault": false,
    "https": true
};

/**
 * The signature of MD5 function.
 */
export type MD5Function = (email: string) => string;

let md5Hasher: MD5Function;

/**
 * Inject a MD5 function for calculating the MD5 value of an E-Mail address.
 * @param fn The MD5 function
 */
export function setMD5Function(fn: MD5Function): void {

    md5Hasher = fn;
}

/**
 * Get the URL to avatar of a specific E-Mail address.
 * @param email The specific E-Mail address
 */
export function getAvatarUrl(email: string | GetAvatarConfig): string {

    let cfg: GetAvatarConfig;

    if (typeof email === "string") {

        cfg = {
            "email": email,
            "default": defaultConfig.default,
            "rating": defaultConfig.rating,
            "size": defaultConfig.size,
            "forceDefault": defaultConfig.forceDefault,
            "https": defaultConfig.https
        };
    }
    else {

        cfg = email;

        cfg.default = cfg.default || defaultConfig.default;
        cfg.rating = cfg.rating || defaultConfig.rating;
        cfg.https = cfg.https || defaultConfig.https;
        cfg.forceDefault = cfg.forceDefault || defaultConfig.forceDefault;
        cfg.size = (cfg.size && cfg.size > 0 && cfg.size) || defaultConfig.size;
    }

    cfg.email = cfg.email.trim().toLowerCase();

    let ret: string = cfg.https ? `${GRAVATAR_PREFIX}${md5Hasher(cfg.email)}` :
                        `${INSECURE_GRAVATAR_PREFIX}${md5Hasher(cfg.email)}`;

    let params: string[] = [];

    let defImg = (cfg.default as string).toLowerCase();

    if (BUILT_IN_DEFAULT_AVATAR.indexOf(defImg) === -1) {

        defImg = encodeURIComponent(cfg.default as string);
    }

    params.push(`s=${cfg.size}`);
    params.push(`d=${defImg}`);
    params.push(`r=${cfg.rating}`);

    if (cfg.forceDefault) {

        params.push("f=y");
    }

    if (params.length) {

        ret += `?${params.join("&")}`;
    }

    return ret;
}
