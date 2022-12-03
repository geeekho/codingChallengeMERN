// ----------------------------------------------------------------------

function path(root, sublink) {
    return `${root}${sublink}`;
}

const ROOTS_AUTH = '/';
const ROOTS_DASHBOARD = '/dashboard';


// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: ROOTS_AUTH,
    register: path(ROOTS_AUTH, '/register'),
    resetPassword: path(ROOTS_AUTH, '/reset-password'),
    verify: path(ROOTS_AUTH, '/verify'),
    confirm: path(ROOTS_AUTH, '/confirm/:id'),
};

export const PATH_PAGE = {
    comingSoon: '/coming-soon',
    maintenance: '/maintenance',
    pricing: '/pricing',
    payment: '/payment',
    about: '/about-us',
    contact: '/contact-us',
    faqs: '/faqs',
    page404: '/404',
    page500: '/500',
    components: '/components',
};

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    general: {
        landing: path(ROOTS_DASHBOARD, '/landing'),
        users: path(ROOTS_DASHBOARD, '/users'),
    },
};