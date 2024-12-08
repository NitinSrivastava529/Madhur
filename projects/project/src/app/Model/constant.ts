export const CONSTANT={
    API_URL:window.location.origin.includes('localhost') ? 'https://localhost:7284/' : 'http://api.madhuraastha.com/',
    ROOT_URL:window.location.origin.includes('localhost') ? 'https://localhost:4200/' : 'http://madhuraastha.com/',
    MEMBER_INFO:localStorage.getItem('MemberInfo')
} 