export const nextEndpoint = {
    UNIVERSITY_LIST: "/api/universities",
    UNIVERSITY_BENCHMARKS: "/api/admissions",
    MAJOR_LIST: "/api/majors",
    ALL_UNI_REVIEW_LIST: "/api/reviews",
}

export const springEndpoint = {
    UNIVERSITY_LIST: "/api/v1/uni/",
    UNIVERSITY_BENCHMARKS: "/api/v1/uni/benchmarks/",
    MAJORS_LIST: "/api/v1/majors/major-groups",
    MAJORS_SEARCH: "/api/v1/majors/filter",
    TOKEN_OUTBOUND: "/auth/outbound/authentication",
    ALL_UNI_REVIEW_LIST: "/api/v1/reviews/",

}

export const OAuthConfig = {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    authUri: process.env.NEXT_PUBLIC_AUTH_URI
}