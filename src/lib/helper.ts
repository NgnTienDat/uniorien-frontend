export const nextEndpoint = {
    UNIVERSITY_LIST: "/api/universities",
    UNIVERSITY_BENCHMARKS: "/api/admissions",
    MAJOR_LIST: "/api/majors",
    ALL_UNI_REVIEW_LIST: "/api/reviews",
}

export const springEndpoint = {
    // auth
    TOKEN_OUTBOUND: "/auth/outbound/authentication",
    LOGOUT: "/auth/logout",
    INTROSPECT_TOKEN: '/auth/introspect',
    REFRESH_TOKEN: '/auth/refresh',
    
    // user
    MY_INFO: '/api/v1/users/my-info',
    
    // university
    UNIVERSITY_LIST: "/api/v1/uni/",
    UNIVERSITY_BENCHMARKS: "/api/v1/uni/benchmarks/",
    
    // major
    MAJORS_LIST: "/api/v1/majors/major-groups",
    MAJORS_SEARCH: "/api/v1/majors/filter",
    
    // review
    ALL_UNI_REVIEW_LIST: "/api/v1/reviews/",
    ADD_COMMENT:"/api/v1/reviews/comments",
    ALL_COMMENT: (universityCode: string) => `/api/v1/reviews/${universityCode}/comments`,

}

export const OAuthConfig = {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    redirectUri: process.env.NEXT_PUBLIC_REDIRECT_URI,
    authUri: process.env.NEXT_PUBLIC_AUTH_URI
}